package com.awpl.forms.services.runtime.impl;


import java.util.List;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.awpl.forms.services.runtime.IJavaScriptExecutionService;
import com.awpl.forms.util.MessageUtils;

public class JavaScriptExecutionService implements IJavaScriptExecutionService {
	
	private static Log log = LogFactory.getLog(JavaScriptExecutionService.class);
	@Override
	public Object executeJavaScript(List<String> listOfScripts,String methodName, Object ... paramObjects) throws ScriptException, NoSuchMethodException {
		
		ScriptEngine scriptEngine =  initializeScriptEngine();
		if(Double.valueOf(System.getProperty("java.version").substring(0, 3)) > 1.7)
			scriptEngine.eval(MessageUtils.getMessage("rhino.migration"));
		scriptEngine.eval(MessageUtils.getMessage("xmlHttpReq.package"));
		scriptEngine.put("log", log);
		for(String script : listOfScripts)
			scriptEngine.eval(script);
		Invocable invoke = (Invocable) scriptEngine;
		return invoke.invokeFunction(methodName, paramObjects);
	}
	
	private ScriptEngine  initializeScriptEngine()
	{
		ScriptEngineManager scriptManager = new ScriptEngineManager();
		ScriptEngine scriptEngine = scriptManager.getEngineByName("javascript");
		return scriptEngine;
	}
}
