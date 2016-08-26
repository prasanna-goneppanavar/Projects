newBusiness.service('baseSchemaService', [ '$http', '$log', function($http, $log) {
	this.validateJsonSchema = function(data, schema){
		var isValidR =  tv4.validateMultiple(data, schema);
		var vr =  new validationResult();
		vr.isValid = isValidR.valid;
		vr.errors = isValidR.errors;
		return vr;
	}
}]);

function validationResult (){
	var isValid;
	var errors;
}
