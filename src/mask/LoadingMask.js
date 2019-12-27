KISSY.add(function(S, Node, Mask, tpl){
	
	function LoadingAnimMask (config){
		LoadingAnimMask.superclass.constructor.call(this, config);
	}
	
	S.extend(LoadingAnimMask, Mask);
	
	UFO.augment(LoadingAnimMask, {
		alias: 'loadingAnimMask',
		createMaskBody: function(){
			return tpl;
		}
	});
	 
	return LoadingAnimMask;
},{
	requires: ['node', './Mask', "./tpl/loading-svg-tpl"]
});