package com.awpl.forms.services.generic.impl;


import org.apache.log4j.Logger;

import com.awpl.forms.services.generic.IGenericService;

public class GenericService implements IGenericService {

	private static final Logger log = Logger.getLogger(GenericService.class);
	
	@Override
	public void genericSave(String formName, String formBody) {
		if(log.isDebugEnabled())
			log.debug("Generic Save Service Called ");
	   	
		
		if(log.isDebugEnabled())
			log.debug("End Generic Save Service ");
	}

	@Override
	public void genericUpdate(String formName, String formBody) {
		if(log.isDebugEnabled())
			log.debug("Generic Update Service Called ");
	   	
		
		if(log.isDebugEnabled())
			log.debug("End Generic Update Service ");
	}
	


}
