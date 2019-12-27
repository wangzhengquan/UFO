KISSY.add(function(S, Node, DOM, EVENT){
	 var doc = document;
	 return {
		 hideOn : function(eventTypes, elem, cb, onece){
	    	
		    var	hide= function(event){
		    	//console.log('event', event);
		        	if(!DOM.contains(elem, event.target) && elem !== event.target ){
		                 if(cb){
		                     if(cb.call(elem, event) !== false){
		                    	 DOM.hide(elem);
		                     }
		                 } else {
		                	 DOM.hide(elem);
		                      
		                 }
		                 if(onece){
		                	//console.log('detach');
		                	EVENT.undelegate(doc, eventTypes, hide);
	      	        	 }
		            }
		        	
		    	};
		    EVENT.delegate(doc, eventTypes, hide);
		    return hide;
	    }
	 };
}, {
	requires: ['node', 'dom', 'event']
});