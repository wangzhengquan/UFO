KISSY.add(function(S,
  Node,
  XTemplate,
  Action,
  XTemplateUtil,
  app,
  tpl,
  content_tpl,
  mycss){

  var PARAM = app.getParam();


  return {
    /**
    * 初始化
    * @returns
    */
    init: function(){
      var el = this.el = S.one(new XTemplate(tpl).render({
        title: '手艺人详情'
      }));

      this.content = el.one('.content');
      this.render();
      S.one(document.body).append(el);

      
      this.attachEvents();
    },

    /**
    * 渲染
    * @returns
    */
    render: function(){
      var me = this;

      Action.query('/artisan.json', {
        artisan_id: PARAM.artisan_id,
        city: '110100'
      }, function(json){
        var artisanData = json.data;
        console.log("artisan_detail", json);
        // me.content.append('<div>hello world</div>');
        me.content.append(new XTemplate(content_tpl,{
          commands: {
            'calWidth': function (scopes, option) {
              return Math.round(option.params[0]*.5)*20;
            },
            'notEmpty': function (scopes, option) {
              return S.isEmptyObject(option.params[0])? '': option.fn(scopes);
            }
          }
        }).render(artisanData));
      });
    },

    /**
    * 事件绑定
    * @returns
    */
    attachEvents : function(){
      var me = this;
      /**
        * 点击手艺人头像
        */
        this.el.delegate('click', '.item-header a.item-image', function(event){
          alert("我点击了手艺人头像");
        });
    }
  };

}, {
  requires: [
    'node',
    "xtemplate",
    "../../Action",
    "../../util/XTemplateUtil",
    "../../app",
    "../tpl/artisan-detail-tpl",
    "../tpl/artisan-detail-content-tpl",
    "css/example_artisan_detail.css"
  ]
});


