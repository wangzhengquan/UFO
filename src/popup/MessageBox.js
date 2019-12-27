KISSY.add(function(S, Node, Promise, Container){
	var tpl = [
	'<div class="popup-container popup-showing active">',
	'	<div class="popup">',
	'		<div class="popup-head">',
	'			<h3 class="popup-title"></h3>',
	'		</div>',
	'		<div class="popup-body">',
	'			<span></span>',
	'		</div>',
	'		<div class="popup-buttons">',
	'		</div>',
	'	</div>',
	'</div>'
   	].join('');
	
	var docBody = document.body;
	
	function MessageBox(config){
		
		config.buttonText =  S.mix({
	        ok: '确定',
	        yes: '是',
	        no: '否',
	        cancel: '取消'
	    }, config.buttonText, true, undefined, true) ;
		
    	this.buttonIds= [
             'ok', 'yes', 'no', 'cancel'
         ];
    	config.buttons = config.buttons || 1;
    	
		MessageBox.superclass.constructor.call(this, config);
		
			
	}
	S.extend(MessageBox, Container);
	
	MessageBox.ERROR = "error";
	MessageBox.INFO = "info";
	MessageBox.QUESTION = "question";
	MessageBox.WARNING = "warning";
	
    MessageBox.OK = 1;      		//1
    MessageBox.YES = 2; 	 		//10
    MessageBox.NO = 4; 			//100
    MessageBox.CANCEL = 8; 		//1000
    MessageBox.YESNO = 6;  		//110
    MessageBox.OKCANCEL = 9; 		//1001
    MessageBox.YESNOCANCEL = 14; 	//1110
	
	UFO.augment(MessageBox, {
	 
		alias:'messagebox',
		initComponent : function(){
			var me = this;
			this.el = S.one(tpl);
			this.backdrop = S.one('<div class="backdrop visible active"></div>');
			this.setTitle(this.title);
			this.setMessage(this.msg);
			this.setButtons(this.buttons);
			MessageBox.superclass.initComponent.apply(this, arguments);
			
		},
		setTitle: function(title){
			this.title = title;
			this.el.one('.popup-title').html(title);
		},
		setMessage: function(msg){
			if(S.isObject(msg)){
	    		msg = JSON.stringify(msg);
	    	}
			this.msg = msg;
			this.el.one('.popup-body span').html(msg);
		},
		
		setButtons: function(buttons){
			this.buttons = buttons;
			var buttonsEl = this.el.one('.popup-buttons');
			var buttonArr = [];
			var button ;
			for (var i = 3; i >= 0; i--) {
	            if (this.buttons & Math.pow(2, i)) {
	            	button = S.one('<button name="button-'+this.buttonIds[i]+'" class="button button-default">'+this.buttonText[this.buttonIds[i]]+'</button>');
	            	buttonsEl.append(button);
	            }
	    	}
			//button.removeClass('button-default').addClass('button-positive'); 
		},
		
		 
		handleClickOk: function(){
			var me = this;
			me.buttonListeners && me.buttonListeners['ok'] && me.buttonListeners['ok']();
    		me.fire('ok');
    		me.hide();
		},
		handleClickCancel: function(){
			var me = this;
			me.buttonListeners && me.buttonListeners['cancel'] && me.buttonListeners['cancel']();
    		me.fire('cancel');
    		me.hide();
		},
		handleClickYes: function(){
			var me = this;
			me.buttonListeners && me.buttonListeners['yes'] && me.buttonListeners['yes']();
    		me.fire('yes');
    		me.hide();
		},
		handleClickNo: function(){
			var me = this;
			me.buttonListeners && me.buttonListeners['no'] && me.buttonListeners['no']();
    		me.fire('no');
    		me.hide();
		},
		
		getBodyContianer: function(){
			return this.el.one('.popup-body');
		},
		
		show: function(cb){
			if(this.fire('beforeshow')!==false){
				var $body = S.one(docBody);
				$body.append(this.backdrop);
				$body.append(this.el);
				this.fire('show');
			}
			
		},
		
		
	    hide : function(cb){
	    	var me = this;
	    	if(this.fire('beforehide')!==false){
	    		this.backdrop.remove();
		    	me.el.remove();
		    	me.fire('hide');
		    	delete me;
	    	}
	    },
	    
	   
		addCmpEvents: function(){
			var me = this;
			
			this.on('hide', function(){
				S.one(docBody).removeClass('modal-open');
				S.one('html').removeClass('modal-open');
				docBody.scrollTop = me.origScrollTop;
			});
			this.on('beforeshow', function(){
				me.origScrollTop = docBody.scrollTop;
				S.one(docBody).addClass('modal-open');
				S.one('html').addClass('modal-open');
			});
			
			this.el.delegate('click', 'button[name=button-ok]', function(e){
	    		me.handleClickOk(e);
	    		return false;
	    	});
			this.el.delegate('click', 'button[name=button-cancel]', function(e){
	    		me.handleClickCancel(e);
	    		return false;
	    	});
			this.el.delegate('click', 'button[name=button-yes]', function(e){
	    		me.handleClickYes(e);
	    		return false;
	    	});
			this.el.delegate('click', 'button[name=button-no]', function(e){
	    		me.handleClickNo(e);
	    		return false;
	    	});
			
			MessageBox.superclass.addCmpEvents.apply(this, arguments);
		}
		
		
	});
	
	 /**
     * config{
           title: 'Delete Note',
           msg: 'Please enter your address:',
           buttons: MessageBox.OKCANCEL,
           buttonText:{ 
               ok: "Delete Note", 
               cancel: "Cancel" 
           },
           buttonListeners:{
             ok: function(){alert('Delete Note');}
           }
         
       }
     */
	MessageBox.show = function(config){
    	var messageBox = new MessageBox(config),
    	 	deferred = S.Defer();  
    	messageBox.show();
    	messageBox.on('ok', function(){
    		 deferred.resolve( MessageBox.OK);
    	});
    	
    	messageBox.on('yes', function(){
	   		deferred.resolve( MessageBox.YES);
	   	});
    	
	    messageBox.on('no', function(){
	   		deferred.resolve( MessageBox.NO);
	   	});
    	 
    	messageBox.on('cancel', function(){
   		 deferred.resolve(MessageBox.OKCANCEL);
    	});
    	 
    	return deferred.promise;
    }
	    
	MessageBox.confirm = function(title, msg, buttonText,fn){
    	var config = {
    		title: title,
    		icon: MessageBox.QUESTION,
    		msg: msg,
    		buttons: MessageBox.OKCANCEL,
    		buttonText: buttonText,
    		buttonListeners:{
    			ok:fn
    		}
    	};
    	return MessageBox.show(config); 
    }
    
	MessageBox.alert = function(title, msg, icon, fn){
		if(S.isFunction(icon)){
			fn = icon;
			icon = undefined;
		}
    	var config = {
    		title: title|| '',
    		msg: msg || '',
    		buttons: MessageBox.OK,
    		icon: icon,
    		buttonListeners:{
    			ok:fn
    		}
    	};
    	return MessageBox.show(config); 
    }
	
	 
	return MessageBox;
}, {
	requires: ['node', 'promise', '../container/Container']
});