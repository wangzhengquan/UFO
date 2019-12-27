KISSY.add(function(S, Node,Event, XTemplate, Container){
	//-webkit-transform: translate3d(0px, 29px, 0px) scaleY(1); height: 279px;
	/*var tpl = [  
	       '<div class="scroll-wrapper">',
	       '    <div class="scroll-content">',
	       '    	<div class="scroll"></div>',
	       '    </div>',
	       '    <div class="scroll-bar scroll-bar-v">',
	       '		<div class="scroll-bar-indicator scroll-bar-fade-out" style=""></div>',
	       '	</div>',
	       '</div>'
	    ].join('');*/
	
	var tpl = [  
		       '<div class="scroll-content">',
		       '    <div class="scroll"></div>',
		       '    <div class="scroll-bar scroll-bar-v">',
		       '		<div class="scroll-bar-indicator scroll-bar-fade-out" style=""></div>',
		       '	</div>',
		       '</div>'
		    ].join('');
	var doc = document;
	function ScrollView(config){
		this.scrollTop = 0;
		ScrollView.superclass.constructor.call(this, config);
		
	}
	
	S.extend(ScrollView, Container);
	
	UFO.augment(ScrollView, {
		
		alias:'scrollview',
		
		initComponent: function(){
			this.el = S.all(tpl);
			this.scrollContent = this.el;
			this.scroll = this.el.one('.scroll');
			this.scrollBar = this.el.one('.scroll-bar');
			this.scrollIndicator = this.el.one('.scroll-bar-indicator');
			this.scrollIndicatorMinSize = 50;
			ScrollView.superclass.initComponent.apply(this, arguments);
			//this.setScrollIndicatorSizeAndPos();
		},
		
		setScrollIndicatorSizeAndPos : function() {	
			this.scrollIndicatorSize = this.clacScrollIndicatorSize();
			this.setScrollIndicatorSize();
			this.setScrollIndicatorPosition();
		},
		clacScrollIndicatorSize : function() {	
			return parseInt(this.scrollContent.height()/this.scrollContent.getDOMNode().scrollHeight * this.scrollBar.height());
		},
		updateLayout: function(){
			ScrollView.superclass.updateLayout.apply(this, arguments);
			this.setScrollIndicatorSizeAndPos();
		},
		setScrollIndicatorSize : function() {				
			if(this.scrollIndicatorSize > this.scrollIndicatorMinSize) {
				//console.log('this.scrollIndicatorSize', this.scrollIndicatorSize);
				if(this.scrollIndicatorSize <  this.scrollBar.height() ){
					this.scrollIndicator.css({
						height: this.scrollIndicatorSize + "px",
						display: "inline-block"
					});
					 
				}else{
					this.scrollIndicator.hide();
					 
				}
			}
			else { 
				//当内容超多时设置拖拽条子的最小高度
				this.scrollIndicatorSize = this.scrollIndicatorMinSize; 
				this.scrollIndicator.css({
					height: this.scrollIndicatorSize + "px",
					display: "inline-block"
				});
				 
			}
		},
		
		setScrollIndicatorPosition: function(){
			if(this.scrollIndicator.css('display') != "none" ){
				var position = this.scrollTop/(this.scrollContent.getDOMNode().scrollHeight - this.scrollContent.height()) * (this.scrollBar.height() - this.scrollIndicatorSize ) 
				this.scrollIndicator.css({
					'-webkit-transform': 'translate3d(0px, '+position+'px, 0px)',
					'-ms-transform': 'translate3d(0px, '+position+'px, 0px)',
					'-moz-transform': 'translate3d(0px, '+position+'px, 0px)',
					'-webkit-transform': 'translate3d(0px, '+position+'px, 0px)',
					'-o-transform': 'translate3d(0px, '+position+'px, 0px)',
					'transform': 'translate3d(0px, '+position+'px, 0px)'
				})
			}
		},
		
		getBodyContainer: function(){
			return this.scroll;
		},
		onScrollContentMouseMove: function(){
			
		},
		scrollBy: function(step){
			this.setScrollTop(this.calcScrollTop(step));
		},
		setScrollTop: function(scrollTop){
			var me = this;
			me.scroll.css({
				"-webkit-transform": "translate3d(0px, "+ (-scrollTop) +"px, 0px)",
				'-ms-transform': 'translate3d(0px, '+(-scrollTop)+'px, 0px)',
				'-moz-transform': 'translate3d(0px, '+(-scrollTop)+'px, 0px)',
				'-webkit-transform': 'translate3d(0px, '+(-scrollTop)+'px, 0px)',
				'-o-transform': 'translate3d(0px, '+(-scrollTop)+'px, 0px)',
				'transform': 'translate3d(0px, '+(-scrollTop)+'px, 0px)'
			});
			me.fire('scroll');
		},
		calcScrollTop: function(step){
			var me = this;
			me.scrollTop += step;
			if(me.scrollTop<0){
				me.scrollTop =0;
			}
			
			if(me.scrollTop > me.scrollContent.getDOMNode().scrollHeight- me.scrollContent.height()){
				me.scrollTop = me.scrollContent.getDOMNode().scrollHeight- me.scrollContent.height();
			}
			return me.scrollTop;
		},
		addCmpEvents: function(){
			var me = this;
			
			this.on('scroll',  function(event){
				me.setScrollIndicatorPosition();
			});
			/*this.scrollContent.on("swipe", function (e) {
	            console.log(e.type + ' : fired');
	            console.log('direction', e.direction);
	            console.log('distance', e.distance);
	            console.log('duration' ,e.duration);
	            var s = Math.pow(e.distance/(e.duration), 2)/(2*9.8) * .01;
	           // me.scrollBy(s);
	            console.log('s' ,s);
	            
	        });*/
		/*	this.scrollContent.on( "swiping", function (e) {
				   console.log('swiping', e);
				   me.scrollBy(e.distance);
	            
	        });*/
			this.scrollContent.on('touchstart', function(se){
				me.fire('movestart');
				me.scrollIndicator.removeClass('scroll-bar-fade-out');
				var startY = se.touches[0].clientY,
					lastMoveTime = se.timeStamp || Date.now(),
					lastMoveY = startY,
					stopInertiaMove = false; 
				
				var touchmove = function(mevent){
					//console.log('mevent', mevent);
					me.fire('move');
					var clientY = mevent.touches[0].clientY;
				//console.log('touchmove clientY', clientY);
					me.scrollBy((startY-clientY));
					startY = clientY;
					
					var nowTime = mevent.timeStamp || Date.now();
				    stopInertiaMove = true;
				    if(nowTime - lastMoveTime > 30) {
				    	lastMoveTime = nowTime;
				        lastMoveY = startY;
				    }
				    
					return false;
				};
				var touchend = function(ue){
					
					var clientY = ue.changedTouches[0].clientY;
					
					 /**
				     * 缓动代码
				     */
				    var nowTime = ue.timeStamp || Date.now();
				    var v = (lastMoveY - clientY ) / (nowTime - lastMoveTime); //最后一段时间手指划动速度
				 // console.log('v', v);
				    stopInertiaMove = false;
				    (function(v, startTime) {
				        var dir = v > 0 ? -1 : 1; //加速度方向
				        var deceleration = dir*0.004;
				        var duration = v / deceleration; // 速度消减至0所需时间
				        var dist = v * duration / 2; //最终移动多少
				        function inertiaMove() {
				        	
				            if(stopInertiaMove) return;
				          
				            var t =  Date.now()-startTime;
				            var nowV = v + t*deceleration;
				           //console.log('nowV', nowV, dir*nowV);
				            // 速度方向变化表示速度达到0了
				            if(dir*nowV > 0) {
				            	me.fire('moveend');
								//me.scrollIndicator.addClass('scroll-bar-fade-out');
				                return;
				            }
				            var moveY = (v + nowV)/2 * t;
				            me.scrollBy(moveY);
				            setTimeout(inertiaMove, 10);
				        }
				        inertiaMove();
				    })(v, nowTime);
					
				    
					me.scrollContent.detach( 'touchmove', touchmove);
					me.scrollContent.detach( 'touchend', touchend);
					 
				};
				me.scrollContent.on( 'touchmove', touchmove);
				
				me.scrollContent.on('touchend', touchend);
				//return false;
			});
			
			
			this.scrollContent.on('mousedown', function(de){
				me.fire('movestart');
				me.scrollIndicator.removeClass('scroll-bar-fade-out');
				var startY = de.clientY;
				Event.on(doc, 'mousemove', function(mevent){
					me.fire('move');
					var clientY = mevent.clientY;
					me.scrollBy((startY-clientY)*2);
					startY = clientY;
				});
				Event.on(doc, 'mouseup', function(ue){
					me.fire('moveend');
					me.scrollIndicator.addClass('scroll-bar-fade-out');
					Event.detach(doc, 'mousemove');
					//ue.preventDefault();
					//ue.stopPropagation();
					//return false;
				});
				//de.preventDefault();
				//de.stopPropagation();
				//return false;
			});
			this.scrollContent.on('mousewheel', function(event){
				 
				var e = event.originalEvent,
					eDir;	
				//e.wheelDelta与e.detail分别兼容IE、W3C，根据返回值的正负来判断滚动方向
				if(e.wheelDelta) { 
					eDir = e.wheelDelta/120; 
				}
				else if(e.detail) { 
					eDir = -e.detail/3; 
				}
		//console.log('eDir==', eDir);
				//步长设80像素比较接近window滚动条的滚动速度
				me.scrollBy(eDir > 0 ? -80: 80);
			});
			 
			this.scroll.on('resize', function(event){
				console.log("resize====");
			});
		}
	 
	});
	
	return ScrollView;
}, {
	requires: ['node', "event", "xtemplate",  "../container/Container" ]
});