function createPerson(jsonRecord) {
	$.ajax({
		url : "http://localhost:8080/forms.web/createPerson.htm",
		type : "POST",
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data : JSON.stringify(jsonRecord),
		dataType : 'json',
		error : function(error) {
			console.log("error : " + error);
		},
		success : function(data) {
			console.log("Success : " + data);
		}
	});
}

function getAllPersons() {
	$.ajax({
		url : "http://localhost:8080/forms.web/getAllPerson.htm",
		type : "GET",
		dataType : 'json',
		error : function(error) {
			console.log("error : " + error);
		},
		success : function(data) {
			console.log("Sucksesss : " + data);
		}
	});
}

function getFromGenericController() {
	var runTimeUrl = "/designer/projects.frm"
		$.ajax({
		url : "http://localhost:8080/forms.web/getJson.htm",
		type : "GET",
		dataType : 'json',
		data : "rturl="+runTimeUrl,
		error : function(error) {
			console.log("error : " + error);
		},
		success : function(data) {
			console.log("Sucksesss : " + data);
		}
	});
}


function createDataModel(jsonRecord) {
	console.log(JSON.stringify(jsonRecord));
	$.ajax({
		url : "http://localhost:8080/forms.web/createDataModel.htm",
		type : "POST",
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data : JSON.stringify(jsonRecord),
		dataType : 'json',
		error : function(error) {
			console.log("error : " + error);
		},
		success : function(data) {
			console.log("Success : " + data);
		}
	});
}


function createProject(){
	$.ajax({
		urt : "designer/projects/create",
		type : "POST",
		headers : {
			"content-type" : "application/json"
		},
		data : {
		    "name": "New Project1",
		    "description": "New for Project New Business",
		     "dataModels": [{
		        "name": "Name",
		        "description": "Name Details",
		        "dataTypeFields": [{
		            "name": "fname",
		            "description": "First Name",
		            "type": "STRING",
		            "complexDatatypeName": "",
		            "array": false
		        }]
		    }],
		    "customDataTypes": null,
		},
		success : function(result){
			console.log(result);
		}
	});
}

(function(){
	
var antHill = angular.module('antHill', []);

/*antHill.config(function ($compileProvider) {
	antHill.compileProvider = $compileProvider;
});*/

antHill.controller('TabController', function () {
    this.tab = 1;

    this.setTab = function (tabId) {
        this.tab = tabId;
        
       if(tabId === 2){
    	   $("#tabWiseNavOptions").html("<li><a><span class=\"glyphicon glyphicon-folder-open\" aria-hidden=\"true\"></span></a></li>");
       }
       else{
    	   $("#tabWiseNavOptions").html("");
       }
        	
        
    };

    this.isSet = function (tabId) {
        return this.tab === tabId;
    };
});

/*var admin = angular.module('administrator', []);*/
/*$().click(function(){
	
});
*/

antHill.directive('administratorPage', function(){
	return{
		restrict: 'E',
		templateUrl: ctx+'/getAdminPage.htm',
		scope: {
		      name: '@',
		      template: '@'
		    },
		controller: function($http){
			var store = this;
		},
		controllerAs: 'adminCtrl'
	};
});

antHill.directive('designerPage', function(){
	return{
		restrict: 'E',
		templateUrl: ctx+'/getDesignerPage.htm',
		controller: function($http){
			var store = this;
			//store.projects = [{"iD":"qljikasjklcojc","projectName":"ABCD","projectDesc":"ABCD Desc","attributes":[{"attrName":"firstName","attrDispName":"First Name","attrType":"String"},{"attrName":"lastName","attrDispName":"Last Name","attrType":"String"}]},{"iD":"qljikasjklsdacojc","projectName":"ABCD","projectDesc":"ABCD Desc","attributes":[{"attrName":"clientName","attrDispName":"Client Name","attrType":"String"},{"attrName":"address","attrDispName":"Address","attrType":"String"}]}];
			
			$http({
			    url: ctx+"/getJson.htm", 
			    method: "GET",
			    params: {
			    	rturl: "/designer/projects"
			    },
			    cache: false,
			    transformResponse: function (data, headersGetter) {
			        try {
			            var jsonObject = JSON.parse(data); // verify that json is valid
			            console.log("Valid Json: " + data);
			            return jsonObject;
			        }
			        catch (e) {
			            console.log("did not receive a valid Json: " + e);
			        }
			        return {};
			    }
			 }).success(function(data){
				 store.projects = data;
			 });
			store.project = {};
			store.collectedAttributes = [];
			store.projAttribute = {};
			store.collectAttributes = function(projectAttr){
				store.projAttribute = {};
				store.collectedAttributes.push(projectAttr); 
				store.projectAttr= {};
				console.log(store.collectedAttributes);
				
			}
			
			
			store.submitProject = function(projectJson){
				store.project = angular.copy(projectJson);
				store.project.attributes = angular.copy(store.collectedAttributes);
				console.log(JSON.stringify(store.project));
				$http({
				    url: ctx+"/postJson.htm", 
				    method: "POST",
				    params: {
				    	rturl: "/designer/projects/create",
				    	json: store.project
				    },
				    cache: false,
				    transformResponse: function (data, headersGetter) {
				        try {
				            var jsonObject = JSON.parse(data); // verify that json is valid
				            console.log("Valid Json: " + data);
				            return jsonObject;
				        }
				        catch (e) {
				            console.log("did not receive a valid Json: " + e);
				        }
				        return {};
				    }
				 }).success(function(data){
					 console.log("Success : " + data);
					 store.projects.push(store.project);
					 store.collectedAttributes = [];
					 store.project = {};
				 });
			}
		},
		controllerAs: 'designerCtrl'
	};
});


})();