
(function(global){
  var doc = document;

  var debug = false;

  var tag = '20151111';

  global.APP = global.APP || {};
  if(location.search.indexOf('debug') !== -1 ){
    debug = true;
  }


  var api_path=undefined,
    s_index  = 0;

  if((s_index=location.pathname.lastIndexOf("build/"))>0){
    api_path = location.pathname.substring(0,s_index) + "build/data";
  }else  if((s_index=location.pathname.lastIndexOf("src/"))>0){
    api_path = location.pathname.substring(0,s_index) + "src/data";
  }

  console.log("api_path", api_path);

  //正式环境
  global.G_CONFIG = {
    API_HOST: location.protocol+"//"+location.host + api_path,
    IMG_BASE_URL: './resources/img',
    VERSION: '1.0.0'

  };



  var docHead = function () {
    return doc.getElementsByTagName('head')[0] || doc.documentElement;
  };
  var headNode = docHead();

  var createScript = function(url, config) {
    var success,
      error,
      charset,
      attrs;

    config = config || {};
    success = config.success;
    error = config.error;
    charset = config.charset;
    attrs = config.attrs;

    var node = doc.createElement('script');

    if (attrs) {
      for(var n in attrs){
        node.setAttribute(n, attrs[n]);
      }
    }

    if (charset) {
      node.charset = charset;
    }

    node.src = url;
    node.async = true;

    var useNative = 'onload' in node;

    var onload = function () {
      var readyState = node.readyState;
      if (!readyState ||
        readyState === 'loaded' ||
        readyState === 'complete') {
        node.onreadystatechange = node.onload = null;
        success && success();
      }
    };

    //标准浏览器 css and all script
    if (useNative) {
      node.onload = onload;
      node.onerror = error;
    }
    // old chrome/firefox for css
    else {
      node.onreadystatechange = onload;
    }


    if (!headNode) {
      headNode = Utils.docHead();
    }
    headNode.insertBefore(node, headNode.firstChild);
    return node;
    /* var firstScript = document.getElementsByTagName('script')[0];
    if(firstScript){
      firstScript.parentNode.insertBefore(_script, firstScript);
    }else{
      head.appendChild(_script);
    }  */
  };



  var configKissy = function(){
    //KISSY.config('combine', true);
    KISSY.config({
      packages:{
        UFO: {
          path:"../../../src",
          charset:"utf-8",
          combine:false,
          //tag:KISSY.now(),
          tag: tag,
          ignorePackageNameInUri:true,
          debug:true
        },
        mui: {
          path:"../../../lib/kissy_mui",
          charset:"utf-8",
          combine:false,
          //tag:KISSY.now(),
          tag: tag,
          ignorePackageNameInUri:true,
          debug:true
        },
        app: {
          path:"../",
          charset:"utf-8",
          combine:false,
          //tag:KISSY.now(),
          tag: tag,
          ignorePackageNameInUri:true,
          debug:true
        },
        css:{
          path:"../resources/css",
          charset:"utf-8",
          combine:false,
          //tag:KISSY.now(),
          tag: tag,
          ignorePackageNameInUri:true,
          debug:true
        }

      }
    });
  };


  var seedUrl = '//g.alicdn.com/??kissy/k/1.4.14/seed-min.js?t='+tag,
    data_config = "{combine:true}";

  if(debug){
    //如果使用本地的seed.js，combine必须时fasel，因为没有动态combin的服务器
    seedUrl = '../../../lib/kissy/seed.js?t='+tag;
    data_config = "{combine:false}";
  }

  var count = 2,
    start = function(){
      console.log('--Program begin to start--');
      configKissy();
      APP.onstartup();
    },
    countToStart = function(){
      if(--count === 0){
        start();
      }
    };

  createScript('../../../src/UFO.js?t='+tag, {
    success: function(){
      console.log('--UFO.js loaded--');
      countToStart();
    }
  });
  createScript(seedUrl,  {
    attrs: {
      'data-config': data_config,
    },
    success: function(){
      console.log('--seed.js loaded--');
      countToStart();
    }
  });


})(window);

