package com.awpl.forms.controllers.config;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.awpl.forms.controllers.base.BaseController;

@RestController
public class FormController extends BaseController
{
	private static final Logger log = Logger.getLogger(FormController.class);
	
	@RequestMapping (value = "/getdefaultform", method = { RequestMethod.GET } )
	public String getDefaultForm(){
		if(log.isDebugEnabled())
			log.debug("Started getDefaultForm");
		String defaultForm = null;
		try{
			defaultForm = formService.getDefaultForm();	
		}catch(Exception exception){
			log.error("failed in getDefaultForm :: ",exception);
		}
		if(log.isDebugEnabled())
			log.debug("End getDefaultForm");
		
		return defaultForm;
	}
	
	@RequestMapping (value = "/getdefaultformresources", method = { RequestMethod.GET } )
	public ModelAndView getDefaultFormResources(){
		if (log.isDebugEnabled())
			log.debug("Started getDefaultFormResources");
		List<String> resourcesFormList = null;
		ModelAndView modelAndView = new ModelAndView("indexForm");
		try{
			resourcesFormList = formService.getDefaultFormResources();
			modelAndView.addObject("defaultFormResourceList", resourcesFormList);
		}
		catch (Exception exception){
			log.error("failed in getDefaultFormResources :: ",exception);
		}
		if (log.isDebugEnabled())
			log.debug("End getDefaultFormResources");

		return modelAndView;
	}
	
	@RequestMapping (value = "/initform/{formName}/{queryParams}", method = { RequestMethod.POST } )
	public String initForm(@PathVariable(value = "formName") String formName, @PathVariable(value = "queryParams") String queryParams, @RequestBody String formData){		
		if(log.isDebugEnabled())
			log.debug("Started initForm ");
			formData	= 	formService.initForm(formName, queryParams, formData);
		if(log.isDebugEnabled())
			log.debug("Completed initForm");
		return formData;
	}
	
	@RequestMapping (value = "/getform", method = { RequestMethod.GET } )
	public ModelAndView getForm(@RequestParam("formName") String formName){
		if (log.isDebugEnabled())
			log.debug("Started getForm");
		
		ModelAndView modelAndView = new ModelAndView("baseForm");
		try{
			modelAndView.addObject("formBean", formService.getForm(formName));
		}
		catch (Exception exception){
			log.error("failed in getForm :: ",exception);
		}
		if (log.isDebugEnabled())
			log.debug("End getForm");

		return modelAndView;
	}
}
