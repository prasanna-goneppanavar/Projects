package com.awpl.forms.services.config.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import org.apache.log4j.Logger;

import com.awpl.forms.beans.FormBean;
import com.awpl.forms.services.config.IFormService;
import com.awpl.forms.services.config.base.BaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;


public class FormService extends BaseService implements IFormService{
	private static final Logger log = Logger.getLogger(FormService.class);
	
	public static void main(String args[]) throws Exception{
		FormService formService = new FormService();
		formService.getDefaultFormResources();
	}

	@Override
	public String getDefaultForm() throws Exception
	{
		if(log.isDebugEnabled())
			log.debug("Started getDefaultForm :: "+projectNode);
		
		ArrayNode formArrayNode =(ArrayNode)projectNode.get("forms");
		StringBuilder formJsonSchema= new StringBuilder();
		formJsonSchema.append("{");
		
		Iterator<JsonNode> formElementsIterator = formArrayNode.elements();
		
		while (formElementsIterator.hasNext()){ 
			JsonNode formNode = formElementsIterator.next();
			JsonNode defaultForm = formNode.get("defaultForm");
			if(defaultForm.booleanValue()){
				formJsonSchema.append("\"formName\": \"" + formNode.get("name").textValue() + "\",");
				formJsonSchema.append("\"fileName\": \"" + formNode.get("fileName").textValue() + "\"");
				break;
			}
		}
		
		formJsonSchema.append("}");			

		if(log.isDebugEnabled())
			log.debug("End getDefaultForm :: formJsonSchema " +formJsonSchema.toString());
		
		return formJsonSchema.toString();
	}

	@Override
	public List<String> getDefaultFormResources() throws Exception{
		if (log.isDebugEnabled())
			log.debug("Started getDefaultFormResources :: Project " + projectNode);
		
		List<String> resourcePathList = new ArrayList<String>();
		ArrayNode formArrayNode = (ArrayNode) projectNode.get("forms");
		Iterator<JsonNode> formElementsIterator = formArrayNode.elements();
		while (formElementsIterator.hasNext()) {
			JsonNode formNode = formElementsIterator.next();
			JsonNode defaultForm = formNode.get("defaultForm");
			if (defaultForm.booleanValue()) {
				JsonNode referencedResourcesNode = formNode.get("referencedResourceIds");
				String formName = formNode.get("name").textValue();
				Iterator<Entry<String, JsonNode>> referencedResourceFields = referencedResourcesNode.fields();
				while (referencedResourceFields.hasNext()) {
					Entry<String, JsonNode> entry = referencedResourceFields.next();
					String resourceName = entry.getValue().textValue();
					String resourceJson = "{";
					resourceJson = resourceJson.concat("\"formName\": \"" + formName + "\",");
					resourceJson = resourceJson.concat("\"fileName\": \"" + resourceName + "\"");
					resourceJson = resourceJson.concat("}");
					resourcePathList.add(resourceJson);
				}
				break;
			}
		}
		
		if (log.isDebugEnabled())
			log.debug("End  getDefaultFormResources :: resourcePathList " + resourcePathList);
		
		return resourcePathList;
	}

	@Override
	public String initForm(String formName, String queryParams, String formData) {
		return formData;
	}

	@Override
	public FormBean getForm(String formName) throws Exception {
		if (log.isDebugEnabled())
			log.debug(" Started getForm ");
		
		ObjectMapper om = new ObjectMapper();
		FormBean formBean = new FormBean();
		List<String> resourcePathList = new ArrayList<String>();

		ArrayNode formArrayNode = (ArrayNode) projectNode.get("forms");
		Iterator<JsonNode> formElementsIterator = formArrayNode.elements();
		StringBuilder formJsonSchema = new StringBuilder();

		while (formElementsIterator.hasNext()) {
			JsonNode formNode = formElementsIterator.next();
			JsonNode formNameNode = formNode.get("name");
			if (formNameNode.textValue().equals(formName)) {

				formBean.setFormFileName(formNode.get("fileName").textValue());

				JsonNode referencedResourcesNode = formNode.get("referencedResourceIds");
				Iterator<Entry<String, JsonNode>> referencedResourceFields = referencedResourcesNode.fields();
				while (referencedResourceFields.hasNext()) {
					Entry<String, JsonNode> entry = referencedResourceFields.next();
					String resourceName = entry.getValue().textValue();
					resourcePathList.add(resourceName);
				}
				break;
			}
		}

		formBean.setFormName(formName);
		formBean.setFormJsonObject(formJsonSchema.toString());

		try {
			formBean.setResourcesJson(om.writeValueAsString(resourcePathList));
		}
		catch (JsonProcessingException e) {
			log.error("Error while converting resourcelist to Json format ", e);
		}

		if (log.isDebugEnabled())
			log.debug(" End getForm");

		return formBean;
	}
	
}
