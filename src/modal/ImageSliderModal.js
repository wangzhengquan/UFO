KISSY.add(function(S, Node, Modal, ImageSlider){
	
	
	function ImageSliderModal(config){
		//animation: 'slide-in-left'
	    //animation: 'slide-in-up'
		config = S.mix(config || {}, {
			animation: 'scale-in'
		}, false);
		ImageSliderModal.superclass.constructor.call(this, config);
	}
	
	S.extend(ImageSliderModal, Modal);
	
	UFO.augment(ImageSliderModal, {
		alias: 'imgslidermodal',
		
		initComponent: function(){
			 
			if(this.createModal) {
				this.items = this.createModal();
			}
			ImageSliderModal.superclass.initComponent.apply(this, arguments);
		},
		
		createModal: function(){
			var me = this;
			//console.log('getBodyContainer', me.getBodyContainer());
			this.slider = UFO.create('imageslider', {
				data: me.data,
				defaultIndex: me.defaultIndex
				//sliderContainer: me.getBodyContainer()
			});
			return this.slider;
		},
		show: function(){
			var me = this;
			ImageSliderModal.superclass.show.call(this, function(){
				
			});
		},
		setDefaultIndex: function(index){
			this.slider.setDefaultIndex(index);
		},
		addCmpEvents: function(){
			ImageSliderModal.superclass.addCmpEvents.apply(this, arguments);
			var me = this;
			/*me.el.delegate('click', '.modal', function(event){
				me.hide();
				return false;
			});*/
			me.el.one('.modal').on('tap', function(event){
				me.hide();
				return false;
			});
		}
	
	});
	
	return ImageSliderModal;
}, {
	requires: ['node', './Modal', '../slider/ImageSlider']
});