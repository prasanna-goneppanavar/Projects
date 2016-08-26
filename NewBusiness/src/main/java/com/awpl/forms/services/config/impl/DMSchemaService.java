package com.awpl.forms.services.config.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;

import org.apache.log4j.Logger;

import com.awpl.forms.services.config.IDMSchemaService;
import com.awpl.forms.services.config.base.BaseService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

public class DMSchemaService extends BaseService implements IDMSchemaService
{
	private static final Logger log = Logger.getLogger(DMSchemaService.class); 
	
	private String dataModelSchemaPath = getDataModelResoucePath() + File.separator + "DataModelSchema" + File.separator;

	@Override
	public String getDMSchema() throws IOException
	{
		String dataModelName=null,schemaJson="{}";
		File dmSchemaFile ;
		try{
			ArrayNode formArrayNode =(ArrayNode)projectNode.get("forms");			
			Iterator<JsonNode> formElementsIterator = formArrayNode.elements();
			
			while (formElementsIterator.hasNext()){ 
				JsonNode formNode = formElementsIterator.next();
				JsonNode defaultForm = formNode.get("defaultForm");
				if(defaultForm.booleanValue()){
					dataModelName = formNode.get("dataModel").textValue();
					if(log.isDebugEnabled())
						log.debug("Default Form "+dataModelName);
					
					dmSchemaFile = new File(dataModelSchemaPath + dataModelName + ".json");
					schemaJson = new String(Files.readAllBytes(Paths.get(dmSchemaFile.getAbsolutePath())));
					break;
				}
			}
			
		}catch (IOException ioException){
			ioException.printStackTrace();
		}
		return schemaJson;
	}

}
