package com.awpl.forms.services.config;

import java.util.List;

import com.awpl.forms.beans.FormBean;




public interface IFormService {
	
	/**
	 * This API will return the Default form Path
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getDefaultForm() throws Exception;
	
	/**
	 * This API will return default Form's Resource details Path for JS, CSS etc
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<String> getDefaultFormResources() throws Exception;
	
	/**
	 * This API provides the aspect for the onLoad JavaScript Event
	 * 
	 * @param formName
	 * @param queryParams
	 * @return
	 */
	public String initForm(String formName, String queryParams, String formData);
	
	/**
	 * This API will return the form based on the formName
	 * 
	 * @param formName
	 * @return
	 */
	public FormBean getForm(String formName) throws Exception;
	
}
