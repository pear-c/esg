package com.portal.admin.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.*;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.portal.admin.dao.MenuDao;
import com.portal.admin.dao.UserActHstDao;
import com.portal.admin.service.MenuService;
import com.portal.admin.service.UserActHstService;
import com.portal.common.AJaxResVO;
import com.portal.common.Common;
import com.portal.common.SessionManager;
import com.portal.common.StringUtil;

@Controller
@RequestMapping("/Menu")
public class MenuController {
	
	@Autowired
	MenuService menuService;
	
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
			
			List<Map<String,Object>> resultMap = menuService.search(data);
					
			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		return res;
	}
	
	@RequestMapping(value = "/Save", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Save(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
		
			Map<String, Object> data = Common.setDataParam(request);
			
			Map<String, Object> result = menuService.save(data);
			
			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
		
		}
		
		return res;
	}
	
	@RequestMapping(value = "/Delete", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Delete(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
				
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
		
			Map<String, Object> data = Common.setDataParam(request);
					
			Map<String, Object> result = menuService.delete(data);
			
			
			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
			
		}
		
		return res;
	}
	
	@RequestMapping(value = "/DeleteDetail", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO DeleteDetail(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
				
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
		
			Map<String, Object> data = Common.setDataParam(request);				
			
			Map<String, Object> result = menuService.deleteDetail(data);
			
			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
			
		}
		
		return res;
	}
	
}
