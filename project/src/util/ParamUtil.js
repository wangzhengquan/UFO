KISSY.add(function(S){
	
	return {
		 processParam: function(param){
			 for(var key in param){
				 var value = param[key];
				 if(S.isArray(value)){
					 param[key] = value[0];
				 }
			 }
			 return param;
		 }
	}
});