KISSY.add(function(S, IO, app){
	var $ = S;
	return {
		 
		ajax2: function(config){
		    S.mix(config, {
				 dataType:'json',
				 headers: {
				    'X-Requested-With': false
				 }
			}, false);
			
			var user = app.getSessionUser();
			if(user){
				config.data = S.mix({
					user_id: user.user_id,
					token: user.token
				}, config.data); 
						
			}
			config.data = S.mix({
				version: G_CONFIG.version
			}, config.data);
			
			return $.io(config);
		},
		
		ajax: function(config){
			config.url =   G_CONFIG.API_HOST + config.url ;
			
			return this.ajax2(config);
		},
		query: function(url, params, success, error){
			 
			return this.ajax({
			  // async:false,
			   type: "GET",
			   url: url ,
			   data: params,
			   success: success,
			   error: function(msg){
				  error && error(msg);
				  alert('网络错误');
				  console.error(msg);
			   }
			});
		},
		
		post: function(url, data, suc, error){
			return this.ajax({
			   type: "post",
			   url:  url,
			   data: data,
			   success: suc,
			   error: function(msg){
				  error && error(msg);
				  alert('网络错误');
				  console.error(msg);
			   }
			});
		},
		
		update: function(url, data, suc, error){
			return this.post(url, data, suc, error); 
		},
		//file, suc, error, progress
		uploadImage2: function(config){
			
			/*function updateProgress (oEvent) {
				console.log('updateProgress', oEvent);
			  if (oEvent.lengthComputable) {
			    var percentComplete = oEvent.loaded / oEvent.total;
			    console.log(percentComplete);
			    progress && progress(percentComplete);
			    // ...
			  } else {
				  console.log('Unable to compute progress information since the total size is unknown');
			    // Unable to compute progress information since the total size is unknown
			  }
			}

			function transferComplete(evt) {
			  console.log('The transfer is complete.', evt);
			  suc && suc(JSON.parse(evt.currentTarget.response));
			  //alert("The transfer is complete.");
			}

			function transferFailed(evt) {
				error && error(JSON.parse(evt.currentTarget.response));
			  //alert("An error occurred while transferring the file.");
			}

			function transferCanceled(evt) {
			  //alert("The transfer has been canceled by the user.");
			}*/
			
			var oReq = new XMLHttpRequest();
			config.updateProgress && oReq.addEventListener("progress", config.updateProgress, false);
			config.success && oReq.addEventListener("load", config.success, false);
			config.error && oReq.addEventListener("error", config.error, false);
			config.transferCanceled && oReq.addEventListener("abort", config.transferCanceled, false);
			
			var formData = new FormData();
			formData.append('uploadImage', config.file);
			oReq.open("post", G_CONFIG.API_HOST + '/v2/upload_image', true);
			oReq.send(formData);
		},
	 
		
		postFormData: function(url, data, success, error){
			var config ;
			if(!S.isString(url)){
				config = url;
				url = config.url;
				data = config.data;
				success = config.success;
				error = config.error;
			}else{
				config = {};
			}
			var user = app.getSessionUser();
			if(user){
				S.mix(data, {
					user_id: user.user_id,
					token: user.token
				}, false ); 
						
			}
			var formData = new FormData();
			for(var p in data){
				formData.append(p, data[p]);
			}
			
			S.mix(config, {
			   type: "post",
			   url: G_CONFIG.API_HOST + url,
			   data: formData,
			   dataType:'json',
			   headers: {
			       'X-Requested-With': false
			   },
			   cache: false,
	           contentType: false,
	           processData: false,  
			   success: success,
			   error: error
			});
			
			return $.io(config);
		}
	};
},{
	requires: ['io', './app']
});