package com.awpl.forms.services.config.base;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.awpl.forms.services.runtime.IJavaScriptExecutionService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class BaseService {
	
	private static final Logger log = Logger.getLogger(BaseService.class);;
	
	private Properties projectProperties = new Properties();
	private ObjectMapper objectMapper = new ObjectMapper();
	private InputStream projectConfig = BaseService.class.getClassLoader().getResourceAsStream("projectconfig.properties");
	public JsonNode projectNode;
	private String dataModelResoucePath;
	
	public BaseService() {
		try {
			projectProperties.load(projectConfig);
			String projectJsonName = projectProperties.getProperty("projectname") + ".json";
			URL projectJsonURL = this.getClass().getClassLoader().getResource("ProjectJson");
			File projectJsonFile = new File(URLDecoder.decode(projectJsonURL.getFile(), "UTF-8") + File.separator + projectJsonName);
			projectNode = objectMapper.readTree(projectJsonFile);
			URL dataModelResourceURL = this.getClass().getClassLoader().getResource("DataModelResources");
			dataModelResoucePath = new File(URLDecoder.decode(dataModelResourceURL.getFile(), "UTF-8")).getAbsolutePath();
		}
		catch (IOException ioException) {
			log.error("IOException occured ", ioException);
		}
	}
	
	@Autowired
	public IJavaScriptExecutionService javaScriptExcutionService;
	
	public String getDataModelResoucePath() {
		return dataModelResoucePath;
	}
	
	public void setDataModelResoucePath(String dataModelResoucePath) {
		this.dataModelResoucePath = dataModelResoucePath;
	}
}
