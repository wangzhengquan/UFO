/*! 2019-12-27 */

KISSY.add(function(u,i,t,e,s,n){function p(i){i=u.mix(i||{},{defaultIndex:0,animation:"slide",direction:"horizontal",autoSlide:!1,timeout:3e3,loop:!1,activeCls:"active",colspan:1},!1),this.lazyLoadArr=[],p.superclass.constructor.call(this,i)}return u.extend(p,s),UFO.augment(p,{alias:"slider",initComponent:function(){if(this.el||(this.el=u.all(n)),"vertical"==this.direction?this.el.addClass("slider-vertical"):this.el.addClass("slider-horizontal"),this.sliderWrapper=this.el.one(".slider-wrapper"),this.sliderPagination=this.getSliderPagination(),this.sliderContainer?u.isString(this.sliderContainer)&&(this.sliderContainer=u.one(this.sliderContainer)):this.sliderContainer=u.one(document.body),u.isString(this.sliderContainer)){var i=u.one("#"+this.sliderContainer);this.sliderContainer=i||u.one(this.sliderContainer)}p.superclass.initComponent.apply(this,arguments),this.init()},fixForTransitionWhenLoop:function(){var i=this.sliderSlides.item(0).clone(!0),t=this.sliderSlides.item(this.sliderSlides.length-1).clone(!0);this.sliderWrapper.append(i),this.sliderWrapper.prepend(t),this.sliderSlides=this.el.all(".slider-slide")},init:function(){this.sliderSlides=this.el.all(".slider-slide"),this.slidesLength=this.items.length,this.loop&&(this.fixForTransitionWhenLoop(),this.slidesLength=this.items.length+2),this.setSliderSize(),this.setDefaultIndex(this.defaultIndex),1<this.items.length&&this.autoSlide&&this.play()},setDefaultIndex:function(i){if(!(this.items.length<2)){var t=i;this.loop&&t++,this.go(t,"none")}},getBodyContainer:function(){return this.sliderWrapper},setSliderSize:function(){"vertical"==this.direction?(this.slideSize=this.sliderContainer.innerHeight(),this.el.all(".slider-slide").css("height",this.slideSize)):(this.slideSize=this.sliderContainer.innerWidth(),this.sliderWrapper.width(this.slideSize*this.slidesLength),this.el.all(".slider-slide").css("width",this.slideSize))},setSlidePosition:function(){var t=this;({horizontal:function(i){t.sliderWrapper.css({"-webkit-transition-duration":"0","transition-duration":"0","-webkit-transform":"translate3d("+-1*i*t.slideSize+"px,0,0)",transform:"translate3d("+-1*i*t.slideSize+"px,0,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1})},vertical:function(i){t.sliderWrapper.css({"-webkit-transition-duration":"0","transition-duration":"0","-webkit-transform":"translate3d(0,"+-1*i*t.slideSize+"px,0)",transform:"translate3d(0,"+-1*i*t.slideSize+"px,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1})}})[this.direction](this.index)},add:function(i,t){if(!u.isEmptyObject(i)){u.isArray(i)||(i=[i]);var e,s,n,a=this,r=a.items?a.items.length:0,l=(i.length,1<r+i.length);1===r&&l&&a.sliderPagination.append(a.createSliderPaginationBullet(a.items[0],0));for(var d=0,o=i.length;d<o;d++)e=i[d],s=u.one('<div class="slider-slide" data-index="'+(r+d)+'">'),a.slideCls&&s.addClass(a.slideCls),a.lazyLoad?a.lazyLoadArr.push({content:e}):(n=UFO.createItem(e,a.defaults),s.append(n.getEl?n.getEl():n)),i[d]=s,l&&a.sliderPagination.append(a.createSliderPaginationBullet(e),r+d);if(this.loop&&a.lazyLoad){var h=u.clone(a.lazyLoadArr[0]),c=u.clone(a.lazyLoadArr[a.lazyLoadArr.length-1]);a.lazyLoadArr.splice(0,0,c),a.lazyLoadArr.push(h)}return p.superclass.add.apply(this,arguments)}},go:function(i,t,e){var s=this;if(u.isFunction(t)&&(e=t,t=this.animation),i>=this.slidesLenght&&(i%=this.slidesLenght),i==this.index)return this;function n(){e&&e.call(s,s)}var a={horizontal:{none:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"0","transition-duration":"0","-webkit-transform":"translate3d("+-1*i*s.slideSize+"px,0,0)",transform:"translate3d("+-1*i*s.slideSize+"px,0,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),n()},slide:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d("+-1*i*s.slideSize+"px,0,0)",transform:"translate3d("+-1*i*s.slideSize+"px,0,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),setTimeout(function(){n()},300)}},vertical:{none:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"0","transition-duration":"0","-webkit-transform":"translate3d(0,"+-1*i*s.slideSize+"px,0)",transform:"translate3d(0,"+-1*i*s.slideSize+"px,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),n()},slide:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d(0,"+-1*i*s.slideSize+"px,0)",transform:"translate3d(0,"+-1*i*s.slideSize+"px,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),setTimeout(function(){n()},300)}}};this.index=i,realIndex=this.getRealIndex(i),this.lazyLoad&&!this.lazyLoadArr[i].loaded&&this.load(this.el.one(".slider-wrapper .slider-slide:nth-child("+(i+1)+")"),i,this.lazyLoadArr[i].content),t=t||s.animation,a[s.direction][t](i),this.hightlightPagerBullet(realIndex)},load:function(i,t,e){u.isString(e)?i.append(e):i.append(UFO.createItem(e).getEl()),this.lazyLoadArr[t].loaded=!0},getRealIndex:function(i){var t=this,e=i;return t.loop&&(e=0==i?t.items.length-1:i==t.slidesLength-1?0:i-1),e},next:function(i){var t=this;if(t.slidesLength<2)return i&&i.call(t),this;var e=t.index+1;return e>=t.slidesLength&&(e%=t.slidesLength),t.go(e,function(){t.loop&&t.isLast()&&t.fixNextLoop(),i&&i.call(t)}),this},previous:function(i){var t=this;if(t.slidesLength<2)return i&&i.call(t),this;var e=t.index+t.slidesLength-1;return e>=t.slidesLength&&(e%=t.slidesLength),t.go(e,function(){t.loop&&t.isFirst()&&t.fixPreLoop(),i&&i.call(t)}),this},isLast:function(){return this.index===this.slidesLength-1},isFirst:function(){return 0===this.index},fixNextLoop:function(){var i=this,t=this.index=1;this.lazyLoad&&!this.lazyLoadArr[t].loaded&&this.load(this.el.one(".slider-wrapper .slider-slide:nth-child("+(1+t)+")"),t,this.lazyLoadArr[t].content);var e="-"+i.slideSize+"px";"horizontal"==i.direction?i.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d("+e+",0,0)",transform:"translate3d("+e+",0,0)"}):i.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d(0,"+e+",0)",transform:"translate3d(0,"+e+",0)"})},fixPreLoop:function(){var i=this,t=i.index=i.slidesLength-2,e="-"+Number(i.slideSize)*i.index+"px";this.lazyLoad&&!this.lazyLoadArr[t].loaded&&this.load(this.el.one(".slider-wrapper .slider-slide:nth-child("+(1+t)+")"),t,this.lazyLoadArr[t].content),"horizontal"==i.direction?i.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d("+e+",0,0)",transform:"translate3d("+e+",0,0)"}):i.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d(0,"+e+",0)",transform:"translate3d(0,"+e+",0)"})},play:function(){var i=this;return null!==i.timer&&clearTimeout(i.timer),i.timer=setTimeout(function(){i.next().play()},Number(i.timeout)),i.stoped=!1,this},stop:function(){return clearTimeout(this.timer),this.timer=null,this.stoped=!0,this},addCmpEvents:function(){var l=this;p.superclass.addCmpEvents.apply(this,arguments),this.el.delegate("touchstart",".slider-slide",function(i){l.stop(),l.touching=!0,l.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s"}),l.startX=i.changedTouches[0].clientX,l.startY=i.changedTouches[0].clientY,l.startPos="horizontal"==l.direction?i.changedTouches[0].clientX:i.changedTouches[0].clientY,l.startT=(new Date).getTime()}),this.el.delegate("touchend",".slider-slide",function(i){l.touching=!1;var t="horizontal"==l.direction?i.changedTouches[0].clientX:i.changedTouches[0].clientY;l.delta=Math.abs(t-l.startPos);var e=Math.abs(t)<Math.abs(l.startPos),s=!e,n=!l.loop&&(l.isLast()&&e||l.isFirst()&&s),a="horizontal"==l.direction?function(){l.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d("+-1*l.index*l.slideSize+"px,0,0)",transform:"translate3d("+-1*l.index*l.slideSize+"px,0,0)"})}:function(){l.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d(0,"+-1*l.index*l.slideSize+"px,0)",transform:"translate3d(0,"+-1*l.index*l.slideSize+"px,0)"})},r=Math.abs(l.delta)<Math.abs("horizontal"==l.direction?i.changedTouches[0].clientY-l.startY:i.changedTouches[0].clientX-l.startX);n||r||!(l.delta>l.slideSize/2||(new Date).getTime()-l.startT<550&&10<l.delta)?a():e?l.next():l.previous(),l.autoSlide&&l.stoped&&l.play()}),this.el.delegate("touchmove",".slider-slide",function(i){var t=l.slideSize;if(!(1<i.touches.length)){if(l.delta="horizontal"==l.direction?i.touches[0].clientX-l.startPos:i.touches[0].clientY-l.startPos,!l.loop&&(l.isLast()&&l.delta<0||l.isFirst()&&0<l.delta)&&(l.delta=l.delta/3),Math.abs(l.delta)<Math.abs("horizontal"==l.direction?i.touches[0].clientY-l.startY:i.touches[0].clientX-l.startX))return!0;l.stop();var e=l.delta-l.index*t;if(l.lazyLoad&&l.delta<0){var s=l.index+1;l.lazyLoadArr[s].loaded||l.load(l.el.one(".slider-wrapper .slider-slide:nth-child("+(s+1)+")"),s,l.lazyLoadArr[s].content)}if(l.lazyLoad&&0<l.delta){var n=l.index-1;l.lazyLoadArr[n].loaded||l.load(l.el.one(".slider-wrapper .slider-slide:nth-child("+(1+n)+")"),n,l.lazyLoadArr[n].content)}return"horizontal"==l.direction?l.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d("+e+"px,0,0)",transform:"translate3d("+e+"px,0,0)"}):l.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d(0,"+e+"px,0)",transform:"translate3d(0,"+e+"px,0)"}),!1}}),t.on(window,"resize",function(i){l.setSliderSize(),l.setSlidePosition()}),this.el.delegate("click tap",".tabbar .tab",function(i){var t=u.one(i.currentTarget),e=u.all(".tabbar .tab").index(t);return l.go(e),!1})},getSliderPagination:function(){return this.el.one(".slider-pagination")},createSliderPaginationBullet:function(i,t){return'<span class="slider-pagination-bullet"></span>'},hightlightPagerBullet:function(i){i=i;this.sliderPagination.all(".slider-pagination-bullet").removeClass(this.activeCls),this.sliderPagination.one(".slider-pagination-bullet:nth-child("+(i+1)+")").addClass(this.activeCls)}}),p},{requires:["node","event","xtemplate","../container/Container","./tpl/slider-tpl"]});