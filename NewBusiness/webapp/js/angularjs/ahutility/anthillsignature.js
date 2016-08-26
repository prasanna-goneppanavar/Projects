var antHillSignature = angular.module('antHillSignature',[]);

antHillSignature.directive('ahSignature',  ['$compile','$templateCache','$window','baseModalService','baseRtService', function($compile, $templateCache, $window, baseModalService, baseRtService){
	return {
		 restrict: 'E',
		/*templateUrl: 'ah-signature/ah-signature',*/
		templateUrl : ctx + '/html/ahsignature/anthillsignature.html',
		scope: {
			ahmodel: "=ahModel"
		},
		compile: function () {
			return {
				pre: function ($scope, $elm, $attrs, ahCameraCtrl) {
					console.info("**ahSignature pre**");
	            },
				post: function ($scope, $elm, $attrs, ahCameraCtrl) {
					console.info("**ahSignature post**");
					if(!$scope.ahmodel){
						$scope.ahmodel = ctx+"/img/blank.png"
					}
					
					$scope.signComponent = {
							signWidth : $attrs.ahSignatureWidth || 400,
							signHeight : $attrs.ahSignatureHeight || 200,
							signReadOnly : false
					};
					if($attrs.ahReadonly == "true"){
						$scope.signComponent.signReadOnly = true;
					}
					else{
						$scope.signComponent.signReadOnly = false;
					}					
					$scope.openSignCaptureModal = function(){
						baseModalService.createDataField($scope, '', '/html/ahsignature/anthillsignmodal.html', 'signatureModalInstanceCtrl', $scope.signComponent).result.then(function (signBase64) {
							if(signBase64){
								$scope.ahmodel = "data:image/png;base64,"+signBase64;
							}
						}, function () {
							baseRtService.info('Modal dismissed at: ' + new Date());
						});
					};
					
				},
				link: function($scope, $elm, $attrs, ahCameraCtrl) {
					console.info("**ahSignature link**");
				}
			};
		}
	};
}]);

antHillSignature.controller('signatureModalInstanceCtrl', function ($scope, $log, $modalInstance, modalResolveOject) {
		 $scope.signComponent = modalResolveOject;
		  $scope.captureSign = function () {
			  var appletInstance = $scope.getAppletObject();
			  var sigBase64 = appletInstance.saveImage();
			  appletInstance.destroy();
			  $modalInstance.close(sigBase64);
		  };
		  
		  $scope.clearSign = function () {
			  var appletInstance = $scope.getAppletObject();
			  appletInstance.clearTablet();
		  };
		  
		  $scope.cancel = function () {
			  var appletInstance = $scope.getAppletObject();
			//  appletInstance.destroy();
			  $modalInstance.dismiss('cancel');
		  };
		  
		  $scope.getAppletObject = function () {
			  return document.getElementById("signAppletEmbed");
		  };
});

/*antHillSignature.run(['$templateCache', function($templateCache) {
	'use strict';
	$templateCache.put('ah-signature/ah-signature',
			'<div class="ahCamMainDiv fluid-container text-center"><div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class=".ahSigCanvas" style="display: inline-block; position: relative;"><img alt="Signature" ng-src="{{ahmodel}}" class="img-thumbnail img-responsive" ng-style="{&apos;height&apos;: signComponent.signHeight , &apos;width&apos;: signComponent.signWidth}" id="capturedSig" /><span ng-click="openSignCaptureModal()" class="glyphicon glyphicon-pencil" ng-hide="signComponent.signReadOnly" style="position: absolute; right: 10px; top: 10px; border-radius: 10%; background-color: white; cursor: pointer;" aria-hidden="true"></span></div></div></div></div>'
	);
	$templateCache.put('ah-signature/ah-signature-modal',
			''
	);
}]);*/