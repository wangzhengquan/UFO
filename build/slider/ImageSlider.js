/*! 2024-03-08 */
KISSY.add(function(s,i,e,t){function a(i){i=s.mix(i||{},{cls:"slider-img",slideCls:"slider-img-slide",activeCls:"active"},!1),a.superclass.constructor.call(this,i)}return s.extend(a,t),UFO.augment(a,{alias:"imageslider",initComponent:function(){for(var i=[],s=0;s<this.data.length;s++){var e=this.data[s];i.push('<a href="'+(e.href||"javascript:;")+'" class="slider-img-zoom-container"><img src="'+e.url+'"></a>')}this.items=i,a.superclass.initComponent.apply(this,arguments)}}),a},{requires:["node","xtemplate","./Slider"]});