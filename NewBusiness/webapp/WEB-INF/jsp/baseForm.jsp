<!DOCTYPE html>
<html ng-app="newBusinessFormUI">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width" />

<title>NewBusiness</title>

<link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap-theme.min.css" />
<link rel="stylesheet" type="text/css" href="css/ui-grid/ui-grid.min.css" />
<link rel="stylesheet" type="text/css" href="css/ngProgress.css" />
<link rel="stylesheet" type="text/css" href="css/formStyle.css" />

<script type="text/javascript">var ctx = '${pageContext.request.contextPath}';</script>

<script type="text/javascript" src="js/browser-info.js"></script>

<script type="text/javascript" src="js/jquery/jquery-latest.min.js"></script>
<script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="js/angularjs/angular.js"></script>
<script type="text/javascript" src="js/tv4/tv4.js"></script>
<script type="text/javascript" src="js/angularjs/ui-bootstrap-tpls.min.js"></script>
<script type="text/javascript" src="js/angularjs/angular-file-upload.min.js"></script>
<script type="text/javascript" src="js/ui-grid/ui-grid.min.js"></script>
<script type="text/javascript" src="js/angularjs/ngProgress.min.js"></script>
<script type="text/javascript" src="js/angularjs/angular-sanitize.min.js"></script>



<script type="text/javascript" src="js/angularjs/base/modules.js"></script>
<script type="text/javascript" src="js/angularjs/base/services.js"></script>
<script type="text/javascript" src="js/angularjs/base/controllers.js"></script>
<script type="text/javascript" src="js/angularjs/base/filters.js"></script>
<script type="text/javascript" src="js/angularjs/base/directives.js"></script>
<script type="text/javascript" src="js/angularjs/base/httpInterceptor.js"></script>

<script type="text/javascript" src="js/angularjs/ahutility/anthillcamera.js"></script>
<script type="text/javascript" src="js/angularjs/ahutility/anthillsignature.js"></script>
<script type="text/javascript" src="js/angularjs/ahutility/anthillfingerprint.js"></script>
<script type="text/javascript" src="js/angularjs/ahutility/antHillFileUploader.js"></script>
<script type="text/javascript" src="js/googlecharts/ng-google-chart.min.js"></script>
<script type="text/javascript" src="js/bootbox.min.js"></script>
<script type="text/javascript">



var formResourceList ="";

var formName = ""+ '${formBean.formName}';
var formFileName = ""+ '${formBean.formFileName}';

formResourceList = ${formBean.resourcesJson};

console.log("baseForm loaded ");
console.log("formResourceList "+JSON.stringify(formResourceList));


for(var i = 0 ; i < formResourceList.length ; i++ ){
	var resName = formResourceList[i];
	
	console.log("formResourceList "+formName+" formResourceList "+resName);
	
	//if name contains .js append a script tag
	//else if name contains .css append a link tag
	if((/\.(js)$/i).test(resName)){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		console.log("printing "+'js/projectjs/'+formName+"/"+resName);
		script.src = 'js/projectjs/'+formName+"/"+resName;
		$("head").append(script);
	}
	else if((/\.(css)$/i).test(resName)){
		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet'
		link.href= 'css/projectcss/'+formName+"/"+resName;
		$("head").append(link);
	}
}

</script>

</head>
<body ng-controller="baseFormController">

	<div ng-if="isFormDataLoaded">
		<div id="formDiv" ng-include="defaultForm"></div>
	</div>
	
	<div class="modal fade" id="errorMessageModel">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header alert-danger">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">
						<span class="glyphicon glyphicon-exclamation-sign"></span> Exception
					</h4>
				</div>
				<div class="modal-body">
					<div id="errorMessageBody"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>	
</body>
</html>