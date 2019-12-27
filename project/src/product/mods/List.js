KISSY.add(function(S, Node, DOM, Event, XTemplate, Component, Lazyload, 
		  XTemplateUtil, MessageBox, tpl, recommend_item_tpl,
		 spinner_loading_tpl,
		 Action){
	
	/**
     * 自定义的Buffer函数，实现下面的特点：
     * 1. 从来没有执行过或长时间没有执行过，则立即运行（这样确保初始化代码能第一时间执行）
     * 2. 最后一次一定会被执行
     */
    function buffer(fn, ms, context) {
    	//console.log("buffer context", context);
        var timer, lastStart = 0, lastEnd = 0,
            ms = ms || 150;

        function run() {
        	//console.log("buffer arguments 1",arguments);
            if (timer) {
                timer.cancel();
                timer = 0;
            }
            lastStart = S.now();
            fn.apply(context || this, arguments);
            lastEnd = S.now();
        }

        return S.mix(function () {
            if (
                (!lastStart) || // 从未运行过
                    (lastEnd >= lastStart && S.now() - lastEnd > ms) || // 上次运行成功后已经超过ms毫秒
                    (lastEnd < lastStart && S.now() - lastStart > ms * 8)	// 上次运行或未完成，后8*ms毫秒
                ) {
                run.apply(context, arguments);
            } else {
                if (timer) {
                    timer.cancel();
                }
                timer = S.later(run, ms, 0, context, arguments);
            }
        }, {
            stop: function () {
                if (timer) {
                    timer.cancel();
                    timer = 0;
                }
            }
        });
    }
	var win = window;
	var loadingMoreMask = S.one(spinner_loading_tpl);
	function List(config){
		List.superclass.constructor.call(this, config);
	}
	
	S.extend(List, Component);
	
	UFO.augment(List, {
		alias: 'productlist',
		
		initComponent: function(){
			this.el = S.one(tpl);
			this.List = this.el.one('ul');
			
			this.scrollView = this.el;
			this.scrollViewDom = this.scrollView.getDOMNode();
			List.superclass.initComponent.apply(this, arguments);
			this.init();
		},
		
		/**
		 * 初始化
		 */
		init: function(){
			this.load({});
		},
		
		/**
		 * 计算作品图片大小
		 * @param cb
		 */
		calcImgSize: function(cb){
			var productImgWidth = this.productImgWidth = this.List.width(),
				productImgHeight = this.productImgHeight = this.productImgWidth*224/300;
			 
			 
			if(!productImgWidth){
				setTimeout(function(){
					calcImgSize(cb);
				}, 2000);
			}else{
				cb && cb(productImgWidth, productImgHeight);
			}
		 
		},
		
		/**
		 * 设置作品图片大小
		 * @param cb
		 */
		setImgSize: function(cb){
			var me = this;
			this.calcImgSize(function(width, height){
				me.el.all('.product-list .card .img-wrapper').css({
					width: width,
					height: height
				});
				
				me.el.all('.product-list .card .img-wrapper > img').css({
					'min-width': width,
					'min-height': height
				});
				
				cb && cb();
			});
		},
		
		showLoadingMoreMask: function(){
			this.List.append(loadingMoreMask);
		},
		
		removeLoadingMoreMask: function(){
			loadingMoreMask.remove();
		},
		
		load: function(params, suc){
			var me = this;
			params.offset = 0;
			this.params = params;
			this.query(params, function(loadFinished){
				me.setImgSize(function(){
					me.actInview();
				});
				if(!loadFinished){
					me.addScrollListener();
				}
				suc && suc(loadFinished);
			});
		},
		
		loadMore: function(suc){
			console.log('loadmore-----');
			var me = this;
			var params = this.params;
			params.offset = params.offset + params.page_size;
			this.query(params, function(loadFinished){
				me.actInview();
				suc && suc(loadFinished);
			});
		},
		
		query: function(params, suc, error){
			var me = this;
			
			me.showLoadingMoreMask();
			
			me.scrollViewDom.scrollTop =  me.scrollViewDom.scrollTop + 28;
			
			params = this.params = (params || this.params);
			 
			Action.query('/products.json', params, function(json){
				console.log('query', json);
				me.removeLoadingMoreMask();
				me.List.append(new XTemplate(
					recommend_item_tpl,
					{
						commands:{
			                'getProductHref': function (scopes, option) {
			                	var product_id = option.params[0];
			                	return '#'+product_id;
			                }
			                
						}
					}
				).render({
					list: json ,
					productImgWidth: me.productImgWidth, 
					productImgHeight: me.productImgHeight 
				}));
			
				 
				suc && suc(json.length < params.page_size);
			}, function(msg){
				me.removeLoadingMoreMask();
				error && error();
				console.log('msg', msg);
			});
		},
		
		actInview: function(){
			var me = this;
			//图片
			if(!me.imgLazyLoad){
				me.imgLazyLoad = new Lazyload({
	                container: me.scrollView,
	                autoDestroy: false
	            });
			}else{
				
				me.imgLazyLoad.addElements(me.imgLazyLoad.get('container'));
				me.imgLazyLoad.refresh();
			}
			
			//标签进入可视区动画
			if(!me.labelLazyload){
				me.labelLazyload = new Lazyload({
                    container: me.scrollView,
                    autoDestroy: false,
                    type: 'div'
                });
			}
			
			me.labelLazyload.clear();
			 
			var els = DOM.query('.product-list .card .img-wrapper .product-label');
			S.each(els, function (el) {
				me.labelLazyload.addCallback(el, function(el){
					DOM.addClass(el, 'inview');
					
					//console.log('in el', el);
					return false;
				}, function(el){
					DOM.removeClass(el, 'inview');
					
					//console.log('out el', el);
				});
			});
		},
		
		 
		 
		addCmpEvents: function(){
			var me = this;
			
			/**
			 * 滚动条事件
			 */
			var scrollHandler = (function(e){
				return buffer(function(){
					if((me.scrollViewDom.scrollTop + me.scrollViewDom.clientHeight + win.innerHeight>=  me.scrollViewDom.scrollHeight)){
						me.removeScrollListener();
						me.loadMore(function(loadFinished){
							if(!loadFinished){
								me.addScrollListener();
							}
						});
					}
				}, 500);
				
			})();
			
			this.addScrollListener = function(){
				Event.on(me.scrollViewDom, 'scroll', scrollHandler);
			};
			
			this.removeScrollListener = function(){
				Event.detach(me.scrollViewDom, 'scroll', scrollHandler);
			};
			
			this.el.delegate('click', 'a.card', function(event){
				MessageBox.alert('alert', 'You are nice!');
				return false;
			});
			
			Event.on(win, "resize", function(event){
				me.setImgSize();
			});
			
			
		}
	 
	});
	
	return List;
}, {
	requires: ['node', 'dom', 'event', "xtemplate",  "UFO/Component",   
	           "UFO/lazyload/Lazyload",
	           "../../util/XTemplateUtil",
	           "UFO/popup/MessageBox",
	           "../tpl/list-tpl",
	           "../tpl/list-item-tpl",
	           "../../tpl/spinner-loading-tpl",
	           "../../Action"]
});
