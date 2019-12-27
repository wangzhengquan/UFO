KISSY.add(function(S, Node, Mask){
	
	function LoadingAnimMask (config){
		LoadingAnimMask.superclass.constructor.call(this, config);
	}
	
	S.extend(LoadingAnimMask, Mask);
	
	UFO.augment(LoadingAnimMask, {
		alias: 'loadingAnimMask',
		createMaskBody: function(){
			return [' <div class="sk-spinner sk-spinner-fading-circle">',
			        '  <div class="sk-circle1 sk-circle"></div>',
			        '  <div class="sk-circle2 sk-circle"></div>',
			        '  <div class="sk-circle3 sk-circle"></div>',
			        '  <div class="sk-circle4 sk-circle"></div>',
			        '  <div class="sk-circle5 sk-circle"></div>',
			        '  <div class="sk-circle6 sk-circle"></div>',
			        '  <div class="sk-circle7 sk-circle"></div>',
			        '  <div class="sk-circle8 sk-circle"></div>',
			        '  <div class="sk-circle9 sk-circle"></div>',
			        '  <div class="sk-circle10 sk-circle"></div>',
			        '  <div class="sk-circle11 sk-circle"></div>',
			        '  <div class="sk-circle12 sk-circle"></div>',
			        '</div>'
			].join('');
		}
	});
	 
	 return LoadingAnimMask;
},{
	requires: ['node', './Mask']
});