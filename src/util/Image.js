Ufo.define( function(){
	 var canvasDom = $('<canvas style="display:none;"></canvas>').get(0),
	 	 context = canvasDom.getContext('2d');        
     
	 return {
		 /**
         *  获取已加载图片的base64格式.  
         * @param {Object} image
         * @param {Object} imgWidth
         * @param {Object} imgHeight
         * @param {Object} imgType
         */       
        getBase64Image : function(image, imgWidth, imgHeight, imgType){    
        	
            Size.constraint(image, imgWidth, imgHeight);        
            var width = image.width,
                height = image.height,
                newWidth,
                newHeight;
                            
            if(Type.isNumber(width) && Type.isNumber(height)){
                newWidth = width;
                newHeight = height;
            } else {
                var scale = 0.2;
                if(Type.isNumber(width)){
                    if(width > image.width){
                        scale = 1;
                    } else {
                        scale = width / image.width;
                    }
                } else if(Type.isNumber(height)){
                    if(height > image.height){
                        scale = 1;
                    } else {
                        scale = height / image.height;
                    }
                }
                newWidth = image.width * scale;
                newHeight = image.height * scale;
            }                                
            canvasDom.width = newWidth;
            canvasDom.height = newHeight;            
            context.drawImage(image, 0, 0, newWidth, newHeight);     
               
            return {
                value : canvasDom.toDataURL(imgType),
                width : newWidth,
                height : newHeight    
            };
        },
        
        zoom : function(src, width ,height, imgType, cb, deferred){
			var _this = this,
				deferred = deferred || $.Deferred();
				
			if( !Ufo.isString(src)){
				 var reader = new FileReader();  
                 reader.onload = function(e){ 
                	 imgType = src.type;
                     src = e.target.result;
                     _this.zoom(src, width ,height, imgType, cb, deferred);
                 };
                 reader.readAsDataURL(src);
				 return deferred;
			}
           
			
            var image = new Image();
            imgType = imgType || 'image/png';
            image.onload = function() {
                var thumbnailBase64 = _this.getBase64Image(image, width, height, imgType);
                cb && cb.call(_this, base64.toFile(thumbnailBase64['value'], imgType), thumbnailBase64['value'],  thumbnailBase64);
                deferred.resolve( base64.toFile(thumbnailBase64['value'], imgType), thumbnailBase64['value'],  thumbnailBase64);
            };
            image.src = src;
            return deferred;
         },
         /**
          * 获取图片的尺寸。 
          * @param {String|File} imgSrc
          * @return {ImageHtmlElement}
          * @return $deferred.
          */
         getSize : function(imgSrc, constSize, cb){        
             if(!Type.isString(imgSrc)){
                 imgSrc = URL.createObjectURL(imgSrc);
             }
             var me = this,
             	 imgObj = new Image(),
                 deferred = $.Deferred();
             if(Ufo.isFunction(constSize)){
            	 cb = constSize;
            	 constSize = undefined;
             }
                 
             imgObj.onload = function() {
            	 var imageSize = {
            			width: this.width,
            			height: this.height
            	 	 },
            	 	size = imageSize;
            	 
            	 if(constSize){
            		 var regexp = /(\d*(\.\d+)?)([^\d]+)$/,
            		   	 constWidthMatch =constSize.width ? constSize.width.match(regexp) : constSize.width,
            		   	 constHeightMatch =constSize.height ?  constSize.height.match(regexp) : constSize.height,
            		   	 unit = constWidthMatch ? 
            		   			 	constWidthMatch[3] : constHeightMatch ? 
            		   			 			constHeightMatch[3] : "";
            		 
            		 constWidthMatch && (constSize.width = constWidthMatch[1]);
            		 constHeightMatch && (constSize.height = constHeightMatch[1]);
            		 
            		 size =  me.constraint(constSize, imageSize);
            		 size.width =  size.width + unit;
            		 size.height =  size.height + unit;
            	 } 
            	 cb && cb(size, this);
                 deferred.resolve(size, this);
             };
             imgObj.src = imgSrc;
                 
             return deferred;
         },
         
         constraint: function(constSize, imgSize) {
        	if(constSize.width && constSize.width > imgSize.width ) {
      			imgSize.height = constSize.width/imgSize.width * imgSize.height;
      			imgSize.width =  constSize.width;
      		}
         	if( constSize.width && constSize.width < imgSize.width  ){
         		imgSize.height =  constSize.width/imgSize.width * imgSize.height;
         		imgSize.width =  constSize.width;
     		}
         	
     		
         	if(constSize.height &&  constSize.height > imgSize.height){
     			imgSize.width = constSize.height/imgSize.height * imgSize.width;
     			imgSize.height =  constSize.height;
     		}
         	
     		if(constSize.height && constSize.height < imgSize.height ){
     			imgSize.width = constSize.height/imgSize.height * imgSize.width;
     			imgSize.height =  constSize.height;
     		}
     		
     		
     		
     		return imgSize;
         }
	 };
});