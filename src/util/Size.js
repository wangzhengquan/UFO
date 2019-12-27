Ufo.define( function(){
	 
	 return {
		 calcSize : function(_width, _height){
			 var regexp = /(\d*(\.\d+)?)([^\d]+)$/,
			 	 width = (_width!=null && _width!=undefined) ?_width+"" :_width,
			     height = (_height!=null && _height!=undefined) ? _height+"" : _height, 
			   	 widthMatch = width ? width.match(regexp) : width,
			   	 heightMatch = height ? height.match(regexp) : height,
			     wunit ,
			     hunit;
			   
			 if(widthMatch){
				 width = widthMatch[1];
				 wunit = widthMatch[3];
			 }
			 if(heightMatch){
				 height = heightMatch[1];
				 hunit = heightMatch[3];
			 }
			 wunit = wunit || 'px';
			 hunit = hunit || 'px';
			 width = width ? Number(width) : width;
			 height = height ? Number(height) : height;
			 
			 return{
				 width: width,
				 height: height,
				 wunit: wunit,
				 hunit: hunit
			 }
	    }
	 };
});