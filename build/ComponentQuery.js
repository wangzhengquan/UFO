/*! 2019-12-28 */

KISSY.add(function(c){function u(e,r){return r.method.apply(this,[e].concat(r.args))}function i(e,r){for(var t,n=[],o=0,s=e.length,i=">"!==r;o<s;o++)(t=e[o]).getRefItems&&(n=n.concat(t.getRefItems(i)));return n}function h(e){for(var r,t=[],n=0,o=e.length;n<o;n++)for(r=e[n];r=r.ownerCt||r.floatParent;)t.push(r);return t}function f(e,r,t){if("*"===r)return e.slice();for(var n,o=[],s=0,i=e.length;s<i;s++)(n=e[s])&&n.isType&&n.isType(r,t)&&o.push(n);return o}function l(e,r){for(var t,n=[],o=0,s=e.length;o<s;o++)(t=e[o]).hasCls(r)&&n.push(t);return n}function p(e,r){for(var t,n=[],o=0,s=e.length;o<s;o++)(t=e[o]).getId()===r&&n.push(t);return n}var g=this,m=/^(\s?([>\^])\s?|\s|$)/,d=/^(#)?([\w\-]+|\*)(?:\((true|false)\))?/,v=[{re:/^\.([\w\-]+)(?:\((true|false)\))?/,method:f},{re:/^(?:[\[](?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]])/,method:function(e,r,t,n){for(var o,s=[],i=0,u=e.length;i<u;i++)o=e[i],(n?String(o[r])===n:o[r])&&s.push(o);return s}},{re:/^#([\w\-]+)/,method:p},{re:/^\:([\w\-]+)(?:\(((?:\{[^\}]+\})|(?:(?!\{)[^\s>\/]*?(?!\})))\))?/,method:function(e,r,t){return g.pseudos[r](e,t)}}];g.Query=function(e){e=e||{},UFO.apply(this,e)},UFO.augment(g.Query,{execute:function(e){var r,t,n=this.operations,o=0,s=n.length;for(c.isArray(e)&&(t=e);o<s;o++)if(t="^"===(r=n[o]).mode?h(t||[e]):r.mode?i(t||[e],r.mode):u(t||i([e]),r),o===s-1)return t;return[]},is:function(e){var r,t,n=this.operations,o=c.isArray(e)?e:[e],s=o.length,i=n[n.length-1];if((o=u(o,i)).length!==s)return!1;if(1<n.length)for(t=0,r=o.length;t<r;t++)if(-1===c.indexOf(this.execute(),o[t]))return!1;return!0}});var a={cache:{},pseudos:{not:function(e,r){for(var t,n=a,o=0,s=e.length,i=[],u=-1;o<s;++o)t=e[o],n.is(t,r)||(i[++u]=t);return i},first:function(e){var r=[];return 0<e.length&&r.push(e[0]),r},last:function(e){var r=e.length,t=[];return 0<r&&t.push(e[r-1]),t}},query:function(e,r){for(var t,n,o,s=e.split(","),i=s.length,u=0,h=[],a=[],f={};u<i;u++)e=c.trim(s[u]),t=this.cache[e]||(this.cache[e]=this.parse(e)),h=h.concat(t.execute(r));if(1<(n=h.length)){for(u=0;u<n;u++)o=h[u],console.log("cmp.id",o.id),f[o.id]||(a.push(o),f[o.id]=!0);h=a}return h},is:function(e,r){if(!r)return!0;for(var t=r.split(","),n=t.length,o=0;o<n;o++)if(r=c.trim(t[o]),(this.cache[r]||(this.cache[r]=this.parse(r))).is(e))return!0;return!1},parse:function(e){for(var r,t,n,o,s,i,u,h=[],a=v.length;e&&r!==e;){for((t=(r=e).match(d))&&("#"===(n=t[1])?h.push({method:p,args:[c.trim(t[2])]}):"."===n?h.push({method:l,args:[c.trim(t[2])]}):h.push({method:f,args:[c.trim(t[2]),Boolean(t[3])]}),e=e.replace(t[0],""));!(o=e.match(m));)for(i=0;e&&i<a;i++){if(u=v[i],s=e.match(u.re),u.method,s){h.push({method:u.method,args:s.slice(1)}),e=e.replace(s[0],"");break}i===a-1&&console.error('Invalid ComponentQuery selector: "'+e+'"')}o[1]&&(h.push({mode:o[2]||o[1]}),e=e.replace(o[0],""))}return new g.Query({operations:h})}};return a});