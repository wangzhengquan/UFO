/*! 2019-12-27 */

KISSY.add(function(l,t,i){function e(t){this.data=[],l.mix(this,t,!0,void 0,!0),e.superclass.constructor.apply(this,arguments);var i=this.data;i&&this.insert(i)}return l.extend(e,t),UFO.augment(e,{alias:"store",load:function(){},loadMore:function(t,i){var e=this;t=this.url=t||this.url;if(this.pageSize){var a=this.data.length-1;a<0&&(a=0),t=t+(-1===t.indexOf("?")?"?":"&")+"start="+a+"&limit="+this.pageSize}console.log("load more ..."+t),l.io({url:t}).done(function(t){e.inserData(t),(!t||t.length<e.pageSize)&&e.setLoadFinished(!0),i&&i()}).fail(function(t){console.log("faile:"+t)})},insert:function(t,i){if(!l.isEmptyObject(t)){var n=this,e=!1;l.isArray(t)||(t=[t]);for(var a=0,s=t.length;a<s;a++){var r,h=t[a];l.isPlainObject(h)&&(t[a]=r=UFO.create("model",h),r.on("propertychange",function(t,i,e,a){n.fire("update",n.indexOf(a),a,t,i,e),n.fire("change")}))}if((null==i||null==i||i>=this.data.length)&&(e=!0,i=this.data.length),e)this.data=this.data.concat(t),this.fire("insert",t);else{var o=this.data.slice(0,i),d=this.data.slice(i);this.data=o.concat(t).concat(d),this.fire("insert",t,i)}this.fire("change")}},remove:function(t){l.isNumber(t)||(t=l.indexOf(t,this.data)),this.data.splice(t,1),this.fire("remove",t),this.fire("change")},removeAll:function(){this.data=[],this.fire("removeAll"),this.fire("change")},getAt:function(t){return this.data[t]},getLast:function(){return this.getAt(this.getSize()-1)},getSize:function(){return this.data?this.data.length:0},getRange:function(){return this.data},indexOf:function(t){return l.indexOf(t,this.data)},setLoadFinished:function(t){(this.loadFinished=t)&&this.fire("loadFinished",t)},isLoadFinished:function(){return this.loadFinished},getOriginalData:function(){for(var t=[],i=0,e=this.data.length;i<e;i++)t.push(this.data[i].values);return t}}),e},{requires:["../EventSupport","./Model"]});