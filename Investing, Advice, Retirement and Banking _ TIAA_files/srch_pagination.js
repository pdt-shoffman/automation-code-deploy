!function(p){var g={init:function(e){var a=p.extend({items:1,itemsOnPage:1,pages:0,displayedPages:1,edges:1,currentPage:0,useAnchors:!0,hrefTextPrefix:"#page-",hrefTextSuffix:"",prevText:" ",nextText:"  ",ellipseText:"&hellip;",ellipsePageSet:!1,cssStyle:"pagination",listStyle:"brettwashere",labelMap:[],selectOnClick:!0,nextAtFront:!1,invertPageOrder:!1,useStartEdge:!0,useEndEdge:!0,onPageClick:function(e,a){alert("do something")},onInit:function(){}},e||{}),t=this;return a.pages=a.pages||(Math.ceil(a.items/a.itemsOnPage)?Math.ceil(a.items/a.itemsOnPage):1),a.currentPage?a.currentPage=a.currentPage-1:a.currentPage=a.invertPageOrder?a.pages-1:0,a.halfDisplayed=a.displayedPages/2,this.each(function(){t.addClass(a.cssStyle+" simple-pagination").data("pagination",a),g._draw.call(t)}),a.onInit(),this},selectPage:function(e){return alert("FFFF"),g._selectPage.call(this,e-1),this},prevPage:function(){var e=this.data("pagination");return e.invertPageOrder?e.currentPage<e.pages-1&&g._selectPage.call(this,e.currentPage+1):0<e.currentPage&&g._selectPage.call(this,e.currentPage-1),this},nextPage:function(){var e=this.data("pagination");return e.invertPageOrder?0<e.currentPage&&g._selectPage.call(this,e.currentPage-1):e.currentPage<e.pages-1&&g._selectPage.call(this,e.currentPage+1),this},getPagesCount:function(){return this.data("pagination").pages},setPagesCount:function(e){this.data("pagination").pages=e},getCurrentPage:function(){return this.data("pagination").currentPage+1},destroy:function(){return this.empty(),this},drawPage:function(e){var a=this.data("pagination");return a.currentPage=e-1,this.data("pagination",a),g._draw.call(this),this},redraw:function(){return g._draw.call(this),this},disable:function(){var e=this.data("pagination");return e.disabled=!0,this.data("pagination",e),g._draw.call(this),this},enable:function(){var e=this.data("pagination");return e.disabled=!1,this.data("pagination",e),g._draw.call(this),this},updateItems:function(e){var a=this.data("pagination");a.items=e,a.pages=g._getPages(a),this.data("pagination",a),g._draw.call(this)},updateItemsOnPage:function(e){var a=this.data("pagination");return a.itemsOnPage=e,a.pages=g._getPages(a),this.data("pagination",a),g._selectPage.call(this,0),this},getItemsOnPage:function(){return this.data("pagination").itemsOnPage},_draw:function(){var e=this.data("pagination"),a=g._getInterval(e);g.destroy.call(this);var t="UL"===("function"==typeof this.prop?this.prop("tagName"):this.attr("tagName"))?this:p("<ul"+(e.listStyle?' class="'+e.listStyle+'"':"")+"></ul>").appendTo(this);if(e.prevText&&g._appendItem.call(this,e.invertPageOrder?e.currentPage+1:e.currentPage-1,{text:e.prevText,classes:"prev"}),e.nextText&&e.nextAtFront&&g._appendItem.call(this,e.invertPageOrder?e.currentPage-1:e.currentPage+1,{text:e.nextText,classes:"next"}),e.invertPageOrder){if(a.end<e.pages&&0<e.edges){if(e.useStartEdge){var s=Math.max(e.pages-e.edges,a.end);for(i=e.pages-1;s<=i;i--)g._appendItem.call(this,i)}e.pages-e.edges>a.end&&e.pages-e.edges-a.end!=1?t.append('<li class="disabled pc-page"><span class="ellipse pc-sep">'+e.ellipseText+"</span></li>"):e.pages-e.edges-a.end==1&&g._appendItem.call(this,a.end)}}else if(0<a.start&&0<e.edges){if(e.useStartEdge)for(var n=Math.min(e.edges,a.start),i=0;i<n;i++)g._appendItem.call(this,i);e.edges<a.start&&a.start-e.edges!=1?t.append('<li class="disabled pc-page"><span class="ellipse pc-sep">'+e.ellipseText+"</span></li>"):a.start-e.edges==1&&g._appendItem.call(this,e.edges)}if(e.invertPageOrder)for(i=a.end-1;i>=a.start;i--)g._appendItem.call(this,i);else for(i=a.start;i<a.end;i++)g._appendItem.call(this,i);if(e.invertPageOrder){if(0<a.start&&0<e.edges&&(e.edges<a.start&&a.start-e.edges!=1?t.append('<li class="disabled pc-page"><span class="ellipse pc-sep">'+e.ellipseText+"</span></li>"):a.start-e.edges==1&&g._appendItem.call(this,e.edges),e.useEndEdge))for(i=(n=Math.min(e.edges,a.start))-1;0<=i;i--)g._appendItem.call(this,i)}else if(a.end<e.pages&&0<e.edges&&(e.pages-e.edges>a.end&&e.pages-e.edges-a.end!=1?t.append('<li class="disabled pc-page"><span class="ellipse pc-sep">'+e.ellipseText+"</span></li>"):e.pages-e.edges-a.end==1&&g._appendItem.call(this,a.end),e.useEndEdge))for(i=s=Math.max(e.pages-e.edges,a.end);i<e.pages;i++)g._appendItem.call(this,i);e.nextText&&!e.nextAtFront&&g._appendItem.call(this,e.invertPageOrder?e.currentPage-1:e.currentPage+1,{text:e.nextText,classes:"next"}),e.ellipsePageSet&&!e.disabled&&g._ellipseClick.call(this,t)},_getPages:function(e){return Math.ceil(e.items/e.itemsOnPage)||1},_getInterval:function(e){return{start:Math.ceil(e.currentPage>e.halfDisplayed?Math.max(Math.min(e.currentPage-e.halfDisplayed,e.pages-e.displayedPages),0):0),end:Math.ceil(e.currentPage>e.halfDisplayed?Math.min(e.currentPage+e.halfDisplayed,e.pages):Math.min(e.displayedPages,e.pages))}},_appendItem:function(a,e){var t,s=this,n=s.data("pagination"),i=p('<li class="pc-page"></li>'),l=s.find("ul"),r={text:(a=a<0?0:a<n.pages?a:n.pages-1)+1,classes:""};n.labelMap.length&&n.labelMap[a]&&(r.text=n.labelMap[a]),r=p.extend(r,e||{}),a==n.currentPage||n.disabled?(n.disabled||"prev"===r.classes||"next"===r.classes?i.addClass("disabled"):i.addClass("active"),t=p('<a class="srchpg pc-item">'+r.text+"</a>")):(t=n.useAnchors?(n="'"+r.text+"'",p('<a href="#" class="srchpg pc-item" onclick="srch_invoke.clickPagination('+n+');">'+r.text+"</a>")):p("<span >"+r.text+"</span>")).click(function(e){return g._selectPage.call(s,a,e)}),r.classes&&t.addClass(r.classes),i.append(t),(l.length?l:s).append(i)},_selectPage:function(e,a){alert("FOFOFO");var t=this.data("pagination");return t.currentPage=e,t.selectOnClick&&g._draw.call(this),t.onPageClick(e+1,a)},_ellipseClick:function(e){var s=this,n=this.data("pagination"),i=e.find(".ellipse");i.addClass("clickable").parent().removeClass("disabled"),i.click(function(e){var a,t;return n.disable||(a=p(this),t=(parseInt(a.parent().prev().text(),10)||0)+1,a.html('<input type="number" min="1" max="'+n.pages+'" step="1" value="'+t+'">').find("input").focus().click(function(e){e.stopPropagation()}).keyup(function(e){var a=p(this).val();13===e.which&&""!==a?0<a&&a<=n.pages&&g._selectPage.call(s,a-1):27===e.which&&i.empty().html(n.ellipseText)}).bind("blur",function(e){var a=p(this).val();return""!==a&&g._selectPage.call(s,a-1),i.empty().html(n.ellipseText),!1})),!1})}};p.fn.pagination=function(e){return g[e]&&"_"!=e.charAt(0)?g[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void p.error("Method "+e+" does not exist on jQuery.pagination"):g.init.apply(this,arguments)}}(jQuery);