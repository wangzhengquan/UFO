KISSY.add(function(S, Anim, Node, Container){
	var docBody = document.body;
	var tpl = [
	        '<div class="modal-backdrop">',
			'	<div class="modal-backdrop-bg"></div>',
			'	<div class="modal"></div>',
			'</div>'
			].join('');
	
	function Modal(config){
		//animation: 'slide-in-left'
	    //animation: 'slide-in-up'
		Modal.superclass.constructor.call(this, config);
	}
	
	S.extend(Modal, Container);
	
	UFO.augment(Modal, {
		alias: 'modal',
		
		initComponent: function(){
			this.el = S.one(tpl);
			this.modal = this.el.one('.modal');
			this.animation = this.animation || 'slide-in-left';
			this.modal.addClass(this.animation);
			
			 
			//this.getBodyContainer().append(this.createModal());
			if(this.createModal) {
				this.items = this.createModal();
			}
			Modal.superclass.initComponent.apply(this, arguments);
		},
		 
		getModal: function(){
			return this.modal;
		},
		getBodyContainer: function(){
			return this.modal;
		},
		show: function(cb){
			//S.one(document.body).css('overflow-y','hidden');
			var me = this;
			if(!this.appended){
				S.one(document.body).append(this.toEl());
				this.appended = true;
			}
			 
			Modal.superclass.show.apply(this, arguments);
			if(this.animation != 'none'){
				if(true){
					
					setTimeout(function(){
						me.modal.removeClass('ng-leave');
						me.modal.addClass('ng-enter ng-enter-active');
					}, 0);
					
					setTimeout(function(){
						cb && cb();
					}, 400);
				} else {
					if(this.animation=='slide-in-up'){
						this.modal.css("top", "100%");
						this.modal.animate({
				        	   'top': 0
				            }, 0.4,'cubic-bezier(0.1, 0.7, 0.1, 1)', function(){
				            	cb && cb();
				            }
				         );
					}else if(this.animation == 'slide-in-left'){
						
					}else if(this.animation == 'slide-in-right'){
						this.modal.css("left", "-100%");
						this.modal.animate( 
							{
				        	   'left': 0
				            }, 0.5,'cubic-bezier(0.36, 0.66, 0.04, 1)', function(){
				            	cb && cb();
				            }
				        );
					}
					
				}
			}
			
			return this;
		},
		
		hide: function(cb){
			var me = this;
			var afterhide = function(){
				Modal.superclass.hide.call(me, cb);
			};
			if(this.animation != 'none'){
				if(true){
					this.modal.addClass('ng-leave');
					this.modal.removeClass('ng-enter ng-enter-active');
					setTimeout(function(){
						afterhide();
					}, 400);
				}else{
					
					if(this.animation=='slide-in-up'){
						this.modal.animate({
				        	   'top': "100%"
			            }, 0.4,'cubic-bezier(0.1, 0.7, 0.1, 1)', function(){
			            	afterhide();
			            });
					}else if(this.animation == 'slide-in-left'){
						
					}else if(this.animation == 'slide-in-right'){
						this.modal.animate( 
							{
				        	   'left': "-100%"
				            }, 0.5,'cubic-bezier(0.36, 0.66, 0.04, 1)',function(){
				            	afterhide();
				            }
				        );
					}
				}
			}else{
				afterhide();
			}
		
		},
		
		slideIn: function(cb){
			var me = this;
			this.show();
		},
		
		slideOut: function(cb){
			var me = this;
			this.hide();
		},
		
		addCmpEvents: function(){
			Modal.superclass.addCmpEvents.apply(this, arguments);
			var me = this;
			this.on('hide', function(){
				S.one(docBody).removeClass('modal-open');
				S.one(document).one('html').removeClass('modal-open');
				docBody.scrollTop = me.origScrollTop;
			});
			this.on('beforeshow', function(){
				me.origScrollTop = docBody.scrollTop;
				S.one(docBody).addClass('modal-open');
				S.one(document).one('html').addClass('modal-open');
			});
			this.el.delegate('click tap', '.button-back, .button-close', function(e){
				 me.hide();
				 return false;
			});
		}
	 
	});
	
	return Modal;
}, {
	requires: ['anim', 'node', '../container/Container']
});