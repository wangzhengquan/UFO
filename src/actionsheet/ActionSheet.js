KISSY.add(function(S, Node, EVENT, XTemplate, Container, Button, MouseEvent){
	var win = window;
	var tpl = [
		'<div class="action-sheet-backdrop active" buttons="buttons">',
		'	<div class="action-sheet-wrapper">',
		'		<div class="action-sheet" >',
		'			<div class="action-sheet-group action-sheet-options">',
		'				<div class="action-sheet-title">Modify your album</div>',
		'			</div>',
		'			<div class="action-sheet-group action-sheet-cancel" >',
		'				<button class="button button-cancel">取消</button>',
		'			</div>',
		'		</div>',
		'	</div>',
		'</div>'

			].join('');
	
	function ActionSheet(config){
		//animation: 'slide-in-right'
	    //animation: 'slide-in-up'
		S.mix(config, {
			defaults:{
				cls:'action-sheet-option',
				type: 'button'
			}
		},
		false,
		undefined,
		true);
		ActionSheet.superclass.constructor.call(this, config);
	}
	
	S.extend(ActionSheet, Container);
	
	UFO.augment(ActionSheet, {
		alias: 'actionsheet',
		initComponent: function(){
			this.el = S.one(tpl);
			this.actionSheetOptions = this.el.one('.action-sheet-options');
			this.actionSheetWrapper = this.el.one('.action-sheet-wrapper');
			ActionSheet.superclass.initComponent.apply(this, arguments);
		},
		 
		getBodyContainer: function(){
			return this.actionSheetOptions;
		},
		 
		add: function(items, pos){
			var me = this;
			if(!S.isArray(items)){
				items = [items];
			}
			for(var i=0, len = items.length; i<len; i++){
				var item = items[i];
				if(item.type=="title"){
					item = '<div class="action-sheet-title">'+items[i].text+'</div>';
				}
				
				(function(_item){
					var handler = _item.handler;
					//console.log('handler', handler);
					if(handler){
						_item.handler = function(cmp ,e ){
							if(handler(cmp ,e) !== false){
								me.slideOut();
							}
							//return false;
						}
					}
					
					var change = _item.change;
					if(change){
						_item.change = function(cmp ,e ){
							if(change(cmp ,e) !== false){
								me.slideOut();
							}
						}
					}
					
				})(item);
					
				
			}
			ActionSheet.superclass.add.call(this, items, pos);
		},
		
		show: function(cb){
			//S.one(document.body).css('overflow-y','hidden');
			if(!this.appended){
				S.one(document.body).append(this.toEl());
				this.appended = true;
			}
			 
			ActionSheet.superclass.show.apply(this, arguments);
			return this;
		},
		
		slideIn: function(){
			var me = this;
			this.show();
			
			setTimeout(function(){
				me.actionSheetWrapper.addClass('action-sheet-up'); 
				me.el.on('mouseup', function(event){
					console.log("mouseup", event);
					var target = event.target;
					if(!me.actionSheetWrapper.contains(target) && me.actionSheetWrapper.getDOMNode() !== target){
						me.slideOut();
						return false;
					}
				});
				
			}, 0);
		},
		
		slideOut:function(cb){
			
			var me = this;
			me.actionSheetWrapper.removeClass('action-sheet-up'); 
			setTimeout(function(){
				cb && cb();
				me.el.remove();
				//EVENT.undelegate(document, 'touchend', me.hideOn);
				delete me;
			}, 500);
		},
		
		addCmpEvents: function(){
			var me = this;
			this.el.delegate('click', 'button.button-cancel', function(event){
				me.slideOut();
			});
		}
	 
	});
	
	return ActionSheet;
}, {
	requires: ['node', 'event',  'xtemplate', '../container/Container','../button/Button','../util/MouseEvent']
});