KISSY.add(function(S, Node, Event, XTemplate, Button, Container, 
		tpl, nav_bar_block_tpl, 
		tabitem_tpl,
		tab_item_body_tpl){
	
	var body = document.body,
		tabitemTpl = new XTemplate(tabitem_tpl),
		navBarBlockTpl = new XTemplate(nav_bar_block_tpl);
 
	
	function TabPanel(config){
		config = S.mix(config || {}, {
			defaultTab: 0,
		}, false);
		TabPanel.superclass.constructor.call(this, config);
	}
	
	S.extend(TabPanel, Container);
	
	UFO.augment(TabPanel, {
		alias: 'tabpanel',
		
		initComponent: function(){
			this.el = S.one(tpl);
			this.tabNav = this.el.one('.tab-nav');
			if(this.tabNavCls){
				this.tabNav.addClass(this.tabNavCls);
			}
			this.navBarContainer = this.el.one('.nav-bar-container');
			TabPanel.superclass.initComponent.apply(this, arguments);
			this.init();
		},
		
		init: function(){
			this.setActiveTab(this.defaultTab);
		},
		
		getBodyContainer: function(){
			return this.el.one('[name=tab-container]');
		},
		
		add: function(items, pos){
			//console.log(items);
			this.items = this.items || [];
			for(var i=0,len=items.length; i<len; i++){
				var item = items[i];
				 
				this.items.push(item);
				
				this.tabNav.append(tabitemTpl.render({
					name: item.name,
					title: item.title,
					iconCls: item.iconCls,
					iconInCls: item.iconInCls
				}));
			}
			
		},
		
		/**
		 * 创建选项卡主体
		 * @param item
		 */
		createTabItem: function(item, index){
			var tabBody = this.el.one(tab_item_body_tpl);
			
			this.getBodyContainer().append(tabBody);
			
			var cmp = UFO.createItem(item);
			var navBarBlock= S.one(navBarBlockTpl.render(cmp.navBar));
			this.navBarContainer.append(navBarBlock);
			
			S.mix(cmp, {
				navBarBlock:navBarBlock,
				tabBody: tabBody,
				loaded: true
			});
			this.items[index] = cmp;
			
			if(cmp.navBar && cmp.navBar.leftButtons){
				var buttonsLeftBlock = navBarBlock.one('.buttons-left');
				for(var i=0,len=cmp.navBar.leftButtons.length; i<len; i++){
					buttonsLeftBlock.append(UFO.createItem(cmp.navBar.leftButtons[i], {type: 'button'}).toEl());
				}
			}
			
			if(cmp.navBar && cmp.navBar.rightButtons){
				var buttonsRightBlock = navBarBlock.one('.buttons-right');
				for(var i=0,len=cmp.navBar.rightButtons.length; i<len; i++){
					buttonsRightBlock.append(UFO.createItem(cmp.navBar.rightButtons[i], {type: 'button'}).toEl());
				}
			}
			tabBody.one('.scroll-content').append(cmp.getEl());
		},
		
		/**
		 * 显示被选中的选项卡
		 * @param index
		 */
		setActiveTabStyle: function(index){
			this.tabNav.all('.tab-item').removeClass('tab-item-active');
			var tabItem = this.tabNav.one('.tab-item:nth-child('+(index+1)+')');
			tabItem.addClass('tab-item-active');
			
			for(var i=0,len=this.items.length; i<len; i++){
				var item = this.items[i];
				if(item.loaded){
					item.navBarBlock.attr('nav-bar', 'cached');
					item.tabBody.attr('nav-view', 'cached');
				}
			}
			this.items[index].navBarBlock.attr('nav-bar', 'active');
			this.items[index].tabBody.attr('nav-view', 'active');
		},
		
		/**
		 * 切换选项卡
		 * @param tab
		 */
		setActiveTab: function(tab, cb){
			var me = this;
			if(S.isString(tab)){
				for(var i=0,len=this.items.length; i<len; i++){
					if(this.items[i].name == tab){
						tab = i;
						break;
					}
				}
			}
			
			if(S.isNumber(tab)){
				var index = tab,
					item = this.items[index];
				
				if(!item.loaded){
					//懒加载，如果有path(引用路径)，可实现按需加载js组件
					if(item.path){
						S.use(item.path, function(S, constructor){
							me.createTabItem(item, index);
							location.hash=item.name;
							me.setActiveTabStyle(index);
							cb && cb();
						});
					}else{
						
						me.createTabItem(item, index);
						location.hash=item.name;
						me.setActiveTabStyle(index);
						cb && cb();
					}
					//this.load(item, tabBody.one('.scroll-content'), navBarBlock, index);
				}else{
					location.hash=item.name;
					me.setActiveTabStyle(index);
					cb && cb();
				}
			}else{
				console.error('no tab of the name '+ tab);
			}
		},
		
		load: function(item, tabBody, navBarBlock, index){
			console.log('tabBody', tabBody);
			//console.log(UFO.createItem(item));
		},
		
		addCmpEvents: function(){
			TabPanel.superclass.addCmpEvents.apply(this, arguments);
			var me = this;
			S.one(document.body).delegate('click tap', '.tab-item:not([disabled])', function(event){
				var target = S.one(event.currentTarget),
					index = target.index();
				
				if(target.hasClass('tab-item-active')){
					return false;
				}
				
				target.attr('disabled', 'disabled');
				var resultes = me.fire('tabclick', index, target);
				var active = true;
				if(resultes!==undefined){
					if(!S.isArray(resultes)){
						resultes = [resultes];
					}
					for(var i=0,len=resultes.length;i<len;i++){
						if(resultes[i] === false){
							active = false;
							break;
						}
					}
				}
				if(active && !target.hasClass('tab-item-active')){
					me.setActiveTab(index, function(){
						target.removeAttr('disabled');
					});
				}
				return false;
				//alert(index);
			});
		}
		
		
	 
	});
	
	return TabPanel;
}, {
	requires: ["node", "event", "xtemplate",  
	           "../button/Button",
	           "../container/Container",
	           "./tpl/tabpanel-tpl",
	           "./tpl/nav-bar-block-tpl",
	           "./tpl/tabitem-tpl", "./tpl/tab-item-body-tpl"]
});