package com.portal.main.controller;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.portal.admin.service.UserActHstService;
import com.portal.common.AJaxResVO;
import com.portal.common.Common;
import com.portal.common.SessionManager;
import com.portal.main.dao.MainDao;

@Controller
@RequestMapping("/Main")
public class MainController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);


	@Autowired
	UserActHstService userActHstService;

	@Autowired
	MainDao mainDao;


	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {

		HttpSession session = SessionManager.getSession(request);

		if(session.getAttribute("loginUserId") != null){

			ModelAndView result = new ModelAndView();

		    result.setViewName("/main/main");

			return result;
		}else {
			RedirectView rv = new RedirectView(request.getContextPath()+"/");
		    rv.setExposeModelAttributes(false);
		    return new ModelAndView(rv);
		}
	}



	@RequestMapping(value = "/SearchUserJobInfo", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchUserJobInfo(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> resultMap = mainDao.searchUserJobInfo(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchProcPerform", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchProcPerform(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> resultMap = mainDao.searchProcPerform(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchBBSNotice", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchBBSNotice(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchBBSNotice(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchBBSEdu", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchBBSEdu(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchBBSEdu(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchBBSPromotion", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchBBSPromotion(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchBBSPromotion(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchBBSQna", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchBBSQna(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchBBSQna(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchBBSFaq", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchBBSFaq(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchBBSFaq(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchBBSErrorReport", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchBBSErrorReport(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchBBSErrorReport(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchYearBizAutomationTime", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchYearBizAutomationTime(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchYearBizAutomationTime(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchYearProcAutomationTime", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchYearProcAutomationTime(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchYearProcAutomationTime(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchYearProcAutomationTime2", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchYearProcAutomationTime2(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchYearProcAutomationTime2(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchYearProcAutomationTime3", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchYearProcAutomationTime3(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchYearProcAutomationTime3(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchBanner", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchBanner(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			List<Map<String, Object>> resultMap = mainDao.searchBanner(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/SearchBotStoreSummary", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO SearchBotStoreSummary(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> resultMap = mainDao.searchBotStoreSummary(data);

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);

		}

		return res;
	}

	@RequestMapping(value = "/DisitalKhnp", method = {RequestMethod.GET ,RequestMethod.POST })
	public @ResponseBody AJaxResVO DisitalKhnp(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}
		/*
		else {

			HttpSession session = SessionManager.getSession(request);

			String ssoUserId = SSOLoginUtil.setSsoLoginId(session.getAttribute("loginUserId").toString());

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("ssoUserId", ssoUserId);

		}
		*/
		return res;
	}

}
