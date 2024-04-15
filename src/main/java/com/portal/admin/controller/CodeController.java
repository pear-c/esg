package com.portal.admin.controller;

import java.io.IOException;
import java.util.*;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.portal.admin.service.CodeService;
import com.portal.admin.service.UserActHstService;
import com.portal.common.AJaxResVO;
import com.portal.common.Common;

@Controller
@RequestMapping("/Code")
public class CodeController {

	@Autowired
	CodeService codeService;

	@Autowired
	UserActHstService userActHstService;

	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {

		String menuId = request.getParameter("menuId");

		return Common.sessionCheck(request,locale,model,userActHstService,menuId);
	}

	@RequestMapping(value = "/SearchUpperCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchUpperCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		
			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String,Object>> resultMap = codeService.searchUpperCode(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
	
//		if(Common.seesionCheck(request)) {
//			
//			response.sendError(503);
//			
//		}else {
//			Map<String, Object> data = Common.setDataParam(request);
//			
//			List<Map<String,Object>> resultMap = codeService.searchUpperCode(data);
//			
//			res.setSuccess(AJaxResVO.SUCCESS_Y);
//			res.addAttribute("resultMap", resultMap);
//		}
		return res;
	}

	@RequestMapping(value = "/SearchCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String,Object>> resultMap = codeService.searchCode(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		return res;
	}

	@RequestMapping(value = "/SaveUpperCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SaveUpprCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = codeService.saveUpperCode(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
		}
		return res;
	}

	@RequestMapping(value = "/SaveCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Save(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

		//View Parameter set from Request

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = codeService.saveCode(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
		}
		return res;
	}

	@RequestMapping(value = "/DeleteUpperCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO DeleteUpperCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = codeService.deleteUpperCode(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());

		}

		return res;
	}

	@RequestMapping(value = "/DeleteCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO DeleteCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = codeService.deleteCode(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());

		}

		return res;
	}

	@RequestMapping(value = "/UpdateVal1", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO UpdateVal1(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			codeService.updateVal1(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
		}

		return res;
	}

}
