package com.awpl.forms.services.generic;



public interface IGenericService {

	
	/**
	 * This API will save the form data
	 * @param formName
	 * @param formBody
	 */
	void genericSave(String formName, String formBody);
	
	/**
	 * This API will update the form data
	 * @param formName
	 * @param formBody
	 */
	void genericUpdate(String formName, String formBody);
	
}
