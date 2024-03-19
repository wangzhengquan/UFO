/*! 2024-03-19 */
KISSY.add(function(l,u,o,t){var n=l.Env.host,e=n.document,r="data-src",f="default",i="scroll",a="touchmove",c="resize",s=0;function d(t,e,o){var n,i;if(t.offsetWidth)return n=!0,(n=(t=h(e,e={left:i=(e=u.offset(t)).left,top:e=e.top,right:i+((i=t)._ks_lazy_width||(i._ks_lazy_width=u.outerWidth(i))),bottom:e+((i=t)._ks_lazy_height||(i._ks_lazy_height=u.outerHeight(i)))}))&&o?h(o,e):n)&&t}function h(t,e){var o={};return o.top=Math.max(t.top,e.top),o.bottom=Math.min(t.bottom,e.bottom),o.left=Math.max(t.left,e.left),o.right=Math.min(t.right,e.right),o.top<=o.bottom&&o.left<=o.right}function m(t,e){var o=this;if(!(o instanceof m))return new m(t,e);var n=t;l.isPlainObject(n)||(n=e||{},t&&(n.container=t)),m.superclass.constructor.call(o,n),o._callbacks={},o._containerIsNotDocument=9!=o.get("container").nodeType,l.isArray(n.container)&&(o._backCompact=1),o._initLoadEvent(),n.container&&o.addElements(n.container,o.get("type")),o._loadFn(),l.ready(function(){o._loadFn()}),o.resume()}return m.ATTRS={diff:{value:0},placeholder:{value:"../../../resources/images/default_product.png"},execScript:{value:!0},container:{setter:function(t){return l.isWindow(t=t||e)?t=t.document:(t=u.get(t),"body"==u.nodeName(t)&&(t=t.ownerDocument)),t},valueFn:function(){return e}},autoDestroy:{value:!0},onStart:{value:null}},l.extend(m,t,{_initLoadEvent:function(){var t,e,o,n,i,a,r=this,c=r.get("autoDestroy");function s(){n&&(n.cancel(),n=0),i=l.now(),t.apply(o||this,arguments),a=l.now()}r._loadFn=(t=function(){c&&0==r._counter&&l.isEmptyObject(r._callbacks)&&r.destroy(),r._loadItems()},o=r,a=i=0,e=(e=100)||150,l.mix(function(){!i||i<=a&&l.now()-a>e||a<i&&l.now()-i>8*e?s():(n&&n.cancel(),n=l.later(s,e,0,null,arguments))},{stop:function(){n&&(n.cancel(),n=0)}}))},addCallback:function(t,e,o){t=u.get(t);var n=this._callbacks,t={el:t||document,fn:e||l.noop,outfn:o||l.noop},e=++s;n[e]=t,this._windowRegion?this._loadItem(e,t):this.refresh()},removeCallback:function(o,n){o=u.get(o);var i=this._callbacks;l.each(i,function(t,e){t.el!=o||n&&t.fn!=n||delete i[e]})},imgHandle:function(t){var e,o,n,i,a;e=t,o=this.get("imgFlag"),n=this.get("onStart"),o=o||r,i=e.getAttribute(o),a={type:"img",elem:e,src:i},(!l.isFunction(n)||!1!==n(a))&&a.src?(n=a.src,e.src!=n&&(e.src=n),e.removeAttribute(o)):console.log(e,i,o),this.removeElements(t)},addElements:function(t,e){"string"==typeof t?t=u.query(t):l.isArray(t)||(t=[t]);var o=this;o._counter=o._counter||0,l.each(t,function(t){e&&"img"!==e||l.each(l.filter([t].concat(u.query("img",t)),function(t){return t.getAttribute&&t.getAttribute(o.get("imgFlag")||r)},o),function(t){o.addCallback(t,o.imgHandle)})})},removeElements:function(o){"string"==typeof o?o=u.query(o):l.isArray(o)||(o=[o]);var n=this._callbacks;l.each(n,function(t,e){l.inArray(t.el,o)&&delete n[e]})},clear:function(){self._callbacks={}},refresh:function(){this._loadFn()},_loadItems:function(){var o=this,t=o.get("container");o._containerIsNotDocument&&!t.offsetWidth||(o._windowRegion=o._getBoundingRect(),!o._backCompact&&o._containerIsNotDocument&&(o._containerRegion=o._getBoundingRect(o.get("container"))),l.each(o._callbacks,function(t,e){t&&o._loadItem(e,t)}))},_loadItem:function(t,e){var o=this;if(!(e=e||o._callbacks[t]))return!0;var n=e.el,i=!1,a=e.fn,e=e.outfn;if(o.get("force")||d(n,o._windowRegion,o._containerRegion))try{i=a.call(o,n)}catch(t){setTimeout(function(){throw t},0)}else try{e.call(o,n)}catch(t){setTimeout(function(){throw t},0)}return!1!==i&&delete o._callbacks[t],i},_getBoundingRect:function(t){t=void 0!==t?(s=u.outerHeight(t),c=u.outerWidth(t),e=(t=u.offset(t)).left,t.top):(s=u.viewportHeight(),c=u.viewportWidth(),e=u.scrollLeft(),u.scrollTop());var e,o=this.get("diff"),n=0,i=o===f?c:o,a=0,r=o===f?s:o,c=e+c,s=t+s;return l.isObject(o)&&(n=o.left||0,i=o.right||0,a=o.top||0,r=o.bottom||0),{left:e-=n,top:t-=a,right:c+=i,bottom:s+=r}},pause:function(){var t,e=this._loadFn;this._destroyed||(o.remove(n,i,e),o.remove(n,a,e),o.remove(n,c,e),e.stop(),this._containerIsNotDocument&&(t=this.get("container"),o.remove(t,i,e),o.remove(t,a,e)))},resume:function(){var t,e=this._loadFn;this._destroyed||(o.on(n,i,e),o.on(n,a,e),o.on(n,c,e),this._containerIsNotDocument&&(t=this.get("container"),o.on(t,i,e),o.on(t,a,e)))},destroy:function(){this.pause(),this._callbacks={},l.log("datalazyload is destroyed!"),this.fire("destroy"),this._destroyed=1}}),m},{requires:["dom","event","base"]});