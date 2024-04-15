package com.portal.admin.controller;

import java.io.*;
import java.util.*;

import javax.servlet.http.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.*;

import com.portal.admin.service.*;
import com.portal.common.*;

@Controller
@RequestMapping("/Message")
public class MessageController {
	
	@Autowired
	MessageService messageService;
	
	@Autowired
	UserActHstService userActHstService;
	
	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
						
		String menuId = request.getParameter("menuId");
		
		return Common.sessionCheck(request,locale,model,userActHstService,menuId);	
	}
	
	 @RequestMapping(value = "/Search", method = {RequestMethod.GET,
			  RequestMethod.POST}) public @ResponseBody AJaxResVO Search(Locale locale,
			  Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
			  
				  AJaxResVO res = new AJaxResVO();
				  
				if(Common.seesionCheck(request)) {
					
					response.sendError(503);			
				
				}else {	
				  
					  Map<String, Object> data = Common.setDataParam(request);
					  
					  
					  
					  List<Map<String, Object>> searchMap = messageService.search(data);
					  
					  //searchMap.replace("msgCon", AesCryptUtil.decrypt((String) data.get("msgCon")));
					  //searchMap.set(index, element)
					  										 
					  res.setSuccess(AJaxResVO.SUCCESS_Y); 
					  res.addAttribute("search", searchMap);
				}
				  return res; 
			  }
	 
	 @RequestMapping(value = "/Save", method = {RequestMethod.GET,
			  RequestMethod.POST}) public @ResponseBody AJaxResVO Save(Locale locale,
			  Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		 			
				  AJaxResVO res = new AJaxResVO();
				 
					if(Common.seesionCheck(request)) {
						
						response.sendError(503);			
					
					}else {	
						  
						  Map<String, Object> data = Common.setDataParam(request);
						  
						  //data.replace("msgCon", AesCryptUtil.encrypt(CommonUtils.removeTag((String) data.get("msgCon"))));
						  
						  Map<String, Object> result = messageService.save(data);
						  		  
						  res.setSuccess(result.get("SUCC_YN").toString());
						  res.addAttribute("message", result.get("MSG").toString());
				  
					}
				  
				  return res; 
			  }
	 
	 @RequestMapping(value = "/Delete", method = {RequestMethod.GET,
			  RequestMethod.POST}) public @ResponseBody AJaxResVO delete(Locale locale,
			  Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
			  	
		 		 		 			
				  AJaxResVO res = new AJaxResVO();
				 
					if(Common.seesionCheck(request)) {
						
						response.sendError(503);			
					
					}else {	
				  
				  
					  Map<String, Object> data = Common.setDataParam(request);
					  
					  //data.replace("msgCon", AesCryptUtil.encrypt(CommonUtils.removeTag((String) data.get("msgCon"))));
					  
					  Map<String, Object> result = messageService.delete(data);
					  		  
					  res.setSuccess(result.get("SUCC_YN").toString());
					  res.addAttribute("message", result.get("MSG").toString());
				  
					}
				  
				  return res; 
			  }
	 
}
