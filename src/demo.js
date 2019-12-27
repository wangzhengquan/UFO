KISSY.add(function(S, Node, XTemplate, Component){
	var tpl = [' <header class="header bar">',
	           '	   header',
	           ' </header>',
	           '  <!-- content start -->',
	           ' <div class="content header-nav-tab-body has-header has-footer">',
	           '     content',
	           ' </div>',
	           '  <!-- content end -->',
	           ' <footer class="footer">',
	           '    footer',
	           ' </footer>',
	           ].join('');
	function Demo(config){
		 
		Demo.superclass.constructor.call(this, config);
		
	}
	
	S.extend(Demo, Component);
	
	S.augment(Demo, {
		
		initComponent: function(){
			this.el = S.all(tpl);
			Demo.superclass.initComponent.apply(this, arguments);
		},
		getBodyContainer: function(){
			 
		},
		addCmpEvents: function(){
			
		}
	 
	});
	
	return Demo;
}, {
	requires: ['node', "xtemplate",  "UFO/Component" ]
});