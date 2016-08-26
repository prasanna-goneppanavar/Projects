newBusiness.factory('httpInterceptor', function ($q, $rootScope, $log, $injector) {
    var numLoadings = 0;
    return {
        request: function (config) {
            numLoadings++;
            // Show loader
            $injector.get('ngProgress').start();
            return config || $q.when(config)
        },
        response: function (response) {
            if ((--numLoadings) === 0) {
                // Hide loader
            	$injector.get('ngProgress').complete();
            }
            return response || $q.when(response);
        },
        responseError: function (response) {
            if (!(--numLoadings)) {
                // Hide loader
            	$injector.get('ngProgress').complete();
            	$("#errorMessageBody").html(response.data);
            	//$rootScope.errorMessage = response.data;
				$("#errorMessageModel").modal('show');
            }
            return $q.reject(response);
        }
    };
});