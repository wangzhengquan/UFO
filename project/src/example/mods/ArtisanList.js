KISSY.add(function(S, Node, XTemplate, Action, Component, XTemplateUtil, list_tpl, list_item_tpl){
		
	var listItemTpl = new XTemplate(list_item_tpl);
	function ArtisanList(){
		ArtisanList.superclass.constructor.apply(this, arguments);
	}
	
	//继承自Component
	KISSY.extend(ArtisanList, Component);	
	
	UFO.augment(ArtisanList, {
		/**
		 * 别名
		 */
		alias: 'artisanlist',
		/**
		 * 继承自Component
		 * @overide
		 */
		initComponent: function(){
			console.log("ArtisanList init");
			this.el = S.one(list_tpl);
			 
			ArtisanList.superclass.initComponent.apply(this, arguments);
			
			this.init();
		},

		/**
		 * 初始化
		 */
		init:function(){
			this.load();
		},
		
		 
		/**
		 *  加载
		 * @param suc
		 * @param error
		 */
		load: function(suc, error){
			var me = this;
			Action.query("/artisans.json", {
				offset:0,
				page_size: 20,
				city: '110100',
				filter_type: '1',
				business_district_ids: '205'
			}, function(json){
				if(!json.ret){
					alert(JSON.stringify(json));
					error && error(json);
					return;
				}
				me.el.append(listItemTpl.render(json));
				 
			}, function(msg){
				console.log('msg', msg);
				error && error(msg);
			});
		},
	 
		/**
		 * 事件绑定
		 * @override
		 */
		addCmpEvents: function(){
			ArtisanList.superclass.addCmpEvents.apply(this, arguments);
		}
		 
	});
	return ArtisanList;
},{
	requires: [ "node",  "xtemplate", 
	             "../../Action", 
	            "UFO/Component",
	            "../../util/XTemplateUtil",
	            "../tpl/artisan-list-tpl",
	            "../tpl/artisan-list-item-tpl"
	            ]
});

 