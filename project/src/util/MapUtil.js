KISSY.add(function(S){
	
	var geolocation = new BMap.Geolocation();
	
	//var map = new BMap.Map();  
	
	return {
		/**
		 * 获取当前所在地理位置
		 * @param suc
		 * @param error
		 * @returns
		 */
		getCurrentPosition: function(suc, error){
			var defer = S.Defer();  
			geolocation.getCurrentPosition(function(position){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					suc && suc(position);
					defer.resolve(position);
				}
				else {
					position = {
						address:{
							city:'北京市'
						},
						city:'北京市'
					};
					suc && suc(position);
					defer.resolve(position);
					 
				}        
			},{enableHighAccuracy: true});
			return defer.promise;
		}
	}
});