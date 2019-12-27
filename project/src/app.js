KISSY.add(function(S, Storage, ParamUtil, XTemplateUtil){
	
	var _PARAM = ParamUtil.processParam( S.unparam(decodeURIComponent(location.search.slice(1))) ),
	    ua = navigator.userAgent.toLowerCase();
	
	var position_key = "yql_customer_position",
	  	session_user_key = 'yql_user';
	

var CITY_MAP = undefined,
	NAME_KEY_CITY_MAP = undefined,
	CITY_LIST = [
		{
			name: '北京市',
			code: '110100'
		},
		{
			name: '上海市',
			code: '310100'
		},
		{
			name: '杭州市',
			code: '330100'
		},
		{
			name: '成都市',
			code: '510100'
		},
		{
			name: '深圳市',
			code: '440300'
		},
		{
			name: '广州市',
			code: '440100'
		},
		{
			name: '武汉市',
			code: '420100'
		},
		{
			name: '南京市',
			code: '320100'
		},
		{
			name: '天津市',
			code: '120100'
		},
		{
			name: '重庆市',
			code: '500100'
		}];
	return {
		getCity: function(code){
			return this.getCityMap()[code] || this.getCityMap()['110100'];
		},
		getCityByName: function(name){
			if(!(/市$/.test(name))){
				name = name + "市";
			}
			return this.getNameKeyCityMap()[name] || this.getNameKeyCityMap()['北京市'];
		},
		getCityMap: function(){
			if(!CITY_MAP){
				CITY_MAP = {};
				var city;
				for(var i=0,len=CITY_LIST.length; i<len; i++){
					city = CITY_LIST[i];
					CITY_MAP[city.code] = city;
				}
			} 
			return CITY_MAP;
		},
		getNameKeyCityMap: function(){
			if(!NAME_KEY_CITY_MAP){
				NAME_KEY_CITY_MAP = {};
				var city;
				for(var i=0,len=CITY_LIST.length; i<len; i++){
					city = CITY_LIST[i];
					NAME_KEY_CITY_MAP[city.name] = city;
				}
			} 
			return NAME_KEY_CITY_MAP;
		},
		getCityList: function(cb){
			cb && cb(result);
			return CITY_LIST;
		},
		
		 /**
		  * addrDetail: ""
			address: "地铁10号线; 机场线"
			city: "北京市"
			city_code: '110100',
			phoneNumber: undefined
			point: {
				lat: 39.96688,
				lng: 116.463573
			}
			lat: 39.96688
			lng: 116.463573
			postcode: undefined
			province: "北京市"
			title: "三元桥"
		  */
		 setPosition: function(position){
			 console.log('position', position);
			 if(!position.city_code){
				 position.city_code = this.getCityByName(position.city).code;
			 }
			 Storage.setSessionItem(position_key, position);
		 },
		 getPosition: function(){
			 Storage.getSessionItem(position_key);
		 },
		 setSessionUser: function(user){
			 Storage.setSessionItem(session_user_key, user);
		 },
		 getSessionUser: function(){
			 return Storage.getSessionItem(session_user_key);
		 },
		 isLogined: function(){
			 return !!this.getSessionUser();
		 },
		 getParam: function(){
			 return _PARAM;
		 },
		 
		 /**
		  * 是否是微信
		  */
		 isMicroMessenger : function(){
		     return (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") ;
		 },
		 
		 /*
	      * 没有安装app跳转到下载页面
	      * 从h5唤起app
	      */
	     notifyApp: function(ios_url,android_url){
	       var u = navigator.userAgent;
	  	   if(u.toLowerCase().match(/MicroMessenger/i) == "micromessenger"){
	  		 window.location = "down.html";
	  		 return;
	  	   } else if(u.match(/(iPhone|iPod|iPad);?/i)){
	  		   window.location = ios_url;
	  		    
	  	   }else if(u.match(/android/i)){
	  		   window.location = android_url;
	  	   }
	  	  
	       var clickedAt = +new Date;  
           setTimeout(function(){
              !window.document.webkitHidden && setTimeout(function(){ 
                    if (+new Date - clickedAt < 2000){  
                        window.location = "down.html";  
                    }  
              }, 500);       
           }, 500);   
	     } 
		 
		
	};
}, {
	requires:["UFO/util/Storage", "./util/ParamUtil", "./util/XTemplateUtil"]
} );