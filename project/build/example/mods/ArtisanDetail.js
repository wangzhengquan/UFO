/*! 2019-12-27 */
KISSY.add("app/util/ParamUtil",function(a){return{processParam:function(b){for(var c in b){var d=b[c];a.isArray(d)&&(b[c]=d[0])}return b}}}),KISSY.add("app/util/XTemplateUtil",function(a,b,c){var d=function(){b.addCommand("getImgAbsolutePath",function(a,b){var c=b.params[0];return c?"../resources/img/"+c:"../resources/img/default_product.png"}),b.addCommand("formatPrice",function(a,b){return Number(b.params[0]).toFixed(2)}),b.addCommand("formatDateTime",function(b,d){var e=d.params[0],f="yyyy-MM-dd";return a.isNumber(e)&&(e=new Date(e)),2===d.params.length&&(f=d.params[1]),c.format(e,f)}),b.addCommand("fixedDigits",function(a,b){var c=2;return 2===b.params.length&&(c=b.params[1]),Number(b.params[0]).toFixed(c)}),b.addCommand("join",function(a,b){var c=",";return 2===b.params.length&&(c=b.params[1]),b.params[0].join(c)}),b.addCommand("getHost",function(a,b){return location.host}),b.addCommand("encodeURIComponent",function(a,b){return encodeURIComponent(b.params[0])})};return d(),{}},{requires:["xtemplate","UFO/core/lang/Date"]}),KISSY.add("app/app",function(a,b,c,d){var e=c.processParam(a.unparam(decodeURIComponent(location.search.slice(1)))),f=(navigator.userAgent.toLowerCase(),"yql_customer_position"),g="yql_user",h=void 0,i=void 0,j=[{name:"北京市",code:"110100"},{name:"上海市",code:"310100"},{name:"杭州市",code:"330100"},{name:"成都市",code:"510100"},{name:"深圳市",code:"440300"},{name:"广州市",code:"440100"},{name:"武汉市",code:"420100"},{name:"南京市",code:"320100"},{name:"天津市",code:"120100"},{name:"重庆市",code:"500100"}];return{getCity:function(a){return this.getCityMap()[a]||this.getCityMap()[110100]},getCityByName:function(a){return/市$/.test(a)||(a+="市"),this.getNameKeyCityMap()[a]||this.getNameKeyCityMap()["北京市"]},getCityMap:function(){if(!h){h={};for(var a,b=0,c=j.length;b<c;b++)a=j[b],h[a.code]=a}return h},getNameKeyCityMap:function(){if(!i){i={};for(var a,b=0,c=j.length;b<c;b++)a=j[b],i[a.name]=a}return i},getCityList:function(a){return a&&a(result),j},setPosition:function(a){console.log("position",a),a.city_code||(a.city_code=this.getCityByName(a.city).code),b.setSessionItem(f,a)},getPosition:function(){b.getSessionItem(f)},setSessionUser:function(a){b.setSessionItem(g,a)},getSessionUser:function(){return b.getSessionItem(g)},isLogined:function(){return!!this.getSessionUser()},getParam:function(){return e},isMicroMessenger:function(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)},notifyApp:function(a,b){var c=navigator.userAgent;if("micromessenger"==c.toLowerCase().match(/MicroMessenger/i))return void(window.location="down.html");c.match(/(iPhone|iPod|iPad);?/i)?window.location=a:c.match(/android/i)&&(window.location=b);var d=+new Date;setTimeout(function(){!window.document.webkitHidden&&setTimeout(function(){+new Date-d<2e3&&(window.location="down.html")},500)},500)}}},{requires:["UFO/util/Storage","./util/ParamUtil","./util/XTemplateUtil"]}),KISSY.add("app/Action",function(a,b,c){var d=a;return{ajax2:function(b){a.mix(b,{dataType:"json",headers:{"X-Requested-With":!1}},!1);var e=c.getSessionUser();return e&&(b.data=a.mix({user_id:e.user_id,token:e.token},b.data)),b.data=a.mix({version:G_CONFIG.version},b.data),d.io(b)},ajax:function(a){return a.url=G_CONFIG.API_HOST+a.url,this.ajax2(a)},query:function(a,b,c,d){return this.ajax({type:"GET",url:a,data:b,success:c,error:function(a){d&&d(a),alert("网络错误"),console.error(a)}})},post:function(a,b,c,d){return this.ajax({type:"post",url:a,data:b,success:c,error:function(a){d&&d(a),alert("网络错误"),console.error(a)}})},update:function(a,b,c,d){return this.post(a,b,c,d)},uploadImage2:function(a){var b=new XMLHttpRequest;a.updateProgress&&b.addEventListener("progress",a.updateProgress,!1),a.success&&b.addEventListener("load",a.success,!1),a.error&&b.addEventListener("error",a.error,!1),a.transferCanceled&&b.addEventListener("abort",a.transferCanceled,!1);var c=new FormData;c.append("uploadImage",a.file),b.open("post",G_CONFIG.API_HOST+"/v2/upload_image",!0),b.send(c)},postFormData:function(b,e,f,g){var h;a.isString(b)?h={}:(h=b,b=h.url,e=h.data,f=h.success,g=h.error);var i=c.getSessionUser();i&&a.mix(e,{user_id:i.user_id,token:i.token},!1);var j=new FormData;for(var k in e)j.append(k,e[k]);return a.mix(h,{type:"post",url:G_CONFIG.API_HOST+b,data:j,dataType:"json",headers:{"X-Requested-With":!1},cache:!1,contentType:!1,processData:!1,success:f,error:g}),d.io(h)}}},{requires:["io","./app"]}),KISSY.add("app/example/tpl/artisan-detail-tpl",function(){return'<div class="main artisan-view">\n\t<header class="bar-love header bar">\n\t\t<a class="button button-clear button-back" href="javascript:history.go(-1);">\n\t\t\t<i class="icon iconfont icon-back"></i>\n\t\t</a>\n\t\t<h1 class="title">{{title}}</h1>\n\t\t<div class="buttons buttons-right" style="-webkit-transition-duration: 0ms; transition-duration: 0ms;">\t\n\t\t</div>\n\t</header>\n\t<div class="content has-header">\n\t</div>\n</div>'}),KISSY.add("app/example/tpl/artisan-detail-content-tpl",function(){return'<section>\n\t\t<div class="item item-thumbnail-left item-header">\n\t\t\t<a class="item-image" data-url="{{#if large_avatar}}{{large_avatar}}{{else}}{{avatar}}{{/if}}" style="left:0;" href="javascript:;">\n\t\t\t<img class="header-img" src="{{#if avatar}}{{getImgAbsolutePath avatar}}{{else}}../../resources/img/default_user.png{{/if}}"> </a>\n\t\t\t<div class="item-detail">\n\t\t\t\t<h3 class="name">{{name}}</h3>\n\t\t\t\t<a href="javascript:;" class="star-info">\n\t\t\t\t\t{{#if artisan_level}}\n\t\t\t\t\t<img src="../resources/img/star/{{artisan_level*0.5}}.gif" style="width:{{calWidth artisan_level}}px;"> \n\t\t\t\t\t{{/if}}\n\t\t\t\t\t{{#if artisan_glory}}<img src="../resources/img/star/glory.jpg" style="width: 20px; margin-top:3px; margin-left:-7px;" >{{/if}}\n\t\t\t\t\t({{artisan_level_value}})\n\t\t\t\t</a>\n\t\t\t\t<div class="flex row-center detail">\n\t\t\t\t\t<span class="price">均价:￥{{ave_price}}</span>\n\t\t\t\t\t<span class="time">接单数:{{service_times}}</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\n\t\t<ul class="item item-score flex row-divid-line-col" style="padding-top:10px; padding-bottom:10px;">\n\t\t\t<li class="col">专业：<i class="i1">{{fixedDigits score_skill}}</i></li>\n\t\t\t<li class="col">沟通：<i class="i2">{{fixedDigits score_communication}}</i></li>\n\t\t\t<li class="col">守时：<i class="i3">{{fixedDigits score_punctuality}}</i></li>\n\t\t</ul>\n\t\t{{#if store_serial}}\n\t\t<a class="item  item-icon-right" href="./shopDisplay.html?store_serial={{store_serial}}&isApp={{isApp}}">\n\t\t  <label class="item-label">来自：</label>\n\t\t  {{store_name}}\n\t\t\t<i class="icon iconfont icon-forward"></i>\n\t\t</a>\n\t\t{{/if}}\n\t</section>\t'}),KISSY.add("app/example/mods/ArtisanDetail",function(a,b,c,d,e,f,g,h){var i=f.getParam();return{init:function(){var b=this.el=a.one(new c(g).render({title:"手艺人详情"}));this.content=b.one(".content"),a.one(document.body).append(b),this.render(),this.attachEvents()},render:function(){var b=this;d.query("/artisan.json",{artisan_id:i.artisan_id,city:"110100"},function(d){var e=d.data;console.log("artisan_detail",d),b.content.append(new c(h,{commands:{calWidth:function(a,b){return 20*Math.round(.5*b.params[0])},notEmpty:function(b,c){return a.isEmptyObject(c.params[0])?"":c.fn(b)}}}).render(e))})},attachEvents:function(){this.el.delegate("click",".item-header a.item-image",function(a){alert("我点击了手艺人头像")})}}},{requires:["node","xtemplate","../../Action","../../util/XTemplateUtil","../../app","../tpl/artisan-detail-tpl","../tpl/artisan-detail-content-tpl"]});