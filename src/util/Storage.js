KISSY.add(function(S, Node){
	//localStorage
	return {
		setItem : function(storage, key, item){
			var type = typeof item;
	        if( type === 'string' || type === 'number' || type === 'boolean'){
	        	storage.setItem(key, item);
	        }else{
	        	storage.setItem(key, JSON.stringify(item));
	        }
			
	    },
	    
	    getItem : function(storage, key){
	    	var item = storage.getItem(key)
	    	try{
	    		return JSON.parse(item); 
	    	}catch(e){
	    		return item;
	    	}
	    	
	    },
	    
	    setLocalItem: function(key, item){
	    	this.setItem(localStorage, key, item);
	    },
	    
	    getLocalItem: function(key){
	    	return this.getItem(localStorage, key);
	    },
	    
	    setSessionItem: function(key, item){
	    	this.setItem(sessionStorage, key, item);
	    },
	    
	    getSessionItem: function(key){
	    	return this.getItem(sessionStorage, key);
	    }
	}
},{
	requires: ['node']
});