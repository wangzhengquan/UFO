/*! 2019-12-28 */
KISSY.add("UFO/EventSupport",function(a){function b(a){this.listeners=this.listeners||{},this.oneTimeListeners=this.oneTimeListeners||{}}var c=function(a,b){for(var c=0,d=b.length,e=null;c<d;c++){e=b[c];for(var f=0,g=0;f<a.length;f++)a[f]!=e&&(a[g++]=a[f]);a.length=g}return a};return UFO.augment(b,{on:function(b,c){var d=this.listeners[b]||[];return a.isArray(d)||(d=[d]),d.push(c),this.listeners[b]=d,this},off:function(a,b){return this.listeners[a]&&c(this.listeners[a],b),this.oneTimeListeners[a]&&c(this.oneTimeListeners[a],b),this},one:function(a,b){return this.oneTimeListeners[a]=this.oneTimeListeners[a]||[],this.oneTimeListeners[a].push(b),this},fire:function(){var b=[],c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=this.listeners[c],f=this.oneTimeListeners[c];if(e){a.isArray(e)||(e=[e]);for(var g=0,h=e.length;g<h;g++)b.push(e[g].apply(this,d))}if(f){a.isArray(f)||(f=[f]);for(var g=0,h=f.length;g<h;g++)b.push(f[g].apply(this,d))}return f=[],1==b.length?b[0]:b},fireEvent:function(){return this.fire.apply(this,arguments)},hasListener:function(a){return this.listeners[a]},relayEvents:function(a,b,c){for(var d,e,f=this,g=b.length,h=0;h<g;h++)d=b[h],e=c?c+d:d,a.on(d,f.createRelayer(e))},createRelayer:function(a,b){var c=this;return function(){return c.fireEvent.apply(c,[a].concat(Array.prototype.slice.apply(arguments,b||[0])))}}}),b}),KISSY.add("UFO/ComponentQuery",function(a){var b=this,c=function(a,b){return b.method.apply(this,[a].concat(b.args))},d=function(a,b){for(var c,d=[],e=0,f=a.length,g=">"!==b;e<f;e++)c=a[e],c.getRefItems&&(d=d.concat(c.getRefItems(g)));return d},e=function(a){for(var b,c=[],d=0,e=a.length;d<e;d++)for(b=a[d];b=b.ownerCt||b.floatParent;)c.push(b);return c},f=function(a,b,c){if("*"===b)return a.slice();for(var d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d&&d.isType&&d.isType(b,c)&&e.push(d);return e},g=function(a,b){for(var c,d=[],e=0,f=a.length;e<f;e++)c=a[e],c.hasCls(b)&&d.push(c);return d},h=function(a,b,c,d){for(var e,f=[],g=0,h=a.length;g<h;g++)e=a[g],(d?String(e[b])!==d:!e[b])||f.push(e);return f},i=function(a,b){for(var c,d=[],e=0,f=a.length;e<f;e++)c=a[e],c.getId()===b&&d.push(c);return d},j=function(a,c,d){return b.pseudos[c](a,d)},k=/^(\s?([>\^])\s?|\s|$)/,l=/^(#)?([\w\-]+|\*)(?:\((true|false)\))?/,m=[{re:/^\.([\w\-]+)(?:\((true|false)\))?/,method:f},{re:/^(?:[\[](?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]])/,method:h},{re:/^#([\w\-]+)/,method:i},{re:/^\:([\w\-]+)(?:\(((?:\{[^\}]+\})|(?:(?!\{)[^\s>\/]*?(?!\})))\))?/,method:j}];b.Query=function(a){a=a||{},UFO.apply(this,a)},UFO.augment(b.Query,{execute:function(b){var f,g,h=this.operations,i=0,j=h.length;for(a.isArray(b)&&(g=b);i<j;i++)if(f=h[i],g="^"===f.mode?e(g||[b]):f.mode?d(g||[b],f.mode):c(g||d([b]),f),i===j-1)return g;return[]},is:function(b){var d,e,f=this.operations,g=a.isArray(b)?b:[b],h=g.length,i=f[f.length-1];if(g=c(g,i),g.length===h){if(f.length>1)for(e=0,d=g.length;e<d;e++)if(a.indexOf(this.execute(),g[e])===-1)return!1;return!0}return!1}});var n={cache:{},pseudos:{not:function(a,b){for(var c,d=n,e=0,f=a.length,g=[],h=-1;e<f;++e)c=a[e],d.is(c,b)||(g[++h]=c);return g},first:function(a){var b=[];return a.length>0&&b.push(a[0]),b},last:function(a){var b=a.length,c=[];return b>0&&c.push(a[b-1]),c}},query:function(b,c){for(var d,e,f,g=b.split(","),h=g.length,i=0,j=[],k=[],l={};i<h;i++)b=a.trim(g[i]),d=this.cache[b]||(this.cache[b]=this.parse(b)),j=j.concat(d.execute(c));if(e=j.length,e>1){for(i=0;i<e;i++)f=j[i],console.log("cmp.id",f.id),l[f.id]||(k.push(f),l[f.id]=!0);j=k}return j},is:function(b,c){if(!c)return!0;for(var d,e=c.split(","),f=e.length,g=0;g<f;g++)if(c=a.trim(e[g]),d=this.cache[c]||(this.cache[c]=this.parse(c)),d.is(b))return!0;return!1},parse:function(c){for(var d,e,h,j,n,o,p,q,r=[],s=m.length;c&&d!==c;){for(d=c,e=c.match(l),e&&(h=e[1],"#"===h?r.push({method:i,args:[a.trim(e[2])]}):"."===h?r.push({method:g,args:[a.trim(e[2])]}):r.push({method:f,args:[a.trim(e[2]),Boolean(e[3])]}),c=c.replace(e[0],""));!(j=c.match(k));)for(o=0;c&&o<s;o++){if(p=m[o],n=c.match(p.re),q=p.method,n){r.push({method:p.method,args:n.slice(1)}),c=c.replace(n[0],"");break}o===s-1&&console.error('Invalid ComponentQuery selector: "'+arguments[0]+'"')}j[1]&&(r.push({mode:j[2]||j[1]}),c=c.replace(j[0],""))}return new b.Query({operations:r})}};return n}),KISSY.add("UFO/Component",function(a,b,c,d){function e(b){this.config=b||{},a.mix(this,b,!0,void 0,!0),this.id=a.guid(),this.tplId&&(f=this.tpl=a.one("#"+this.tplId).html()),e.superclass.constructor.call(this,b),this.initComponent()}var f="<div></div>";return a.extend(e,c),UFO.augment(e,{alias:"component",initComponent:function(){this.el||(f=this.tpl||f,this.el=a.all(f)),this.bodyStyle=a.mix(this.bodyStyle||{},{padding:this.bodyPadding},!0),this.getBodyContainer().css(this.bodyStyle),this.style=a.mix(this.style||{},{padding:this.padding,margin:this.margin}),this.el.css(this.style),this.cls&&this.addClass(this.cls),this.bodyCls&&this.getBodyContainer().addClass(this.bodyCls),this.attributes&&this.el.attr(this.attributes),this.addCmpEvents()},setSize:function(a,b){this.el.width(a),this.el.height(b)},toEl:function(){return this.el},getEl:function(){return this.toEl()},getTargetEl:function(){},getBodyContainer:function(){return this.el},getContentTarget:function(){return this.el},render:function(b){"string"==typeof b&&(b=a.one("#"+b),b||(b=a.one(b))),b.append(this.toEl()),this.fire("afterrender",this)},onAdded:function(a,b){var c=this;c.ownerCt=a,c.fireEvent("added",c,a,b)},css:function(b,c){var d=Array.prototype.slice.call(arguments,0);return 1===d.length&&a.isString(d[0])?el.css(b):this.el.css(b,c),this},removeClass:function(a){return this.el.removeClass(a),this},addClass:function(a){return this.el.addClass(a),this},hasClass:function(a){return this.el.hasClass(a)},hasCls:function(a){return this.hasClass(a)},setDisabled:function(a){this.disabled=a,a?this.el.attr("disabled","disabled"):this.el.attr("disabled","")},show:function(){return this.fire("beforeshow")!==!1&&(this.el.show(),this.fire("show")),this},hide:function(a){var b=this;return this.fire("beforehide")!==!1&&(this.el.hide(),b.destroy&&(b.el.remove(),delete b),b.fire("hide"),a&&a()),this},getRootContainer:function(){return this.rootContainer},getId:function(){return this.id},up:function(a){var b=this.getBubbleTarget();if(a)for(;b;b=b.getBubbleTarget())if(d.is(b,a))return b;return b},getBubbleTarget:function(){return this.ownerCt},addCmpEvents:function(){},set:function(a,b){this[a]=b},get:function(a){return this[a]},isType:function(a){return UFO.isType(this,a)}}),e},{requires:["node","./EventSupport","./ComponentQuery"]}),KISSY.add("UFO/layout/Layout",function(a){function b(a){this.initLayout()}return UFO.augment(b,{alias:"layout",initLayout:function(){this.el=[]},doLayout:function(b){var c=this;if(this.clearItems(),!a.isEmptyObject(b))for(var d,e=0,f=b.length;e<f;e++)d=b[e],void 0!=d&&null!=d&&(c.el.push(d.getEl?d.getEl():d),d.fire&&d.fire("afterrender",d))},clearItems:function(){this.el=[]},calculate:function(){},toEl:function(){return this.el}}),b}),KISSY.add("UFO/container/Container",function(a,b,c,d,e,f){function g(a){g.superclass.constructor.call(this,a)}var h="<div></div>";return a.extend(g,d),UFO.augment(g,{alias:"container",initComponent:function(){this.el||(h=this.tpl||h,this.el=a.all(h));var b=this.layout;b||(b="layout"),this.setLayout(b),this.initItems(),g.superclass.initComponent.apply(this,arguments)},updateLayout:function(){this.layout.doLayout(this.items),this.getBodyContainer().html("");var b,c=this.layout.toEl();a.isArray(c)||(c=[c]);for(var d=0,e=c.length;d<e;d++)b=c[d],this.getBodyContainer().append(b)},initItems:function(){if(this.items){var b=this.items;a.isArray(b)||(b=[b]),this.items=[],this.add(b)}},add:function(b,c){a.isArray(b)||(b=[b]);var d,e=this;if(e.items=e.items||[],!a.isEmptyObject(b))for(var f,g=0,h=b.length;g<h;g++)f=b[g],d=UFO.createItem(f,e.defaults),e.items.push(d),d&&d.onAdded&&d.onAdded(e,g),e.fireEvent("add",e,d,g);return a.isEmptyObject(this.items)||this.updateLayout(),e.items},setLayout:function(a){this.layout=UFO.create(a)},getRefItems:function(a){for(var b,c=this,d=c.items,e=d.length,f=0,g=[];f<e;f++)b=d[f],g.push(b),a&&b&&b.getRefItems&&g.push.apply(g,b.getRefItems(!0));return c.floatingItems&&g.push.apply(g,c.floatingItems),g},query:function(a){return a=a||"*",f.query(a,this)},down:function(a){return this.query(a)[0]||null}}),g},{requires:["node","xtemplate","../Component","../layout/Layout","../ComponentQuery"]}),KISSY.add("app/viewport/tpl/main-tpl",function(){return'<div class="main">\n\t{{^if no_header}}\n\t<header class="bar bar-black bar-header">\n\t\t{{#each leftButtons}}\n\t\t<a href="{{#if href}}{{href}}{{else}}javascript:;{{/if}}" class="button button-clear {{cls}}">\n\t\t\t{{text}} {{#if iconCls}} <i class="icon iconfont {{iconCls}}"></i> {{/if}}\n\t\t</a>\n\t\t{{/each}}\n\t\t<h1 class="title">{{title}}</h1>\n\t\t<div class="buttons buttons-right">\t\n\t\t\t\t{{#each rightButtons}}\n\t\t\t\t<a href="{{#if href}}href{{else}}javascript:;{{/if}}" class="button button-clear {{cls}}"\n\t\t\t\t{{#if attributes}}\n\t\t\t\t\t{{#each attributes}} {{xindex}}="{{this}}" {{/each}}\n\t\t\t\t{{/if}}>\n\t\t\t\t\n\t\t\t\t\t{{text}} {{#if iconCls}} <i class="icon iconfont {{iconCls}}"></i> {{/if}}\n\t\t\t\t</a>\n\t\t\t\t{{/each}}\n\t\t</div>\n\t</header>\n\t{{/if}}\n\t<div class="content {{^if no_header}}has-header{{/if}}">\n\t</div>\n</div>'}),KISSY.add("app/viewport/mods/Frame",function(a,b,c,d,e,f){function g(a){g.superclass.constructor.call(this,a)}return a.extend(g,d),a.augment(g,{initComponent:function(){var b=this.config=this.config||{};a.mix(b,{title:this.title,leftButtons:this.leftButtons,rightButtons:this.rightButtons},!1),this.el=a.one(new c(e).render(b)),this.content=this.el.one(".content"),g.superclass.initComponent.apply(this,arguments)},getBodyContainer:function(){return this.content},addCmpEvents:function(){g.superclass.addCmpEvents.apply(this,arguments)}}),g},{requires:["node","xtemplate","UFO/container/Container","../tpl/main-tpl","css/product-list.css"]}),KISSY.add("UFO/util/Storage",function(a,b){return{setItem:function(a,b,c){var d=typeof c;"string"===d||"number"===d||"boolean"===d?a.setItem(b,c):a.setItem(b,JSON.stringify(c))},getItem:function(a,b){var c=a.getItem(b);try{return JSON.parse(c)}catch(a){return c}},setLocalItem:function(a,b){this.setItem(localStorage,a,b)},getLocalItem:function(a){return this.getItem(localStorage,a)},setSessionItem:function(a,b){this.setItem(sessionStorage,a,b)},getSessionItem:function(a){return this.getItem(sessionStorage,a)}}},{requires:["node"]}),KISSY.add("app/util/ParamUtil",function(a){return{processParam:function(b){for(var c in b){var d=b[c];a.isArray(d)&&(b[c]=d[0])}return b}}}),KISSY.add("UFO/core/lang/Number",function(a){return{toSignedNumberString:function(a,b){return a>0?"+"+String(a):0==a?(b||"")+String(a):String(a)},toHex:function(a){return a.toString(16)},toAmountWords:function(a){for(var b=["","万","亿"],c=["拾","佰","仟"],d=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],e=String(a).split("."),f=0,g=0,h=0,i="",j=0,k=1,l=e[0].length;k<=l;k++){j=e[0].charAt(l-k);var m=0;l-k-1>=0&&(m=e[0].charAt(l-k-1)),h+=Number(j),0!=h&&(i=d[Number(j)].concat(i),"0"==j&&(h=0)),l-k-1>=0&&(3!=f?(0!=m&&(i=c[f].concat(i)),f++):(f=0,"万"!=i.charAt(0)&&"亿"!=i.charAt(0)||(i=i.substr(1,i.length-1)),i=b[g].concat(i),h=0)),3==f&&g++}return i+="元",e[1]?(j=e[1].charAt(0),0!=j&&(i+=d[Number(j)]+"角"),j=e[1].charAt(1),0!=j&&(i+=d[Number(j)]+"分")):i+="整",i}}}),KISSY.add("UFO/core/lang/Date",function(a,b){return{getMonthName:function(a,b){return b===!0?["&#74;&#97;&#110;","&#70;&#101;&#98;","&#77;&#97;&#114;","&#65;&#112;&#114;","&#77;&#97;&#121;","&#74;&#117;&#110;","&#74;&#117;&#108;","&#65;&#117;&#103;","&#83;&#101;&#112;","&#79;&#99;&#116;","&#78;&#111;&#118;","&#68;&#101;&#99;"][a.getMonth()]:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][a.getMonth()]},getWeekName:function(a,b){return b===!0?["&#83;&#117;&#110;","&#77;&#111;&#110;","&#84;&#117;&#101;","&#87;&#101;&#100;","&#84;&#104;&#117;&#114;","&#70;&#114;&#105;","&#83;&#97;&#116;"][a.getDay()]:["Sun","Mon","Tue","Wed","Thur","Fri","Sat"][a.getDay()]},format:function(a,c){if(!a)return"";c||(c="yyyy-MM-dd mm:ss");var d={TZ:b.toSignedNumberString(parseInt(-a.getTimezoneOffset()/60)),"q+":Math.floor((a.getMonth()+3)/3),"y+":a.getFullYear(),MN:this.getMonthName(a,!0),"M+":a.getMonth()+1,"d+":a.getDate(),WN:this.getWeekName(a),"h+":a.getHours(),"H+":function(a){return a<13?a:a-12}(a.getHours()),"m+":a.getMinutes(),MP:a.getMinutes()-(new Date).getMinutes(),"s+":a.getSeconds(),DP:function(a){return a.getHours()<12?"AM":"PM"}(a)};for(var e in d)if(new RegExp("("+e+")").test(c)){var f=RegExp.$1;c=c.replace(f,function(){return"yy"===f?d[e]%100:f.length>1&&"number"==typeof d[e]&&d[e]>-1&&d[e]<10?"0"+d[e]:d[e]})}return c}}},{requires:["./Number"]}),KISSY.add("app/util/XTemplateUtil",function(a,b,c){var d=function(){b.addCommand("getImgAbsolutePath",function(a,b){var c=b.params[0];return c?"../resources/img/"+c:"../resources/img/default_product.png"}),b.addCommand("formatPrice",function(a,b){return Number(b.params[0]).toFixed(2)}),b.addCommand("formatDateTime",function(b,d){var e=d.params[0],f="yyyy-MM-dd";return a.isNumber(e)&&(e=new Date(e)),2===d.params.length&&(f=d.params[1]),c.format(e,f)}),b.addCommand("fixedDigits",function(a,b){var c=2;return 2===b.params.length&&(c=b.params[1]),Number(b.params[0]).toFixed(c)}),b.addCommand("join",function(a,b){var c=",";return 2===b.params.length&&(c=b.params[1]),b.params[0].join(c)}),b.addCommand("getHost",function(a,b){return location.host}),b.addCommand("encodeURIComponent",function(a,b){return encodeURIComponent(b.params[0])})};return d(),{}},{requires:["xtemplate","UFO/core/lang/Date"]}),KISSY.add("app/app",function(a,b,c,d){var e=c.processParam(a.unparam(decodeURIComponent(location.search.slice(1)))),f=(navigator.userAgent.toLowerCase(),"yql_user"),g=void 0,h=0;return(h=location.pathname.lastIndexOf("build/"))>0?g=location.pathname.substring(0,h)+"build/data":(h=location.pathname.lastIndexOf("src/"))>0&&(g=location.pathname.substring(0,h)+"src/data"),console.log("api_path",g),{API_HOST:location.protocol+"//"+location.host+g,IMG_BASE_URL:"./resources/img",VERSION:"1.0.0",setSessionUser:function(a){b.setSessionItem(f,a)},getSessionUser:function(){return b.getSessionItem(f)},isLogined:function(){return!!this.getSessionUser()},getParam:function(){return e},isMicroMessenger:function(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)},notifyApp:function(a,b){var c=navigator.userAgent;if("micromessenger"==c.toLowerCase().match(/MicroMessenger/i))return void(window.location="down.html");c.match(/(iPhone|iPod|iPad);?/i)?window.location=a:c.match(/android/i)&&(window.location=b);var d=+new Date;setTimeout(function(){!window.document.webkitHidden&&setTimeout(function(){+new Date-d<2e3&&(window.location="down.html")},500)},500)}}},{requires:["UFO/util/Storage","./util/ParamUtil","./util/XTemplateUtil"]}),KISSY.add("app/Action",function(a,b,c){var d=a;return{ajax2:function(b){a.mix(b,{dataType:"json",headers:{"X-Requested-With":!1}},!1);var e=c.getSessionUser();return e&&(b.data=a.mix({user_id:e.user_id,token:e.token},b.data)),b.data=a.mix({version:c.version},b.data),d.io(b)},ajax:function(a){return a.url=c.API_HOST+a.url,this.ajax2(a)},query:function(a,b,c,d){return this.ajax({type:"GET",url:a,data:b,success:c,error:function(a){d&&d(a),alert("网络错误"),console.error(a)}})},post:function(a,b,c,d){return this.ajax({type:"post",url:a,data:b,success:c,error:function(a){d&&d(a),alert("网络错误"),console.error(a)}})},update:function(a,b,c,d){return this.post(a,b,c,d)},uploadImage2:function(a){var b=new XMLHttpRequest;a.updateProgress&&b.addEventListener("progress",a.updateProgress,!1),a.success&&b.addEventListener("load",a.success,!1),a.error&&b.addEventListener("error",a.error,!1),a.transferCanceled&&b.addEventListener("abort",a.transferCanceled,!1);var d=new FormData;d.append("uploadImage",a.file),b.open("post",c.API_HOST+"/v2/upload_image",!0),b.send(d)},postFormData:function(b,e,f,g){var h;a.isString(b)?h={}:(h=b,b=h.url,e=h.data,f=h.success,g=h.error);var i=c.getSessionUser();i&&a.mix(e,{user_id:i.user_id,token:i.token},!1);var j=new FormData;for(var k in e)j.append(k,e[k]);return a.mix(h,{type:"post",url:c.API_HOST+b,data:j,dataType:"json",headers:{"X-Requested-With":!1},cache:!1,contentType:!1,processData:!1,success:f,error:g}),d.io(h)}}},{requires:["io","./app"]}),KISSY.add("app/example/tpl/artisan-list-tpl",function(){return'<div class="list"></div>'}),KISSY.add("app/example/tpl/artisan-list-item-tpl",function(){return'{{#each data}}\n<a class="item item-avatar" href="./artisanDetail?artisan_id={{artisan_id}}">\n  <img src="{{getImgAbsolutePath avatar}}">\n  <h2>{{name}}</h2>\n  <p>服务次数{{service_count}}</p>\n</a>\n{{/each}}'}),KISSY.add("app/example/mods/ArtisanList",function(a,b,c,d,e,f,g,h,i){function j(){j.superclass.constructor.apply(this,arguments)}var k=new c(h);return KISSY.extend(j,e),UFO.augment(j,{alias:"artisanlist",initComponent:function(){console.log("ArtisanList init"),this.el=a.one(g),j.superclass.initComponent.apply(this,arguments),this.init()},init:function(){this.load()},load:function(a,b){var c=this;d.query("/artisans.json",{offset:0,page_size:20,city:"110100",filter_type:"1",business_district_ids:"205"},function(a){return a.ret?void c.el.append(k.render(a)):(alert(JSON.stringify(a)),void(b&&b(a)))},function(a){console.log("msg",a),b&&b(a)})},addCmpEvents:function(){j.superclass.addCmpEvents.apply(this,arguments)}}),j},{requires:["node","xtemplate","../../Action","UFO/Component","../../util/XTemplateUtil","../tpl/artisan-list-tpl","../tpl/artisan-list-item-tpl","css/example_artisan_list.css"]}),KISSY.add("app/example/mods/ArtisanListViewport",function(a,b,c,d){function e(a){e.superclass.constructor.call(this,a)}return a.extend(e,c),a.augment(e,{initComponent:function(){console.log("ArtisanListViewport init"),this.items=[{type:"artisanlist"}],this.title="手艺人列表",e.superclass.initComponent.apply(this,arguments)},addCmpEvents:function(){e.superclass.addCmpEvents.apply(this,arguments)}}),e},{requires:["node","../../viewport/mods/Frame","./ArtisanList"]});