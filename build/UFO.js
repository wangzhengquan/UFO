/*! 2019-12-27 */

var UFO=UFO||{};!function(){UFO.aliasMap={};var e=this;UFO.apply=function(t,i){if(t&&i&&"object"==typeof i)for(var n in i)t[n]=i[n]},UFO.apply(UFO,{getConstructor:function(t){var i=this.aliasMap[t];if(i)return i;var n,r,a=t.split(".");for(i=e,n=0,r=a.length;n<r;n++)i=i[a[n]];return i},create:function(t,i){var n;if(KISSY.isPlainObject(t)){if(!t.type)return void console.error("error in function UFO.create,you mast define a type name");t=(i=t).type}if(KISSY.isString(t)?n=this.getConstructor(t):KISSY.isFunction(t)&&(n=t),n)return new n(i);console.error("error in function UFO.create, className=",t)},createItem:function(t,i){if(KISSY.isFunction(t)&&(t=t()),!KISSY.isEmptyObject(t))return KISSY.isPlainObject(t)?(i&&KISSY.isPlainObject(t)&&KISSY.mix(t,i,!1,void 0,!0),UFO.create(t)):t},augment:function(t,i){if(i.alias){KISSY.isArray(i.alias)||(i.alias=[i.alias]);for(var n=0,r=i.alias.length;n<r;n++)this.aliasMap[i.alias[n]]=t}KISSY.augment(t,i)},isType:function(t,i){return t.type==i||t instanceof UFO.getConstructor(i)}})}();