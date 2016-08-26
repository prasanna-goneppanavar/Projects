/**
 * Usage - 
 * NOTE - username and password are not mandatory. Both are set to kermit by default.
 * var ahactiviti = new ahactiviti("http://localhost:8080/activiti-rest","kermit","kermit");
 * var jsonData = {'Name':'Nisarg Tuli'};
 * var processName = "HRPROCESS:1:4";
 * var restPath = "/service/runtime/process-instances";
 * var processId = ahactiviti.triggerProcess(jsonData, processName, restPath);
 * 
 * */


function ahactiviti(ctx, username, password){
	var about = {
		Version: 1.0,
		Author: "Nisarg Tuli",
		Created: "01/05/2015",
		Copyright: "AWPL"
	};
		if(ctx){
			// Avoid clobbering the window scope: 
			// return a new ahactiviti object if we're in the wrong scope
			//check typeof window to run on server without window object.
			if(typeof(window) != "undefined" && this === window){
				return new ahactiviti(ctx, username, password);	
			}
			// We're in the correct object scope:
			// Init our element object and return the object
			this.ctx = ctx;
			//Setting the default username and password to kermit if no parameters are specified
			if(typeof(username) === "undefined")
				this.username = "kermit";
			else
				this.username = username;
			
			if(typeof(password) === "undefined")
				this.password = "kermit";
			else
				this.password = password;
			
			return this;
		}
		else{
			// No 'ctx' paramter was given, return the 'about' object
			return about;
		}
	
}

ahactiviti.prototype.triggerProcess = function(json, processName, restPath){
	var data = {
		"processDefinitionId" : processName,
		"variables": json
	}
	print(JSON.stringify(data));
	var xmlhttp = new XMLHttpRequest();
	var url = this.ctx + restPath;
	xmlhttp.open("POST", url, false ,this.username,this.password);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify(data));
	//xmlhttp status needs to be checked, setting to 201. Should be set to 200
	if (xmlhttp.readyState==4 && xmlhttp.status==201)
		return xmlhttp.responseText;
	else
		print("ERROR in RESPONSE: "+xmlhttp.status+" , "+xmlhttp.responseText);
	return xmlhttp.responseText;
};


ahactiviti.prototype.suspendProcess = function(json, processName, restPath){
	
};

ahactiviti.prototype.resumeProcess = function(json, processName, restPath){
	
};
ahactiviti.prototype.updateProcess = function(jsonData, restPath){
	
	print(JSON.stringify(jsonData));
	var xmlhttp = new XMLHttpRequest();
	var url = this.ctx + restPath;
	xmlhttp.open("POST", url, false ,this.username,this.password);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify(jsonData));
	//xmlhttp status needs to be checked, setting to 201. Should be set to 200
	if (xmlhttp.readyState==4 && xmlhttp.status==201)
		return xmlhttp.responseText;
	else
		print("ERROR in RESPONSE: "+xmlhttp.status+" , "+xmlhttp.responseText);
	return xmlhttp.responseText;
};