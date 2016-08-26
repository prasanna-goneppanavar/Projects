package com.awpl.forms.services.runtime;

import java.util.List;

import javax.script.ScriptException;


public interface IJavaScriptExecutionService {

	
	/**
	 * This API will Execute javaScriptCode  
	 * 
	 * @return
	 */
	public Object executeJavaScript(List<String> listOfScripts, String methodName, Object ... paramObject) throws ScriptException,NoSuchMethodException;
	
}
