package com.awpl.forms.beans;

public class FormBean {
	
	private String formName;
	private String formFileName;
	private String resourcesJson;
	private String formJsonObject;
	
	public String getResourcesJson() {
		return resourcesJson;
	}
	
	public void setResourcesJson(String resourcesJson) {
		this.resourcesJson = resourcesJson;
	}
	
	public String getFormName() {
		return formName;
	}
	
	public void setFormName(String formName) {
		this.formName = formName;
	}
	
	public String getFormFileName() {
		return formFileName;
	}

	public void setFormFileName(String formFileName) {
		this.formFileName = formFileName;
	}

	public String getFormJsonObject() {
		return formJsonObject;
	}
	
	public void setFormJsonObject(String formJsonObject) {
		this.formJsonObject = formJsonObject;
	}
	
}
