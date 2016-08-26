package com.awpl.forms.controllers.base;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.awpl.forms.services.config.IDMSchemaService;
import com.awpl.forms.services.config.IFormService;
import com.awpl.forms.services.generic.IGenericService;

public class BaseController {
	
	
	@Autowired
	public IFormService formService;
	
	@Autowired
	public IDMSchemaService dMSchemaService;
	
	@Autowired
	public IGenericService genericService;
	
	@Autowired
	private HttpServletRequest request;
	
	public HttpServletRequest getRequest() {
		return request;
	}
}