/*newBusinessFormUI.directive('regexValidate', ['$compile',  function($compile) {
	    return {
	        restrict: 'A',
	        
	        require: 'ngModel',
	        
	        link: function(scope, elem, attr, ctrl) {
	        	
	            var flags = attr.regexValidateFlags || '';
	            
	            var regex = new RegExp(attr.regexValidate, flags);            
	            
	            var validationMessage = attr.validationMessage || "Invaild";
	            
	            var el = $(elem);
	            var popOverSettings = {content:validationMessage, trigger: 'manual'};
	           
	            ctrl.$parsers.unshift(function(value) {
	            	if(!value){
	            		value = '';
	            	}
	                var valid = regex.test(value);
	                ctrl.$setValidity('regexValidate', valid);
	                
	                if(!valid){
	                	el.addClass("requiredField");
	                	el.popover(popOverSettings);
	                	el.popover("show");
	                }
	                else{
	                	el.removeClass("requiredField");
	                	el.popover("destroy");
	                }
	                return valid ? value : undefined;
	            });
	            
	            ctrl.$formatters.unshift(function(value) {
	            	if(!value){
	            		value = '';
	            	}
	            	var valid = regex.test(value);
	                ctrl.$setValidity('regexValidate', valid);
	                
	                if(!valid){
	                	el.addClass("requiredField");
	                	el.popover(popOverSettings);
	                }
	                else{
	                	el.removeClass("requiredField");
	                	el.popover("destroy");
	                }
	                return value;
	            });
	        }
	    };
}]);*/


newBusinessFormUI.directive('imgSrc', function() {
    return {
        // restrict to an attribute type.
        restrict: 'A',
        
        // element must have ng-model attribute.
       // require: 'ngModel',
        
        // scope = the parent scope
        // elem = the element the directive is on
        // attr = a dictionary of attributes on the element
        // ctrl = the controller for ngModel.
        link: function(scope, elem, attr, ctrl) {
        	 // Setting element attribute name before Angular does it.
        	 var imageName = attr.imgSrc || '';
        	 //var imageSrc = ctx+"/getFile.htm?rturl=/home/"+projectName+"/form/"+formName+"/resource/"+imageName+"/get";
        	 console.log("directive js "+"img/projectimg/"+formName+"/"+imageName);
			 var imageSrc = "img/projectimg/"+formName+"/"+imageName;
        	 elem.attr('src',imageSrc);
        }
    };
});

newBusinessFormUI.directive('ahIf', function() {
	return {
		transclude: 'element',
		priority: 1000,
		terminal: true,
		restrict: 'A',
		compile: function (element, attr, linker) {
			return function (scope, iterStartElement, attr) {
				iterStartElement[0].doNotMove = true;
				var expression = attr.ahIf;
				var lastElement;
				var lastScope;
				scope.$watch(expression, function (newValue) {
					if (lastElement) {
						lastElement.remove();
						lastElement = null;
					}
					if (lastScope) {
						lastScope.$destroy();
						lastScope = null;
					}
					if (newValue) {
						lastScope = scope.$new();
						linker(lastScope, function (clone) {
							lastElement = clone;
							iterStartElement.after(clone);
						});
					}
					iterStartElement.parent().trigger("$childrenChanged");
				});
			};
		}
	};
});

/**
 * Treat dates as a numeric Timestamp - for use with angular-ui/bootstrap/datepicker
 * Processes output from the datepicker and converts to a number
 */
newBusinessFormUI.directive('dateAsTimestamp', [function() {

	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ngModel) {                // Process the output from the datepicker
			ngModel.$parsers.push(function (viewValue) {

				if (angular.isDate(viewValue) && !isNaN(viewValue)) {
					ngModel.$setValidity();
					ngModel.$setPristine(true);
					return viewValue.valueOf();
				}

				// otherwise - do nothing
				return viewValue;
			});
		},
	};

}]);

newBusinessFormUI.directive('ahPicklist', ['$compile','baseRtService', function($compile,baseRtService){
	return {
		restrict: 'E',
		require: 'ngModel',
		replace:true,
		priority: 1,
		scope: {
			ahkey: "@ahKey",
			ahvalue: "@ahValue"
		},
		template: "<select ng-options=\"opt.{{ahkey}} as opt.{{ahvalue}} for opt in ahCollection\"><option value=\"\">-select-</option></select>",
		link: function($scope, $elm, $attrs, ctrl) {
			var pickListName = $attrs.ahCollectionName || '';
			var filterQuery = $attrs.ahFilter || null;
			var fieldsList = [$scope.ahkey , $scope.ahvalue];
			
			var pickListQuery = {
					"filterQuery" : filterQuery,
					"fieldsList" : fieldsList
			};
			
			//filterQuery = JSON.stringify(filterQuery);
			/*filterQuery = encodeURI(filterQuery);*/
			var rturlGet = "/user/picklist/getpickList/"+pickListName;
			//var rturlGet = "/user/picklist/getpickList/"+pickListName+"/"+filterQuery+"/"+fieldsList;
			baseRtService.postJson(rturlGet,pickListQuery).success(function(response) {
				$scope.ahCollection = response;
		    });
			
	
		}
	};
}]);

newBusinessFormUI.directive('ahRdbmsPicklist', ['$compile','baseRtService', function($compile,baseRtService){
	return {
		restrict: 'E',
		require: 'ngModel',
		replace:true,
		priority: 1,
		scope: {
			ahkey: "@ahKey",
			ahvalue: "@ahValue"
		},
		template: "<select ng-options=\"opt.{{ahkey}} as opt.{{ahvalue}} for opt in ahCollection\"><option value=\"\">-select-</option></select>",
		link: function($scope, $elm, $attrs, ctrl) {
			var serverDs = $attrs.serverDs || '';
			var sql = $attrs.sql || null;
			var fieldsList = [$scope.ahkey , $scope.ahvalue];
			
			var rturlGet = "/user/lib/rdbms/executeQuery?serverDS="+serverDs+"&sql="+encodeURIComponent(sql);
			baseRtService.getJson(rturlGet,'').success(function(response) {
				$scope.ahCollection = response.results;
		    });
		}
	};
}]);

newBusinessFormUI.directive('ahValidate', function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, elm, attr, ctrl) {
			if (!ctrl) return;

			var flags = attr.ahValidateFlags || '';
			var regex = new RegExp(attr.ahValidate, flags);            
			var validationMessage = attr.validationMessage || "Invaild";
			var el = $(elm);
            var popOverSettings = {content:validationMessage, trigger: 'manual'};
            var ahWhenValid;
            
            if(typeof attr.ahWhen == typeof undefined){
            	ahWhenValid = false;
            }
            else{
            	ahWhenValid = true;
            	
            	attr.$observe('ahWhen', function(value) {
    				console.log(value);
    				if(value == "true"){
    					  ahWhenValid = false;
    				}
    				else{
    					  ahWhenValid = true;
    				}
    				ctrl.$validate();
    			});
            }

			ctrl.$validators.ahValidate = function(modelValue, value){
				if(!value){
            		value = '';
            	}
				console.log(ahWhenValid);
				if(!ahWhenValid){
					var valid = regex.test(value);
					if(!valid){
	                 	el.addClass("requiredField");
	                 	el.popover(popOverSettings);
	                 	//el.popover("show");
	                 }
	                 else{
	                 	el.removeClass("requiredField");
	                 	el.popover("destroy");
	                 }
					return valid;
				}
				else{
					el.removeClass("requiredField");
                 	el.popover("destroy");
					return true;
				}
			};
            
			ctrl.$parsers.unshift(function(value) {
				if(!value){
            		value = '';
            	}
				console.log(ahWhenValid);
				if(!ahWhenValid){
					var valid = regex.test(value);
					if(!valid){
						//el.addClass("requiredField");
	                 	el.popover(popOverSettings);
	                 	el.popover("show");
	                 }
	                 else{
	                 	el.removeClass("requiredField");
	                 	el.popover("destroy");
	                 }
				}
				else{
					el.removeClass("requiredField");
                 	el.popover("destroy");
				}
                return value;
            });
			
            /*ctrl.$parsers.unshift(function(value) {
            	if(!value){
            		value = '';
            	}
            	 var valid = regex.test(value);
            	if(!ahWhenValid){
            		 ctrl.$setValidity('regexValidate', valid);
	                if(!valid){
	                	el.addClass("requiredField");
	                	el.popover(popOverSettings);
	                	el.popover("show");
	                }
	                else{
	                	el.removeClass("requiredField");
	                	el.popover("destroy");
	                }
            	}
            	else{
            		el.removeClass("requiredField");
                 	el.popover("destroy");
                 	ctrl.$setValidity('regexValidate', true);
            	}
                return valid ? value : undefined;
            });
            
            ctrl.$formatters.unshift(function(value) {
            	if(!value){
            		value = '';
            	}
            	var valid = regex.test(value);
            	if(!ahWhenValid){
	                ctrl.$setValidity('regexValidate', valid);
	                
	                if(!valid){
	                	el.addClass("requiredField");
	                	el.popover(popOverSettings);
	                }
	                else{
	                	el.removeClass("requiredField");
	                	el.popover("destroy");
	                }
            	}
            	else{
            		el.removeClass("requiredField");
                 	el.popover("destroy");
                 	ctrl.$setValidity('regexValidate', true);
            	}
                return value;
            });*/
		}
	};
});

newBusinessFormUI.directive('typeNumber', function() {
	  return {
	    priority: 1,
	    restrict: 'A',
	    require: 'ngModel',
	    link: function(scope, element, attr, ngModel) {
	      function toModel(value) {
	        
	        return parseInt(value); // convert to number
	      }

	      function toView(value) {
	        console.log("toView", value);
	        return parseInt(value); // convert to number
	      }

	      ngModel.$formatters.push(toView);
	      ngModel.$parsers.push(toModel);
	    }
	  };
});

newBusinessFormUI.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    // In case value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.
                    element.html(value && value.toString());
                    // If scope is provided use it, otherwise use parent scope
                    var compileScope = scope;
                    if (attrs.bindHtmlScope) {
                        compileScope = scope.$eval(attrs.bindHtmlScope);
                    }
                    $compile(element.contents())(compileScope);
                });
            }
        };
 }]);