/*! 2019-12-28 */

KISSY.add(function(u,i,t,e,s,n){function p(i){i=u.mix(i||{},{defaultIndex:0,animation:"slide",direction:"horizontal",autoSlide:!1,timeout:3e3,loop:!1,activeCls:"active",colspan:1},!1),this.lazyLoadArr=[],p.superclass.constructor.call(this,i)}return u.extend(p,s),UFO.augment(p,{alias:"slider",initComponent:function(){if(this.el||(this.el=u.all(n)),"vertical"==this.direction?this.el.addClass("slider-vertical"):this.el.addClass("slider-horizontal"),this.sliderWrapper=this.el.one(".slider-wrapper"),this.sliderPagination=this.getSliderPagination(),this.sliderContainer?u.isString(this.sliderContainer)&&(this.sliderContainer=u.one(this.sliderContainer)):this.sliderContainer=u.one(document.body),u.isString(this.sliderContainer)){var i=u.one("#"+this.sliderContainer);this.sliderContainer=i||u.one(this.sliderContainer)}p.superclass.initComponent.apply(this,arguments),this.init()},fixForTransitionWhenLoop:function(){var i=this.sliderSlides.item(0).clone(!0),t=this.sliderSlides.item(this.sliderSlides.length-1).clone(!0);this.sliderWrapper.append(i),this.sliderWrapper.prepend(t),this.sliderSlides=this.el.all(".slider-slide")},init:function(){this.sliderSlides=this.el.all(".slider-wrapper .slider-slide"),this.slidesLength=this.items.length,this.loop&&(this.fixForTransitionWhenLoop(),this.slidesLength=this.items.length+2),this.setSliderSize(),this.setDefaultIndex(this.defaultIndex),1<this.items.length&&this.autoSlide&&this.play()},setDefaultIndex:function(i){var t=i;this.loop&&t++,this.go(t,"none")},getBodyContainer:function(){return this.sliderWrapper},setSliderSize:function(){"vertical"==this.direction?(this.slideSize=this.sliderContainer.innerHeight(),this.el.all(".slider-slide").css("height",this.slideSize)):(this.slideSize=this.sliderContainer.innerWidth(),this.sliderWrapper.width(this.slideSize*this.slidesLength),this.el.all(".slider-slide").css("width",this.slideSize))},add:function(i,t){if(!u.isEmptyObject(i)){u.isArray(i)||(i=[i]);var e,s,n,a=this,r=a.items?a.items.length:0,l=(i.length,1<r+i.length);1===r&&l&&a.sliderPagination.append(a.createSliderPaginationBullet(a.items[0],0));for(var o=0,d=i.length;o<d;o++)e=i[o],s=u.one('<div class="slider-slide" data-index="'+(r+o)+'">'),a.slideCls&&s.addClass(a.slideCls),a.lazyLoad?a.lazyLoadArr.push({content:e}):(n=UFO.createItem(e,a.defaults),s.append(n.getEl?n.getEl():n)),i[o]=s,l&&a.sliderPagination.append(a.createSliderPaginationBullet(e),r+o);if(this.loop){var h=u.clone(a.lazyLoadArr[0]),c=u.clone(a.lazyLoadArr[a.lazyLoadArr.length-1]);a.lazyLoadArr.splice(0,0,c),a.lazyLoadArr.push(h)}return p.superclass.add.apply(this,arguments)}},slideTo:function(i,t,e){var s=this;u.isFunction(t)&&(e=t,t=this.animation),t=t||s.animation;function n(){e&&e.call(s,s)}({horizontal:{none:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d("+-1*i*s.slideSize+"px,0,0)",transform:"translate3d("+-1*i*s.slideSize+"px,0,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),n()},slide:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d("+-1*i*s.slideSize+"px,0,0)",transform:"translate3d("+-1*i*s.slideSize+"px,0,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),setTimeout(function(){n()},300)}},vertical:{none:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d(0,"+-1*i*s.slideSize+"px,0)",transform:"translate3d(0,"+-1*i*s.slideSize+"px,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),n()},slide:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d(0,"+-1*i*s.slideSize+"px,0)",transform:"translate3d(0,"+-1*i*s.slideSize+"px,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),setTimeout(function(){n()},300)}}})[s.direction][t](i)},go:function(i,t,e){if(u.isFunction(t)&&(e=t,t=this.animation),t=t||this.animation,i>=this.slidesLenght&&(i%=this.slidesLenght),i==this.index)return this;this.index=i;var s=this.getRealIndex(i);return this.lazyLoad&&!this.lazyLoadArr[i].loaded&&this.load(this.el.one(".slider-wrapper .slider-slide:nth-child("+(i+1)+")"),i,this.lazyLoadArr[i].content),this.slideTo(i,t,e),this.hightlightPagerBullet(s),this},load:function(i,t,e){u.isString(e)?i.append(e):i.append(UFO.createItem(e).getEl()),this.lazyLoadArr[t].loaded=!0},getNextIndex:function(){var i=this.index+1;return i>=this.slidesLength&&(i%=this.slidesLength),i},getPreIndex:function(){var i=this.index+this.slidesLength-1;return i>=this.slidesLength&&(i%=this.slidesLength),i},next:function(i){var t=this;return t.slidesLength<2?i&&i.call(t):t.go(t.getNextIndex(),function(){if(t.loop&&t.isLast())return t.fixNextLoop(),this;i&&i.call(t)}),this},previous:function(i){var t=this;return t.slidesLength<2?i&&i.call(t):t.go(t.getPreIndex(),function(){if(t.loop&&t.isFirst())return t.fixPreLoop(),this;i&&i.call(t)}),this},isLast:function(){return this.index===this.slidesLength-1},isFirst:function(){return 0===this.index},fixNextLoop:function(){this.go(1,"none")},fixPreLoop:function(){this.go(this.slidesLength-2,"none")},play:function(){var i=this;return null!==i.timer&&clearTimeout(i.timer),i.timer=setTimeout(function(){i.next().play()},Number(i.timeout)),i.stoped=!1,this},stop:function(){var i=this;return clearTimeout(i.timer),i.timer=null,i.stoped=!0,this},getRealIndex:function(i){var t=this,e=i;return t.loop&&(e=0==i?t.items.length-1:i==t.slidesLength-1?0:i-1),e},addCmpEvents:function(){var r=this;p.superclass.addCmpEvents.apply(this,arguments),this.el.delegate("touchstart",".slider-slide",function(i){r.stop(),r.touching=!0,r.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s"}),r.startX=i.changedTouches[0].clientX,r.startY=i.changedTouches[0].clientY,r.startPos="horizontal"==r.direction?i.changedTouches[0].clientX:i.changedTouches[0].clientY,r.startT=(new Date).getTime()}),this.el.delegate("touchend",".slider-slide",function(i){r.touching=!1;var t="horizontal"==r.direction?i.changedTouches[0].clientX:i.changedTouches[0].clientY;r.delta=Math.abs(t-r.startPos);var e=Math.abs(t)<Math.abs(r.startPos),s=!e,n=!r.loop&&(r.isLast()&&e||r.isFirst()&&s),a=Math.abs(r.delta)<Math.abs("horizontal"==r.direction?i.changedTouches[0].clientY-r.startY:i.changedTouches[0].clientX-r.startX);n||a||!(r.delta>r.slideSize/2||(new Date).getTime()-r.startT<550&&10<r.delta)?r.slideTo(r.index):e?r.next():r.previous(),r.autoSlide&&r.stoped&&r.play()}),this.el.delegate("touchmove",".slider-slide",function(i){var t=r.slideSize;if(!(1<i.touches.length)){if(r.delta="horizontal"==r.direction?i.touches[0].clientX-r.startPos:i.touches[0].clientY-r.startPos,!r.loop&&(r.isLast()&&r.delta<0||r.isFirst()&&0<r.delta)&&(r.delta=r.delta/3),Math.abs(r.delta)<Math.abs("horizontal"==r.direction?i.touches[0].clientY-r.startY:i.touches[0].clientX-r.startX))return!0;r.stop();var e=r.delta-r.index*t;if(r.lazyLoad&&r.delta<0){var s=r.getNextIndex();r.lazyLoadArr[s]||console.log("lazyLoadArr",r.lazyLoadArr,s),r.lazyLoadArr[s].loaded||r.load(r.el.one(".slider-wrapper .slider-slide:nth-child("+(s+1)+")"),s,r.lazyLoadArr[s].content)}if(r.lazyLoad&&0<r.delta){var n=r.getPreIndex();r.lazyLoadArr[n]||console.log("lazyLoadArr==",r.lazyLoadArr,n),r.lazyLoadArr[n].loaded||r.load(r.el.one(".slider-wrapper .slider-slide:nth-child("+(n+1)+")"),n,r.lazyLoadArr[n].content)}return"horizontal"==r.direction?r.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d("+e+"px,0,0)",transform:"translate3d("+e+"px,0,0)"}):r.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d(0,"+e+"px,0)",transform:"translate3d(0,"+e+"px,0)"}),!1}}),t.on(window,"resize",function(i){r.setSliderSize(),r.slideTo(r.index,"none")}),this.el.delegate("click tap",".tabbar .tab",function(i){var t=u.one(i.currentTarget),e=u.all(".tabbar .tab").index(t);return r.go(e),!1})},getSliderPagination:function(){return this.el.one(".slider-pagination")},createSliderPaginationBullet:function(i,t){return'<span class="slider-pagination-bullet"></span>'},hightlightPagerBullet:function(i){this.sliderPagination.all(".slider-pagination-bullet").removeClass(this.activeCls);var t=this.sliderPagination.one(".slider-pagination-bullet:nth-child("+(i+1)+")");t&&t.addClass(this.activeCls)}}),p},{requires:["node","event","xtemplate","../container/Container","./tpl/slider-tpl"]});