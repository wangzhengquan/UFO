/*! 2019-12-28 */
KISSY.add("UFO/util/Storage",function(a,b){return{setItem:function(a,b,c){var d=typeof c;"string"===d||"number"===d||"boolean"===d?a.setItem(b,c):a.setItem(b,JSON.stringify(c))},getItem:function(a,b){var c=a.getItem(b);try{return JSON.parse(c)}catch(a){return c}},setLocalItem:function(a,b){this.setItem(localStorage,a,b)},getLocalItem:function(a){return this.getItem(localStorage,a)},setSessionItem:function(a,b){this.setItem(sessionStorage,a,b)},getSessionItem:function(a){return this.getItem(sessionStorage,a)}}},{requires:["node"]}),KISSY.add("app/util/ParamUtil",function(a){return{processParam:function(b){for(var c in b){var d=b[c];a.isArray(d)&&(b[c]=d[0])}return b}}}),KISSY.add("UFO/core/lang/Number",function(a){return{toSignedNumberString:function(a,b){return a>0?"+"+String(a):0==a?(b||"")+String(a):String(a)},toHex:function(a){return a.toString(16)},toAmountWords:function(a){for(var b=["","万","亿"],c=["拾","佰","仟"],d=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],e=String(a).split("."),f=0,g=0,h=0,i="",j=0,k=1,l=e[0].length;k<=l;k++){j=e[0].charAt(l-k);var m=0;l-k-1>=0&&(m=e[0].charAt(l-k-1)),h+=Number(j),0!=h&&(i=d[Number(j)].concat(i),"0"==j&&(h=0)),l-k-1>=0&&(3!=f?(0!=m&&(i=c[f].concat(i)),f++):(f=0,"万"!=i.charAt(0)&&"亿"!=i.charAt(0)||(i=i.substr(1,i.length-1)),i=b[g].concat(i),h=0)),3==f&&g++}return i+="元",e[1]?(j=e[1].charAt(0),0!=j&&(i+=d[Number(j)]+"角"),j=e[1].charAt(1),0!=j&&(i+=d[Number(j)]+"分")):i+="整",i}}}),KISSY.add("UFO/core/lang/Date",function(a,b){return{getMonthName:function(a,b){return b===!0?["&#74;&#97;&#110;","&#70;&#101;&#98;","&#77;&#97;&#114;","&#65;&#112;&#114;","&#77;&#97;&#121;","&#74;&#117;&#110;","&#74;&#117;&#108;","&#65;&#117;&#103;","&#83;&#101;&#112;","&#79;&#99;&#116;","&#78;&#111;&#118;","&#68;&#101;&#99;"][a.getMonth()]:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][a.getMonth()]},getWeekName:function(a,b){return b===!0?["&#83;&#117;&#110;","&#77;&#111;&#110;","&#84;&#117;&#101;","&#87;&#101;&#100;","&#84;&#104;&#117;&#114;","&#70;&#114;&#105;","&#83;&#97;&#116;"][a.getDay()]:["Sun","Mon","Tue","Wed","Thur","Fri","Sat"][a.getDay()]},format:function(a,c){if(!a)return"";c||(c="yyyy-MM-dd mm:ss");var d={TZ:b.toSignedNumberString(parseInt(-a.getTimezoneOffset()/60)),"q+":Math.floor((a.getMonth()+3)/3),"y+":a.getFullYear(),MN:this.getMonthName(a,!0),"M+":a.getMonth()+1,"d+":a.getDate(),WN:this.getWeekName(a),"h+":a.getHours(),"H+":function(a){return a<13?a:a-12}(a.getHours()),"m+":a.getMinutes(),MP:a.getMinutes()-(new Date).getMinutes(),"s+":a.getSeconds(),DP:function(a){return a.getHours()<12?"AM":"PM"}(a)};for(var e in d)if(new RegExp("("+e+")").test(c)){var f=RegExp.$1;c=c.replace(f,function(){return"yy"===f?d[e]%100:f.length>1&&"number"==typeof d[e]&&d[e]>-1&&d[e]<10?"0"+d[e]:d[e]})}return c}}},{requires:["./Number"]}),KISSY.add("app/util/XTemplateUtil",function(a,b,c){var d=function(){b.addCommand("getImgAbsolutePath",function(a,b){var c=b.params[0];return c?"../resources/img/"+c:"../resources/img/default_product.png"}),b.addCommand("formatPrice",function(a,b){return Number(b.params[0]).toFixed(2)}),b.addCommand("formatDateTime",function(b,d){var e=d.params[0],f="yyyy-MM-dd";return a.isNumber(e)&&(e=new Date(e)),2===d.params.length&&(f=d.params[1]),c.format(e,f)}),b.addCommand("fixedDigits",function(a,b){var c=2;return 2===b.params.length&&(c=b.params[1]),Number(b.params[0]).toFixed(c)}),b.addCommand("join",function(a,b){var c=",";return 2===b.params.length&&(c=b.params[1]),b.params[0].join(c)}),b.addCommand("getHost",function(a,b){return location.host}),b.addCommand("encodeURIComponent",function(a,b){return encodeURIComponent(b.params[0])})};return d(),{}},{requires:["xtemplate","UFO/core/lang/Date"]}),KISSY.add("app/app",function(a,b,c,d){var e=c.processParam(a.unparam(decodeURIComponent(location.search.slice(1)))),f=(navigator.userAgent.toLowerCase(),"yql_user"),g=void 0,h=0;return(h=location.pathname.lastIndexOf("build/"))>0?g=location.pathname.substring(0,h)+"build/data":(h=location.pathname.lastIndexOf("src/"))>0&&(g=location.pathname.substring(0,h)+"src/data"),console.log("api_path",g),{API_HOST:location.protocol+"//"+location.host+g,IMG_BASE_URL:"./resources/img",VERSION:"1.0.0",setSessionUser:function(a){b.setSessionItem(f,a)},getSessionUser:function(){return b.getSessionItem(f)},isLogined:function(){return!!this.getSessionUser()},getParam:function(){return e},isMicroMessenger:function(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)},notifyApp:function(a,b){var c=navigator.userAgent;if("micromessenger"==c.toLowerCase().match(/MicroMessenger/i))return void(window.location="down.html");c.match(/(iPhone|iPod|iPad);?/i)?window.location=a:c.match(/android/i)&&(window.location=b);var d=+new Date;setTimeout(function(){!window.document.webkitHidden&&setTimeout(function(){+new Date-d<2e3&&(window.location="down.html")},500)},500)}}},{requires:["UFO/util/Storage","./util/ParamUtil","./util/XTemplateUtil"]});