/*! 2019-12-27 */

KISSY.add(function(e,n,i,u){var o=document;return{hideOn:function(n,t,d,r){var a=function(e){i.contains(t,e.target)||t===e.target||(d?!1!==d.call(t,e)&&i.hide(t):i.hide(t),r&&u.undelegate(o,n,a))};return u.delegate(o,n,a),a}}},{requires:["node","dom","event"]});