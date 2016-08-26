var antHillCamera = angular.module('antHillCamera',[]);

/*antHillCamera.controller('ahCameraController', ['$scope','$log', function($scope, $log){
	
}]);*/

antHillCamera.directive('ahCamera',  ['$compile','$templateCache','$window', function($compile, $templateCache, $window){
	return {
		 restrict: 'E',
		templateUrl: 'ah-camera/ah-camera',
		scope: {
			ahmodel: "=ahModel"
		},
		compile: function () {
			return {
				pre: function ($scope, $elm, $attrs, ahCameraCtrl) {
					console.info("**ahCamera pre**");
	            },
				post: function ($scope, $elm, $attrs, ahCameraCtrl) {
					
					$scope.showUploadIcon = true;
					$scope.showCamIcon = true;
					$scope.isBrowserIe = false;
					
					if(!$scope.ahmodel){
						$scope.ahmodel = ctx+"/img/default-avatar.png"
					}
					
					$scope.originalImage = angular.copy($scope.ahmodel);
					var currentTimeStamp = new Date().valueOf();
					$scope.webCamId = "webCam"+currentTimeStamp;
					$scope.fileUploadId = "uploader"+currentTimeStamp;
					
					console.info("**ahCamera post**");
					$scope.isImageView = true;
					$scope.isWebCAmView = false;
					$scope.isBrowseFileView = false;
					$scope.ahCameraSetup = {
						width: $attrs.ahCameraWidth || '300',
						height: $attrs.ahCameraHeight || '200'
					};
					
					if(navigator.myBrowser.name.trim() == "MSIE" || navigator.myBrowser.name.trim() == "IE"){
						$scope.isBrowserIe = true;
						if($scope.ahCameraSetup.width < 230){
							$scope.ahCameraSetup.width = 230;
						}
						if($scope.ahCameraSetup.height < 230){
							$scope.ahCameraSetup.height = 230;
						}
					}
					if(navigator.myBrowser.name.trim() == "MSIE" && navigator.myBrowser.version.trim() < 10){
						$scope.showUploadIcon = false;
					}
					else{
						
						if($attrs.ahReadonly == "true"){
							$scope.showUploadIcon = false;
							$scope.showCamIcon = false;
						}
						else{
							$scope.showUploadIcon = true;
							$scope.showCamIcon = true;
						}
						
						/*Image Upload functionality*/		
						var fileObject = {};
						
						$scope.uploadImage = function(){
							$scope.isBrowseFileView = true;
							$scope.isImageView = true;
							$scope.isWebCAmView = false;
						};
						
						$scope.readerOnload = function(e){
							var base64 = _arrayBufferToBase64(e.target.result);
							fileObject.base64 = base64;
							if(fileObject.filetype.split("/")[0].toLowerCase() == "image"){
								$scope.$apply(function(){
									$scope.ahmodel = "data:" + fileObject.filetype + ";base64," + fileObject.base64;
									$scope.isBrowseFileView = false;
								});
							}
							else{
								alert("Please upload image only.");
							}
							$("#"+$scope.fileUploadId).val("");
						};

						var reader = new FileReader();
						reader.onload = $scope.readerOnload;

						$scope.file_changed = function(element, scope){
							if($("#"+$scope.fileUploadId)[0].files.length > 0){
								var file =  $("#"+$scope.fileUploadId)[0].files[0];
								fileObject.filetype = file.type;
								fileObject.filename = file.name;
								fileObject.filesize = file.size;
								fileObject.dataURI = _assemble_data_uri;
								reader.readAsArrayBuffer(file);
							}
						};

						function _arrayBufferToBase64( buffer ) {
							var binary = '';
							var bytes = new Uint8Array( buffer );
							var len = bytes.byteLength;
							for (var i = 0; i < len; i++) {
								binary += String.fromCharCode( bytes[ i ] );
							}
							return $window.btoa( binary );
						}

						// TODO: add handlers for other file types (e.g. video)
						function _assemble_data_uri(){
							return "data:image/" + this.filetype + ";base64," + this.base64;
						}
					}
					
					var camWidth = parseInt($scope.ahCameraSetup.width)+parseInt($scope.ahCameraSetup.width)*0.1;
					var camHeight = parseInt($scope.ahCameraSetup.height)+parseInt($scope.ahCameraSetup.height)*0.1;
					
					Webcam.set({
						width: $scope.ahCameraSetup.width,
						height: $scope.ahCameraSetup.height,
						dest_width: $scope.ahCameraSetup.width,
						dest_height: $scope.ahCameraSetup.height,
						image_format: 'jpeg',
						jpeg_quality: 50
					});
					
					$scope.startCam = function(){
						$scope.isBrowseFileView = false;
						$scope.isImageView = false;
						$scope.isWebCAmView = true;
						console.info("***  ah-camera ***");
						Webcam.attach("#"+$scope.webCamId);
					};

					$scope.captureWebCamImage = function(){
						Webcam.snap( function(data_uri) {
							if($scope.isBrowserIe){
								$scope.$apply(function(){
									$scope.ahmodel = data_uri;
								});
							}
							else{
								$scope.ahmodel = data_uri;
							}
						});
						Webcam.reset();
						$scope.isImageView = true;
						$scope.isWebCAmView = false;
					};
					
					$scope.cancelCapture = function(){
						Webcam.reset();
						$scope.ahmodel = angular.copy($scope.originalImage);
						$scope.isImageView = true;
						$scope.isWebCAmView = false;
					};
					
				},
				link: function($scope, $elm, $attrs, ahCameraCtrl) {
					 
				}
			};
		}
	};
}]);

antHillCamera.run(['$templateCache', function($templateCache) {
	'use strict';
	$templateCache.put('ah-camera/ah-camera',
			'<div class="ahCamMainDiv fluid-container text-center"><div class="row" ng-show="isImageView"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class=".ahImgCanvas" style="display: inline-block; position: relative;"><img alt="Image" ng-src="{{ahmodel}}" class="img-thumbnail img-responsive" ng-style="{&apos;height&apos;: ahCameraSetup.height , &apos;width&apos;: ahCameraSetup.width}" id="capturedImg" /><span ng-click="uploadImage()" ng-show="showUploadIcon" title="Upload Image" class="glyphicon glyphicon-upload" style="position: absolute; left: 10px; top: 10px; background-color: white; border-radius: 10%; cursor: pointer;"	aria-hidden="true"></span><span ng-click="startCam()" ng-show="showCamIcon" title="Start Web Cam" class="glyphicon glyphicon-camera" style="position: absolute; right: 10px; top: 10px; border-radius: 10%; background-color: white; cursor: pointer;" aria-hidden="true"></span></div></div></div><div class="row" ng-show="isWebCAmView"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><center><div id="{{webCamId}}" class="ahWebCam"></div></center></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><button type="button" ng-click="captureWebCamImage()" class="btn btn-default">Capture</button><button type="button" ng-click="cancelCapture()" class="btn btn-default">Cancel</button></div></div><div class="row" ng-show="isBrowseFileView"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><center><input type="file" id="{{fileUploadId}}" name="ahFileUpload" onchange="angular.element(this).scope().file_changed(this)"></center></div></div></div>'
	);
}]);
