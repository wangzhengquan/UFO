/*! 2019-12-28 */

KISSY.add(function(e,t,i,n){function s(t){t=e.mix(t||{},{animation:"scale-in"},!1),s.superclass.constructor.call(this,t)}return e.extend(s,i),UFO.augment(s,{alias:"imgslidermodal",initComponent:function(){this.createModal&&(this.items=this.createModal()),s.superclass.initComponent.apply(this,arguments)},createModal:function(){return this.slider=UFO.create("imageslider",{data:this.data,defaultIndex:this.defaultIndex}),this.slider},show:function(){s.superclass.show.call(this,function(){})},setDefaultIndex:function(t){this.slider.setDefaultIndex(t)},addCmpEvents:function(){s.superclass.addCmpEvents.apply(this,arguments);var e=this;e.el.one(".modal").on("tap",function(t){return e.hide(),!1})}}),s},{requires:["node","./Modal","../slider/ImageSlider"]});