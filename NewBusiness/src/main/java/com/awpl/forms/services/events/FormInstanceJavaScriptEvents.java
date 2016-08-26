package com.awpl.forms.services.events;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.script.ScriptException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

import com.awpl.forms.constants.EventTypes;
import com.awpl.forms.services.config.base.BaseService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

@Aspect
public class FormInstanceJavaScriptEvents extends BaseService {
	private static Log log = LogFactory.getLog(FormInstanceJavaScriptEvents.class);


	@Pointcut("execution(* com.awpl.forms.services.generic.IGenericService.genericSave*(..))")
	public String executeJavaScript() {

		return null;
	}

	@Around("executeJavaScript() && args(formName, json)")
	// applying pointcut on before advice
	public Object myadvice(ProceedingJoinPoint jp, String formName, String json)// it is advice before advice
	{
		Object returnResult = null;
		try {
			if (log.isDebugEnabled())
				log.debug("Started Executing myadvice");

			Object[] args = jp.getArgs();

			String dataModelName = getDataModelName(formName);

			List<String> beforeScripts = new ArrayList<String>();
			String beforeJavaScript = getServerScript(dataModelName, EventTypes.BEFORE_SAVE);

			if (beforeJavaScript != null) {
				List<String> libraries = getLibraryNames(dataModelName, EventTypes.BEFORE_SAVE);
				if (null != libraries && !libraries.isEmpty()) {
					for (String library : libraries) {
						String libJS = getLibraryJSFromResource(library);
						if (libJS != null) {
							beforeScripts.add(libJS);
						}
					}
				}
				beforeScripts.add(beforeJavaScript);
			}

			if (log.isDebugEnabled())
				log.debug("beforeScript Size ::" + beforeScripts.size());

			if (!beforeScripts.isEmpty()) {
				try {
					if (log.isDebugEnabled())
						log.debug("Started Executing onbefore save method");

					Object result = javaScriptExcutionService.executeJavaScript(beforeScripts, EventTypes.BEFORE_SAVE, json);

					if (log.isDebugEnabled())
						log.debug("JavaScript Result :: " + (null != result ? result.toString() : null));

					if (null != result) {
						json = (String) result;
						log.debug("JavaScript Result :: " + json);
					}

					if (log.isDebugEnabled())
						log.debug("Completed Executing onbefore save method");
				}
				catch (NoSuchMethodException | ScriptException e) {
					log.error("Failed while Executing before Script ", e);
				}
			}

			args[0] = json;
			args[1] = formName;

			try {
				if (log.isDebugEnabled())
					log.debug("Started Executing Actual Method");

				returnResult = (Object) jp.proceed(args);

				if (log.isDebugEnabled())
					log.debug("Completed Executing Actual Method,the result is [" + returnResult + "]");
			}
			catch (Throwable e) {
				log.error("Failed while Executing actual method ", e);
			}

			if (log.isDebugEnabled())
				log.debug("Started Executing After save Method");

			List<String> afterScripts = new ArrayList<String>();
			String afterJavaScript = getServerScript(dataModelName, EventTypes.AFTER_SAVE);

			if (afterJavaScript != null) {
				List<String> libraries = getLibraryNames(dataModelName, EventTypes.AFTER_SAVE);
				if (null != libraries && !libraries.isEmpty()) {
					for (String library : libraries) {
						String libJS = getLibraryJSFromResource(library);
						if (libJS != null) {
							afterScripts.add(libJS);
						}
					}
				}
				afterScripts.add(afterJavaScript);
			}

			if (log.isDebugEnabled())
				log.debug("afterScripts Size ::" + afterScripts.size());

			if (!afterScripts.isEmpty()) {
				try {
					if (log.isDebugEnabled())
						log.debug("Started Executing onAfterSave method");
					javaScriptExcutionService.executeJavaScript(afterScripts, EventTypes.AFTER_SAVE, json);
					if (log.isDebugEnabled())
						log.debug("Completed Executing onAfterSave method");
				}
				catch (NoSuchMethodException | ScriptException e) {
					log.error("Failed while Executing on After Script ", e);
				}
			}

			if (log.isDebugEnabled())
				log.debug("Completed myadvice");

		}
		catch (Exception e) {
			log.error("Failed while Executing on Save Aspect ", e);
		}
		return returnResult;
	}

	@Pointcut("execution(* com.awpl.forms.services.config.IFormService.initForm*(..))")
	public String executeJavaScriptOnLoad() {
		if (log.isDebugEnabled())
			log.debug("Completed Executing executeJavaScriptOnLoad ");

		return null;
	}

	@Around("executeJavaScriptOnLoad() && args(formName, queryParams, json)")
	public Object adviceForOnLoad(ProceedingJoinPoint jp, String formName, String queryParams, String json) {
		Object returnResult = null;
		try {
			Object result = null;
			Object[] args = jp.getArgs();

			String dataModelName = getDataModelName(formName);
			String onLoadScript = getServerScript(dataModelName, EventTypes.ONLOAD);

			try {
				if (log.isDebugEnabled())
					log.debug("Started Executing Actual Onload's Method");

				returnResult = jp.proceed(args);

				if (log.isDebugEnabled())
					log.debug("Completed Executing Actual Onload's Method,the result is [" + returnResult + "]");
			}
			catch (Throwable e) {
				log.error("Failed while Executing actual method on Load Event ", e);
			}

			if (log.isDebugEnabled())
				log.debug("Started Executing advice For OnLoad ");

			List<String> onLoadScripts = new ArrayList<String>();
			if (onLoadScript != null) {
				List<String> libraries = getLibraryNames(dataModelName, EventTypes.ONLOAD);
				if (null != libraries && !libraries.isEmpty()) {
					for (String library : libraries) {
						String libJS = getLibraryJSFromResource(library);
						if (libJS != null) {
							onLoadScripts.add(libJS);
						}
					}
				}
				onLoadScripts.add(onLoadScript);
			}

			if (!onLoadScripts.isEmpty()) {
				try {
					if (returnResult != null)
						result = javaScriptExcutionService.executeJavaScript(onLoadScripts, EventTypes.ONLOAD, returnResult, args[1]);

					if (log.isDebugEnabled())
						log.debug("JavaScript Result :: " + (null != result ? result.toString() : null));

					if (null != result) {
						json = (String) result;
						log.debug("JavaScript Result :: " + json);
					}
				}
				catch (NoSuchMethodException | ScriptException e) {
					log.error("Failed while Executing onLoad Scripts ", e);
				}
			}

			if (result != null && result != "")
				returnResult = result;
		}
		catch (Exception e) {
			log.error("Failed while Executing on load Aspect ", e);
		}
		return returnResult;
	}
	
	 @Pointcut("execution(* com.awpl.forms.services.generic.IGenericService.genericUpdate*(..))")  
		public String executeJavaScriptForUpdate(){
			return null;
		}
	 
	@Around("executeJavaScriptForUpdate() && args(formName, json)")
	public Object  adviceForUpdate(ProceedingJoinPoint  jp,String formName, String json)  
	{
		Object returnResult = null;
		try {
			if (log.isDebugEnabled())
				log.debug("Started Executing Advice for update");
			
			Object[] args = jp.getArgs();
			
			String dataModelName = getDataModelName(formName);
			String beforeUpdateScript = getServerScript(dataModelName, EventTypes.BEFORE_UPDATE);

			List<String> beforeScripts = new ArrayList<String>();
			if (beforeUpdateScript != null) {
				List<String> libraries = getLibraryNames(dataModelName, EventTypes.BEFORE_UPDATE);
				if (null != libraries && !libraries.isEmpty()) {
					for (String library : libraries) {
						String libJS = getLibraryJSFromResource(library);
						if (libJS != null) {
							beforeScripts.add(libJS);
						}
					}
				}
				beforeScripts.add(beforeUpdateScript);
			}

			if (log.isDebugEnabled())
				log.debug("beforeScript Size ::" + beforeScripts.size());

			if (!beforeScripts.isEmpty()) {
				try {
					if (log.isDebugEnabled())
						log.debug("Started Executing onbefore update method");
					
					Object result = javaScriptExcutionService.executeJavaScript(beforeScripts, EventTypes.BEFORE_UPDATE, json);

					if (log.isDebugEnabled())
						log.debug("JavaScript Result :: " + (null != result ? (String) result : null));

					if (null != result)
						json = (String) result;
					
					if (log.isDebugEnabled())
						log.debug("Completed Executing onbefore update method");
				}
				catch (NoSuchMethodException | ScriptException e) {
					log.error("Failed while Executing on before update script ", e);
				}
			}

			args[0] = json;
			args[1] = formName;
			
			try {
				if (log.isDebugEnabled())
					log.debug("Started Executing Actual Method");

				returnResult = jp.proceed(args);

				if (log.isDebugEnabled())
					log.debug("Completed Executing Actual Method,the result is [" + returnResult + "]");
			}
			catch (Throwable e) {
				log.error("Failed while Executing actual method on before update event ", e);
			}

			if (log.isDebugEnabled())
				log.debug("Started Executing After save Method");

			String afterUpdateScript = getServerScript(dataModelName, EventTypes.AFTER_UPDATE);
			List<String> afterScripts = new ArrayList<String>();
			if (afterUpdateScript != null) {
				List<String> libraries = getLibraryNames(dataModelName, EventTypes.AFTER_UPDATE);
				if (null != libraries && !libraries.isEmpty()) {
					for (String library : libraries) {
						String libJS = getLibraryJSFromResource(library);
						if (libJS != null) {
							afterScripts.add(libJS);
						}
					}
				}
				afterScripts.add(afterUpdateScript);
			}

			if (log.isDebugEnabled())
				log.debug("afterScript size :: " + afterScripts.size());
			if (!afterScripts.isEmpty()) {
				try {
					Object result = null;
					if (log.isDebugEnabled())
						log.debug("Started Executing onafter update method");
					
					if (returnResult != null) {
						result = javaScriptExcutionService.executeJavaScript(afterScripts, EventTypes.AFTER_UPDATE, returnResult);
					}
					else {
						result = javaScriptExcutionService.executeJavaScript(afterScripts, EventTypes.AFTER_UPDATE, json);
					}

					if (log.isDebugEnabled())
						log.debug("JavaScript Result :: " + (null != result ? (String) result : null));
					
					if (log.isDebugEnabled())
						log.debug("Completed Executing onafter update method");

				}
				catch (NoSuchMethodException | ScriptException e) {
					log.error("Failed while Executing on after update script ", e);
				}
			}

			if (log.isDebugEnabled())
				log.debug("Completed Executing Advice for update");
		}
		catch (Exception e) {
			log.error("Failed while Executing on Update Aspect ", e);
		}

		return returnResult;
	} 


	private String getDataModelName(String formName) {
		String dataModelName = "";
		ArrayNode formArrayNode = (ArrayNode) projectNode.get("forms");
		Iterator<JsonNode> formElementsIterator = formArrayNode.elements();
		while (formElementsIterator.hasNext()) {
			JsonNode formNode = formElementsIterator.next();
			if (formName.equals(formNode.get("name").textValue())) {
				dataModelName = formNode.get("dataModel").textValue();
			}
		}
		return dataModelName;
	}

	private String getServerScript(String dataModelName, String eventType) {
		ArrayNode dataModelArrayNode = (ArrayNode) projectNode.get("dataModels");
		Iterator<JsonNode> dataModelElementsIterator = dataModelArrayNode.elements();
		while (dataModelElementsIterator.hasNext()) {
			JsonNode dataModelNode = dataModelElementsIterator.next();
			// if the dataModel name matches return the corresponding
			// javascripts based on the eventType
			if (dataModelName.equals(dataModelNode.get("name").textValue())) {
				JsonNode eventNode = dataModelNode.get("eventHandlerMap").get(eventType);
				if (eventNode != null) {
					JsonNode scriptNode = eventNode.get("javaScript");
					if (scriptNode != null)
						return getEventScriptFromResource(dataModelName, scriptNode.textValue());
				}
			}
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	private List<String> getLibraryNames(String dataModelName, String eventType) {
		List<String> libraries = new ArrayList<String>();
		ObjectMapper mapper = new ObjectMapper();
		ArrayNode dataModelArrayNode = (ArrayNode) projectNode.get("dataModels");
		Iterator<JsonNode> dataModelElementsIterator = dataModelArrayNode.elements();
		while (dataModelElementsIterator.hasNext()) {
			JsonNode dataModelNode = dataModelElementsIterator.next();
			// if the dataModel name matches return the corresponding
			// library Script associated with it
			if (dataModelName.equals(dataModelNode.get("name").textValue())) {
				JsonNode eventHandlerMapNode = dataModelNode.get("eventHandlerMap");
				ArrayNode librariesNode = (ArrayNode) eventHandlerMapNode.get(eventType).get("libraries");
				libraries = mapper.convertValue(librariesNode, List.class);
			}
		}
		return libraries;
	}

	private String getEventScriptFromResource(String dataModelName, String scriptName) {
		String javaScript = null;
		try {
			String javaScriptPath = getDataModelResoucePath() + File.separator + "JavaScriptEvents";
			javaScript = new String(Files.readAllBytes(Paths.get(javaScriptPath + File.separator + dataModelName + File.separator + scriptName)));
		}
		catch (IOException ioException) {
			log.debug("Failed getEventScriptFromResource ", ioException);
		}
		return javaScript;
	}

	private String getLibraryJSFromResource(String libraryName) {
		String library = null;
		try {
			String libraryPath = getDataModelResoucePath() + File.separator + "Libraries";
			library = new String(Files.readAllBytes(Paths.get(libraryPath + File.separator + libraryName + ".js")));
		}
		catch (IOException ioException) {
			log.debug("Failed getLibraryJSFromResource ", ioException);
		}
		return library;
	}

}
