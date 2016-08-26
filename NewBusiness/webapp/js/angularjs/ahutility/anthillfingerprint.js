var antHillFingerprint = angular.module('antHillFingerprint',[]);

antHillFingerprint.directive('ahFingerprint',  ['$compile','$templateCache','$window','baseModalService','baseRtService', function($compile, $templateCache, $window, baseModalService, baseRtService){
	return {
		 restrict: 'E',
		/*templateUrl: 'ah-signature/ah-signature',*/
		templateUrl : ctx + '/html/ahfingerprint/anthillfingerprint.html',
		scope: {
			ahmodel: "=ahModel"
		},
		compile: function () {
			return {
				pre: function ($scope, $elm, $attrs, ahFpCtrl) {
					baseRtService.info("**ahFingerprint pre**");
	            },
				post: function ($scope, $elm, $attrs, ahFpCtrl) {
					baseRtService.info("**ahFingerprint post**");
					
					$scope.fpModel = {};
					
					
					if($scope.ahmodel){
						$scope.fpModel = angular.copy($scope.ahmodel);
					}
					
					if(!$scope.fpModel.hasOwnProperty("fpBase64")){
						$scope.fpModel.fpBase64 = ctx+"/img/blank.png";
					}
					
					$scope.fpComponent = {
							fpWidth : $attrs.ahFingerprintWidth || 400,
							fpHeight : $attrs.ahFingerprintHeight || 200,
							fpReadOnly : false,
							enableVerification : false
					};
					
					if($attrs.ahReadonly == "true"){
						$scope.fpComponent.fpReadOnly = true;
					}
					else{
						$scope.fpComponent.fpReadOnly = false;
					}	
					
					if($scope.fpModel.fpMinutiae){
						$scope.fpComponent.enableVerification = true;
					}
					
					$scope.openFpCaptureModal = function(mode){
						$scope.fpComponent.fpMode = mode;
						baseModalService.createDataField($scope, '', '/html/ahfingerprint/anthillfingerprintmodal.html', 'fpModalInstanceCtrl', $scope.fpComponent).result.then(function (fpData) {
							if(fpData){
							//	$scope.fpComponent.enableVerification = true;
								$scope.fpModel.fpBase64 = "data:image/png;base64,"+fpData.fpBase64;
								$scope.ahmodel = angular.copy($scope.fpModel);
							}
						}, function () {
							baseRtService.info('Modal dismissed at: ' + new Date());
						});
					};
					
					/*$scope.openFpVerifyModal = function(){
						$scope.fpComponent.fpMode = "verify";
						$scope.fpComponent.fpMinutiae = angular.copy($scope.fpModel.fpMinutiae);
						baseModalService.createDataField($scope, '', '/html/ahfingerprint/anthillfingerprintmodal.html', 'fpModalInstanceCtrl', $scope.fpComponent).result.then(function (fpData) {
							if(fpData){
								$scope.ahmodel = fpData;
								$scope.fpModel.fpBase64 = "data:image/png;base64,"+fpData.fpBase64;
							}
						}, function () {
							baseRtService.info('Modal dismissed at: ' + new Date());
						});
					};*/
					
				}
			};
		}
	};
}]);

antHillFingerprint.controller('fpModalInstanceCtrl', function ($scope, $log, $modalInstance, modalResolveOject) {
		 $scope.fpComponent = modalResolveOject;
		 
		  $scope.captureFp = function () {
			  var appletInstance = $scope.getAppletObject();
			  var validationMessage = appletInstance.validateFingerprint();
			  if(validationMessage == ""){
				  var fpData = {};
				  fpData.fpBase64 = appletInstance.getFingerPrintImage('png');
				  fpData.fpMinutiae = appletInstance.getMinutiae();
				  console.log(fpData);
				  $modalInstance.close(fpData);
			  }
			  else{
				 alert(validationMessage);
			  }
		  };
		  
		  $scope.resetFp = function () {
			  
			  var appletInstance = $scope.getAppletObject();
			  console.log("**resetFp**");
			  console.log(appletInstance);
			  appletInstance.clearDevice();
		  };
		  
		  $scope.cancel = function () {
			 // var appletInstance = $scope.getAppletObject();
			//  appletInstance.destroy();
			  $modalInstance.dismiss('cancel');
		  };
		  
		  $scope.verifyFp = function(){
			 /* if($scope.fpComponent.fpMinutiae){
				  var appletInstance = $scope.getAppletObject();
				  appletInstance.setFingerPrint4Verification($scope.fpComponent.fpMinutiae);
			  }*/
		  };
		  
		  $scope.getAppletObject = function () {
			  return document.getElementById("fpAppletEmbed");
		  };
});
