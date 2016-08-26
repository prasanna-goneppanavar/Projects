/**
 * Usage - 
 * NOTE - jndiName is mandatory. to execute sqlQuery.
 * var rdbms = new ahrdbms("/jndiName");
 * var sqlQuery = "select * from emp";
 * var result = rdbms.executeQuery(sqlQuery);
 * 
 * */

function ahrdbms(jndiName){
	var about = {
		Version: 1.0,
		Author: "Praveen Kumar",
		Created: "13/05/2015",
		Copyright: "AWPL"
	};
	if(jndiName){
		// Init our element object and return the object
		this.jndiName = jndiName;
		return this;
	}
	else{
		// No 'jndiName' paramter was given, return the 'about' object
		return about;
	}
}

ahrdbms.prototype.executeQuery = function(sqlQuery){
	var dblookup = new Rdbms();
	var DsName = this.jndiName;
	print(DsName);
	var resultData = dblookup.executeRdbmsQuery(DsName, sqlQuery);
	print(resultData);
	return resultData;
};
