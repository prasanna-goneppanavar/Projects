var antHillFileUploader = angular.module('antHillFileUploader',[]);
antHillFileUploader.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|data):/);
}]);
antHillFileUploader.directive("ahFileUploader", ['$compile','$templateCache','$window', function($compile, $templateCache, $window){
        return {
        	restrict: 'E',
        	templateUrl: 'ah-file-uploader/ah-file-uploader',
            scope: {
            	ahmodel: "=ahModel"
            },
			compile: function () {
    			return {
    				pre: function ($scope, $elm, $attrs,$window, ahCameraCtrl) {
    					console.info("**ahFileUploader pre**");
    	            },
    				post: function ($scope, $elm, $attrs,$window, ahCameraCtrl) {						
    					console.info("**ahFileUploader post**");
    					$scope.ahmodels = {};
						
						if($scope.ahmodel){
						$scope.originalfile = angular.copy($scope.ahmodel);
						$scope.ahmodels.data = $scope.originalfile.split(":fileName:")[0];
						$scope.ahmodels.name = $scope.originalfile.split(":fileName:")[1];						
						}
						
						 $elm.bind("change", function (changeEvent) {
    	                    var reader = new FileReader();
    	                    reader.onload = function (loadEvent) {
    	                        $scope.$apply(function () {
    	                            $scope.ahmodels = {
    	                                lastModified: changeEvent.target.files[0].lastModified,
    	                                lastModifiedDate: changeEvent.target.files[0].lastModifiedDate,
    	                                name: changeEvent.target.files[0].name,
    	                                size: changeEvent.target.files[0].size,
    	                                type: changeEvent.target.files[0].type,
    	                                data: loadEvent.target.result
    	                            };
									$scope.ahmodel = $scope.ahmodels.data+ ":fileName:"+$scope.ahmodels.name; 
    	                        });
								
								$scope.uploadeData = $scope.ahmodels.data;
    	                    }
    	                    reader.readAsDataURL(changeEvent.target.files[0]);
    	                });
    					
    				},
    				link: function (scope, element, attributes) {
    	               
    	            }					
    			};
    		}           
        }
    }]);


antHillFileUploader.run(['$templateCache', function($templateCache) {
	'use strict';
	$templateCache.put('ah-file-uploader/ah-file-uploader',
			'<div class="row margin-top-05"><div class="col-lg-6"><input type="file" value="Browse"/></div><div class="col-lg-6"><a id ="downloads"  href="{{ahmodels.data}}" target="_blank"  class="btn">{{ahmodels.name}}</a></div></div>'
	);
}]);