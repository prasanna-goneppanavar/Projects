package com.awpl.forms.controllers.config;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.awpl.forms.controllers.base.BaseController;

@RestController
public class DMSchemaController extends BaseController
{
	private static final Logger log = Logger.getLogger(DMSchemaController.class);
	@RequestMapping(value="/getDMSchema")
	public String getDMScheme(){
		String schemaJSON = null;
		try{
			if (log.isDebugEnabled())
				log.debug("Started getting DM Schema..");
			
			schemaJSON = dMSchemaService.getDMSchema();
			return schemaJSON;
		}
		catch (Exception e){
			e.printStackTrace();
		}
		return schemaJSON;
	}
}
