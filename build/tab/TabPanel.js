/*! 2019-12-28 */

KISSY.add(function(c,t,a,e,n,i,s,o,r,v){document.body;var l=new e(r),h=new e(o);function b(t){t=c.mix(t||{},{defaultTab:0},!1),b.superclass.constructor.call(this,t)}return c.extend(b,i),UFO.augment(b,{alias:"tabpanel",initComponent:function(){this.el=c.one(s),this.tabNav=this.el.one(".tab-nav"),this.tabNavCls&&this.tabNav.addClass(this.tabNavCls),this.navBarContainer=this.el.one(".nav-bar-container"),b.superclass.initComponent.apply(this,arguments),this.init()},init:function(){this.setActiveTab(this.defaultTab)},getBodyContainer:function(){return this.el.one("[name=tab-container]")},add:function(t,a){this.items=this.items||[];for(var e=0,n=t.length;e<n;e++){var i=t[e];this.items.push(i),this.tabNav.append(l.render({name:i.name,title:i.title,iconCls:i.iconCls,iconInCls:i.iconInCls}))}},createTabItem:function(t,a){var e=this.el.one(v);this.getBodyContainer().append(e);var n=UFO.createItem(t),i=c.one(h.render(n.navBar));if(this.navBarContainer.append(i),c.mix(n,{navBarBlock:i,tabBody:e,loaded:!0}),(this.items[a]=n).navBar&&n.navBar.leftButtons)for(var s=i.one(".buttons-left"),o=0,r=n.navBar.leftButtons.length;o<r;o++)s.append(UFO.createItem(n.navBar.leftButtons[o],{type:"button"}).toEl());if(n.navBar&&n.navBar.rightButtons){var l=i.one(".buttons-right");for(o=0,r=n.navBar.rightButtons.length;o<r;o++)l.append(UFO.createItem(n.navBar.rightButtons[o],{type:"button"}).toEl())}e.one(".scroll-content").append(n.getEl())},setActiveTabStyle:function(t){this.tabNav.all(".tab-item").removeClass("tab-item-active"),this.tabNav.one(".tab-item:nth-child("+(t+1)+")").addClass("tab-item-active");for(var a=0,e=this.items.length;a<e;a++){var n=this.items[a];n.loaded&&(n.navBarBlock.attr("nav-bar","cached"),n.tabBody.attr("nav-view","cached"))}this.items[t].navBarBlock.attr("nav-bar","active"),this.items[t].tabBody.attr("nav-view","active")},setActiveTab:function(t,e){var n=this;if(c.isString(t))for(var a=0,i=this.items.length;a<i;a++)if(this.items[a].name==t){t=a;break}if(c.isNumber(t)){var s=t,o=this.items[s];o.loaded?(location.hash=o.name,n.setActiveTabStyle(s),e&&e()):o.path?c.use(o.path,function(t,a){n.createTabItem(o,s),location.hash=o.name,n.setActiveTabStyle(s),e&&e()}):(n.createTabItem(o,s),location.hash=o.name,n.setActiveTabStyle(s),e&&e())}else console.error("no tab of the name "+t)},load:function(t,a,e,n){console.log("tabBody",a)},addCmpEvents:function(){b.superclass.addCmpEvents.apply(this,arguments);var r=this;c.one(document.body).delegate("click tap",".tab-item:not([disabled])",function(t){var a=c.one(t.currentTarget),e=a.index();if(a.hasClass("tab-item-active"))return!1;a.attr("disabled","disabled");var n=r.fire("tabclick",e,a),i=!0;if(void 0!==n){c.isArray(n)||(n=[n]);for(var s=0,o=n.length;s<o;s++)if(!1===n[s]){i=!1;break}}return i&&!a.hasClass("tab-item-active")&&r.setActiveTab(e,function(){a.removeAttr("disabled")}),!1})}}),b},{requires:["node","event","xtemplate","../button/Button","../container/Container","./tpl/tabpanel-tpl","./tpl/nav-bar-block-tpl","./tpl/tabitem-tpl","./tpl/tab-item-body-tpl"]});