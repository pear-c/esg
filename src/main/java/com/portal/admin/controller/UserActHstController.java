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
@RequestMapping("/UserActHst")
public class UserActHstController {

	@Autowired
	UserActHstService userActHstService;
		
	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {
				
		String menuId = request.getParameter("menuId");

		return Common.sessionCheck(request,locale,model,userActHstService,menuId);
	}
	
	@RequestMapping(value = "/Search", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Search(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {	
		
		
		Map<String, Object> data = Common.setDataParam(request);
		
		List<Map<String,Object>> resultMap = userActHstService.search(data);
				
		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("resultMap", resultMap);
		
		}
		
		return res;
	}
	
	@RequestMapping(value = "/SearchUser", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchUser(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {	
		
		Map<String, Object> data = Common.setDataParam(request);
		
		List<Map<String,Object>> resultMap = userActHstService.searchUser(data);
				
		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("resultMap", resultMap);
		}
		return res;
	}
	
	@RequestMapping(value = "/SearchUserActHst", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchUserActHst(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {	
		
		Map<String, Object> data = Common.setDataParam(request);
		
		List<Map<String,Object>> resultMap = userActHstService.searchUserActHst(data);
				
		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("resultMap", resultMap);
		}
		return res;
	}
}
