var arkoseLabsClientApica0a0f94=function(e){function t(t){for(var n,o,i=t[0],c=t[1],u=t[2],s=0,l=[];s<i.length;s++)o=i[s],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&l.push(r[o][0]),r[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(T&&T(t);l.length;)l.shift()();return a.push.apply(a,u||[]),E()}function E(){for(var e,t=0;t<a.length;t++){for(var E=a[t],n=!0,i=1;i<E.length;i++){var c=E[i];0!==r[c]&&(n=!1)}n&&(a.splice(t--,1),e=o(o.s=E[0]))}return e}var n={},r={2:0},a=[];function o(t){if(n[t])return n[t].exports;var E=n[t]={i:t,l:!1,exports:{}};return e[t].call(E.exports,E,E.exports,o),E.l=!0,E.exports}o.e=function(e){var t=[],E=r[e];if(0!==E)if(E)t.push(E[2]);else{var n=new Promise((function(t,n){E=r[e]=[t,n]}));t.push(E[2]=n);var a,i=document.createElement("script");i.charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.src=function(e){return o.p+""+({5:"public-key-settings0",6:"public-key-style0"}[e]||e)+".bundle.2a9b98c00306023fa20284d326da252e.js"}(e);var c=new Error;a=function(t){i.onerror=i.onload=null,clearTimeout(u);var E=r[e];if(0!==E){if(E){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",c.name="ChunkLoadError",c.type=n,c.request=a,E[1](c)}r[e]=void 0}};var u=setTimeout((function(){a({type:"timeout",target:i})}),12e4);i.onerror=i.onload=a,document.head.appendChild(i)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,E){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:E})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var E=Object.create(null);if(o.r(E),Object.defineProperty(E,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(E,n,function(t){return e[t]}.bind(null,n));return E},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="https://client-api.arkoselabs.com/v2/942A102E-8D3A-4F0F-9ED3-13CA6D754952/",o.oe=function(e){throw console.error(e),e};var i=window.webpackJsonparkoseLabsClientApica0a0f94=window.webpackJsonparkoseLabsClientApica0a0f94||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var T=c;return a.push([327,7]),E()}({117:function(e,t,E){"use strict";var n=E(23),r=n(E(51)),a=n(E(123)),o=n(E(111)),i=n(E(125)),c=E(39);E(129);var u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return(0,o.default)((0,a.default)(e.split(".")))},T=u(c.COREJS_VERSION),s=(0,r.default)(window,"__core-js_shared__.versions",[]);(0,i.default)(s,(function(e){return u((0,r.default)(e,"version"))===T}))<0&&(E(132),E(142),E(173),E(191),E(225),E(235))},269:function(e,t,E){var n={"./default.json":[342,5]};function r(e){if(!E.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],r=t[0];return E.e(t[1]).then((function(){return E.t(r,3)}))}r.keys=function(){return Object.keys(n)},r.id=269,e.exports=r},327:function(e,t,E){"use strict";var n=E(23),r=n(E(72)),a=n(E(67)),o=n(E(261)),i=n(E(73)),c=n(E(51)),u=E(69);E(117);var T=n(E(66)),s=n(E(71)),l=n(E(331)),_=E(39),d=n(E(334)),f=n(E(335));function L(e,t){var E=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),E.push.apply(E,n)}return E}function I(e){for(var t=1;t<arguments.length;t++){var E=null!=arguments[t]?arguments[t]:{};t%2?L(Object(E),!0).forEach((function(t){(0,a.default)(e,t,E[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(E)):L(Object(E)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(E,t))}))}return e}var N=(0,T.default)("enforcement:enforcement"),p=_.DEFAULT_THEME,R=!1,A=!1;s.default.context="enforcement";var O={},M=function(e){var t=[_.EVENT_JS_READY,_.EVENT_STYLE_LOADED];O.styleThemeReadyEvents=O.styleThemeReadyEvents||[],O.styleThemeReadyEvents.push(e),(0,u.size)(t)===(0,u.size)((0,u.intersection)(O.styleThemeReadyEvents,t))&&s.default.emit(_.EMITTER_STYLE_THEME,O.styleThemeData)},v=function(){var e=(0,i.default)(r.default.mark((function e(t){var n,a,i,u,T,s,l;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,(0,c.default)(O,"config.mode")===_.INLINE_MODE){e.next=13;break}return e.next=4,Promise.all([E.e(10).then(E.t.bind(null,339,7)),E.e(0).then(E.t.bind(null,340,7)),(0,d.default)(p),Promise.all([E.e(0),E.e(8),E.e(9)]).then(E.t.bind(null,341,7))]);case 4:n=e.sent,a=(0,o.default)(n,4),i=a[0],u=a[1],T=a[2].default,s=a[3].default,u.render(i.createElement(s,I({active:!1,settings:T},t)),document.querySelector("#app")),e.next=14;break;case 13:document.getElementById(_.CHALLENGE_ELEMENT_ID)||((l=document.createElement("div")).id=_.CHALLENGE_ELEMENT_ID,l["data-e2e"]=_.CHALLENGE_ELEMENT_DATA_E2E,l.title=_.CHALLENGE_ELEMENT_TITLE,document.querySelector("#app").appendChild(l));case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),N("cannot render enforcement",e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(t){return e.apply(this,arguments)}}();window.addEventListener("message",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.data===_.BOOTSTRAP_VERIFY_CLICKED&&s.default.emit(_.BOOTSTRAP_VERIFY_CLICKED)})),window.loadChallenge=function(){s.default.emit(_.EMITTER_CHALLENGE_LOADED,{event:_.EMITTER_CHALLENGE_LOADED})};window.addEventListener("message",(function(e){e.data===_.EVENT_JS_READY&&M(_.EVENT_JS_READY)})),s.default.on(_.BOOTSTRAP_VERIFY_CLICKED,(function(){s.default.emit(_.EMITTER_CHALLENGE_RESET),s.default.emit(_.EMITTER_HIDE_CHALLENGE)}));var h=function(){var e=(0,i.default)(r.default.mark((function e(){var t,n,a;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,c.default)(O,"config.styleTheme","default"),n={},e.prev=2,e.next=5,E(336)("./".concat(t,".json"));case 5:a=e.sent,n=(0,c.default)(a,"default",{}),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(2);case 11:O.styleThemeData=n,M(_.EVENT_STYLE_LOADED);case 13:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(){return e.apply(this,arguments)}}(),C=function e(){var t=document.querySelector("iframe");if(!t)return setTimeout(e,10);var E=(0,f.default)(t),n=E.width,r=E.height;s.default.emit(_.EMITTER_CHALLENGE_IFRAME,{width:n,height:r})};s.default.on(_.EMITTER_CONFIG,(function(e){var t=(0,c.default)(e,"styleTheme",_.DEFAULT_THEME);if(O.config=e,R&&t===p||(p=t,R||(R=!0),v()),!A&&e.challengeApiUrl){var E=document.createElement("script");E.type="text/javascript",E.src=e.challengeApiUrl,document.querySelector("body").appendChild(E),A=!0}h()})),s.default.once(_.EMITTER_SHOW_ENFORCEMENT,(0,i.default)(r.default.mark((function e(){var t,E,n,a,o,i,u;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,c.default)(O,"config.styleTheme",_.DEFAULT_THEME),e.next=3,(0,d.default)(t);case 3:E=e.sent,n=E.default,a=(n=void 0===n?{}:n).settings,o=!1,i=!(0,c.default)(a,"lightbox.closeOnEsc",!0),(0,c.default)(O,"config.mode")!==_.INLINE_MODE&&window.addEventListener("message",(function(e){return i||(0,c.default)(e,"data")!==_.EC_ESCAPE_KEY_MESSAGE?null:s.default.emit(_.EMITTER_HIDE_ENFORCEMENT,{description:_.EVENT_USER_PRESSED_ESCAPE_KEY})})),N("enforcement showed"),u=function(e,t,E,n){setTimeout((function(){s.default.emit(n,{token:e}),(0,c.default)(O,"config.mode")!==_.INLINE_MODE&&(N("hide enforcement"),s.default.emit(_.EMITTER_HIDE_ENFORCEMENT,{description:t}))}),(0,c.default)(a,"lightbox.hideDelayWithChallenge",E))},new ArkoseEnforcement({public_key:_.PUBLIC_KEY,target_html:_.CHALLENGE_ELEMENT_ID,data:O.config.clientData,language:O.config.settings.language,siteData:O.config.siteData,styletheme:t,loaded_callback:function(){N("loaded callback"),o=!0,s.default.emit(_.EMITTER_CHALLENGE_READY),C()},onsuppress:function(){return s.default.emit(_.EMITTER_CHALLENGE_SUPPRESSED)},onshown:function(){s.default.emit(_.EMITTER_CHALLENGE_SHOWN),C()},callback:function(e){var t=_.CHALLENGE_HIDE_TIMEOUT_MS;o||(s.default.emit(_.EMITTER_COMPLETED_WITHOUT_BEING_CHALLENGED),N("completed without being challenged"),t=0),u(e,"challenge completed",t,_.EMITTER_CHALLENGE_COMPLETED)},failed_callback:function(e){N("challenge fail limit reached"),u(e,"challenge fail limit reached",_.CHALLENGE_HIDE_TIMEOUT_MS,_.EMITTER_GAME_NUMBER_LIMIT_REACHED)}}).clear_session();case 14:case"end":return e.stop()}}),e)})))),s.default.on(_.EMITTER_SHOW_ENFORCEMENT,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.description;v({active:!0}),(0,l.default)({type:_.EVENT_TYPE_LIGHTBOX_OPENED,description:t})})),s.default.on(_.EMITTER_HIDE_ENFORCEMENT,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.description;v(),(0,l.default)({type:_.EVENT_TYPE_LIGHTBOX_DISMISSED,description:t})})),s.default.emit(_.EMITTER_CONFIG_REQUEST)},331:function(e,t,E){"use strict";var n=E(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(E(332)),a=n(E(66)),o=n(E(71)),i=E(39),c=(0,a.default)("utils:eventLogger"),u=new r.default({autoStart:!1,concurrency:1});o.default.on(i.EMITTER_CHALLENGE_READY,(function(){c("queue started"),u.start()}));var T=function(e){var t=e.type,E=e.description;u.isPaused&&c("dispatch queued",{type:t,description:E}),u.add((function(){c("dispatched",{type:t,description:E}),o.default.emit(i.EMITTER_ANALYTICS,{msg:"analytics",action:t,label:E})}))};t.default=T},334:function(e,t,E){"use strict";var n=E(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(E(72)),a=n(E(73)),o=E(39),i=function(){var e=(0,a.default)(r.default.mark((function e(t){var n,a;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={},e.prev=1,e.next=4,E(269)("./".concat(t,".json"));case 4:n=e.sent,e.next=13;break;case 7:return e.prev=7,e.t0=e.catch(1),a=o.DEFAULT_THEME,e.next=12,E(269)("./".concat(a,".json"));case 12:n=e.sent;case 13:return e.abrupt("return",n);case 14:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();t.default=i},335:function(e,t,E){"use strict";var n=E(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(E(261)),a=function(e){var t=e.getAttribute("style"),E=t.match(/width:[^\d]*(\d+(\w+))/),n=(0,r.default)(E,2)[1],a=t.match(/height:[^\d]*(\d+(\w+))/);return{width:n,height:(0,r.default)(a,2)[1]}};t.default=a},336:function(e,t,E){var n={"./default.json":[343,6]};function r(e){if(!E.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],r=t[0];return E.e(t[1]).then((function(){return E.t(r,3)}))}r.keys=function(){return Object.keys(n)},r.id=336,e.exports=r},39:function(e,t,E){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CHALLENGE_HIDE_TIMEOUT_MS=t.CHALLENGE_ELEMENT_TITLE=t.CHALLENGE_ELEMENT_DATA_E2E=t.CHALLENGE_ELEMENT_ID=t.ENFORCEMENT_FRAME_TITLE=t.COREJS_VERSION=t.PACKAGE_VERSION=t.BOOTSTRAP_VERIFY_CLICKED=t.TARGET_ELEMENT_QUERY_SELECTOR=t.NODE_ENV=t.INLINE_MODE=t.INLINE_ELEMENT_CHECK_FREQ=t.EVENT_USER_PRESSED_ESCAPE_KEY=t.EVENT_TYPE_LIGHTBOX_OPENED=t.EVENT_TYPE_LIGHTBOX_DISMISSED=t.ESCAPE_KEY_CODE=t.ENFORCEMENT_HIDE_TRANSITION_MS=t.EMITTER_STYLE_THEME=t.EMITTER_SHOW_ENFORCEMENT=t.EMITTER_HIDE_ENFORCEMENT=t.EMITTER_HIDE_CHALLENGE=t.EMITTER_ENFORCEMENT_READY=t.EMITTER_ENFORCEMENT_LOADED=t.EMITTER_CONFIG_REQUEST=t.EMITTER_CONFIG=t.EMITTER_GAME_NUMBER_LIMIT_REACHED=t.EMITTER_COMPLETED_WITHOUT_BEING_CHALLENGED=t.EMITTER_CHALLENGE_RESET=t.EMITTER_CHALLENGE_SUPPRESSED=t.EMITTER_CHALLENGE_IFRAME=t.EMITTER_CHALLENGE_SHOWN=t.EMITTER_CHALLENGE_READY=t.EMITTER_CHALLENGE_LOADED=t.EMITTER_CHALLENGE_FRAME_READY=t.EMITTER_CHALLENGE_COMPLETED=t.EMITTER_ANALYTICS=t.ENFORCEMENT_URL=t.EVENT_STYLE_LOADED=t.EVENT_JS_READY=t.EC_ESCAPE_KEY_MESSAGE=t.DEFAULT_THEME=t.DEFAULT_MODE=t.CHALLENGE_API_URL=t.ATTRIBUTE_EVENT_SHOWN=t.ATTRIBUTE_EVENT_SUPPRESS=t.ATTRIBUTE_EVENT_SHOW=t.ATTRIBUTE_EVENT_RESET=t.ATTRIBUTE_EVENT_READY_INLINE=t.ATTRIBUTE_EVENT_READY=t.ATTRIBUTE_EVENT_HIDE=t.ATTRIBUTE_EVENT_COMPLETED=t.ATTRIBUTE_EVENT_LIMIT_REACHED=t.ATTRIBUTE_CONTAINER_SELECTOR=t.ATTRIBUTE_CHALLENGE_API_URL=t.API_SCRIPT_TAG_SELECTOR=t.PUBLIC_KEY=t.NAME=void 0;var n="arkose";t.NAME=n;var r="942A102E-8D3A-4F0F-9ED3-13CA6D754952";t.PUBLIC_KEY=r;t.API_SCRIPT_TAG_SELECTOR="script";var a="data-".concat(n,"-challenge-api-url");t.ATTRIBUTE_CHALLENGE_API_URL=a;var o="data-".concat(n,"-container");t.ATTRIBUTE_CONTAINER_SELECTOR=o;var i="data-".concat(n,"-event-blocked");t.ATTRIBUTE_EVENT_LIMIT_REACHED=i;var c="data-".concat(n,"-event-completed");t.ATTRIBUTE_EVENT_COMPLETED=c;var u="data-".concat(n,"-event-hide");t.ATTRIBUTE_EVENT_HIDE=u;var T="data-".concat(n,"-event-ready");t.ATTRIBUTE_EVENT_READY=T;var s="data-".concat(n,"-event-ready-inline");t.ATTRIBUTE_EVENT_READY_INLINE=s;var l="data-".concat(n,"-event-reset");t.ATTRIBUTE_EVENT_RESET=l;var _="data-".concat(n,"-event-show");t.ATTRIBUTE_EVENT_SHOW=_;var d="data-".concat(n,"-event-suppress");t.ATTRIBUTE_EVENT_SUPPRESS=d;var f="data-".concat(n,"-event-shown");t.ATTRIBUTE_EVENT_SHOWN=f;t.CHALLENGE_API_URL="https://client-api.arkoselabs.com/fc/api/?onload=loadChallenge";t.DEFAULT_MODE="lightbox";t.DEFAULT_THEME="default";t.EC_ESCAPE_KEY_MESSAGE="key_pressed_27";t.EVENT_JS_READY="js_ready";t.EVENT_STYLE_LOADED="style loaded";t.ENFORCEMENT_URL="https://client-api.arkoselabs.com/v2/942A102E-8D3A-4F0F-9ED3-13CA6D754952/enforcement.2a9b98c00306023fa20284d326da252e.html";t.EMITTER_ANALYTICS="analytics";t.EMITTER_CHALLENGE_COMPLETED="challenge completed";t.EMITTER_CHALLENGE_FRAME_READY="challenge frame ready";t.EMITTER_CHALLENGE_LOADED="challenge loaded";t.EMITTER_CHALLENGE_READY="challenge ready";t.EMITTER_CHALLENGE_SHOWN="challenge shown";t.EMITTER_CHALLENGE_IFRAME="challenge iframe";t.EMITTER_CHALLENGE_SUPPRESSED="challenge suppressed";t.EMITTER_CHALLENGE_RESET="challenge reset";t.EMITTER_COMPLETED_WITHOUT_BEING_CHALLENGED="completed without being challenged";t.EMITTER_GAME_NUMBER_LIMIT_REACHED="challenge fail number limit reached";t.EMITTER_CONFIG="config";t.EMITTER_CONFIG_REQUEST="request config";t.EMITTER_ENFORCEMENT_LOADED="enforcement loaded";t.EMITTER_ENFORCEMENT_READY="enforcement ready";t.EMITTER_HIDE_CHALLENGE="hide challenge";t.EMITTER_HIDE_ENFORCEMENT="hide enforcement";t.EMITTER_SHOW_ENFORCEMENT="show enforcement";t.EMITTER_STYLE_THEME="style theme";t.ENFORCEMENT_HIDE_TRANSITION_MS=400;t.ESCAPE_KEY_CODE=27;t.EVENT_TYPE_LIGHTBOX_DISMISSED="user dismissed lightbox";t.EVENT_TYPE_LIGHTBOX_OPENED="user clicked lightbox trigger";t.EVENT_USER_PRESSED_ESCAPE_KEY="user pressed escape key";t.INLINE_ELEMENT_CHECK_FREQ=500;t.INLINE_MODE="inline";t.NODE_ENV="production";var L="[data-".concat(n,'-public-key="').concat(r,'"]');t.TARGET_ELEMENT_QUERY_SELECTOR=L;t.BOOTSTRAP_VERIFY_CLICKED="bootstrap_verify_click";t.PACKAGE_VERSION="8.4.2";t.COREJS_VERSION="3.2.0";var I="".concat(n,"-enforcement");t.ENFORCEMENT_FRAME_TITLE=I;t.CHALLENGE_ELEMENT_ID="challenge";t.CHALLENGE_ELEMENT_DATA_E2E="challenge-frame";t.CHALLENGE_ELEMENT_TITLE="challenge frame";t.CHALLENGE_HIDE_TIMEOUT_MS=2e3},66:function(e,t,E){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){return function(){}};t.default=n},69:function(e,t,E){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.entries=t.entriesPolyfill=t.isFunction=t.intersection=t.size=void 0;t.size=function(e){return e.constructor===Object?Object.keys(e).length:e.length};t.intersection=function(e){for(var t=arguments.length,E=new Array(t>1?t-1:0),n=1;n<t;n++)E[n-1]=arguments[n];var r=e.filter((function(e){return E.every((function(t){return t.indexOf(e)>-1}))}));return r.filter((function(e,t,E){return E.indexOf(e)===t}))};t.isFunction=function(e){return"function"==typeof e};var n=function(e){for(var t=Object.keys(e),E=t.length,n=new Array(E),r=0;r<E;r+=1)n[r]=[t[r],e[t[r]]];return n};t.entriesPolyfill=n;t.entries=function(e){return Object.entries?Object.entries(e):n(e)}},71:function(e,t,E){"use strict";var n=E(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(E(67)),a=n(E(50)),o=n(E(65)),i=n(E(258)),c=n(E(114)),u=n(E(259)),T=E(69),s=n(E(66)),l=E(39);function _(e,t){var E=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),E.push.apply(E,n)}return E}function d(e){for(var t=1;t<arguments.length;t++){var E=null!=arguments[t]?arguments[t]:{};t%2?_(Object(E),!0).forEach((function(t){(0,r.default)(e,t,E[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(E)):_(Object(E)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(E,t))}))}return e}var f=function(){},L=(0,s.default)("utils:emitter"),I=function(e){return JSON.stringify(e)},N=function(e){return JSON.parse(e)},p=new(function(){function e(){var t=this;(0,a.default)(this,e),this.config={context:null,target:"*"},this.emitter=new i.default,this.log=f,this.logEmit=f,this.logOnWindowMessage=f,window.addEventListener("message",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{var E=N(e.data)||{},n=E.data,r=E.key,a=E.message,o=E.type;a&&r===l.PUBLIC_KEY&&(t.logOnWindowMessage(a,n),t.emitter.emit(a,n),"broadcast"===o&&t.postMessageToParent({data:n,key:r,message:a}),"emit"===o&&t.postMessageToChildren({data:n,key:r,message:a}))}catch(e){L("error parsing window message",e)}}))}return(0,o.default)(e,[{key:"postMessage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,E=t.data,n=t.key,r=t.message,a=t.type,o=(0,T.isFunction)(e.postMessage);if(o){var i=d({},E,{data:E,key:n,message:r,type:a});L(e,i),e.postMessage(I(i),this.config.target)}}},{key:"postMessageToChildren",value:function(e){var t=this,E=e.data,n=e.key,r=e.message,a=(0,u.default)(document.querySelectorAll("iframe"),(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.contentWindow;return t}));(0,c.default)(a,(function(e){t.postMessage(e,{data:E,key:n,message:r,type:"emit"},t.config.target)}))}},{key:"postMessageToParent",value:function(e){var t=e.data,E=e.key,n=e.message;window.parent!==window&&this.postMessage(window.parent,{data:t,key:E,message:n,type:"broadcast"})}},{key:"emit",value:function(e,t){this.logEmit(e,t),this.emitter.emit(e,t),this.postMessageToParent({message:e,data:t,key:l.PUBLIC_KEY}),this.postMessageToChildren({message:e,data:t,key:l.PUBLIC_KEY})}},{key:"off",value:function(){var e;(e=this.emitter).removeListener.apply(e,arguments)}},{key:"on",value:function(){var e;(e=this.emitter).on.apply(e,arguments)}},{key:"once",value:function(){var e;(e=this.emitter).once.apply(e,arguments)}},{key:"context",set:function(e){var t="utils:emitter:".concat(e);this.config.context=e,this.log=(0,s.default)(t),this.logBroadcast=(0,s.default)("".concat(t,":broadcast")),this.logEmit=(0,s.default)("".concat(t,":emit")),this.logOnWindowMessage=(0,s.default)("".concat(t,":onWindowMessage"))}}]),e}());t.default=p}});
//# sourceMappingURL=enforcement.2a9b98c00306023fa20284d326da252e.js.map