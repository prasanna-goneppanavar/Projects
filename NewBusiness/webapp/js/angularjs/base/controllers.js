
newBusinessFormUI.controller('baseFormController',['$scope', '$http','$filter','baseSchemaService','$q','$location','$window', function($scope, $http, $filter, baseSchemaService, $q, $location, $window){

	/**
	 * TODO - Inject the uploader object.
	 * On save, first check if the uploader queue is empty
	 * if not, save the datamodel first and get its _id
	 * next upload each document serially including the new instance _id and the datamodel name
	 *
	 */
	 
   console.log("newBusinessFormUI load ");
   console.log("formName :: "+formName);
   console.log("formFileName :: "+formFileName);

   console.log("ctx "+ctx);

   $scope.dm = {};

   
   var fileName = "";
	
   $scope.isFormDataLoaded = true;
   $scope.defaultForm = "html/projectform/" + formName + "/" + formFileName;
   
   var loadDefaultForm = function(){
		var url = "/getdefaultform.htm";
		$http({
			url : ctx + url,
			method : "GET",
			cache : false,
		}).success(function(response){
			console.log("Response data stringify "+JSON.stringify(response));
			formName = response.formName;
			fileName =  response.fileName;
			$scope.defaultForm = "html/projectform/" + formName + "/" + fileName;
			initForm();
		})
		.error(function(){
		   console.log("Failed to retrieve getdefaultform ");
	   }); 
	}
   
   
   var initForm = function(){
		console.log("query params "+$location.absUrl());
		var queryUrl = $location.absUrl();
		var queryParams ="";
		var url = "/initform/"+formName+"/";
		if(queryUrl.indexOf("?")!=-1){
			queryParams = queryUrl.substring(queryUrl.indexOf("?")+1);
			url = url + queryParams +".htm"; 
		}else{
			url = url + "\"\"" +".htm";
		}
		
		$http({
			url : ctx + url,
			method : "POST",
			data : "{}",
			cache : false,
		}).success(function(response){
			console.log("Response data stringify "+JSON.stringify(response));
			$scope.dm = response;
			$scope.isFormDataLoaded = true;
		})
		.error(function(){
		   console.log("Failed to intialize the form ");
	   });
	}
	
	//loadDefaultForm();
	
		
	var getDataModalSchema = function() {
		// Getting DM Schema 
		$http({
			url:ctx+'/getDMSchema.htm'
		}).success(function(response){
			console.log("DMSCHEMA "+ JSON.stringify(response));
			$scope.schema = response.dataModelSchema;
		})
	
	}

	getDataModalSchema();
	
	$scope.formDataModelObject = {};

	$scope.saveFormInstance =  function(formObect){
		console.log("save form instance called ");
		console.info(JSON.stringify($scope.dm));
		var def = $q.defer();
		if(!validateDMSchema()){
			def.reject("Invalid Schema");
		}
		else if(!validateFormObject(formObect)){
			def.reject("Validation Error");
		}
		else{
			console.log("Saving form");
			saveNewFormInstance()
				.success(function(response){
					 def.resolve(response);
				})
				.error(function(){
                   def.reject("Failed to submit");
               });
		}
		return def.promise;
	};
	

	

	
	$scope.saveOrUpdateFormInstance =  function(formObect, _id){
		var def = $q.defer();
		if(!validateDMSchema()){
			def.reject("Invalid Schema");
		}
		else if(!validateFormObject(formObect)){
			def.reject("Validation Error");
		}
		else{
			formInstanceId = _id;
			saveNewFormInstance()
				.success(function(response){
					 def.resolve(response);
				})
				.error(function(){
                   def.reject("Failed to submit");
               });
		}
		return def.promise;
	};
	
	/*To Save data without ah-validation check
	 * Schema validation will not be skipped.
	 */
	$scope.draftFormInstance =  function(){
		var def = $q.defer();
		if(!validateDMSchema()){
			def.reject("Invalid Schema");
		}
		else{
			saveNewFormInstance()
			.success(function(response){
				
				 def.resolve(response);
			})
			.error(function(){
                def.reject("Failed to submit");
            });
		}
		return def.promise;
	};


	$scope.actionType = {};
	//for save
	$scope.actionType = "save";
	
	// for update
	//$scope.actionType = "update";

	var saveNewFormInstance = function(){
		console.log("Calling save with "+JSON.stringify($scope.dm))
		return $http({
			url: ctx + '/save/'+formName+ '/' + $scope.actionType +'.htm',
			method : "POST",
			data : $scope.dm,
		}).success(function(response){
			console.log("Saved Successfully "+response);
		})
	};
		
	var validateDMSchema = function(){
		$("[name$='Error']").hide();
		$("[name$='Error']").prev().css("border-color", "");
		var tv4ResultObject = baseSchemaService.validateJsonSchema($scope.dm, $scope.schema);
		console.log(tv4ResultObject.isValid);
		console.log(tv4ResultObject);
		if(!tv4ResultObject.isValid)
		{
			var genricErrors = "";
			for(var i = 0; i < tv4ResultObject.errors.length;i++)
			{
				if(tv4ResultObject.errors[i].code == "302")
				{
					var elementName = tv4ResultObject.errors[i].params.key;
					var errorMessage = tv4ResultObject.errors[i].message;

					if($("[name='"+elementName+"']").length)
					{
						$("[name='"+elementName+"']").css("border-color", "firebrick");
						if($("[name='"+elementName+"']").parent().find("p").length)
							$("[name='"+elementName+"']").parent().find("p").html(errorMessage).show();
						else
							$("[name='"+elementName+"']").parent().append($("<p name=\""+elementName+"Error\" style=\"color:firebrick;\" class=\"error-element\">"+errorMessage+"</p>"));
					}
					else
					{
						genricErrors += '<tr><td>'+elementName+'</td><td>'+errorMessage+'</td></tr>';
					}
				}
				else
				{
					var dataPathArray = tv4ResultObject.errors[i].dataPath.split("/");
					var elementName = dataPathArray[dataPathArray.length-1];
					var errorMessage = tv4ResultObject.errors[i].message;
					if($("[name='"+elementName+"']").length)
					{

						$("[name='"+elementName+"']").css("border-color", "firebrick");
						if($("[name='"+elementName+"']").parent().find("p").length)
							$("[name='"+elementName+"']").parent().find("p").html(errorMessage).show();
						else
							$("[name='"+elementName+"']").parent().append($("<p name=\""+elementName+"Error\" style=\"color:firebrick;\" class=\"error-element\">"+errorMessage+"</p>"));
					}
					else
					{
						genricErrors += '<tr><td>'+elementName+'</td><td>'+errorMessage+'</td></tr>';
					}
				}
			}
			if(genricErrors != '')
			{
				$("#errorMessageBody").html('<table class="table table-striped table-bordered table-hover"><thead><tr><th>Field Type</th><th>Error</th></tr></thead>'+genricErrors+'</table>');
				$("#errorMessageModel").modal('show');
			}
			return false;
		}
		return true
	};

	var validateFormObject = function(formObect){
		if(formObect.$error.ahValidate){
			/*$(".error-element").show();*/
			$(".requiredField").popover("show");
			/*angular.forEach(formObect.$error.ahValidate, function(item) {
	        	console.log(item.$name);
	        });*/
			return false;
		}
		return true;
	};
	
	console.log("newBusinessFormUI end ");	

}]);


newBusinessAppUI.controller('baseAppController',['$scope', '$http','$filter','baseSchemaService','$q','$location','$window', function($scope, $http, $filter, baseSchemaService, $q, $location, $window){
	console.log("start baseAppController ");
	
	var iframe = document.getElementById('iframeProject');
	
	var loadFormAndResources = function(){
		var url = "/getdefaultformresources.htm";
		iframe.src = ctx + url;
	}
	
	loadFormAndResources();
	
	console.log("end baseAppController ");
}]);

