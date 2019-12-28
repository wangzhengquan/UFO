(function(global){
  
  var tag = '20151111';
  /*这里配置的路径是以浏览器访问路径为基准，grunt文件里kmc配置路径是以工程目录为基准*/
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
        }
      }
    });

  // var debug = false;
  // global.APP = global.APP || {};
  // if(location.search.indexOf('debug') !== -1 ){
  //   debug = true;
  // }

  // var doc = document; 
  // var docHead = function () {
  //     return doc.getElementsByTagName('head')[0] || doc.documentElement;
  //   };
  //   var headNode = docHead();

  //   var createScript = function(url, config) {
  //     var success,
  //       error,
  //       charset,
  //       attrs;

  //     config = config || {};
  //     success = config.success;
  //     error = config.error;
  //     charset = config.charset;
  //     attrs = config.attrs;

  //     var node = doc.createElement('script');

  //     if (attrs) {
  //       for(var n in attrs){
  //         node.setAttribute(n, attrs[n]);
  //       }
  //     }

  //     if (charset) {
  //       node.charset = charset;
  //     }

  //     node.src = url;
  //     node.async = true;

  //     var useNative = 'onload' in node;

  //     var onload = function () {
  //       var readyState = node.readyState;
  //       if (!readyState ||
  //         readyState === 'loaded' ||
  //         readyState === 'complete') {
  //         node.onreadystatechange = node.onload = null;
  //         success && success();
  //       }
  //     };

  //     //标准浏览器 css and all script
  //     if (useNative) {
  //       node.onload = onload;
  //       node.onerror = error;
  //     }
  //     // old chrome/firefox for css
  //     else {
  //       node.onreadystatechange = onload;
  //     }


  //     if (!headNode) {
  //       headNode = Utils.docHead();
  //     }
  //     headNode.insertBefore(node, headNode.firstChild);
  //     return node;
  //     /* var firstScript = document.getElementsByTagName('script')[0];
  //     if(firstScript){
  //       firstScript.parentNode.insertBefore(_script, firstScript);
  //     }else{
  //       head.appendChild(_script);
  //     }  */
  //   };

  // var seedUrl = '//g.alicdn.com/??kissy/k/1.4.14/seed-min.js?t='+tag,
  //   data_config = "{combine:true}";

  // if(debug){
  //   //如果使用本地的seed.js，combine必须时fasel，因为没有动态combin的服务器
  //   seedUrl = '../../../lib/kissy/seed.js?t='+tag;
  //   data_config = "{combine:false}";
  // }

  // var count = 2,
  //   start = function(){
  //     console.log('--Program begin to start--');
  //     configKissy();
  //     APP.onstartup && APP.onstartup();
  //   },
  //   countToStart = function(){
  //     if(--count === 0){
  //       start();
  //     }
  //   };

  // createScript('../../../src/UFO.js?t='+tag, {
  //   success: function(){
  //     console.log('--UFO.js loaded--');
  //     countToStart();
  //   }
  // });
  // createScript(seedUrl,  {
  //   attrs: {
  //     'data-config': data_config,
  //   },
  //   success: function(){
  //     console.log('--seed.js loaded--');
  //     countToStart();
  //   }
  // });


})(window);

