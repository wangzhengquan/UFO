/**
 * var  day = $('#day'),
	 	hour =  $('#hour'),
	 	minute =  $('#minute'),
	 	second =  $('#second');
	
	var targetTime =  new Date(2015,8,23,12,0);
	countdown(targetTime, function(timeArr){
		//console.log('timeArr', timeArr);
		day.html(timeArr[0]);
		hour.html(timeArr[1]);
		minute.html(timeArr[2]);
		second.html(timeArr[3]);
	}); 
 */

KISSY.add(function(S){
	
	var calcTime = function (diff){
	    var day=0,
	    		hour=0,
	        minute=0,
	        second=0;//时间默认值        
	        
	    if(diff > 0){
	        day = Math.floor(diff / (60 * 60 * 24));
	        hour = Math.floor(diff / (60 * 60)) - (day * 24);
	        minute = Math.floor(diff / 60) - (day * 24 * 60) - (hour * 60);
	        second = Math.floor(diff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	    }
	    if (minute <= 9) minute = '0' + minute;
	    if (second <= 9) second = '0' + second;
	    return [day, hour, minute, second];
	
	}
	
	var countdown = function (targetTime, cb){			
	   var now = new Date(),
		   diff = parseInt( (targetTime.getTime() - now.getTime())/1000 );
			
	   var itimer = setInterval(function(){
		    
	    	var timeArr = calcTime(diff);
	    	diff--;
	    	cb && cb(timeArr);
	    	if(diff <= 0){
	    		clearInterval(itimer);
	    	}
	    }, 1000);
	} 
	   
	
	return {
		calcTime: calcTime,
		countdown: countdown
	}
});