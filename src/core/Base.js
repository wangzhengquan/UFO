/**
 * config{
 * 		tpl,
 * 		listeners:{
 * 			afterrender
 * 		}
 * }
 */
KISSY.add(function(S){
	function Base(config){
		//this.rootContainer = $('section');
		this.config = config || {} ;
		S.mix(this, config, true, undefined, true);
	}
	
	
	
	UFO.augment(Base, {
		
		set: function(p, v){
			this[p] = v;
		},
		
		get: function(p){
			return this[p];
		}
	});
	
	return Base;
} );