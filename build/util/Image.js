/*! 2019-12-28 */

Ufo.define(function(){var w=$('<canvas style="display:none;"></canvas>').get(0),o=w.getContext("2d");return{getBase64Image:function(t,h,i,e){Size.constraint(t,h,i);var a,d,g=t.width,n=t.height;if(Type.isNumber(g)&&Type.isNumber(n))a=g,d=n;else{var r=.2;Type.isNumber(g)?r=g>t.width?1:g/t.width:Type.isNumber(n)&&(r=n>t.height?1:n/t.height),a=t.width*r,d=t.height*r}return w.width=a,w.height=d,o.drawImage(t,0,0,a,d),{value:w.toDataURL(e),width:a,height:d}},zoom:function(h,i,e,a,d,g){var n=this;g=g||$.Deferred();if(!Ufo.isString(h)){var t=new FileReader;return t.onload=function(t){a=h.type,h=t.target.result,n.zoom(h,i,e,a,d,g)},t.readAsDataURL(h),g}var r=new Image;return a=a||"image/png",r.onload=function(){var t=n.getBase64Image(r,i,e,a);d&&d.call(n,base64.toFile(t.value,a),t.value,t),g.resolve(base64.toFile(t.value,a),t.value,t)},r.src=h,g},getSize:function(t,g,n){Type.isString(t)||(t=URL.createObjectURL(t));var r=this,h=new Image,w=$.Deferred();return Ufo.isFunction(g)&&(n=g,g=void 0),h.onload=function(){var t={width:this.width,height:this.height},h=t;if(g){var i=/(\d*(\.\d+)?)([^\d]+)$/,e=g.width?g.width.match(i):g.width,a=g.height?g.height.match(i):g.height,d=e?e[3]:a?a[3]:"";e&&(g.width=e[1]),a&&(g.height=a[1]),(h=r.constraint(g,t)).width=h.width+d,h.height=h.height+d}n&&n(h,this),w.resolve(h,this)},h.src=t,w},constraint:function(t,h){return t.width&&t.width>h.width&&(h.height=t.width/h.width*h.height,h.width=t.width),t.width&&t.width<h.width&&(h.height=t.width/h.width*h.height,h.width=t.width),t.height&&t.height>h.height&&(h.width=t.height/h.height*h.width,h.height=t.height),t.height&&t.height<h.height&&(h.width=t.height/h.height*h.width,h.height=t.height),h}}});