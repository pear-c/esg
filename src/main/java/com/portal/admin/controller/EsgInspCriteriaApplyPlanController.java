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

import com.portal.admin.service.EsgDagnssItmService;
import com.portal.admin.service.EsgInspCriteriaApplyPlanService;
import com.portal.admin.service.UserActHstService;
import com.portal.common.AJaxResVO;
import com.portal.common.Common;

/**
 * 점검 기준 적용 방안 관리 Controller
 */
@Controller
@RequestMapping("/EsgInspCriteriaApplyPlan")
public class EsgInspCriteriaApplyPlanController {

	@Autowired
	EsgInspCriteriaApplyPlanService esgInspCriteriaApplyPlanService;

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
	 * 진단 항목 조회
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/SearchEsgDagnssItm", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchUpperCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

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
	 * 적용 방안 조회
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Search", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String,Object>> resultMap = esgInspCriteriaApplyPlanService.search(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		return res;
	}


	/**
	 * 점검 기준 적용 방안 저장
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

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = esgInspCriteriaApplyPlanService.save(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
		}
		return res;
	}

	/**
	 * 삭제
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Delete", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO DeleteCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = esgInspCriteriaApplyPlanService.delete(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());

		}

		return res;
	}
}
