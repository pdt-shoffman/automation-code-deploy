var srch_invoke = (function () {
    /*
    ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ::::::::::::::::::::::::::::::::::::: Core Observer::::::::::::::::::::::::::::::::::::::::::::::::
    ::::::::::::::::::::::::::::::::::::::Release V 0.06::::::::::::::::::::::::::::::::::::::::::::::::
    */
    //Local AEM DEV
    //var URLBaseSearchApiEp = "https://search-dv2.test.tiaa.org/digitalsearchgateway/typeahead";
    //var URLBaseSearchResults = "https://search-dv2.test.tiaa.org/digitalsearchgateway/searchresults";
    //Dynamically Assign the Domain based on the Host
    var URLBase = getBaseURL();
    // var URLBase = "https://origin-aws-west1-search-at.test.tiaa.org";
    var MODURLBase = getMODBaseURL();
    var URLBaseResources = URLBase + "/digitalsearchgateway/client/uifiles";
    //Test & Prod
    var URLBaseSearchApiEp = URLBase + "/digitalsearchgateway/typeahead";
    var URLBaseSearchResults = URLBase + "/digitalsearchgateway/searchresults";
    //MOD
    var suggestQuotesURL = "https://api.tiaa-cref.wallst.com/Lookup/PredictiveSearch?inputText=";
    //TEST
    var resultsMODURL = "https://tiaa-a2.markitqa.com";
    //PROD
    //var resultsMODURL = "https://tiaa.markitqa.com";
    //Get the Attribute for the Template Snippet to load
    var passedTemplate, readTemplate, readScope;
    var queryFromBrowser;
    var requery = "false";
    var sessionType = userSession();
    var sessionNumber = getPublicCookie();
    var deviceResolution = "Desktop";
    var loadedMobile = "false";
    var loadedDesktop = "false";
    var selectedValues = [];
    var offsetValues = 0;
    var curPage = offsetValues;
    var isDualSearch = false;
    var callQuotes = false;
    var colLookup;
    var proLookup;
    var proTALookup;
    var collectionForTypeAhead;
    var profileTAForTypeAhead;
    var templateForTypeAhead;
    var collectionForSrchResults;
    var profileForSrchResults;
    var passedTemplateForSrchResults;
    var filterList;
    var isSearchPage = false;
    var isEnrollSearchPage = false;
    //Load Listener, Primary bootstrap event
    $(document).ready(function () {
        searchready();
    });

    function userSession() {
        var userType = getUserSessionCookie("SMSERVERSESSIONID");
        var LoginType = getUserSessionCookie("PA.ext");
        if (userType == "") {
            return "PUBLIC";
            console.log("User Session Type: = PUBLIC")
        } else if (userType != "") {
            if (LoginType != "LOGGEDOFF" && LoginType != "") {
                return "SECURE";
                console.log("User Session Type: = SECURE")
            } else {
                return "PUBLIC";
                console.log("User Session Type: PUBLIC")
            }
        }
    }

    //Primary Function for execution of Search DOM
    function searchready() {
        //Detect site
        if (window.location.href.indexOf("enroll-search") > -1) {
            this.isEnrollSearchPage = true;
        }
        //Mobile or Desktop
        checkDeviceResolution();
        //Check if TypeAhead and/or Results Exists
        srchTypeAheadExist = $("#srch-typeahead").length;
        srchResultsExist = $("#srch-searchresults").length;
        //CALL DUALSEARCH HERE
        dualSearch();
        //Read the URL Querystring for parameters
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const qryStr = urlParams.get('qryStr')
        queryFromBrowser = qryStr;
        //Check to see if rendering Search Results page
        var resultsElement = document.getElementById("srch-searchresults");
        if (srchResultsExist != 0 && queryFromBrowser != null && queryFromBrowser != "") {
            callSearchResultService();
        } else if (srchResultsExist != 0) {
            $.ajax({
                url: URLBaseResources + '/html/snippet_template_no_results_' + passedTemplateLC + '.html',
                success: function (data) {
                    result = $.parseHTML(data);
                    $('#srch-searchresults').html(result);
                }
            });
        }
        finalizeLoading();
    }


    /*
     :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      Read TypeAhead/Results Tag Template & Scope Value, if TA is not on the page (unlikely) then call to the templateReaderResults to read the values
     :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
     */
    function templateReaderTypeAhead() {
        readTemplate = document.getElementById("srch-typeahead").getAttribute("template");
        passedTemplate = readTemplate;
        readScope = document.getElementById("srch-typeahead").getAttribute("scope");
        passedScope = readScope;
        passedScope = passedScope.charAt(0).toUpperCase() + passedScope.slice(1);

        if (passedTemplate == "undefined") {
            readTemplate = document.getElementById("srch-searchresults").getAttribute("template");
            passedTemplate = readTemplate;
            readScope = document.getElementById("srch-searchresults").getAttribute("scope");
            passedScope = readScope;
        }

        checkMobile();
    }
    function templateReaderResults() {
        readTemplate = document.getElementById("srch-searchresults").getAttribute("template");
        passedTemplate = readTemplate; //using this var to preserve the original value
        readScope = document.getElementById("srch-searchresults").getAttribute("scope");
        //Using this var to preserve the original value
        passedScope = readScope;
        //Set the value to initial capital
        passedScope = passedScope.charAt(0).toUpperCase() + passedScope.slice(1);
        //Change this to if srchTypeAheadExist >0 (typeahead is on the page)
        //if TA is not on the page (unlikely) then call to the templateReaderResults to read the values
        if (passedTemplate == "undefined") {
            //Read Template, Scope from Results Tag
            readTemplate = document.getElementById("srch-searchresults").getAttribute("template");
            passedTemplate = readTemplate;
            readScope = document.getElementById("srch-searchresults").getAttribute("scope");
            passedScope = readScope;
        }
        checkMobile();
    }
    function dualSearch() {
        //Change this to if srchResultsExist >0 (results is on the page)
        if (srchTypeAheadExist != 0 && srchResultsExist != 0) {
            srchTypeahead = $("#srch-typeahead").attr("template");
            srchResults = $("#srch-searchresults").attr("template");
            if (srchTypeahead != srchResults) {
                isDualSearch = true;
                templateReaderTypeAhead();
                templateReaderResults();
                dualSearchTypeAhead();
                dualSearchResults();
            } else {
                templateReaderTypeAhead();
                templateReaderResults();
                singleSearch();
            }
        } else if (srchTypeAheadExist != 0) {
            srchTypeahead = $("#srch-typeahead").attr("template");
            templateReaderTypeAhead();
            singleSearch();
        } else if (srchResultsExist != 0) {
            srchResults = $("#srch-searchresults").attr("template");
            templateReaderResults();
            singleSearch();
        }
        var isGlobalSearch = localStorage.getItem("isGlobalSearch");
        if (isGlobalSearch === "true") {
            isDualSearch = false;
            localStorage.setItem("isGlobalSearch", false);
        }
    }
    function checkMobile() {
        if (deviceResolution !== "Desktop") {
            passedTemplateLC = passedTemplate + "-Mobile";
        }
    }
    function dualSearchTypeAhead() {
        //Read the TypeAhead Template Attribute
        templateTemp = $("#srch-typeahead").attr("template");
        passedTemplateLC = templateTemp.toLowerCase();
        //Set the Collection and Profile based on TypeAhead values
        setCollectionAndProfile(templateTemp, "typeAhead");
        //Load Dependencies based on TypeAhead values
        loadDependencies(passedTemplateLC);
        getDataSnippets(passedTemplateLC);
    }
    function dualSearchResults() {
        //Read the Results Template Attribute
        templateTemp = $("#srch-searchresults").attr("template");
        passedTemplateLC = templateTemp.toLowerCase();
        //Set the Collection and Profile based on Results values
        setCollectionAndProfile(templateTemp, "searchResults");
        //Load Dependencies based on Results values
        loadDependencies(templateTemp, "searchResults");
        if (deviceResolution === "Mobile") {
            passedTemplateLC = passedTemplateLC + "-mobile";
        }
        getDataSnippets(passedTemplateLC);
    }
    function singleSearch() {
        //Lowercase the Template to safely use in code
        readTemplate = readTemplate.toLowerCase();
        passedTemplateLC = readTemplate.toLowerCase();
        //Set the Collection and Profile based on TypeAhead values
        setCollectionAndProfile(passedTemplate, "typeAhead");
        //Set the Collection and Profile based on Results values
        setCollectionAndProfile(passedTemplate, "searchResults");
        //Load Dependencies
        loadDependencies(passedTemplateLC);
        if (deviceResolution === "Mobile") {
            passedTemplateLC = passedTemplateLC + "-mobile";
        }
        getDataSnippets(passedTemplateLC)
    }
    /*
    ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    :::::::::::::::::::::::::::::::::::: LOAD DEPENDENCIES  ::::::::::::::::::::::::::::::::::::::::::::
    ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    */
    function loadDependencies(sentTemplate) {
        //Set loading for pulling dependencies
        if (deviceResolution === "Mobile") {
            loadedMobile = "true";
        } else {
            loadedDesktop = "true";
        }
        //Check if jQuery exists
        if (!typeof $ === "function" || !typeof jQuery === "function") {
            var jqueryFile = document.createElement('script');
            jqueryFile.type = "text/javascript";
            jqueryFile.src = URLBaseResources + "/js/srch_jquery.js";
            jqueryFile.id = "jquery-file";
            document.head.appendChild(jqueryFile);
        }
        //Load Pagination
        var paginationFile = document.createElement('script');
        paginationFile.type = "text/javascript";
        paginationFile.src = URLBaseResources + "/js/srch_pagination.js";
        paginationFile.id = "pagination-file";
        document.head.appendChild(paginationFile);

        //Load the CSS file
        var styleContent = document.createElement("link");
        styleContent.type = "text/css";
        styleContent.rel = "stylesheet";
        styleContent.href = URLBaseResources + "/css/snippet_styles_" + passedTemplateLC + ".css";
        styleContent.id = "style-content";
        document.head.appendChild(styleContent);
    }

    function getBaseURL() {
        var scriptTagSrc = $("#srch_micro").attr("src");
        var URLBaseSrc = scriptTagSrc.indexOf("/digitalsearchgateway/client/uifiles/srch_observer.js");
        var URLBaseResources = scriptTagSrc.substring(0, URLBaseSrc);
        return URLBaseResources;
    }

    function getMODBaseURL() {
        MODqa = "https://tiaa.markitqa.com";
        MODprod = "https://www.tiaa.markitondemand.com";
        if (window.location.href.indexOf("tiaa.org") > -1) {
            MODURLBaseResources = MODprod;
        } else {
            MODURLBaseResources = MODqa;
        }

        return MODURLBaseResources;
    }

    /*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
LOADS CSS AND JS FILES NEEDED TO RENDER TICKETS SYMBOLS AND CHART
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
    function getMODFiles() {

        var componentsv2 = document.createElement("link");
        componentsv2.type = "text/css";
        componentsv2.rel = "stylesheet";
        componentsv2.href = MODURLBase + "/Research/Content/Dist/Styles/componentsv2.css?0bfa9762";
        componentsv2.id = "componentsv2-file";
        document.head.appendChild(componentsv2);
        var tiaaReset = document.createElement("link");
        tiaaReset.type = "text/css";
        tiaaReset.rel = "stylesheet";
        tiaaReset.href = MODURLBase + "/Research/Content/Styles/tiaa-reset.css";
        tiaaReset.id = "tiaaReset-file";
        document.head.appendChild(tiaaReset);
        var globalsearchstyles = document.createElement("link");
        globalsearchstyles.type = "text/css";
        globalsearchstyles.rel = "stylesheet";
        globalsearchstyles.href = MODURLBase + "/Research/Content/Dist/Styles/globalsearchstyles.css?d6066099";
        globalsearchstyles.id = "globalsearchstyles-file";
        document.head.appendChild(globalsearchstyles);
        var common = document.createElement('script');
        common.type = "text/javascript";
        common.src = MODURLBase + "/Research/Content/Dist/Scripts/common.js?168f9918";
        common.id = "common-file";
        document.head.appendChild(common);
        var globalsearchscripts = document.createElement('script');
        globalsearchscripts.type = "text/javascript";
        globalsearchscripts.src = MODURLBase + "/Research/Content/Dist/Scripts/globalsearchscripts.js?447a6317";
        globalsearchscripts.id = "globalsearchscripts-file";
        document.head.appendChild(globalsearchscripts);
    }


    /*
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    GENERATES MOD KEY 
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    */

    function generateMODKey() {
        $.ajax({
            url: "/content/tiaa/commons/services/generatemodkey.html",
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
                window.MODKey = data[0].value;
                callMODService()
            },
            error: function (xhr, errorType, exception) {
                console.log(xhr, errorType, exception);
            }
        });
    }

    function callMODService() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const qryStr = urlParams.get('qryStr')
        queryFromBrowser = qryStr;
        const urlDomain = location.hostname;
        var requestObj = [
            {
                "name": "com_markitondemand_global_search",
                "appId": "com_markitondemand_global_search",
                "enableBatchRequests": "true",
                "manifestUrl": MODURLBase + "/Research/Public/f2/apps/json",
                "context": {
                    "Style": "Interim",
                    "Symbol": queryFromBrowser,
                    "UrlDomain": "https://" + urlDomain,
                    "UrlPrefix": "public/"
                },
                "instanceId": "",
                "views": [
                    "home"
                ]

            }
        ]

        $.ajax({
            url: MODURLBase + "/Research/Public/f2/apps/json" + "?" + window.MODKey,
            type: "POST",
            data: {
                params: JSON.stringify(requestObj)
            },
            dataType: "json",
            success: function (modData) {
                if (modData.apps[0].data.isValidSymbol && modData.apps[0].status === 'SUCCESS') {

                    result = $.parseHTML(modData.apps[0].html);
                    isNoResultsVisible = document.getElementById("srch-no-results").style.display == "block";
                    if (isNoResultsVisible & result != null) {
                        $('#srch-no-results').hide();
                        $('#block-search-results-group').show();
                        $('#filterAndCount').hide();
                        $('#srch-pagination').hide();
                    }
                    $('#com_markitondemand_global_search').html(result);
                    $('#com_markitondemand_global_search').show();

                    screen_width = document.documentElement.clientWidth;
                    screen_heght = document.documentElement.clientHeight;
                    if (screen_width <= 975) {
                        //mod charts for mobile
                        callMODChart("OneDay", "350");
                    } else {
                        //mod charts for desktop
                        callMODChart("OneDay", "586");
                    }

                } else {
                    return false;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown);
            }
        });

    }
    function loadModData() {
        getMODFiles()
        generateMODKey()
    }

    /*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
MOD DAILY CHARTS
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
    function modChartsHandler() {
        setTimeout(() => {
            $("#tabId0").unbind("click").click(function () {
                cleanUpActiveChartClass()
                callMODChart("OneDay", "586")
                $("#tabId0").addClass("m_active");
            });

            $("#tabId1").unbind("click").click(function () {
                cleanUpActiveChartClass()
                callMODChart("FiveDay", "586")
                $("#tabId1").addClass("m_active");
            });

            $("#tabId2").unbind("click").click(function () {
                cleanUpActiveChartClass()
                callMODChart("OneMonth", "586")
                $("#tabId2").addClass("m_active");
            });

            $("#tabId3").unbind("click").click(function () {
                cleanUpActiveChartClass()
                callMODChart("ThreeMonth", "586")
                $("#tabId3").addClass("m_active");
            });

            $("#tabId4").unbind("click").click(function () {
                cleanUpActiveChartClass()
                callMODChart("OneYear", "586")
                $("#tabId4").addClass("m_active");
            });

            $("#tabId5").unbind("click").click(function () {
                cleanUpActiveChartClass()
                callMODChart("FiveYear", "586")
                $("#tabId5").addClass("m_active");
            });

            $("#tabId6").unbind("click").click(function () {
                cleanUpActiveChartClass()
                callMODChart("Max", "586")
                $("#tabId6").addClass("m_active");
            });

            $(".m_link-button").click(function () {
                var href = $(this).attr("href");
                window.location = href;
            });

            $(".m_link-button").click(function () {
                var href = $(this).attr("href");
                window.location = href;
            });

        }, 2000);

    }

    function cleanUpActiveChartClass() {
        $("#tabId0").removeClass("m_active")
        $("#tabId1").removeClass("m_active")
        $("#tabId2").removeClass("m_active")
        $("#tabId3").removeClass("m_active")
        $("#tabId4").removeClass("m_active")
        $("#tabId5").removeClass("m_active")
        $("#tabId6").removeClass("m_active")
    }

    function loadDropDownSelectChart() {
        setTimeout(() => {
            $('#dropdown-timeframe').on('change', function () {
                var timeframe = "OneDay";
                var selected = $('#dropdown-timeframe :selected').text()
                if (selected === "1 Day") {
                    timeframe = "OneDay";
                }
                if (selected === "5 Days") {
                    timeframe = "FiveDay";
                }
                if (selected === "1 Month") {
                    timeframe = "OneMonth";
                }
                if (selected === "3 Months") {
                    timeframe = "ThreeMonth";
                }
                if (selected === "1 Year") {
                    timeframe = "OneYear";
                }
                if (selected === "5 Years") {
                    timeframe = "FiveYear";
                }
                if (selected === "Max") {
                    timeframe = "Max";
                }
                $(".m_btn-group").remove();
                callMODChart(timeframe, "350")
            });
        }, 1000);
    }
    var modDropdownForMobile = '<div class="m_btn-group m_bootstrap-select m_"><button type="m_button" class="m_btn m_dropdown-toggle m_btn-dropdown" data-toggle="mod-dropdown" data-id="mobile-menu637854571671996817" title="1 Day"><span class="m_filter-option m_pull-left">1 Day</span>&nbsp;<span class="m_caret"></span></button><div class="m_dropdown-menu m_open"><ul class="m_dropdown-menu m_inner" role="menu"><li data-original-index="0" class="m_selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="m_text">1 Day</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="m_text">5 Days</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="m_text">1 Month</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="m_text">3 Months</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="m_text">1 Year</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="m_text">5 Years</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="m_text">Max</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="m_selectpicker m_bs-select-hidden m_mobile-device" id="dropdown-timeframe" role="menubar" aria-label="Price Performance">' +
        '<option></option>' +
        '<option value="OneDay">1 Day</option>' +
        '<option value="FiveDay">5 Days</option>' +
        '<option value="OneMonth">1 Month</option>' +
        '<option value="ThreeMonth">3 Months</option>' +
        '<option value="OneYear">1 Year</option>' +
        '<option value="FiveYear">5 Years</option>' +
        '<option value="Max">Max</option>' +
        '</select></div>';
    function callMODChart(timeframe, width) {
        $(".m_line-chart-container").remove();
        $.ajax({
            url: MODURLBase + "/Research/Public/LandingPages/GlobalSearch" + "?" + window.MODKey,
            type: "POST",
            data: "symbol=" + queryFromBrowser + "&timeframe=" + timeframe + "&width=" + width + "",
            success: function (chartsData) {
                $(".m_panel-body").append(chartsData.html)
                $(".m_selectpicker").remove();
                $(".m_form-group").append(modDropdownForMobile);
                if (timeframe === "OneDay")
                    $(".m_filter-option").text("1 Day");
                if (timeframe === "FiveDay")
                    $(".m_filter-option").text("5 Days");
                if (timeframe === "OneMonth")
                    $(".m_filter-option").text("1 Month");
                if (timeframe === "ThreeMonth")
                    $(".m_filter-option").text("3 Months");
                if (timeframe === "OneYear")
                    $(".m_filter-option").text("1 Year");
                if (timeframe === "FiveYear")
                    $(".m_filter-option").text("5 Years");
                if (timeframe === "Max")
                    $(".m_filter-option").text("Max");
                loadDropDownSelectChart();
            }
        });
    }

    function callInputValidation(passQuery) {
        passQuery = passQuery.replace(/%3C/g, '');
        passQuery = passQuery.replace(/%3E/g, '');
        passQuery = passQuery.replace(/</g, '');
        passQuery = passQuery.replace(/>/g, '');
        passQuery = passQuery.replace(/\%25/g, '');
        passQuery = passQuery.replace(/\+/g, '');
        passQuery = passQuery.replace(/\&/g, '');
        passQuery = passQuery.replace(/%26/g, '');
        passQuery = passQuery.replace(/\=/g, '');
        passQuery = passQuery.replace(/%3D/g, '');
        passQuery = passQuery.replace(/%/g, '');
        return passQuery;
    }
    /*
    ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ::::::::::::::::::::::::::::::::::::::: API CALLS ::::::::::::::::::::::::::::::::::::::::::::::::::
    ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    */
    function callTypeAheadService() {
        if (queryVal != null) {
            queryVal = callInputValidation(queryVal);
            if (queryVal != "") {
                $.ajax({
                    type: "POST",
                    url: URLBaseSearchApiEp,
                    data: JSON.stringify({
                        "ph": sessionType,
                        "tlfCookie": sessionNumber,
                        "query": queryVal + ".*",
                        "template": templateForTypeAhead,
                        "scope": passedScope,
                        "collection": collectionForTypeAhead,
                        "profile": profileTAForTypeAhead
                    }),
                    crossDomain: true,
                    dataType: "json",
                    contentType: 'text/plain'
                }).done(function (data) {
                    if (data) {
                        if (data.length > 0) {
                            //Limit to 3 results
                            data.length = 3;
                            $.each(data, function (index) {
                                if (data[index]) {
                                    GSAResults.push({
                                        name: data[index].name
                                    });
                                }
                            });
                        }
                    }
                })
                    .fail(tiaa.web.ajax.onAjaxError).always(handler)
            }
        }
    }
    function clickPagination(passPage) {
        event.preventDefault();
        event.stopPropagation();
        //Get Page # Clicked and run the Formula
        //If < or >, go forward/backward 10(Results page size)
        //Offset used to get Additional Rows of Results
        // 1 space value
        if (passPage == " ") {
            //GO BACK 10
            offsetValues = parseInt(offsetValues) - 10;
            // 2 spaces
        } else if (passPage == "  ") {
            //GO FORWARD 10
            offsetValues = parseInt(offsetValues) + 10;
        } else {
            //Use this for setting ACTIVE pagination on return
            offsetValues = (parseInt(passPage) * 10) - 10;
        }
        //Get the Facets, if any
        selectedValues = selectedValues;
        //Get ReQuery, if any
        requery = requery;
        callSearchResultServiceWithParams(selectedValues.toString().replace(/,/g, '').slice(0, -1), offsetValues, requery);
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
    }
    function finalizeLoading() {
        //These objects are loaded and safe to interact
        $("#wrongTxt").on("click", function () {
            requery = "true";
            callSearchResultServiceWithParams("", "0", requery)
        });
        $('#toggle-search-filters').on('click', function (e) {
            $('#block-search-results-filter-custom-results-panel .form-component').toggle();
            $('#block-search-results-filter-custom-results-panel .form-component').toggle();
            e.preventDefault();
            filtersRendering();
        });
        $('form#block-search-results-filter-custom-form ul li div input:checkbox').change(function () {
            if (deviceResolution === "Desktop") {
                isSelected = document.getElementById(this.id).checked;
                if (!isSelected) {
                    //UnChecking clicked Facets
                    $(this.id).removeAttr('checked');
                    var index = selectedValues.indexOf(this.id + '-');
                    if (index >= 0) {
                        selectedValues.splice(index, 1);
                        callSearchResultServiceWithParams(selectedValues.toString().replace(/,/g, '').slice(0, -1), 0, requery)
                        return null;
                    }
                }
                //These are not invoked on UnCheck of Facets
                selectedValues.push(this.id + "-");
                callSearchResultServiceWithParams(selectedValues.toString().replace(/,/g, '').slice(0, -1), 0, requery);
            }
        });
        $("#clear-filters").on("click", function () {
            $('#block-search-results-filter-custom-form input:checkbox, #modal-filters input:checkbox').removeAttr('checked');
            selectedValues = [];
            callSearchResultServiceWithParams("", 0, requery)
        });
        //Load the Search Functions
        var srchFunctions = document.createElement('script');
        srchFunctions.type = "text/javascript";
        srchFunctions.src = URLBaseResources + "/js/srch_functions.js";
        srchFunctions.id = "srch-functions";
        document.head.appendChild(srchFunctions);
        //Set Search terms
        $('#block-search-input').val(queryFromBrowser);
        $('#search-input').val(queryFromBrowser);
        calllTrendingResultsService();
        loginHandler();
        modChartsHandler();
        if (deviceResolution === "Mobile") {
            setTimeout(function () {
                $('#srch-template-tiaaorg').hide();
                $('#srch-template-plansponsors').hide();
                $('#srch-template-planconsultants').hide();
                $('#srch-template-press').hide();
                $('#srch-template-microsites').hide();
            }, 1000);
        }
    }

    function callSearchResultService() {
        if (queryFromBrowser != null) {
            queryFromBrowser = callInputValidation(queryFromBrowser);
            fetch(URLBaseSearchResults, {
                method: 'POST',
                body: JSON.stringify({
                    "ph": sessionType,
                    "tlfCookie": sessionNumber,
                    "query": queryFromBrowser,
                    "template": passedTemplateForSrchResults,
                    "scope": passedScope,
                    "collection": collectionForSrchResults,
                    "profile": profileForSrchResults,
                    "offset": offsetValues,
                    "filterQuery": ""
                }),
                crossDomain: true,
                dataType: "html",
                contentType: 'text/plain'
            })
                .then(response => response.text())
                .then(result => {
                    //Create a Container DIV to hold Results
                    var div = document.createElement("div");
                    //Set the HTML of the DIV to the Returned Results
                    div.innerHTML = result;
                    //Find the Search-Tag
                    var element = $("#srch-searchresults")[0];
                    passedTemplate = document.getElementById("srch-searchresults").getAttribute("template");
                    passedScope = document.getElementById("srch-searchresults").getAttribute("scope");
                    //Add the DIV to the Search-Tag
                    element.appendChild(div);
                    filterList = $("#search-filter-list")[0];
                    //Detect site
                    if (window.location.href.indexOf("enroll-search") > -1) {
                        isEnrollSearchPage = true;
                    }
                    isSearchPage = true;
                    filtersRendering();
                    if (!isEnrollSearchPage) {
                        generatePagination();
                        loadModData();
                    }
                    finalizeLoading();
                    checkDeviceResolution();
                    clearInputSeach();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
    function generatePagination() {
        //Get Total Returned Results
        totalResults = $("#srch-count").html();
        totalResults = totalResults.replace(' results', '');
        //If 0 you are on the 1st page of results #1
        if (offsetValues != 0) {
            curPage = parseInt(offsetValues.toString().slice(0, -1)) + 1;
        } else {
            curPage = 1;
        }
        //Create Pagination based on Returned Results
        $('#srch-pagination').pagination({
            items: totalResults,
            itemsOnPage: 10,
            displayedPages: 4,
            currentPage: curPage,
            hrefTextPrefix: "search-results.html?group.offset=",
            hrefTextSuffix: '&qryStr=' + queryFromBrowser,
        });
        $('ul#srch-pagination li:first').removeClass('pc-page').addClass('pc-prev');
        $('ul#srch-pagination li:last-child').removeClass('pc-page').addClass('pc-next');
    }
    function callQuotesService() {
        $.ajax({
            dataType: (suggestQuotesURL.indexOf('.htm') > -1) ? 'json' : 'jsonp',
            url: suggestQuotesURL + queryVal,
        })
            .done(function (data) {
                modResults = data.Results;
            })
            .fail(tiaa.web.ajax.onAjaxError).always(handler)
    }
    function callSearchResultServiceWithParams(selectedValues, offsetValues, passrequery) {
        if (queryFromBrowser != null) {
            queryFromBrowser = callInputValidation(queryFromBrowser);
            fetch(URLBaseSearchResults, {
                method: 'POST',
                body: JSON.stringify({
                    "ph": sessionType,
                    "tlfCookie": sessionNumber,
                    "query": queryFromBrowser,
                    "template": passedTemplateForSrchResults,
                    "scope": passedScope,
                    "collection": collectionForSrchResults,
                    "profile": profileForSrchResults,
                    "requery": passrequery,
                    "offset": offsetValues,
                    "filterQuery": selectedValues
                }),
                crossDomain: true,
                dataType: "html",
                contentType: 'text/plain'
            })
                .then(response => response.text())
                .then(result => {
                    //Parse & Iterate the Returned Response
                    result = $.parseHTML(result);
                    $('#search-main').html(result);
                    filterList = $("#search-filter-list")[0];
                    isSearchPage = true;
                    //Detect site
                    if (window.location.href.indexOf("enroll-search") > -1) {
                        isEnrollSearchPage = true;
                    }
                    if (!isEnrollSearchPage) {
                        generatePagination();
                        loadModData();
                    }
                    finalizeLoading();
                    checkDeviceResolution();
                    clearInputSeach();
                    if (selectedValues != "") {
                        setTimeout(function () {
                            $('#block-search-results-filter-custom-results-panel .form-component').toggle();
                            filtersRendering();
                            $('#com_markitondemand_global_search').hide();
                        }, 200);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    function calllTrendingResultsService() {
        fetch(URLBase + '/digitalsearchgateway/trending', {
            method: 'POST',
            body: JSON.stringify({
                "ph": "PUBLIC",
                "template": "TiaaOrg",
                "q": "*:*",
                "datatype": "search",
                "scope": "public",
                "collection": "Public_TiaaOrg_Coll_v1",
                "profile": "Public_TiaaOrg_QPF_QD"
            }),
            crossDomain: true,
            dataType: "json",
            contentType: 'text/plain'
        }).then((response) => response.json())
            .then((response) => {
                $("#srch-trending-1").text(response[0].name.charAt(0).toUpperCase() + response[0].name.slice(1));
                $("#srch-trending-1").attr("href", "/public/search-results?qryStr=" + response[0].name);
                $("#srch-trending-2").text(response[1].name.charAt(0).toUpperCase() + response[1].name.slice(1));
                $("#srch-trending-2").attr("href", "/public/search-results?qryStr=" + response[1].name);
                $("#srch-trending-3").text(response[2].name.charAt(0).toUpperCase() + response[2].name.slice(1));
                $("#srch-trending-3").attr("href", "/public/search-results?qryStr=" + response[2].name);
                $("#srch-trending-4").text(response[3].name.charAt(0).toUpperCase() + response[3].name.slice(1));
                $("#srch-trending-4").attr("href", "/public/search-results?qryStr=" + response[3].name);
                $("#srch-trending-5").text(response[4].name.charAt(0).toUpperCase() + response[4].name.slice(1));
                $("#srch-trending-5").attr("href", "/public/search-results?qryStr=" + response[4].name);
            })
            .catch(function (err) {
                console.log(err);
            });

    }
    /*
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ::::::::::::::::::::::::::::::::::::::: UTIL FUNCTIONS ::::::::::::::::::::::::::::::::::::::::::::
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    */
    function setCollectionAndProfile(passedTemplate, templateType) {
        switch (passedTemplate) {
            case "TiaaOrg":
                colLookup = "_Coll_v1";
                proLookup = "_QPF_v2"; //Public_TiaaOrg_QPF_TA_v2
                proTALookup = "_QPF_TA_v2"; //Public_TiaaOrg_QPF_TA_v2
                callQuotes = true;
                break;
            case "PlanSponsors":
                colLookup = "_Coll_v1";
                proLookup = "_QPF_v2";
                proTALookup = "_QPF_TA_v2";
                callQuotes = false;
                break;
            case "Advisors":
                colLookup = "_Coll_v6";
                proLookup = "_QPF";
                proTALookup = "_QPF_TA";
                callQuotes = false;
                break;
            case "PlanConsultants":
                colLookup = "_Coll_v1";
                proLookup = "_QPF";
                proTALookup = "_QPF_TA_v2";
                callQuotes = false;
                break;
            case "Press":
                colLookup = "_Coll_v1";
                proLookup = "_QPF_v2";
                proTALookup = "_QPF_TA_v2";
                callQuotes = false;
                break;
            case "Microsites":
                colLookup = "_Coll_v1";
                proLookup = "_QPF_v3";
                proTALookup = "_QPF_TA_v3";
                callQuotes = false;
                break;
            case "DocLibrary":
                colLookup = "_Coll_v1";
                proLookup = "_QPF_v2";
                proTALookup = "_QPF_TA_v2";
                callQuotes = false;
                break;
        }
        if (templateType === "typeAhead") {
            collectionForTypeAhead = passedScope + "_" + passedTemplate + colLookup;
            profileForTypeAhead = passedScope + "_" + passedTemplate + proLookup;
            profileTAForTypeAhead = passedScope + "_" + passedTemplate + proTALookup;
            templateForTypeAhead = passedTemplate;
        }
        if (templateType === "searchResults") {
            collectionForSrchResults = passedScope + "_" + passedTemplate + colLookup;
            profileForSrchResults = passedScope + "_" + passedTemplate + proLookup;
            profileTAForSrchResults = passedScope + "_" + passedTemplate + proTALookup;
            passedTemplateForSrchResults = passedTemplate;
        }
    }
    function getDataSnippets(passedTemplateLC) {
        //THIS BLOCK IS ONLY USED FOR TYPEAHEAD, so SEARCH BLOCK doesnt need to call this
        //Load the HTML Template and Content files for the selected Website
        fetch(URLBaseResources + "/html/snippet_template_" + passedTemplateLC + ".html", {
            method: 'GET',
        })
            .then(response => response.text())
            .then(result => {
                //Store the HTML Data in a DIV on page
                var dataHTMLDiv = document.createElement('div');
                dataHTMLDiv.innerHTML = result;
                dataHTMLDiv.id = "srch-template-" + passedTemplateLC;
                dataHTMLDiv.style = "display:none";
                document.body.appendChild(dataHTMLDiv);
                //Template for TypeAhead Layout
                var typeAheadTemplate = document.getElementById("srch-searchdiv-" + passedTemplateLC).innerHTML;
                if (deviceResolution === "Desktop") {
                    $("#navbar").find("#srch-typeahead").html(typeAheadTemplate);
                    var dataDiv = document.createElement('div');
                    innerHTML = document.getElementById("results-quotes").innerHTML;
                    dataDiv.id = "srch-container-template";
                    dataDiv.style = "display:none";
                    document.body.appendChild(dataDiv);
                } else {
                    $('#mobile-menu-main').prepend($(dataHTMLDiv));
                    $('#' + dataHTMLDiv.id + '').show();
                }
                fetch(URLBaseResources + "/js/snippet_content_" + passedTemplateLC + ".json", {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then(data => {
                        //Load the Content Snippet file for the selected Website & Read Fusion Properties
                        //var data = JSON.parse(response);
                        if (deviceResolution === "Desktop") {
                            document.getElementById("hinText").innerHTML = data.hint;
                            document.getElementById("srchMenu").innerHTML = data.textMenu;
                            $("#search-input").attr("placeholder", data.placeHolder);
                            //Removes the text overlaping Suggestions and Trending Titles
                            $("#hinText").remove();
                        } else {
                            $("#mobile-search-input").attr("placeholder", data.placeHolder);
                        }
                        //document.getElementById("search-input").addEventListener("click", function (event) {
                        $("#search-input").on("click", function (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    var timeOutID;
    $(window).resize(function () {
        clearTimeout(timeOutID);
        timeOutID = setTimeout(doneResizing, 500);
    });
    function doneResizing() {
        checkDeviceResolution();
        if (deviceResolution === "Mobile") {
            if (loadedMobile === "false") {
                deviceType = readTemplate + "-mobile";
                passedTemplateLC = deviceType.toLowerCase();
                loadDependencies(deviceType);
                getDataSnippets(passedTemplateLC);
                if (isSearchPage) {
                    loadModData();
                }
            }
        } else {
            if (loadedDesktop === "false") {
                deviceType = readTemplate;
                passedTemplateLC = deviceType;
                loadDependencies(deviceType);
                if (isSearchPage) {
                    loadModData();
                }
            }
        }
    }
    function checkDeviceResolution() {
        screen_width = document.documentElement.clientWidth;
        screen_heght = document.documentElement.clientHeight;
        if (screen_width <= 975) {
            deviceResolution = "Mobile";
            // Load for search only
            if (isSearchPage) {
                renderMobileFilters();
            }
        } else {
            deviceResolution = "Desktop";
            filtersRendering();
            //Remove mobile modal if switching to desktop
            if ($('#filters-modal').length) {
                $("#filters-modal").remove();
            }
        }
    }
    function dropDownControlFunction() {
        var dropDownToggle = document.getElementById('dropDownToggle');
        if (dropDownToggle != null) {
            dropDownToggle.classList.add("open");
            var loginReturningUser = document.getElementById('loginReturningUser');
            if (loginReturningUser != null) {
                loginReturningUser.classList.remove("open")
            }
        }
        setTimeout(function () {
            document.getElementById("search-input").focus();
        }, 1000);
    }
    function renderMobileFilters() {
        fetch(URLBaseResources + "/html/snippet_template_filters_mobile.html", {
            method: 'GET',
        })
            .then(response => response.text())
            .then(result => {
                var mobileFilters = document.createElement('div');
                mobileFilters.innerHTML = result;
                document.body.appendChild(mobileFilters);
                $('#search-main').prepend($(mobileFilters));
                $(filterList).clone().appendTo('#modal-filters-container')
                $("#filter-list-template").remove();
                $("#clear-filters").remove();
                // Temporary fix for NO RESULTS affecting mobile filters
                if ($('#modal-filters-container div ul li').length == 0) {
                    $("#filters-modal").remove();
                }
                $('#modal-filters-container div ul li div input:checkbox').change(function () {
                    isSelected = document.getElementById(this.id).checked;
                    if (!isSelected) {
                        //UnChecking clicked Facets
                        $(this.id).removeAttr('checked');
                        var index = selectedValues.indexOf(this.id + '-');
                        if (index >= 0) {
                            selectedValues.splice(index, 1);
                            callSearchResultServiceWithParams(selectedValues.toString().replace(/,/g, '').slice(0, -1), 0, requery)
                            return null;
                        }
                    }
                    //These are not invoked on UnCheck of Facets
                    selectedValues.push(this.id + "-");
                    callSearchResultServiceWithParams(selectedValues.toString().replace(/,/g, '').slice(0, -1), 0, requery)
                    $('#filters-modal').trigger("click");
                    setTimeout(() => {
                        $("#filters-modal").css("display", "block");
                    }, 800);
                });
                //Modal Flag CSS for mobile
                $("#filters-modal").addClass("in");
                $("#clear-filters-mobile").click(function () {
                    selectedValues = [];
                    callSearchResultServiceWithParams("", 0, requery)
                    $('#filters-modal').trigger("click");
                    setTimeout(() => {
                        $("#filters-modal").css("display", "block");
                    }, 1000);
                });
                $("#apply-filters-mobile").click(function () {
                    $("#filters-modal").css("display", "none");
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    function filtersRendering() {
        if ($(window).width() >= 768) {
            $('#filters-modal').modal('hide');
        }
        if ($('#block-search-results-filter-custom-results-panel .form-component').is(':visible')) {
            var w = $(window).width();
            if (w < 768) {
                w = 386;
            } else if (w >= 768 && w < 992) {
                w = 380;
            } else if (w >= 992) {
                w = 600;
            }
            $('.all-results,#faqs-panel > div,#advisors-panel  > div,#marketing-banner > div').css({
                'width': w + 'px',
                'float': 'right'
            });
            $('#toggle-search-filters').attr('aria-pressed', true);
            $('#toggle-search-filters .cta-text').html('Hide filters');
            $('#toggle-search-filters .icon').removeClass('icon-caret-down').addClass('icon-caret-up');
            $('#com_markitondemand_global_search').show();
        } else {
            $('.all-results,#faqs-panel > div,#advisors-panel  > div,#marketing-banner > div').css('width', '100%');
            $('.pagination').css({
                'margin-left': '0'
            });
            $('#toggle-search-filters').attr('aria-pressed', false);
            $('#toggle-search-filters .cta-text').html('Show filters');
            $('#toggle-search-filters .icon').removeClass('icon-caret-up').addClass('icon-caret-down');
            $('#com_markitondemand_global_search').hide();
        }
        if ($('#main .search-form-component').eq(0).width() >= 768) {
            $('#toggle-search-filters-mobile').hide();
            $('#toggle-search-filters').show();
        } else {
            $('#toggle-search-filters-mobile').show();
            $('#toggle-search-filters').hide();
        }
    }
    return {
        callTypeAheadService: callTypeAheadService,
        callQuotesService: callQuotesService,
        dropDownControlFunction: dropDownControlFunction,
        clickPagination: clickPagination,
        setCollectionAndProfile: setCollectionAndProfile,
        get isDualSearch() {
            return isDualSearch;
        },
        get theQuotes() {
            return callQuotes;
        },
        /*set value(v) {
            privatething = v;
        }*/
    };
})();

/*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
CLEARS INPUT SEARCH FROM BODY SEARCH PAGE
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
function clearInputSeach() {
    var searchInputBox = document.getElementById('icon-close');
    if (searchInputBox != null) {
        $('#icon-close').click(function (event) {
            document.getElementById('block-search-input').value = "";
            document.getElementById('block-search-input').focus();
        });
    }
}

/*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
OPENS LOGIN MENU
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
function loginHandler() {
    $('#loginReturningUser').click(function (event) {
        var loginReturningUser = document.getElementById('loginReturningUser');
        if (loginReturningUser != null) {
            loginReturningUser.classList.add("open");
            var dropDownToggle = document.getElementById('dropDownToggle');
            dropDownToggle.classList.remove("open")
        }
    });
}

function getPublicCookie() {
    var pubCookie = getCookie("TLFCookie", "/");
    return pubCookie;
}

function getCookie(name, path, isExactMatch) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(name + '=');
        if (isExactMatch) {
            var match = new RegExp('\\s' + name + '=').exec(document.cookie);
            if (match && match.index !== -1) {
                c_start = match.index + 1;
            }
        }
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}

/*Function to get Cookie Value for User Session*/
function getUserSessionCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

window.addEventListener('click', function (e) {
    var navbar = document.getElementById('navbar');
    if (navbar != null) {
        var loginReturningUser = document.getElementById('loginReturningUser');
        if (loginReturningUser != null) {
            loginReturningUser.classList.add("open");
            var dropDownToggle = document.getElementById('dropDownToggle');
            if (dropDownToggle != null) {
                dropDownToggle.classList.remove("open")
            }
        }
    }
});



