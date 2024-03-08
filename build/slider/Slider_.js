/*! 2024-03-08 */
KISSY.add(function(p,i,t,e,s,n){function u(i){i=p.mix(i||{},{defaultIndex:0,animation:"slide",direction:"horizontal",autoSlide:!1,timeout:3e3,loop:!1,activeCls:"active",colspan:1},!1),this.lazyLoadArr=[],u.superclass.constructor.call(this,i)}return p.extend(u,s),UFO.augment(u,{alias:"slider",initComponent:function(){var i;this.el||(this.el=p.all(n)),"vertical"==this.direction?this.el.addClass("slider-vertical"):this.el.addClass("slider-horizontal"),this.sliderWrapper=this.el.one(".slider-wrapper"),this.sliderPagination=this.getSliderPagination(),this.sliderContainer?p.isString(this.sliderContainer)&&(this.sliderContainer=p.one(this.sliderContainer)):this.sliderContainer=p.one(document.body),p.isString(this.sliderContainer)&&(i=p.one("#"+this.sliderContainer),this.sliderContainer=i||p.one(this.sliderContainer)),u.superclass.initComponent.apply(this,arguments),this.init()},fixForTransitionWhenLoop:function(){var i=this.sliderSlides.item(0).clone(!0),t=this.sliderSlides.item(this.sliderSlides.length-1).clone(!0);this.sliderWrapper.append(i),this.sliderWrapper.prepend(t),this.sliderSlides=this.el.all(".slider-slide")},init:function(){this.sliderSlides=this.el.all(".slider-slide"),this.slidesLength=this.items.length,this.loop&&(this.fixForTransitionWhenLoop(),this.slidesLength=this.items.length+2),this.setSliderSize(),this.setDefaultIndex(this.defaultIndex),1<this.items.length&&this.autoSlide&&this.play()},setDefaultIndex:function(i){this.items.length<2||(i=i,this.loop&&i++,this.go(i,"none"))},getBodyContainer:function(){return this.sliderWrapper},setSliderSize:function(){"vertical"==this.direction?(this.slideSize=this.sliderContainer.innerHeight(),this.el.all(".slider-slide").css("height",this.slideSize)):(this.slideSize=this.sliderContainer.innerWidth(),this.sliderWrapper.width(this.slideSize*this.slidesLength),this.el.all(".slider-slide").css("width",this.slideSize))},setSlidePosition:function(){var t=this;({horizontal:function(i){t.sliderWrapper.css({"-webkit-transition-duration":"0","transition-duration":"0","-webkit-transform":"translate3d("+-1*i*t.slideSize+"px,0,0)",transform:"translate3d("+-1*i*t.slideSize+"px,0,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1})},vertical:function(i){t.sliderWrapper.css({"-webkit-transition-duration":"0","transition-duration":"0","-webkit-transform":"translate3d(0,"+-1*i*t.slideSize+"px,0)",transform:"translate3d(0,"+-1*i*t.slideSize+"px,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1})}})[this.direction](this.index)},add:function(i,t){if(!p.isEmptyObject(i)){p.isArray(i)||(i=[i]);var e,s,n,a=this,r=a.items?a.items.length:0,l=(i.length,1<r+i.length);1===r&&l&&a.sliderPagination.append(a.createSliderPaginationBullet(a.items[0],0));for(var d,o,h=0,c=i.length;h<c;h++)e=i[h],s=p.one('<div class="slider-slide" data-index="'+(r+h)+'">'),a.slideCls&&s.addClass(a.slideCls),a.lazyLoad?a.lazyLoadArr.push({content:e}):(n=UFO.createItem(e,a.defaults),s.append(n.getEl?n.getEl():n)),i[h]=s,l&&a.sliderPagination.append(a.createSliderPaginationBullet(e),r+h);return this.loop&&a.lazyLoad&&(d=p.clone(a.lazyLoadArr[0]),o=p.clone(a.lazyLoadArr[a.lazyLoadArr.length-1]),a.lazyLoadArr.splice(0,0,o),a.lazyLoadArr.push(d)),u.superclass.add.apply(this,arguments)}},go:function(i,t,e){var s=this;if(p.isFunction(t)&&(e=t,t=this.animation),i>=this.slidesLenght&&(i%=this.slidesLenght),i==this.index)return this;function n(){e&&e.call(s,s)}var a={horizontal:{none:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"0","transition-duration":"0","-webkit-transform":"translate3d("+-1*i*s.slideSize+"px,0,0)",transform:"translate3d("+-1*i*s.slideSize+"px,0,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),n()},slide:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d("+-1*i*s.slideSize+"px,0,0)",transform:"translate3d("+-1*i*s.slideSize+"px,0,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),setTimeout(function(){n()},300)}},vertical:{none:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"0","transition-duration":"0","-webkit-transform":"translate3d(0,"+-1*i*s.slideSize+"px,0)",transform:"translate3d(0,"+-1*i*s.slideSize+"px,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),n()},slide:function(i){s.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d(0,"+-1*i*s.slideSize+"px,0)",transform:"translate3d(0,"+-1*i*s.slideSize+"px,0)","-webkit-backface-visibility":"hidden","backface-visibility":"hidden",opacity:1}),setTimeout(function(){n()},300)}}};this.index=i,realIndex=this.getRealIndex(i),this.lazyLoad&&!this.lazyLoadArr[i].loaded&&this.load(this.el.one(".slider-wrapper .slider-slide:nth-child("+(i+1)+")"),i,this.lazyLoadArr[i].content),t=t||s.animation,a[s.direction][t](i),this.hightlightPagerBullet(realIndex)},load:function(i,t,e){p.isString(e)?i.append(e):i.append(UFO.createItem(e).getEl()),this.lazyLoadArr[t].loaded=!0},getRealIndex:function(i){var t=this,e=i;return e=t.loop?0==i?t.items.length-1:i==t.slidesLength-1?0:i-1:e},next:function(i){var t,e=this;return e.slidesLength<2?i&&i.call(e):((t=e.index+1)>=e.slidesLength&&(t%=e.slidesLength),e.go(t,function(){e.loop&&e.isLast()&&e.fixNextLoop(),i&&i.call(e)})),this},previous:function(i){var t,e=this;return e.slidesLength<2?i&&i.call(e):((t=e.index+e.slidesLength-1)>=e.slidesLength&&(t%=e.slidesLength),e.go(t,function(){e.loop&&e.isFirst()&&e.fixPreLoop(),i&&i.call(e)})),this},isLast:function(){return this.index===this.slidesLength-1},isFirst:function(){return 0===this.index},fixNextLoop:function(){var i=this,t=(this.index=1,this.lazyLoad&&!this.lazyLoadArr[1].loaded&&this.load(this.el.one(".slider-wrapper .slider-slide:nth-child(2)"),1,this.lazyLoadArr[1].content),"-"+i.slideSize+"px");"horizontal"==i.direction?i.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d("+t+",0,0)",transform:"translate3d("+t+",0,0)"}):i.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d(0,"+t+",0)",transform:"translate3d(0,"+t+",0)"})},fixPreLoop:function(){var i=this,t=i.index=i.slidesLength-2,e="-"+Number(i.slideSize)*i.index+"px";this.lazyLoad&&!this.lazyLoadArr[t].loaded&&this.load(this.el.one(".slider-wrapper .slider-slide:nth-child("+(1+t)+")"),t,this.lazyLoadArr[t].content),"horizontal"==i.direction?i.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d("+e+",0,0)",transform:"translate3d("+e+",0,0)"}):i.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d(0,"+e+",0)",transform:"translate3d(0,"+e+",0)"})},play:function(){var i=this;return null!==i.timer&&clearTimeout(i.timer),i.timer=setTimeout(function(){i.next().play()},Number(i.timeout)),i.stoped=!1,this},stop:function(){return clearTimeout(this.timer),this.timer=null,this.stoped=!0,this},addCmpEvents:function(){var n=this;u.superclass.addCmpEvents.apply(this,arguments),this.el.delegate("touchstart",".slider-slide",function(i){n.stop(),n.touching=!0,n.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s"}),n.startX=i.changedTouches[0].clientX,n.startY=i.changedTouches[0].clientY,n.startPos="horizontal"==n.direction?i.changedTouches[0].clientX:i.changedTouches[0].clientY,n.startT=(new Date).getTime()}),this.el.delegate("touchend",".slider-slide",function(i){n.touching=!1;var t="horizontal"==n.direction?i.changedTouches[0].clientX:i.changedTouches[0].clientY,t=(n.delta=Math.abs(t-n.startPos),Math.abs(t)<Math.abs(n.startPos)),e=!t,e=!n.loop&&(n.isLast()&&t||n.isFirst()&&e),s="horizontal"==n.direction?function(){n.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d("+-1*n.index*n.slideSize+"px,0,0)",transform:"translate3d("+-1*n.index*n.slideSize+"px,0,0)"})}:function(){n.sliderWrapper.css({"-webkit-transition-duration":"300ms","transition-duration":"300ms","-webkit-transform":"translate3d(0,"+-1*n.index*n.slideSize+"px,0)",transform:"translate3d(0,"+-1*n.index*n.slideSize+"px,0)"})},i=Math.abs(n.delta)<Math.abs("horizontal"==n.direction?i.changedTouches[0].clientY-n.startY:i.changedTouches[0].clientX-n.startX);e||i||!(n.delta>n.slideSize/2||(new Date).getTime()-n.startT<550&&10<n.delta)?s():t?n.next():n.previous(),n.autoSlide&&n.stoped&&n.play()}),this.el.delegate("touchmove",".slider-slide",function(i){var t=n.slideSize;if(!(1<i.touches.length))return n.delta="horizontal"==n.direction?i.touches[0].clientX-n.startPos:i.touches[0].clientY-n.startPos,!n.loop&&(n.isLast()&&n.delta<0||n.isFirst()&&0<n.delta)&&(n.delta=n.delta/3),Math.abs(n.delta)<Math.abs("horizontal"==n.direction?i.touches[0].clientY-n.startY:i.touches[0].clientX-n.startX)||(n.stop(),i=n.delta-n.index*t,n.lazyLoad&&n.delta<0&&(t=n.index+1,n.lazyLoadArr[t].loaded||n.load(n.el.one(".slider-wrapper .slider-slide:nth-child("+(t+1)+")"),t,n.lazyLoadArr[t].content)),n.lazyLoad&&0<n.delta&&(t=n.index-1,n.lazyLoadArr[t].loaded||n.load(n.el.one(".slider-wrapper .slider-slide:nth-child("+(1+t)+")"),t,n.lazyLoadArr[t].content)),"horizontal"==n.direction?n.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d("+i+"px,0,0)",transform:"translate3d("+i+"px,0,0)"}):n.sliderWrapper.css({"-webkit-transition-duration":"0s","transition-duration":"0s","-webkit-transform":"translate3d(0,"+i+"px,0)",transform:"translate3d(0,"+i+"px,0)"}),!1)}),t.on(window,"resize",function(i){n.setSliderSize(),n.setSlidePosition()}),this.el.delegate("click tap",".tabbar .tab",function(i){i=p.one(i.currentTarget),i=p.all(".tabbar .tab").index(i);return n.go(i),!1})},getSliderPagination:function(){return this.el.one(".slider-pagination")},createSliderPaginationBullet:function(i,t){return'<span class="slider-pagination-bullet"></span>'},hightlightPagerBullet:function(i){this.sliderPagination.all(".slider-pagination-bullet").removeClass(this.activeCls),this.sliderPagination.one(".slider-pagination-bullet:nth-child("+(i+1)+")").addClass(this.activeCls)}}),u},{requires:["node","event","xtemplate","../container/Container","./tpl/slider-tpl"]});