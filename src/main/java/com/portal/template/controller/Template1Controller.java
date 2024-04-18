package com.portal.template.controller;

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

import com.portal.admin.service.UserActHstService;
import com.portal.common.AJaxResVO;
import com.portal.common.Common;
import com.portal.template.service.Template1Service;

/**
 * 코드 관리 Controller
 */
@Controller
@RequestMapping("/Template1")
public class Template1Controller {

	@Autowired
	Template1Service template1Service;

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
	 * 상위 코드 조회
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/SearchUpperCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchUpperCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		Map<String, Object> data = Common.setDataParam(request);

		List<Map<String,Object>> resultMap = template1Service.searchUpperCode(data);

		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("resultMap", resultMap);
	
		return res;
	}

	/**
	 * 코드 조회
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/SearchCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String,Object>> resultMap = template1Service.searchCode(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		return res;
	}

	/**
	 * 상위 코드 저장
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/SaveUpperCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SaveUpprCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = template1Service.saveUpperCode(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
		}
		return res;
	}

	/**
	 * 코드 저장
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/SaveCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Save(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

		//View Parameter set from Request

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = template1Service.saveCode(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
		}
		return res;
	}

	/**
	 * 상위 코드 삭제
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/DeleteUpperCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO DeleteUpperCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = template1Service.deleteUpperCode(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());

		}

		return res;
	}

	/**
	 * 코드 삭제
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/DeleteCode", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO DeleteCode(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = template1Service.deleteCode(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());

		}

		return res;
	}

	/**
	 * Val1 수정
	 * @param locale
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/UpdateVal1", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO UpdateVal1(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			template1Service.updateVal1(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
		}

		return res;
	}

}
