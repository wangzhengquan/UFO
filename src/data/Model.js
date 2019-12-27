KISSY.add( function(S, EventSupport){
	 
	var hasOwnPrototype = Object.hasOwnPrototype;
	function Model(values){
		this.values = values;
		Model.superclass.constructor.apply(this, arguments);
			
	}
	S.extend(Model, EventSupport);
	
	UFO.augment(Model, {
		alias:'model',
		
		isDefined: function(filedName){
			return hasOwnPrototype.call(this.values, filedName);
		},
		set: function(name, value){
			var oldValue = this.values[name];
			if(oldValue != value){
				this.values[name] = value;
				this.fire('propertychange',name, value, oldValue, this);
			}
			
		},
		get: function(name){
			return this.values[name];
		},
		getValues: function(){
			return this.values;
		},
		setValues: function(values){
			for(var p in values){
				this.set(p, values[p]);
			}
		}
	});
	
	
	
	 
	 return Model;
}, {
	requires: ['../EventSupport']
});