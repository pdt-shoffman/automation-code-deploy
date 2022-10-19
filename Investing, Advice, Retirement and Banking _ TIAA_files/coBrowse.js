var cobrowse = {cobrowseApi:null,
				cobrowseIframe:null,
				cobrowseServer:"https://api.genesyscloud.com/gcb",
				cobrowseState: {
						initialized: false,
						ui:false,
						triggerSet:false,
						session: false,
						agentJoined: false,
						sessionToken: null,
						userTerminated: false
					}
				};

if(!window._genesys)window._genesys = {};
_genesys.buttons= {
    cobrowse: false
};
//_genesys.debug=true;
_genesys.cobrowse= {	
	apikey: 'GdZ6txyQixOSYJcsjRJBii9yaEHOAFqV',		
	setDocumentDomain: false,
	disableBuiltInUI: true,
    css: {browser: true},	
    primaryMedia: {
	    initializeAsync: function(done) {done();},
	    isAgentConnected: function() { return true; },
	    sendCbSessionToken: function(token) {}
	},
	onReady: function(api) {
		cobrowse.cobrowseApi = api;
		api.onInitialized.add(cobrowse.onInitialized);
		api.onSessionStarted.add(cobrowse.createSessionInformation);
		api.onSessionEnded.add(cobrowse.disableSession);			
		api.onAgentJoined.add(cobrowse.agentJoined);
	}
};

	
cobrowse.enableCobrowse = function(s, id, o) {
  var fs = document.getElementsByTagName(s)[0], e;
  if (document.getElementById(id)) return;
  e = document.createElement(s); e.id = id; e.src = o.src;
  e.setAttribute('data-gcb-url', o.cbUrl);
  fs.parentNode.insertBefore(e, fs);
}
	
cobrowse.enableCobrowse('script', 'genesys-js', {
	src: cobrowse.cobrowseServer+"/cobrowse/js/gcb.min.js?apikey="+_genesys.cobrowse.apikey,
	cbUrl: cobrowse.cobrowseServer+"/cobrowse"
});

cobrowse.coBrowseUISetUp = function(callbackFunction){	
	var iframeHtml = $('<iframe id="coBrowseUIFrame" data-gcb-service-node="true" style="box-sizing:border-box; width:0;height:0;position:fixed;top:0;left:0;z-index:100000;pointer-events:none"></iframe>');
	$("body").prepend(iframeHtml);
	cobrowse.cobrowseIframe = iframeHtml;
	
	var string = '<!DOCTYPE html><html style="pointer-events:none" lang="en"><head>'+
				'<meta charset="utf-8">'+
				'<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
				'<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" id="viewport">'+
				'<meta http-equiv="imagetoolbar" content="false"><meta name="author" content="TIAA">'+
				'<link href="https://auth.tiaa.org/public/ui/assets/images/tiaa04016404.ico" rel="shortcut icon">'+
				'<link href="https://auth.tiaa.org/public/ui/assets/images/tiaa01020070.png" id="apple_icon" rel="apple-touch-icon">'+
				'<link href="https://auth.tiaa.org/public/ui/assets/images/tiaa01022654.png" sizes="72x72" rel="apple-touch-icon">'+
				'<link href="https://auth.tiaa.org/public/ui/assets/images/tiaa01022655.png" sizes="114x114" rel="apple-touch-icon">'+
				'<link rel="stylesheet" href="https://www.tiaa.org/public/ui/scv2/tiaa-cobrowse-default.min.css"/>'+
				'<link rel="stylesheet" href="https://www.tiaa.org/public/ui/scv2/tiaa-charts-addon-default.min.css"/>'+
				'<script src="https://www.tiaa.org/public/ui/scv2/js/tiaa-header.min.js"></script>'+				
				'<style type="text/css">body {background-color: rgba(255,255,255,0);display: none;}.fixed-msg {display: inline-block;position: fixed;background-color: orange;font-size: 14px;border-radius: 20px;right: 30px;top: 60px;padding: 8px;}.fixed-msg > .mobile-hidden > div,.fixed-msg > .desktop-hidden > div {display: inline-block;}.fixed-msg.draggable {cursor: move;}.fixed-msg .cb-close {display: inline-block;background-color: #000000;color: #FFFFFF;border-radius: 10px;width: 15px;height: 15px;line-height: 15px;text-align: center;font-size: 15px;transform: rotate(45deg);margin-left: 10px;}.fixed-msg .cb-close > a {color: #FFFFFF;}.fixed-msg .cb-close > a:focus, .fixed-msg .cb-close > a:hover {color: #00C3FF;text-decoration: none;}.noselect {-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.mobile-hidden {display: none;}.desktop-hidden {display: block;}@media (min-width: 768px) {.mobile-hidden {display: block;}.desktop-hidden {display: none;}}</style>'+
				'<script>digitalData={applicationName:"",application:{name:"",type:"spa"},pageInstanceID:"",session:{sessionId:""},view:[],event:[],page:{pageInfo:{channel:window.parent.digitalData.page.pageInfo.channel||undefined,siteSubSection:window.parent.digitalData.page.pageInfo.siteSubSection||undefined},category:{},attributes:{startTime:new Date().getTime(),paths:{rootUrl:window.location.pathname,sharedComponentsUrl:"https://www.tiaa-cref.org/public/ui/assets"}}},user:[],component:[]};</script>'+
				'<script type="text/javascript" src="//nexus.ensighten.com/tiaa-cref/V2Prod-Cobrowse/Bootstrap.js"></script>'+
				'</head><body>'+
				'<script src="https://www.tiaa.org/public/ui/scv2/js/tiaa-init.js"></script>'+
				'<link rel="import" href="https://www.tiaa.org/public/ui/scv2/tiaa-cobrowse.min.html">'+
				'<div class="fixed-msg monitor datestamp draggable" style="display: none;"><div class="mobile-hidden"><div class="noselect">You are now co-browsing with a TIAA representative.</div><div class="cb-close"><a href="#" refersTo="cobrowse-thank-you-ended" data-analytics-section="notrack">+</a></div></div><div class="desktop-hidden"><div class="eyebrow noselect"><a class="mobile-touch-toggle" href="#"><img class="toggle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsSAAALEgHS3X78AAACr0lEQVRIx92WT08TQRjGfwNct9R48UCys7QcZr3UE72Y4idQv0Eh0ehFaqLhINKq8V65mGiEcjGaUCQhgQMe8BvURNvLml1jm3gs5SoZLzOwpZS2Fw8+yaY7O+87z77/nq3QWgOQlp4EJMOhFkRhmxEgtNakpVcCiiP4HQKZIAqjYR0mzG8RQCmFk0hc6NCo1zk6OpoE8kBpVCIAdvZ2Bzqslsusll8xKsb4R/jPiTqdzkCHYWwuau82MNnPSClFo9E4+/ghEAEFs46AUr+Wt0RzQAVwh3zBDeA3sNR1mBAdrbV73jCPAQRReBBEoQyiUARRKIBLwA1zf00IcZIvY5MXQtwHcByHB4VFALTWiX6z1TVHaeklgW0gBzDjTXeARa11TgjxxRxkM5AAeP/xA8r3af5qslWtAmSG6bqKJXEcx77hOpDUWueM9BBE4YF1WH+3RnVz05LYWvUnMtHctMXf2dtFKWW380EU1oC5M3Viq1pl6dHj+JnlQREl7c3rt2+YmppC+b59JE0ktZh9AYhr0U/g9hmb7q6zmPGmD7XWCaUUyvfj6XgWRGEpFr00onoe2kDlbOd1EaWllzc1OcH4xPi34z/H161jWnqZeGP0wdcgCjN9iWIdVTCprJkhbMf2t20t8wvzJGKflfr3Op/39+1yPojCSk97p6V3KzblFhlg2yhHyeQ/CfBk5SnzCws9ody7c9eSyZ45MiSfLtQqIW6kpXeiHP5po3TBv+rHo+qRoAMgp5RiubjSZVCv13n5/IVd/gAuA0nlKxynt0ytVpNWs2W7MDL/LwpdyrBcXGE2m+1ynM1maTWbVNbWAVKnn/TGID1049o5MYyCxgq+YdTjihHVfojvt4cmiiGKy89I0FqTcmUm5cqy1przrpQrkylXVlKuTPazGXT9BZvSUp9zwjO9AAAAAElFTkSuQmCC" alt="Cobrowsing"><span class="toggle" style="display: none;">Co-browsing</span></a><div style="display: none;" class="cb-close"><a href="#" refersTo="cobrowse-thank-you-ended" data-analytics-section="notrack">+</a></div></div></div></div>'+
				'<tiaa-modal id="cobrowse-begin" data-analytics-id="Cobrowse" variant="large-lightbox" class="monitor"><h1 class="h3">Co-browse with a representative</h1><p>Co-browsing is a collaboration tool that only works if you\'re already speaking to a representative who has requested a session.</p><button role="link" data-dismiss="modal" is="tiaa-cta-button" data-analytics-componenttype="Button" for="cobrowse-terms">Continue</button></tiaa-modal>'+
				'<tiaa-modal id="cobrowse-terms" data-analytics-id="CobrowseTerms" variant="large-lightbox" class="monitor"><h1 class="h3">Please agree to the terms first</h1><p>By clicking "agree", you (i) will grant the TIAA representative "view only" access to this browser window and the TIAA.org screen that you are currently on, until you see a message that the co-browsing session has ended; (ii) understand  that this service is offered to persons residing in the United States only;  and (iii) acknowledge that you are calling us within the United States. <br/> <br/> TIAA will install cookies to enable the co-browse functionality only and will not collect information through them. TIAA\'s collection and use of your information remains subject to our <a target="_blank" href="https://www.tiaa.org/public/support/privacy-policy">privacy notice</a>.</p><button id="cobrowse-start-session" role="link" data-dismiss="modal" data-analytics-componenttype="Button" is="tiaa-cta-button">Agree</button></tiaa-modal>'+
				'<tiaa-modal id="cobrowse-session" data-analytics-id="CobrowseSession" variant="large-lightbox" class="monitor"><h1 class="h3">Your session ID is <span class="cb-session-id">######</span></h1><p>Please share this number with your TIAA representative to start co-browsing. This window will close when the session begins.</p></tiaa-modal>'+
				'<tiaa-modal id="cobrowse-thank-you-ended" data-analytics-id="CobrowseThankYouEnded" variant="large-lightbox" class="monitor"><h1 class="h3">Thank you for co-browsing</h1><p>Your session with a TIAA representative has ended.</p><button id="cobrowse-ended" role="link" data-dismiss="modal" is="tiaa-cta-button" data-analytics-componenttype="Button">OK</button></tiaa-modal>'+

				'<script>'+
					'var counter = 0;'+
					'function parentMessage(evt) {'+
						'if(evt.data.selector){'+
							'var obj = evt.data.selector;'+
							'if(typeof  $(obj).modal === "function" && counter < 6){'+
								'$(evt.data.selector).modal(evt.data.mode);'+
							'}else{'+
								'counter++;'+
								'setTimeout(function(){ parentMessage(evt);}, 200);'+
							'}'+
						'}'+
					'}'+
					'if (window.addEventListener) {'+
						'window.addEventListener("message", parentMessage, false);'+
					'}else{'+
						'window.attachEvent("onmessage", parentMessage);'+
					'}'+									
				'</script>'+ 
				'</body></html>';
	
	var iFrame = document.getElementById("coBrowseUIFrame");
	var iFrameDocument = (iFrame.contentWindow || iFrame.contentDocument);
	if (iFrameDocument.document) iFrameDocument = iFrameDocument.document;
	iFrameDocument.open();
	iFrameDocument.write(string);
	iFrameDocument.close();
	
	iframeHtml.on('load', function () {
		cobrowse.setUIEvents();
		cobrowse.cobrowseState.ui = true;
		callbackFunction();
	})	
}

cobrowse.setUIEvents = function(){
	var iFrame = cobrowse.cobrowseIframe,
        iFrameContents = iFrame.contents(),
        monitoredElements  = iFrameContents.find(".monitor"),
        borders   = {
            horizontal: parseInt(iFrame.css('borderLeftWidth')),
            vertical: parseInt(iFrame.css('borderTopWidth'))
        };
        
    var boundingThresholds = {
		top: 10,
		left: 10,
		right: 75,
		bottom: 50
	};
        
    function dragElement($elem) {
		var pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0,
			x = 0,
			y = 0;
		var container = iFrameContents.find(".fixed-msg");
		var elmnt = $elem;			
		elmnt.on('mousedown touchstart', function(e) {
			e = e || window.event;
			// get the mouse cursor position at startup:
			x = (e.clientX || e.originalEvent.touches[0].pageX);
			y = (e.clientY || e.originalEvent.touches[0].pageY);
			pos3 = x;
			pos4 = y;
			var mouseupCB = function(e) {
				/* stop moving when mouse button is released:*/
				iFrameContents.off('mouseup touchend', mouseupCB);
				iFrameContents.off('mousemove touchmove', mousemoveCB);
			},
			mousemoveCB = function(e) {
				e = e || window.event;
				x = (e.clientX || e.originalEvent.touches[0].pageX);
				y = (e.clientY || e.originalEvent.touches[0].pageY);
				// calculate the new cursor position:
				pos1 = pos3 - x;
				pos2 = pos4 - y;
				pos3 = x;
				pos4 = y;
				var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
					windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
					top = (container.offset().top - pos2),
					left = (container.offset().left - pos1),
					cWidth = container.width();
				// set the element's new position:
				// TOP
				if (top <= boundingThresholds.top) {
					top = boundingThresholds.top;
				}
				// BOTTOM
				if (top + boundingThresholds.bottom >= windowHeight) {
					top = windowHeight - boundingThresholds.bottom;
				}
				// LEFT
				if (left <= boundingThresholds.left) {
					left = boundingThresholds.left;
				}
				// RIGHT
				if (left + cWidth + boundingThresholds.right >= windowWidth) {
					left = windowWidth - cWidth - boundingThresholds.right;
				}
				container.css({
					'top': top + "px",
					'left': left + "px",
					'right': 'auto'
				});
			};
			iFrameContents.on('mouseup touchend', mouseupCB);
			iFrameContents.on('mousemove touchmove', mousemoveCB);
		});
	}
	
	dragElement(iFrameContents.find(".draggable"));
	
	
	window.addEventListener('resize', function(){
		var container = iFrameContents.find(".fixed-msg");
		var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
			windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			top = (container.offset().top),
			left = (container.offset().left),
			cWidth = container.width();
		// set the element's new position:
		// TOP
		if (top <= boundingThresholds.top) {
			top = boundingThresholds.top;
		}
		// BOTTOM
		if (top + boundingThresholds.bottom >= windowHeight) {
			top = windowHeight - boundingThresholds.bottom;
		}
		// LEFT
		if (left <= boundingThresholds.left) {
			left = boundingThresholds.left;
		}
		// RIGHT
		if (left + cWidth + boundingThresholds.right >= windowWidth) {
			left = windowWidth - cWidth - boundingThresholds.right;
		}
		container.css({
			'top': top + "px",
			'left': left + "px",
			'right': 'auto'
		});	
	});
	
	iFrameContents.find("#cobrowse-ended").on("click", function(e) {
		cobrowse.hideUI();
	});
	iFrameContents.find("[refersTo=\"cobrowse-thank-you-ended\"]").on("click", function(e) {
		cobrowse.cobrowseState.userTerminated = true;
		storeLastPage();
		cobrowse.cobrowseApi.exitSession()
	});
		
	iFrameContents.find(".fixed-msg .mobile-touch-toggle").on("click", function(e) {
		var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (windowWidth < 768 && iFrameContents.find(".draggable").offset().left + 110 + boundingThresholds.right >= windowWidth - boundingThresholds.right) {
			iFrameContents.find(".draggable").css({
				left: windowWidth - boundingThresholds.right - 110
			});
		}
		iFrameContents.find(".toggle, .cb-close").toggle();
	});	
   
    /**
     * Monitor site -- look for mouseovers on
     * objects/areas we care about
     */
    $(document).on('mousemove', function(e){
        var giveFocus = false,
            mouseCoords = {
                x: parseInt(e.clientX),
                y: parseInt(e.clientY)
            };
        monitoredElements.each(function(){
            var monitoredElement = $(this);
            if (monitoredElement.is(':hidden')) return;
            // Collision detection
            var offset = monitoredElement.offset(),
                coords = {
                    top:    borders.vertical   +    offset.top,
                    right:  borders.horizontal +    offset.left  +   monitoredElement.outerWidth(),
                    bottom: borders.vertical   +    offset.top   +   monitoredElement.outerHeight(),
                    left:   borders.horizontal +    offset.left
                };
            if (mouseCoords.x>=coords.left && mouseCoords.x<=coords.right
                && mouseCoords.y>=coords.top && mouseCoords.y<=coords.bottom) {
                giveFocus = true;
                return false;
            }
        });
        iFrame.css("pointer-events", giveFocus ? 'auto' : 'none');
        cobrowse.cobrowseIframe.contents().find('html').css("pointer-events", giveFocus ? 'auto' : 'none');
    });
    monitoredElements.on('mouseleave', function(){
    	iFrame.css("pointer-events", 'none');
    	cobrowse.cobrowseIframe.contents().find('html').css("pointer-events", 'none');
    });
    if (!iFrameContents.find('.fixed-msg').is('visible')) {
    	iFrame.css('border', 'none');
    }
    iFrameContents.find("#cobrowse-start-session").click(function(){
    	cobrowse.cobrowseApi.startSession();
    });
};

cobrowse.showUI = function(){
	cobrowse.cobrowseIframe.contents().find('body').css('display', 'block');
	cobrowse.cobrowseIframe.css("width","100%");
	cobrowse.cobrowseIframe.css("height","100%");
}

cobrowse.hideUI = function(){
	cobrowse.cobrowseIframe.contents().find('body').css('display', 'none');
	cobrowse.cobrowseIframe.css("width","0");
	cobrowse.cobrowseIframe.css("height","0");
}

cobrowse.onInitialized = function(session) {
	cobrowse.cobrowseState.initialized = true;
	if (session){
		cobrowse.coBrowseUISetUp(function(){
			cobrowse.cobrowseState.session = true;
			cobrowse.cobrowseState.sessionToken = session.token;
			cobrowse.cobrowseIframe.contents().find('.cb-session-id').html(session.token); 
			if(session.agents.length>0){
				cobrowse.cobrowseState.agentJoined = true;
				cobrowse.agentJoined(null,null);
				cobrowse.showUI();
			}
		});		
    }
    $(document).trigger("CobrowseInitilized");
}

cobrowse.createSessionInformation = function(session) {
	cobrowse.cobrowseState.session = true;
	cobrowse.cobrowseState.sessionToken = session.token;
	cobrowse.analyticsEvent('Start', cobrowse.cobrowseState.sessionToken);	
	
	cobrowse.cobrowseIframe.contents().find('.cb-session-id').html(session.token); 
	cobrowse.postToIframe("#cobrowse-session","show");
}

cobrowse.agentJoined = function(agent, session) {
	cobrowse.cobrowseState.agentJoined = true;
	
	cobrowse.showUI();
	cobrowse.cobrowseIframe.contents().find('.fixed-msg').show();
	cobrowse.cobrowseIframe.css('border', '8px solid orange');
	cobrowse.postToIframe("#cobrowse-session","hide");
	
	getSessionUrl();
}

cobrowse.disableSession = function(session) {
	cobrowse.analyticsEvent('End', cobrowse.cobrowseState.sessionToken );
	cobrowse.cobrowseState.userTerminated = false;
	if(cobrowse.cobrowseState.agentJoined){
		cobrowse.postToIframe("#cobrowse-thank-you-ended","show");
	}else{
		cobrowse.hideUI();
	}
	cobrowse.cobrowseIframe.contents().find('.fixed-msg').hide();
	$("#coBrowseUIFrame").css('border', 'none');
	
	cobrowse.cobrowseState.session = false;
	cobrowse.cobrowseState.agentJoined = false;
	
	_func();
}

cobrowse.postToIframe = function(selector, mode){
	document.getElementById("coBrowseUIFrame").contentWindow.postMessage({selector:selector,mode:mode}, "*");
}

cobrowse.analyticsEvent = function (et, session) {
    var ev = document.createEvent('Event');
    var endedByVal = "";
    if(et==="End"){
    	if(cobrowse.cobrowseState.userTerminated){
    		endedByVal = "user";
    	}else{
    		endedByVal = "agent"; 
    	}
    }
    ev.data = {
        eventType: et,
        id: session,
        endedBy: endedByVal
    };
    ev.initEvent('analytics.cobrowse', true, true);
    var iFrame = document.getElementById("coBrowseUIFrame");
	var iFrameDocument = (iFrame.contentWindow || iFrame.contentDocument);
	if (iFrameDocument.document) iFrameDocument = iFrameDocument.document;
    iFrameDocument.dispatchEvent(ev);
}

cobrowse.triggerCoBrowse = function() {
	if(!cobrowse.cobrowseState.session){
		// use browser storage to store url
		storeUrlInBrowserStorage();
		cobrowse.showUI();
		cobrowse.postToIframe("#cobrowse-begin","show");
	}else if(cobrowse.cobrowseState.session && !cobrowse.cobrowseState.agentJoined){
		cobrowse.showUI();
		cobrowse.postToIframe("#cobrowse-session","show");
	}      
}

cobrowse.maxAttempts = 5;
cobrowse.attempts = 0;

cobrowse.setCobrowseTriggerClickEvent = function(){
	var impersonatingUser = 'false';
	if(null != impersonatingUser && impersonatingUser == "true"){
		$('#cobrowse-trigger').unbind('click');	
		return;
	}
	
	if(!cobrowse.cobrowseState.triggerSet){
		if($('#cobrowse-trigger').length>0){
			$('#cobrowse-trigger').on('click', function(e) {	
				e.preventDefault();	
				if(cobrowse.cobrowseState.initialized){
					if(cobrowse.cobrowseState.ui){
						cobrowse.triggerCoBrowse();
					}else{
						cobrowse.coBrowseUISetUp(cobrowse.triggerCoBrowse);
					}		
				}
			});
			cobrowse.cobrowseState.triggerSet = true;
		}else if(cobrowse.attempts<cobrowse.maxAttempts){
			cobrowse.attempts++;
			window.setTimeout(cobrowse.setCobrowseTriggerClickEvent, 500);
		}		
	}	
}
cobrowse.setCobrowseTriggerClickEvent();

function storeUrlInBrowserStorage(){
	if (typeof(Storage) !== "undefined") {
	  // Store
	  localStorage.setItem("oldUrl", "");
	} else {
	  // browser does not support Web Storage
	}
}

var currentSession;
var lastPageSession;
function getSessionUrl(){
	if(cobrowse.cobrowseState.session && cobrowse.cobrowseState.agentJoined){
		var sessionUrl = window.location.href;
		var sessionToken = cobrowse.cobrowseState.sessionToken;
		var currentTime = new Date();
		currentSession = {"sessionToken":sessionToken,"url": sessionUrl, "startTime": currentTime.getTime(), "endTime": "", "duration":0};
		
		var oldUrl = localStorage.getItem("oldUrl");
		if (oldUrl == '' || oldUrl == sessionUrl){
			localStorage.setItem("oldUrl", sessionUrl);
			// save currentSession in browser
			localStorage.setItem("currentSession", JSON.stringify(currentSession));
		} else {
			_func();
		}
		
	}
}

function storeLastPage(){
	//set old url to empty
	localStorage.setItem("oldUrl", '');
	_func();
}

var _func= function(event){
	var oldUrl = localStorage.getItem("oldUrl");
	var currentUrl = window.location.href;
	
	// compare old and new url, if different then trigger store
	if (oldUrl != '' && oldUrl == currentUrl){
		// still on same page, do nothing
	} else {
		lastPageSession = JSON.parse(localStorage.getItem("currentSession"));
		
		// save current page session and current url
		localStorage.setItem("currentSession", JSON.stringify(currentSession));
		localStorage.setItem("oldUrl", currentUrl);
		
		// fire storage call
		storeHistory(lastPageSession);
	}
}

function storeHistory(lastPageSession){
		
		var endTime= new Date();
     	var startTime=lastPageSession.startTime;
     	lastPageSession.endTime=endTime;
     	lastPageSession.duration=(endTime.getTime() - startTime) / 1000; // in seconds 
     	
     	var url ="https://shared.tiaa.org/public/publictools/cobrowse/storehistory";
     	$.ajax({
			type:'POST',
			contentType:'application/json',
			data: JSON.stringify(lastPageSession),
			url:url,
			crossDomain: true,
			success: function(textStatus){},
			error: function(errorThrown){
				console.log('request failed');
			}
		});
}

