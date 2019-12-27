/**
 * 滑动组件
 */
KISSY.add(function(S, Node, Event, XTemplate, Container, tpl){
	 
	function Slider(config){
		 
		config = S.mix(config || {}, {
			defaultIndex: 0,
			animation: 'slide',
			direction:'horizontal', //vertical, horizontal
			autoSlide: false,
			timeout: 3000,
			loop:false,
			activeCls: 'active',
			colspan: 1
		}, false);
		this.lazyLoadArr = [];
		Slider.superclass.constructor.call(this, config);
	}
	
	S.extend(Slider, Container);
	
	UFO.augment(Slider, {
		alias: 'slider',
		
		initComponent: function(){
			if(!this.el){
				this.el = S.all(tpl);
			}
			
			if(this.direction == 'vertical'){
				this.el.addClass('slider-vertical');
			}else{
				this.el.addClass('slider-horizontal');
				
			}
			this.sliderWrapper = this.el.one('.slider-wrapper');
			this.sliderPagination = this.getSliderPagination();
			
			if(!this.sliderContainer){
				this.sliderContainer = S.one(document.body);
			}else if(S.isString(this.sliderContainer)){
				this.sliderContainer = S.one(this.sliderContainer);
			}
			
			if(S.isString(this.sliderContainer)){
				var _sliderContainer = S.one("#"+this.sliderContainer);
				if(!_sliderContainer){
					this.sliderContainer= S.one(this.sliderContainer);
				}else{
					this.sliderContainer=_sliderContainer;
				}
			}
			Slider.superclass.initComponent.apply(this, arguments);
			this.init();
			
		},
		
		
		fixForTransitionWhenLoop: function(){
			var first = this.sliderSlides.item(0).clone(true);
			var last = this.sliderSlides.item(this.sliderSlides.length- 1).clone(true);
			this.sliderWrapper.append(first);
			this.sliderWrapper.prepend(last);
			this.sliderSlides = this.el.all('.slider-slide');
		},
		
		init: function(){
			//console.log('this.index==', this.index);
			var self = this;
			this.sliderSlides = this.el.all('.slider-slide');
			this.slidesLength = this.items.length;
			if(this.loop){
				this.fixForTransitionWhenLoop();
				this.slidesLength = this.items.length + 2;
			}
		
			this.setSliderSize();
			this.setDefaultIndex(this.defaultIndex);
			if(this.items.length > 1 && this.autoSlide){
				this.play();
			}
		},
		
		setDefaultIndex: function(index){
			if( this.items.length < 2){
				return;
			}
			var _defaultIndex = index;
			if(this.loop){
				_defaultIndex++;
			}
			this.go(_defaultIndex, 'none');
		},
		
		getBodyContainer: function(){
			 return this.sliderWrapper;
		},
		
		setSliderSize: function(){
			
			if(this.direction == 'vertical'){
				this.slideSize = this.sliderContainer.innerHeight();
				//this.sliderWrapper.height(this.slideSize * this.slidesLength);
				this.el.all('.slider-slide').css('height',this.slideSize);
			}else{
				this.slideSize = this.sliderContainer.innerWidth();
				this.sliderWrapper.width(this.slideSize * this.slidesLength);
				this.el.all('.slider-slide').css('width',this.slideSize);
			}
		
		},
		
		setSlidePosition: function(){
			var me = this;
			var setPosFn = {
				 'horizontal':function(index){
					me.sliderWrapper.css({
						'-webkit-transition-duration': '0',
						'transition-duration': '0',
						'-webkit-transform':'translate3d('+(-1 * index * me.slideSize)+'px,0,0)',
						'transform':'translate3d('+(-1 * index * me.slideSize)+'px,0,0)',
						'-webkit-backface-visibility':'hidden',
						'backface-visibility':'hidden',
						opacity:1
					});
				},
				'vertical':function(index){
					me.sliderWrapper.css({
						'-webkit-transition-duration': '0',
						'transition-duration': '0',
						'-webkit-transform':'translate3d(0,'+(-1 * index * me.slideSize)+'px,0)',
						'transform':'translate3d(0,'+(-1 * index * me.slideSize)+'px,0)',
						'-webkit-backface-visibility':'hidden',
						'backface-visibility':'hidden',
						opacity:1
					});
				}
			};
			setPosFn[this.direction](this.index);
		},
		
		add: function(items, pos){
			if(S.isEmptyObject(items)){
				return;
			}
			
			if(!S.isArray(items)){
				items = [items];
			}
			
			var me = this,
				
				curLength = me.items ? me.items.length : 0,
				itemsLength = items.length,
				shouldShowPagination = (curLength + items.length) > 1;
			 
			if(curLength === 1 && shouldShowPagination){
				me.sliderPagination.append(me.createSliderPaginationBullet(me.items[0], 0));
			}
			
			var item,
				slide,
				cmp;
			
			for(var i=0, len= items.length; i<len; i++){
				item = items[i];
				
				slide = S.one('<div class="slider-slide" data-index="'+(curLength+i)+'">');
				if(me.slideCls){
					slide.addClass(me.slideCls);
				}
				if(me.lazyLoad){
					me.lazyLoadArr.push({
						content: item
					});
					
				}else{
					cmp = UFO.createItem(item, me.defaults);
					slide.append(cmp.getEl ? cmp.getEl(): cmp);
				}
				items[i] = slide;
				if(shouldShowPagination){
					me.sliderPagination.append(me.createSliderPaginationBullet(item), curLength+i);
				}
			 
			}
			if(this.loop && me.lazyLoad){
				var first = S.clone(me.lazyLoadArr[0]),
					last = S.clone( me.lazyLoadArr[me.lazyLoadArr.length - 1]);
				me.lazyLoadArr.splice(0, 0, last);
				me.lazyLoadArr.push(first);
			}
			return Slider.superclass.add.apply(this, arguments);
		},
		
		
		
		go: function(index, animation, cb){
			var me = this;
			if(S.isFunction(animation)){
				cb = animation;
				animation = this.animation;
			}
			if (index >= this.slidesLenght) {
                index = index % this.slidesLenght;
            }
            if(index == this.index) {
                return this;
            }
            
            var afterGo = function() {
            	cb && cb.call(me, me);
            }
			
			
			var animFn = {
			  'horizontal':{
				 'none':function(index){
					me.sliderWrapper.css({
						'-webkit-transition-duration': '0',
						'transition-duration': '0',
						'-webkit-transform':'translate3d('+(-1 * index * me.slideSize)+'px,0,0)',
						'transform':'translate3d('+(-1 * index * me.slideSize)+'px,0,0)',
						'-webkit-backface-visibility':'hidden',
						'backface-visibility':'hidden',
						opacity:1
					});
					afterGo();
				},
				'slide': function(index){
					me.sliderWrapper.css({
						'-webkit-transition-duration': '300ms',
						'transition-duration': '300ms',
						'-webkit-transform':'translate3d('+(-1 * index * me.slideSize)+'px,0,0)',
						'transform':'translate3d('+(-1 * index * me.slideSize)+'px,0,0)',
						'-webkit-backface-visibility':'hidden',
						'backface-visibility':'hidden',
						opacity:1
					});
					
					setTimeout(function(){
						afterGo();
					}, 300);
				} 
			  },
			  'vertical':{
					 'none':function(index){
						me.sliderWrapper.css({
							'-webkit-transition-duration': '0',
							'transition-duration': '0',
							'-webkit-transform':'translate3d(0,'+(-1 * index * me.slideSize)+'px,0)',
							'transform':'translate3d(0,'+(-1 * index * me.slideSize)+'px,0)',
							'-webkit-backface-visibility':'hidden',
							'backface-visibility':'hidden',
							opacity:1
						});
						afterGo();
					},
					'slide': function(index){
						me.sliderWrapper.css({
							'-webkit-transition-duration': '300ms',
							'transition-duration': '300ms',
							'-webkit-transform':'translate3d(0,'+(-1 * index * me.slideSize)+'px,0)',
							'transform':'translate3d(0,'+(-1 * index * me.slideSize)+'px,0)',
							'-webkit-backface-visibility':'hidden',
							'backface-visibility':'hidden',
							opacity:1
						});
						
						setTimeout(function(){
							afterGo();
						}, 300);
					} 
				  }
			}
			
            this.index = index,
            	realIndex = this.getRealIndex(index);
			
			if(this.lazyLoad && !this.lazyLoadArr[index].loaded){
				this.load(this.el.one('.slider-wrapper .slider-slide:nth-child('+(index+1)+')'), index, this.lazyLoadArr[index].content);
			} 
			animation = animation || me.animation;
			animFn[me.direction][animation](index);
			 
			this.hightlightPagerBullet(realIndex);
			
		},
		/**
		 * @override
		 */
		load: function(slide, realIndex, item){
			if(S.isString(item)){
				slide.append(item);
			}else{
				slide.append(UFO.createItem(item).getEl());
			}
			
			this.lazyLoadArr[realIndex].loaded = true;
		},
		
		getRealIndex: function(index){
			var me = this,
				_index = index;
			if(me.loop){
				 
				if( index==0 ){
					_index = me.items.length-1;
				}else if(index == me.slidesLength-1){
					_index = 0;
				}else{
					_index = index - 1;
				}
			} 
			return _index;
		},
		
		//下一个
		next:function(callback){
			var me = this;
			if(me.slidesLength < 2){
				callback && callback.call(me);
				return this;
			}
		
			var _index = me.index+1;
			if(_index >= me.slidesLength  ){
				_index = _index % me.slidesLength;
			}
			 
			me.go(_index,function(){
				if(me.loop && me.isLast()){
					me.fixNextLoop();
				}
				callback && callback.call(me);
			});
			
			return this;
		},
		
		//上一个
		previous:function(callback){
			var me = this;
			if(me.slidesLength < 2){
				callback && callback.call(me);
				return this;
			}
			var _index = me.index + me.slidesLength - 1 ;
			if(_index >= me.slidesLength){
				_index = _index % me.slidesLength;
			}
			me.go(_index,function(){
				if(me.loop && me.isFirst()){
					me.fixPreLoop();
				}
				callback && callback.call(me);
			});
			return this;
		},
		
		isLast : function(){
			return this.index === this.slidesLength-1;
		},
		
		isFirst: function(){
			return this.index === 0;
		},
		
		// 修正跑马灯结尾的滚动位置
		fixNextLoop:function(){
			var self = this;
			var index = this.index = 1;
			//目标offset，'-234px'
			if(this.lazyLoad && !this.lazyLoadArr[index].loaded){
				this.load(this.el.one('.slider-wrapper .slider-slide:nth-child('+(index+1)+')'), index, this.lazyLoadArr[index].content);
			} 
			var dic = '-' + self.slideSize+'px';
			if(self.direction == 'horizontal'){
				
				self.sliderWrapper.css({
					'-webkit-transition-duration': '0s',
					'transition-duration': '0s',
					'-webkit-transform':'translate3d('+dic+',0,0)',
					'transform':'translate3d('+dic+',0,0)'
				});
			} else {
				self.sliderWrapper.css({
					'-webkit-transition-duration': '0s',
					'transition-duration': '0s',
					'-webkit-transform':'translate3d(0,'+dic+',0)',
					'transform':'translate3d(0,'+dic+',0)'
				});
			}

			return;

		},
		
		// 修正跑马灯开始的滚动位置
		fixPreLoop:function(){
			var self = this;
			// jayli 这里需要调试修正，继续调试
			var index = self.index = self.slidesLength - 2;
			// 目标offset,是一个字符串 '-23px'
			var dic = '-' + Number(self.slideSize) * (self.index) + 'px';
			
			if(this.lazyLoad && !this.lazyLoadArr[index].loaded){
				this.load(this.el.one('.slider-wrapper .slider-slide:nth-child('+(index+1)+')'), index, this.lazyLoadArr[index].content);
			} 
			if(self.direction == 'horizontal'){
				
				self.sliderWrapper.css({
					'-webkit-transition-duration': '0s',
					'transition-duration': '0s',
					'-webkit-transform':'translate3d('+dic+',0,0)',
					'transform':'translate3d('+dic+',0,0)'
				});
				 
			}else {
				 
				self.sliderWrapper.css({
					'-webkit-transition-duration': '0s',
					'transition-duration': '0s',
					'-webkit-transform':'translate3d(0,'+dic+',0)',
					'transform':'translate3d(0,'+dic+',0)'
				});
			}

			return;

		},
		//自动播放
		play:function(){
			var self = this;
			if(self.timer !== null){
				clearTimeout(self.timer);
			}
			self.timer = setTimeout(function(){
				self.next().play();
			},Number(self.timeout));
			self.stoped = false;
			return this;
		},
		//停止自动播放
		stop:function(){
			var self = this;
			clearTimeout(self.timer);
			self.timer = null;
			self.stoped = true;
			return this;
		},
		
		addCmpEvents: function(){
			var me = this;
			Slider.superclass.addCmpEvents.apply(this, arguments);
		/*	this.el.delegate('touchmove touchstart touchend', '.hscroll-content', function(e){
				 
				return true;
			});*/
			this.el.delegate('touchstart', '.slider-slide', function(e){
		//console.log('touchstart=');
				me.stop();
				me.touching = true;
				me.sliderWrapper.css({
					'-webkit-transition-duration': '0s',
					'transition-duration': '0s'
				});
				 
				me.startX = e.changedTouches[0].clientX;
				me.startY = e.changedTouches[0].clientY;
				
				me.startPos = me.direction == 'horizontal' ? e.changedTouches[0].clientX : e.changedTouches[0].clientY;
				
				me.startT = new Date().getTime();//如果快速手滑，则掠过touchmove，因此需要计算时间
				//return false;
			});
			
			this.el.delegate('touchend', '.slider-slide', function(e){
				//console.log('touchend', e);
				me.touching = false;
				var endPos = me.direction == 'horizontal' ? e.changedTouches[0].clientX : e.changedTouches[0].clientY;
				 
				me.delta = Math.abs(endPos - me.startPos);//滑过的距离
				var swipe_forward = Math.abs(endPos) < Math.abs(me.startPos);//是否是向左滑动
				var swipe_backward = !swipe_forward;
				//判断是否在边界反滑动，true，出现了反滑动，false，正常滑动
				var anti = me.loop ? false : ( me.isLast() && swipe_forward || me.isFirst() && swipe_backward );

				//复位
				var reset = me.direction == 'horizontal' ? function(){
					me.sliderWrapper.css({
						'-webkit-transition-duration': '300ms',
						'transition-duration': '300ms',
						'-webkit-transform':'translate3d('+(-1 * me.index * me.slideSize)+'px,0,0)',
						'transform':'translate3d('+(-1 * me.index * me.slideSize)+'px,0,0)'
					});
				}:function(){
					me.sliderWrapper.css({
						'-webkit-transition-duration': '300ms',
						'transition-duration': '300ms',
						'-webkit-transform':'translate3d(0,'+(-1 * me.index * me.slideSize)+'px,0)',
						'transform':'translate3d(0,'+(-1 * me.index * me.slideSize)+'px,0)'
					});
				};

				//根据手势走向上一个或下一个
				var goswipe = function(){
					if(swipe_forward){//下一帧
						me.next();
					}else{//上一帧
						me.previous();
					}
				};
				var isScrolling = ( Math.abs(me.delta) < Math.abs( me.direction == 'horizontal' ? (e.changedTouches[0].clientY- me.startY) : (e.changedTouches[0].clientX- me.startX) ) ) ? true: false
				if(!anti && !isScrolling &&(
						// 支持touchmove，跑马灯效果，任意帧，touchmove足够的距离
						(me.delta > me.slideSize / 2)
						//快速手滑  me.delta>10 避免将不精确的点击误认为是滑动
						|| ( (new Date().getTime() - me.startT < 550) && me.delta > 10 )
					)){

					//根据根据手滑方向翻到上一页和下一页
					goswipe();

				}else{
					//复位
					reset();
				}

				if(me.autoSlide && me.stoped){
					me.play();
				}
				//e.stopPropagation();
				//e.preventDefault();
				//return false;
			 
			});
			
			this.el.delegate('touchmove', '.slider-slide', function(e){
				var slideSize = me.slideSize;
				// 确保单手指滑动，而不是多点触碰
				if(e.touches.length > 1 ) return;

				//delta > 0 ，右移，delta < 0 左移
				me.delta = me.direction == 'horizontal' ? e.touches[0].clientX- me.startPos : e.touches[0].clientY- me.startPos; 

				//判断是否在边界反滑动，true，出现了反滑动，false，正常滑动
				var anti = me.loop ? false : ( me.isLast() && me.delta < 0 || me.isFirst() && me.delta > 0 );

				if(anti){
					me.delta = me.delta / 3; //如果是边界反滑动，则增加阻尼效果
				}

				// 判断是否需要上下滑动页面

				var isScrolling = ( Math.abs(me.delta) < Math.abs( me.direction == 'horizontal' ? (e.touches[0].clientY- me.startY) : (e.touches[0].clientX- me.startX) ) ) ? true: false

				if(!isScrolling){
					// 阻止默认上下滑动事件
					//e.stopPropagation();
					//e.preventDefault();
					me.stop();
					var dic = me.delta - me.index * slideSize;
					if(me.lazyLoad && me.delta<0){
						var nextIndex = me.index+1;
					 
						if(!me.lazyLoadArr[nextIndex].loaded){
							me.load(me.el.one('.slider-wrapper .slider-slide:nth-child('+(nextIndex+1)+')'), nextIndex, me.lazyLoadArr[nextIndex].content);
						}
						
					}
					if(me.lazyLoad  && me.delta>0){
						var preIndex = me.index-1;
						if(!me.lazyLoadArr[preIndex].loaded){
							me.load(me.el.one('.slider-wrapper .slider-slide:nth-child('+(preIndex+1)+')'),preIndex, me.lazyLoadArr[preIndex].content);
							
						}
						
					}
					// 立即跟随移动
					if( me.direction == 'horizontal'){
						me.sliderWrapper.css({
							'-webkit-transition-duration': '0s',
							'transition-duration': '0s',
							'-webkit-transform':'translate3d('+dic+'px,0,0)',
							'transform':'translate3d('+dic+'px,0,0)'
						});
					}else{
						me.sliderWrapper.css({
							'-webkit-transition-duration': '0s',
							'transition-duration': '0s',
							'-webkit-transform':'translate3d(0,'+dic+'px,0)',
							'transform':'translate3d(0,'+dic+'px,0)'
						});
					}
					return false;
				}else{
					return true;
				}
			});
			
			Event.on(window, 'resize', function(e){
				//console.log(e);	
				me.setSliderSize();
				me.setSlidePosition();
			});
			
			this.el.delegate('click tap', '.tabbar .tab', function(e){
				 
				var target = S.one(e.currentTarget),
					index = S.all('.tabbar .tab').index(target);
				me.go(index);
				return false;
			});
		},
		
		/**
		 * @override
		 */
		getSliderPagination: function(){
			return  this.el.one('.slider-pagination');
		},
		/**
		 * @override
		 */
		createSliderPaginationBullet: function(item, realIndex){
			return '<span class="slider-pagination-bullet"></span>';
		},
		/**
		 * @override
		 */
		hightlightPagerBullet: function(index){
			var index = index;
			//console.log('hightlightPagerBullet', this.sliderPagination.all('.slider-pagination-bullet'));
			this.sliderPagination.all('.slider-pagination-bullet').removeClass(this.activeCls);
			this.sliderPagination.one('.slider-pagination-bullet:nth-child('+(index+1)+')').addClass(this.activeCls);
		}
		
	 
	});
	
	return Slider;
}, {
	requires: ["node", "event", "xtemplate", 
	           "../container/Container",
	           "./tpl/slider-tpl"]
});