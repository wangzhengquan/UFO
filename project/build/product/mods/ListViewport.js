/*! 2019-12-27 */
KISSY.add("app/viewport/tpl/main-tpl",function(){return'<div class="main">\n\t{{^if no_header}}\n\t<header class="bar bar-black bar-header">\n\t\t{{#each leftButtons}}\n\t\t<a href="{{#if href}}{{href}}{{else}}javascript:;{{/if}}" class="button button-clear {{cls}}">\n\t\t\t{{text}} {{#if iconCls}} <i class="icon iconfont {{iconCls}}"></i> {{/if}}\n\t\t</a>\n\t\t{{/each}}\n\t\t<h1 class="title">{{title}}</h1>\n\t\t<div class="buttons buttons-right">\t\n\t\t\t\t{{#each rightButtons}}\n\t\t\t\t<a href="{{#if href}}href{{else}}javascript:;{{/if}}" class="button button-clear {{cls}}"\n\t\t\t\t{{#if attributes}}\n\t\t\t\t\t{{#each attributes}} {{xindex}}="{{this}}" {{/each}}\n\t\t\t\t{{/if}}>\n\t\t\t\t\n\t\t\t\t\t{{text}} {{#if iconCls}} <i class="icon iconfont {{iconCls}}"></i> {{/if}}\n\t\t\t\t</a>\n\t\t\t\t{{/each}}\n\t\t</div>\n\t</header>\n\t{{/if}}\n\t<div class="content {{^if no_header}}has-header{{/if}}">\n\t</div>\n</div>'}),KISSY.add("app/viewport/mods/Frame",function(a,b,c,d,e){function f(a){f.superclass.constructor.call(this,a)}return a.extend(f,d),a.augment(f,{initComponent:function(){var b=this.config=this.config||{};a.mix(b,{title:this.title,leftButtons:this.leftButtons,rightButtons:this.rightButtons},!1),this.el=a.one(new c(e).render(b)),this.content=this.el.one(".content"),f.superclass.initComponent.apply(this,arguments)},getBodyContainer:function(){return this.content},addCmpEvents:function(){f.superclass.addCmpEvents.apply(this,arguments)}}),f},{requires:["node","xtemplate","UFO/container/Container","../tpl/main-tpl"]}),KISSY.add("app/util/XTemplateUtil",function(a,b,c){var d=function(){b.addCommand("getImgAbsolutePath",function(a,b){var c=b.params[0];return c?"../resources/img/"+c:"../resources/img/default_product.png"}),b.addCommand("formatPrice",function(a,b){return Number(b.params[0]).toFixed(2)}),b.addCommand("formatDateTime",function(b,d){var e=d.params[0],f="yyyy-MM-dd";return a.isNumber(e)&&(e=new Date(e)),2===d.params.length&&(f=d.params[1]),c.format(e,f)}),b.addCommand("fixedDigits",function(a,b){var c=2;return 2===b.params.length&&(c=b.params[1]),Number(b.params[0]).toFixed(c)}),b.addCommand("join",function(a,b){var c=",";return 2===b.params.length&&(c=b.params[1]),b.params[0].join(c)}),b.addCommand("getHost",function(a,b){return location.host}),b.addCommand("encodeURIComponent",function(a,b){return encodeURIComponent(b.params[0])})};return d(),{}},{requires:["xtemplate","UFO/core/lang/Date"]}),KISSY.add("app/product/tpl/list-tpl",function(){return'<div class="product-scroll-content scroll-content">\n\t<ul class="product-list">\n\t\t\n\t</ul>\n</div>'}),KISSY.add("app/product/tpl/list-item-tpl",function(){return'\t{{#each list}}\n\t\t{{#if type==="1"}}\n\t\t\t<li class="product-item">\n\t\t\t\t<a href="{{jump_address}}"></a><img src="{{getImgAbsolutePath img_url}}" style="width:100%;"></a>\n\t\t\t</li>\n\t\t{{else}}\n\t\t<li class="product-item">\n\t\t\t<a href="javascript:;" class="card" data-product_id="{{product_id}}">\n\t\t\t\t<div class="img-wrapper" style="{{#if ../productImgWidth}}width:{{../productImgWidth}}; height: {{../productImgHeight}};{{/if}}">\n\t\t\t\t\t{{#if tag}}\n\t\t\t\t\t<label class="product-label">{{tag}}</label>\n\t\t\t\t\t{{/if}}\n\t\t\t\t\t{{#if type==="3"}}\n\t\t\t\t\t<div class="bottom-float-layer">\n\t\t\t\t\t\t<i class="one2many-label">一对多</i> &nbsp; · &nbsp;<i>{{service_start_time}}</i> &nbsp; · &nbsp;<i>{{simple_address}}</i>&nbsp; · &nbsp; <i>已报{{apply_nums}}/{{limit_nums}}</i>\n\t\t\t\t\t</div>\n\t\t\t\t\t{{/if}}\n\t\t\t\t\t<div class="artisan-photo-wrapper">\n\t\t\t\t\t\t<img src="{{getImgAbsolutePath head_photo_url}}">\n\t\t\t\t\t</div>\n\t\t\t\t\t<img class="product-img" \n\t\t\t\t\t\t style="{{#if ../productImgWidth}} min-width:{{../productImgWidth}}; min-height: {{../productImgHeight}};{{/if}}" \n\t\t\t\t\t\t data-src="{{getImgAbsolutePath img_url}}">\n\t\t\t\t</div>\n\t\t\t\t<h2 class="product-desc">\n\t\t\t\t\t{{title}}\n\t\t\t\t</h2>\n\t\t\t\t<h3 class="artisan-desc">\n\t\t\t\t\t<span class="artisan-name">{{nick_modify}}</span>\n\t\t\t\t\t{{#if subtitle}}\n\t\t\t\t\t<span class="artisan-title">{{{subtitle}}}</span>\n\t\t\t\t\t{{/if}}\n\t\t\t\t</h3>\n\t\t\t\t<div class="price-desc">\n\t\t\t\t\t<span class="now-price">\n\t\t\t\t\t\t{{zhima_price}}<i class="unit">元</i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="old-price">\n\t\t\t\t\t\t{{market_price}}元\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</li>\n\t\t{{/if}}\n\t{{/each}}\n'}),KISSY.add("app/tpl/spinner-loading-tpl",function(){return'\n<span class="spinner spinner-ios-small" style="text-align: center; display: block; width: 100%;"><svg\n\t\tviewBox="0 0 64 64">\n\t\t<g stroke-width="4" stroke-linecap="round">\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(180)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(210)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(240)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(270)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(300)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(330)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(0)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(30)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(60)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(90)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(120)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(150)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1"\n\t\t\trepeatCount="indefinite"></animate></line></g></svg></span>\n'}),KISSY.add("app/util/ParamUtil",function(a){return{processParam:function(b){for(var c in b){var d=b[c];a.isArray(d)&&(b[c]=d[0])}return b}}}),KISSY.add("app/app",function(a,b,c,d){var e=c.processParam(a.unparam(decodeURIComponent(location.search.slice(1)))),f=(navigator.userAgent.toLowerCase(),"yql_customer_position"),g="yql_user",h=void 0,i=void 0,j=[{name:"北京市",code:"110100"},{name:"上海市",code:"310100"},{name:"杭州市",code:"330100"},{name:"成都市",code:"510100"},{name:"深圳市",code:"440300"},{name:"广州市",code:"440100"},{name:"武汉市",code:"420100"},{name:"南京市",code:"320100"},{name:"天津市",code:"120100"},{name:"重庆市",code:"500100"}];return{getCity:function(a){return this.getCityMap()[a]||this.getCityMap()[110100]},getCityByName:function(a){return/市$/.test(a)||(a+="市"),this.getNameKeyCityMap()[a]||this.getNameKeyCityMap()["北京市"]},getCityMap:function(){if(!h){h={};for(var a,b=0,c=j.length;b<c;b++)a=j[b],h[a.code]=a}return h},getNameKeyCityMap:function(){if(!i){i={};for(var a,b=0,c=j.length;b<c;b++)a=j[b],i[a.name]=a}return i},getCityList:function(a){return a&&a(result),j},setPosition:function(a){console.log("position",a),a.city_code||(a.city_code=this.getCityByName(a.city).code),b.setSessionItem(f,a)},getPosition:function(){b.getSessionItem(f)},setSessionUser:function(a){b.setSessionItem(g,a)},getSessionUser:function(){return b.getSessionItem(g)},isLogined:function(){return!!this.getSessionUser()},getParam:function(){return e},isMicroMessenger:function(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)},notifyApp:function(a,b){var c=navigator.userAgent;if("micromessenger"==c.toLowerCase().match(/MicroMessenger/i))return void(window.location="down.html");c.match(/(iPhone|iPod|iPad);?/i)?window.location=a:c.match(/android/i)&&(window.location=b);var d=+new Date;setTimeout(function(){!window.document.webkitHidden&&setTimeout(function(){+new Date-d<2e3&&(window.location="down.html")},500)},500)}}},{requires:["UFO/util/Storage","./util/ParamUtil","./util/XTemplateUtil"]}),KISSY.add("app/Action",function(a,b,c){var d=a;return{ajax2:function(b){a.mix(b,{dataType:"json",headers:{"X-Requested-With":!1}},!1);var e=c.getSessionUser();return e&&(b.data=a.mix({user_id:e.user_id,token:e.token},b.data)),b.data=a.mix({version:G_CONFIG.version},b.data),d.io(b)},ajax:function(a){return a.url=G_CONFIG.API_HOST+a.url,this.ajax2(a)},query:function(a,b,c,d){return this.ajax({type:"GET",url:a,data:b,success:c,error:function(a){d&&d(a),alert("网络错误"),console.error(a)}})},post:function(a,b,c,d){return this.ajax({type:"post",url:a,data:b,success:c,error:function(a){d&&d(a),alert("网络错误"),console.error(a)}})},update:function(a,b,c,d){return this.post(a,b,c,d)},uploadImage2:function(a){var b=new XMLHttpRequest;a.updateProgress&&b.addEventListener("progress",a.updateProgress,!1),a.success&&b.addEventListener("load",a.success,!1),a.error&&b.addEventListener("error",a.error,!1),a.transferCanceled&&b.addEventListener("abort",a.transferCanceled,!1);var c=new FormData;c.append("uploadImage",a.file),b.open("post",G_CONFIG.API_HOST+"/v2/upload_image",!0),b.send(c)},postFormData:function(b,e,f,g){var h;a.isString(b)?h={}:(h=b,b=h.url,e=h.data,f=h.success,g=h.error);var i=c.getSessionUser();i&&a.mix(e,{user_id:i.user_id,token:i.token},!1);var j=new FormData;for(var k in e)j.append(k,e[k]);return a.mix(h,{type:"post",url:G_CONFIG.API_HOST+b,data:j,dataType:"json",headers:{"X-Requested-With":!1},cache:!1,contentType:!1,processData:!1,success:f,error:g}),d.io(h)}}},{requires:["io","./app"]}),KISSY.add("app/product/mods/List",function(a,b,c,d,e,f,g,h,i,j,k,l,m){function n(b,c,d){function e(){f&&(f.cancel(),f=0),g=a.now(),b.apply(d||this,arguments),h=a.now()}var f,g=0,h=0,c=c||150;return a.mix(function(){!g||h>=g&&a.now()-h>c||h<g&&a.now()-g>8*c?e.apply(d,arguments):(f&&f.cancel(),f=a.later(e,c,0,d,arguments))},{stop:function(){f&&(f.cancel(),f=0)}})}function o(a){o.superclass.constructor.call(this,a)}var p=window,q=a.one(l);return a.extend(o,f),UFO.augment(o,{alias:"productlist",initComponent:function(){this.el=a.one(j),this.List=this.el.one("ul"),this.scrollView=this.el,this.scrollViewDom=this.scrollView.getDOMNode(),o.superclass.initComponent.apply(this,arguments),this.init()},init:function(){this.load({})},calcImgSize:function(a){var b=this.productImgWidth=this.List.width(),c=this.productImgHeight=224*this.productImgWidth/300;b?a&&a(b,c):setTimeout(function(){calcImgSize(a)},2e3)},setImgSize:function(a){var b=this;this.calcImgSize(function(c,d){b.el.all(".product-list .card .img-wrapper").css({width:c,height:d}),b.el.all(".product-list .card .img-wrapper > img").css({"min-width":c,"min-height":d}),a&&a()})},showLoadingMoreMask:function(){this.List.append(q)},removeLoadingMoreMask:function(){q.remove()},load:function(a,b){var c=this;a.offset=0,this.params=a,this.query(a,function(a){c.setImgSize(function(){c.actInview()}),a||c.addScrollListener(),b&&b(a)})},loadMore:function(a){console.log("loadmore-----");var b=this,c=this.params;c.offset=c.offset+c.page_size,this.query(c,function(c){b.actInview(),a&&a(c)})},query:function(a,b,c){var d=this;d.showLoadingMoreMask(),d.scrollViewDom.scrollTop=d.scrollViewDom.scrollTop+28,a=this.params=a||this.params,m.query("/products.json",a,function(c){console.log("query",c),d.removeLoadingMoreMask(),d.List.append(new e(k,{commands:{getProductHref:function(a,b){var c=b.params[0];return"#"+c}}}).render({list:c,productImgWidth:d.productImgWidth,productImgHeight:d.productImgHeight})),b&&b(c.length<a.page_size)},function(a){d.removeLoadingMoreMask(),c&&c(),console.log("msg",a)})},actInview:function(){var b=this;b.imgLazyLoad?(b.imgLazyLoad.addElements(b.imgLazyLoad.get("container")),b.imgLazyLoad.refresh()):b.imgLazyLoad=new g({container:b.scrollView,autoDestroy:!1}),b.labelLazyload||(b.labelLazyload=new g({container:b.scrollView,autoDestroy:!1,type:"div"})),b.labelLazyload.clear();var d=c.query(".product-list .card .img-wrapper .product-label");a.each(d,function(a){b.labelLazyload.addCallback(a,function(a){return c.addClass(a,"inview"),!1},function(a){c.removeClass(a,"inview")})})},addCmpEvents:function(){var a=this,b=function(b){return n(function(){a.scrollViewDom.scrollTop+a.scrollViewDom.clientHeight+p.innerHeight>=a.scrollViewDom.scrollHeight&&(a.removeScrollListener(),a.loadMore(function(b){b||a.addScrollListener()}))},500)}();this.addScrollListener=function(){d.on(a.scrollViewDom,"scroll",b)},this.removeScrollListener=function(){d.detach(a.scrollViewDom,"scroll",b)},this.el.delegate("click","a.card",function(a){return i.alert("alert","You are nice!"),!1}),d.on(p,"resize",function(b){a.setImgSize()})}}),o},{requires:["node","dom","event","xtemplate","UFO/Component","UFO/lazyload/Lazyload","../../util/XTemplateUtil","UFO/popup/MessageBox","../tpl/list-tpl","../tpl/list-item-tpl","../../tpl/spinner-loading-tpl","../../Action"]}),KISSY.add("app/product/mods/ListViewport",function(a,b,c,d){function e(a){e.superclass.constructor.call(this,a)}return a.extend(e,c),a.augment(e,{initComponent:function(){var a=new d;this.items=[a],this.title="活动列表",e.superclass.initComponent.apply(this,arguments)},addCmpEvents:function(){e.superclass.addCmpEvents.apply(this,arguments)}}),e},{requires:["node","../../viewport/mods/Frame","./List"]});