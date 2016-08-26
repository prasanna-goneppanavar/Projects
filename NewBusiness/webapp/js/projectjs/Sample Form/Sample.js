newBusinessFormUI.controller('sampleFormController', ['$scope','$log', function($scope, $log){
	$log.info("*** Start sampleFormController controller initialized. ***");
	$scope.dm = $scope.$parent.dm;
	
	$scope.save=function(formObject) {
		$scope.$parent.saveFormInstance(formObject).then(function(response){
			console.log(response);
			bootbox.alert('Data Saved Successfully.');	
		},function(response) {
			console.log(response);
			bootbox.alert("Exception Occured while Saving Data");
		});
	};
}]);