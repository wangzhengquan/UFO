KISSY.add(function(S, Node, Component){
	var tpl = [
		'<div class="mask-container visible">',
		'	<div class="masker">',
		'	</div>',
		'</div>'
        ].join("");
	var docBody = document.body,
		$docbody = S.one(docBody);
	function Mask (config){
		Mask.superclass.constructor.call(this, config);
	}
	
	S.extend(Mask, Component);
	
	UFO.augment(Mask, {
		alias: 'mask',
		initComponent : function(){
			this.el = S.one(tpl);
			//this.text && this.setText(this.text);
			//this.masker = this.el.one('.masker');
			this.backdrop = S.one('<div class="backdrop visible backdrop-loading active" style="position:absolute;"></div>');
			this.maskTarget = this.maskTarget || $docbody;
			this.setMaskBody(this.createMaskBody());
			
			if(this.text){
				this.setText(this.text);
			}
			Mask.superclass.initComponent.apply(this, arguments);
		},
		
		setMaskBody: function(maskBody){
			this.el.one('.masker').html('');
			this.el.one('.masker').append(maskBody);
		},
		setText: function(text){
			this.text = text;
			this.el.one('.masker span').html(text);
		},
		createMaskBody: function(){
			return '<span></span>';
		},
		
		show: function(){
			if(this.fire('beforeshow')!==false){
				this.maskTarget.append(this.backdrop);
				this.maskTarget.append(this.el);
				this.el.addClass('active');
			}
			
			 
		},
		
		hide: function(cb){
			var me = this;
			
			if(this.fire('beforehide')!==false){
				this.el.removeClass('active');
				setTimeout(function(){
					cb && cb();
					me.backdrop.remove();
					me.el.remove();
					me.fire('hide');
					delete me ;
				}, 200);
			}
		},
		
		addCmpEvents: function(){
			var me = this;
			Mask.superclass.addCmpEvents.apply(this, arguments);
			if($docbody == this.maskTarget){
				this.on('hide', function(){
					$docbody.removeClass('modal-open');
					S.one(document).one('html').removeClass('modal-open');
					docBody.scrollTop = me.origScrollTop;
				});
				this.on('beforeshow', function(){
					me.origScrollTop = docBody.scrollTop;
					$docbody.addClass('modal-open');
					S.one(document).one('html').addClass('modal-open');
				});
			}
		}
		 
		 
		 
	});
	 
	 return Mask;
},{
	requires: ['node', '../Component']
});