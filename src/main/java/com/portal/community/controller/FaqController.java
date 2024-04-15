package com.portal.community.controller;

import java.io.IOException;
import java.util.*;

import javax.servlet.http.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.*;

import com.portal.admin.service.UserActHstService;
import com.portal.common.*;
import com.portal.community.service.*;

@Controller
@RequestMapping(value = "/Faq")
public class FaqController {
	
	@Autowired
	FaqService faqService;
	
	@Autowired
	UserActHstService userActHstService;
	
	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {
						
		String menuId = request.getParameter("menuId");
		
		if(request.getParameter("searchId") != null) {		
			model.addAttribute("searchId", request.getParameter("searchId"));		
		}
		
		return Common.sessionCheck(request,locale,model,userActHstService,menuId);	
	}	
	
	@RequestMapping(value = "/Search", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Search(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {
		
		Map<String, Object> data = Common.setDataParam(request);
		
		List<Map<String,Object>> resultMap = faqService.search(data);
		
		int count = faqService.count();
				
		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("resultMap", resultMap);
		res.addAttribute("resultMapCount", count);
		
		}
		
		return res;
	}
	
	@RequestMapping(value = "/SearchDetail", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchDetail(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {
		
		Map<String, Object> data = Common.setDataParam(request);
		
		Map<String,Object> resultMap = faqService.searchDetail(data);
		
		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("resultMap", resultMap);
		}
		return res;
	}

}
