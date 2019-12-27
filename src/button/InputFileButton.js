KISSY.add(function(S, Node, Button){
	
	 
	/**
	 * config{
	 *    icon
	 *    text
	 *    handler;
	 * }
	 */
	function InputFileButton(config){
		
		S.mix(config, {
			style:{
				position:'relative'
			}
		}, false, undefined, true);
		
		InputFileButton.superclass.constructor.call(this, config);
			
	}
	
	S.extend(InputFileButton, Button);
	 
	UFO.augment(InputFileButton, {
		alias: 'inputfilebutton',
		
		initComponent : function(){
			
			InputFileButton.superclass.initComponent.apply(this, arguments);
			this.fileEl = S.one('<input type="file" style="position: absolute; display: block; top: 0; left: 0; right: 0; bottom: 0; width: 100%; opacity: 0; z-index:10;">' );
			this.el.append(this.fileEl);
			
			if(this.multiple){
				this.setMultiple(this.multiple);
			}
			
			if(this.readonly){
				this.setReadonly(true);
			}
		},
		
		setMultiple: function(multiple){
			if(multiple){
				this.fileEl.attr('multiple', 'multiple');
			}else{
				this.fileEl.removeAttr('multiple');
			}
		},
		
		setReadonly: function(readonly){
			this.readonly = readonly;
			if(readonly){
				this.fileEl.attr('readonly', 'readonly').attr('disabled', 'disabled');
				this.el.css('cursor', 'default'); 
			}
			else{
				this.fileEl.removeAttr('readonly').removeAttr('disabled');
				this.el.css('cursor', 'pointer');
			}
		},
		
		addCmpEvents: function(){
			var me = this;
			this.el.delegate('change', 'input[type=file]', function(e){
				console.log('change', e);
				me.fire('change', e);
				me.change && me.change(me, e);
				return false;
			});
			InputFileButton.superclass.addCmpEvents.apply(this, arguments);
		},
		
		getValue: function(){
			this.fileEl.getDOMNode().files;
		}
	});
	
	
	
	 
	 return InputFileButton;
},{
	requires: ['node', './Button']
});