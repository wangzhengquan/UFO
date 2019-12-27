KISSY.add(function(S){
	 var remove = function(arr, items) {
       var  k = 0, 
            len = items.length, 
            item = null;
            
        for (; k < len; k++) {
            item = items[k];
            for (var i = 0, n = 0; i < arr.length; i++) {
                if (arr[i] != item) {
                    arr[n++] = arr[i];
                }
            }
            arr.length = n;
        }
        return arr;
     };
     
	 function EventSupport(config){
		this.listeners =this.listeners || {};
		this.oneTimeListeners = this.oneTimeListeners || {};
	 }
	 
	 UFO.augment(EventSupport, {
		 
		 on : function(type, handler){
			var listeners = this.listeners[type] || [];
			if(!S.isArray(listeners)){
				listeners = [listeners];
			}
			listeners.push(handler);
			this.listeners[type] = listeners;
			return this;
		},
		
		off : function(type, handler){
			if(this.listeners[type]){
				remove(this.listeners[type], handler);
			}
			if(this.oneTimeListeners[type]){
				remove(this.oneTimeListeners[type], handler);
			}
			return this;
		},
		
		one : function(type, handler){
			this.oneTimeListeners[type] = this.oneTimeListeners[type] || [];
			this.oneTimeListeners[type].push(handler);
			return this;
		},
		
		fire : function(){
			var eventResults = [],
				type = arguments[0],
				args = Array.prototype.slice.call(arguments, 1),
			   _listeners = this.listeners[type],
			   _oneTimeListeners = this.oneTimeListeners[type];
			
			 
			if(_listeners ){
				if(!S.isArray(_listeners)){
					_listeners = [_listeners];
				}
				
				for(var i = 0, len = _listeners.length; i < len; i++){
					eventResults.push(_listeners[i].apply(this, args));
				}
			}
			if(_oneTimeListeners){
				if(!S.isArray(_oneTimeListeners)){
					_oneTimeListeners = [_oneTimeListeners];
				}
				for(var i = 0, len = _oneTimeListeners.length; i < len; i++){
					eventResults.push(_oneTimeListeners[i].apply(this, args));
					
				}
			}
			_oneTimeListeners=[];
			return eventResults.length == 1 ? eventResults[0] : eventResults;
             
		},
		
		fireEvent : function(){
			return this.fire.apply(this, arguments);
		},
		
		hasListener : function(type){
			return this.listeners[type];
		},
		
	    relayEvents : function(origin, events, prefix) {
	        var me = this,
	            len = events.length,
	            i = 0,
	            oldName,
	            newName;

	        for (; i < len; i++) {
	            oldName = events[i];
	            newName = prefix ? prefix + oldName : oldName;

	            // Add the relaying function as a ManagedListener so that it is removed when this.clearListeners is called (usually when _this_ is destroyed)
	            origin.on(oldName, me.createRelayer(newName));
	        }
	    },
	   
	    createRelayer: function(newName, beginEnd){
	        var me = this;
	        return function() {
	            return me.fireEvent.apply(me, [newName].concat(Array.prototype.slice.apply(arguments, beginEnd || [0])));
	        };
	    }
	 });
	 
	
	return EventSupport;
});