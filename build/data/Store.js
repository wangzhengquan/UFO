/*! 2024-03-08 */
KISSY.add(function(o,t,i){function e(t){this.data=[],o.mix(this,t,!0,void 0,!0),e.superclass.constructor.apply(this,arguments);var i=this.data;i&&this.insert(i)}return o.extend(e,t),UFO.augment(e,{alias:"store",load:function(){},loadMore:function(t,i){var e,n=this,t=this.url=t||this.url;this.pageSize&&((e=this.data.length-1)<0&&(e=0),t=t+(-1===t.indexOf("?")?"?":"&")+"start="+e+"&limit="+this.pageSize),console.log("load more ..."+t),o.io({url:t}).done(function(t){n.inserData(t),(!t||t.length<n.pageSize)&&n.setLoadFinished(!0),i&&i()}).fail(function(t){console.log("faile:"+t)})},insert:function(t,i){if(!o.isEmptyObject(t)){for(var e,a=this,n=!1,s=0,r=(t=o.isArray(t)?t:[t]).length;s<r;s++){var h=t[s];o.isPlainObject(h)&&(t[s]=h=UFO.create("model",h),h.on("propertychange",function(t,i,e,n){a.fire("update",a.indexOf(n),n,t,i,e),a.fire("change")}))}(null==i||i>=this.data.length)&&(n=!0,i=this.data.length),n?(this.data=this.data.concat(t),this.fire("insert",t)):(n=this.data.slice(0,i),e=this.data.slice(i),this.data=n.concat(t).concat(e),this.fire("insert",t,i)),this.fire("change")}},remove:function(t){o.isNumber(t)||(t=o.indexOf(t,this.data)),this.data.splice(t,1),this.fire("remove",t),this.fire("change")},removeAll:function(){this.data=[],this.fire("removeAll"),this.fire("change")},getAt:function(t){return this.data[t]},getLast:function(){return this.getAt(this.getSize()-1)},getSize:function(){return this.data?this.data.length:0},getRange:function(){return this.data},indexOf:function(t){return o.indexOf(t,this.data)},setLoadFinished:function(t){(this.loadFinished=t)&&this.fire("loadFinished",t)},isLoadFinished:function(){return this.loadFinished},getOriginalData:function(){for(var t=[],i=0,e=this.data.length;i<e;i++)t.push(this.data[i].values);return t}}),e},{requires:["../EventSupport","./Model"]});