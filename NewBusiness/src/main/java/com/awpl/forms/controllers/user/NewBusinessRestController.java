package com.awpl.forms.controllers.user;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.awpl.forms.controllers.base.BaseController;

@RestController
public class NewBusinessRestController extends BaseController
{
	private static final Logger log = Logger.getLogger(NewBusinessRestController.class);
	
	@RequestMapping(value="/save/{formName}/{actionType}")
	public void GenericSave(@PathVariable(value = "formName") String formName, @PathVariable(value = "actionType") String actionType, @RequestBody String formData){
		if(log.isDebugEnabled())
			log.debug("Generic Save Controller Invoked with data " + formData + " :: " + formName);
    	
		if(actionType.equals("save")){
			genericService.genericSave(formName, formData);
		}else if(actionType.equals("update")){
			genericService.genericUpdate(formName, formData);
		}
		
		if(log.isDebugEnabled())
			log.debug("End Save Controller Invoked with data " + formData + " :: " + formName);
    } 
}
