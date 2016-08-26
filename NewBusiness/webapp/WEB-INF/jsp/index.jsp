<!DOCTYPE html>
<html id="ng-app" ng-app="newBusinessAppUI"> <!-- id="ng-app" IE<8 -->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width" />

<title>NewBusiness</title>

<link rel="stylesheet" type="text/css"href="css/bootstrap/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap-theme.min.css" />
<link rel="stylesheet" type="text/css" href="css/ui-grid/ui-grid.min.css" />
<link rel="stylesheet" type="text/css" href="css/ngProgress.css" />
<link rel="stylesheet" type="text/css" href="css/formStyle.css" />

<script type="text/javascript" src="js/browser-info.js"></script>
 <!-- Fix for old browsers -->
<script type="text/javascript" src="js/angularjs/es5-shim.min.js"></script>
<script type="text/javascript" src="js/angularjs/es5-sham.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery-latest.min.js"></script>
<script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
<!--[if lt IE 9]>
      <script type="text/javascript" src="/js/bootstrap/html5shiv.min.js"></script>
      <script type="text/javascript" src="/js/bootstrap/respond.min.js"></script>
 <![endif]-->
<script type="text/javascript" src="js/angularjs/angular.js"></script>
<!-- <script type="text/javascript" src="js/angularjs/angular-route.min.js"></script> -->
<script type="text/javascript" src="js/angularjs/angular-file-upload.min.js"></script>
<script type="text/javascript" src="js/angularjs/angular-ui-router.min.js"></script>
<script type="text/javascript" src="js/angularjs/ui-bootstrap-tpls.min.js"></script>
<script type="text/javascript" src="js/tv4/tv4.js"></script>
<script type="text/javascript" src="js/angularjs/ngProgress.min.js"></script>
<script type="text/javascript" src="js/ui-grid/ui-grid.min.js"></script>
<script type="text/javascript" src="js/angularjs/angular-sanitize.min.js"></script>
<script type="text/javascript">	
	var ctx = '${pageContext.request.contextPath}';
</script>
<script type="text/javascript" src="js/angularjs/base/modules.js"></script>
<script type="text/javascript" src="js/angularjs/base/httpInterceptor.js"></script>
<script type="text/javascript" src="js/angularjs/base/services.js"></script>
<script type="text/javascript" src="js/angularjs/base/controllers.js"></script>
<script type="text/javascript" src="js/angularjs/base/filters.js"></script>

<script type="text/javascript" src="js/bootbox.min.js"></script>

</head>
<body ng-controller="baseAppController">


	<!-- MAIN CONTENT-->
	<div class="container-fluid">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

			
			<!-- this is where content will be injected -->
			<iframe id="iframeProject" frameborder="0" height="90%" width="95%" style="position: fixed;" ></iframe>

		</div>
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