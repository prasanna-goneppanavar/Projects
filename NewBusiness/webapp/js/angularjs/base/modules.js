var newBusiness = 	angular.module('newBusiness',['ui.bootstrap','angularFileUpload','ui.grid','ui.grid.selection','ui.grid.pagination']);

var newBusinessFormUI = angular.module('newBusinessFormUI',['newBusiness','ngProgress','antHillCamera','antHillSignature','antHillFingerprint','googlechart','antHillFileUploader','ngSanitize']);

var newBusinessAppUI = angular.module('newBusinessAppUI',['newBusiness','ui.router','ngProgress']);


//.run(function($rootScope, ngProgress) {
//	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
//		ngProgress.start();
//		console.log("Started..");
//	});
//	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
//		ngProgress.complete();
//	});
//	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
//		$rootScope.errorMessage = response;
//		$("#errorMessageModel").modal('show');
//  });
//});
