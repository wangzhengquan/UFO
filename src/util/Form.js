KISSY.add(function(S, Node){
	return {
		 getRecord : function(form){
			if(S.isString('form')){
				form = S.one(form);
			}
	    	var record = {};
	    	form.all("input[type=text], input[type=radio]:checked, select, textfield, textarea").each(function(ele, index){
	    		 
	    		var type = ele.attr('data-type'),
	    			value =  ele.attr('data-value') || ele.val();
	    		
	    		if(value!=undefined && value!=null){
	    			if(type && type.toUpperCase() == 'NUMBER'){
	    				value = Number(value);
	    			}
	    			record[ele.attr('name')] = value; 
	    		}
	    	});
	    	return record;
	    },
	    
	    loadRecord : function(form, record){
	    	var me = this,
	    		record = record || {};
	    	form.find("input[type=text], select").each(function(ele, index){
	    		ele.val(record( $this.attr('name') ));
		   	});
	    }
	}
},{
	requires: ['node']
});