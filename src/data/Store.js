KISSY.add(function(S, EventSupport, Model){
	 
	function Store(config){
		this.data = [];
		S.mix(this, config, true, undefined, true);
		Store.superclass.constructor.apply(this, arguments);
		
		var data = this.data;
		if(data){
			this.insert(data);
		}
			
	}
	S.extend(Store,  EventSupport);
	
	UFO.augment(Store, {
		alias:'store',
		
		load: function(){
			
		},
		loadMore: function(url, cb){
			
			//this.showMask();
			var me = this,
				url = this.url = (url || this.url);
			
			if(this.pageSize){
				var start = this.data.length - 1;
				if(start < 0){
					start = 0;
				}
				url = url +( url.indexOf('?') === -1 ? "?" : "&") + 'start='+start + '&limit='+this.pageSize ;
			}
			console.log('load more ...'+ url);	 
			S.io({
                url : url
            }).done(function(data){
            	me.inserData(data);
            	
            	if(!data || data.length < me.pageSize){
            		me.setLoadFinished(true);
            	}
            	cb && cb();
            }).fail(function(msg){
            	console.log("faile:" + msg);
            });
		},
		
		insert: function(data, index){
			if(S.isEmptyObject(data)){
				return ;
			}
			var me = this,
				append = false;
			
			if(!S.isArray(data)){
				data = [data];
			}
			for(var i=0, len= data.length;i<len;i++){
				var o = data[i],
					model;
				if(S.isPlainObject(o)){
					 
					data[i] = model = UFO.create('model', o);
					model.on('propertychange', function(name, value, oldValue, _model){
						me.fire('update', me.indexOf(_model), _model,  name, value, oldValue);
						me.fire('change');
					});
					
				}
			}
			 
			
			if(index == undefined || index == null || index >= this.data.length){
				append = true;
				index = this.data.length;
			}
			
			if(append){
				this.data = this.data.concat(data);
				this.fire('insert', data);
			}else{
				var	startDatas = this.data.slice(0, index),
					endDatas = this.data.slice(index);
			
				this.data = startDatas.concat(data).concat(endDatas);
				this.fire('insert', data, index);
			}
			
			this.fire('change');
			
		},
		remove: function(index){
			
			if(!S.isNumber(index)){
				index = S.indexOf( index, this.data);
			}
			this.data.splice(index, 1);
			this.fire('remove', index);
			this.fire('change');
		},
		removeAll: function(){
			this.data=[];
			this.fire('removeAll');
			this.fire('change');
		},
		
		getAt: function(index){
			return this.data[index];
		},
		getLast: function(){
			return this.getAt(this.getSize()-1);
		},
		getSize : function(){
			if(this.data)
				return this.data.length;
			else return 0;
		},
		getRange: function(){
			return this.data;
		},
		indexOf: function(record){
			return S.indexOf(record, this.data);
		},
		setLoadFinished: function(loadFinished){
			this.loadFinished = loadFinished;
			if(loadFinished){
				this.fire('loadFinished', loadFinished);
			}
				
		},
		isLoadFinished: function(){
			return this.loadFinished;
		},
		getOriginalData: function(){
			var data = [];
			for(var i=0, len= this.data.length;i<len;i++){
				data.push(this.data[i].values);
			}
			return data;
		}
		
		 
	});
	
	
	 return Store;
}, {
	requires: ['../EventSupport', './Model']
});