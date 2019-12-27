/*! 2019-12-27 */

Ufo.define(function(){return{calcSize:function(n,u){var t,l,e=/(\d*(\.\d+)?)([^\d]+)$/,i=null!=n&&null!=n?n+"":n,r=null!=u&&null!=u?u+"":u,c=i?i.match(e):i,h=r?r.match(e):r;return c&&(i=c[1],t=c[3]),h&&(r=h[1],l=h[3]),t=t||"px",l=l||"px",{width:i=i?Number(i):i,height:r=r?Number(r):r,wunit:t,hunit:l}}}});