KISSY.add(function(S, Node, Modal, PhotoBrowser){
	
	
	function PhotoBrowserModal(config){
		//animation: 'slide-in-left'
	    //animation: 'slide-in-up'
		config = S.mix(config || {}, {
			animation: 'scale-in'
		}, false);
		PhotoBrowserModal.superclass.constructor.call(this, config);
	}
	
	S.extend(PhotoBrowserModal, Modal);
	
	UFO.augment(PhotoBrowserModal, {
		alias: 'photobrowsermodal',
		
		initComponent: function(){
			 
			if(this.createModal) {
				this.items = this.createModal();
			}
			PhotoBrowserModal.superclass.initComponent.apply(this, arguments);
		},
		
		createModal: function(){
			var me = this;
			//console.log('getBodyContainer', me.getBodyContainer());
			this.slider = UFO.create('photobrowser', {
				data: me.data,
				defaultIndex: me.defaultIndex
				//sliderContainer: me.getBodyContainer()
			});
			return this.slider;
		},
		show: function(){
			var me = this;
			PhotoBrowserModal.superclass.show.call(this, function(){
				
			});
		},
		setDefaultIndex: function(index){
			this.slider.setDefaultIndex(index);
		},
		addCmpEvents: function(){
			PhotoBrowserModal.superclass.addCmpEvents.apply(this, arguments);
			var me = this;
			me.el.on('click', function(event){
				//alert('click');
				me.hide();
				return false;
			});
			/*me.el.one('.modal').on('tap', function(event){
				alert('tap');
				me.hide();
				return false;
			});*/
		}
	
	});
	
	return PhotoBrowserModal;
}, {
	requires: ['node', './Modal', '../slider/PhotoBrowser']
});