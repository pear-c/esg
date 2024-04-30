package com.portal.admin.controller;

import java.io.IOException;
import java.util.List;
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

import com.portal.admin.service.EsgInspCriteriaService;
import com.portal.admin.service.EsgDagnssItmService;
import com.portal.admin.service.UserActHstService;
import com.portal.common.AJaxResVO;
import com.portal.common.Common;

/**
 * 점검 기준 관리 Controller
 */
@Controller
@RequestMapping("/EsgInspCriteria")
public class EsgInspCriteriaController {

	@Autowired
	EsgInspCriteriaService esgInspCriteriaService;

	@Autowired
	EsgDagnssItmService esgDagnssItmService;
	
	@Autowired
	UserActHstService userActHstService;

	/**
	 * 메뉴 클릭(사용자 액션에 대한 로그 정보 기록)
	 * @param locale
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {

		String menuId = request.getParameter("menuId");

		return Common.sessionCheck(request,locale,model,userActHstService,menuId);
	}

	/**
	 * 점검 항목 조회
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/SearchEsgDagnssItm", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchEsgDagnssItm(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		AJaxResVO res = new AJaxResVO();
		if(Common.seesionCheck(request)) {
			response.sendError(503);			
		}else {	
			Map<String, Object> data = Common.setDataParam(request);
			List<Map<String, Object>> resultMap = esgDagnssItmService.search(data);
			res.setSuccess(AJaxResVO.SUCCESS_Y); 
			res.addAttribute("resultMap", resultMap);
		}
		return res; 
	}

	/**
	 * 점검 기준 조회
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Search", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchEsgInspCriteria(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String,Object>> resultMap = esgInspCriteriaService.search(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		return res;
	}


	/**
	 * 점검 기준 저장
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Save", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Save(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

		//View Parameter set from Request

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = esgInspCriteriaService.save(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
		}
		return res;
	}


	/**
	 * 점검 기준 삭제
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Delete", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO DeleteEsgInspCriteria(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = esgInspCriteriaService.delete(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());

		}

		return res;
	}
}
