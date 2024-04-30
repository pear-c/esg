package com.portal.login.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.portal.admin.service.CodeService;
import com.portal.admin.service.MenuService;
import com.portal.admin.service.MessageService;
import com.portal.admin.service.UserActHstService;
import com.portal.common.AesCryptUtil;
import com.portal.common.Common;
import com.portal.common.DateUtil;
import com.portal.common.MessageUtil;
import com.portal.common.SessionManager;
import com.portal.main.service.MainService;

@Controller
public class LoginController {

	@Autowired
	MainService mainService;

	@Autowired
	UserActHstService userActHstService;

	@Autowired
	MessageService messageService;

	@Autowired
	CodeService codeService;

	@Autowired
	MenuService menuService;
	
	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) {

		Principal principal = request.getUserPrincipal();
		String name = (null != principal ? principal.getName() : "");
		String username = request.getRemoteUser();
		

		HttpSession session = SessionManager.getSession(request);
		if(session.getAttribute("loginUserId") != null){

			ModelAndView result = new ModelAndView();

		    result.setViewName("/main/main");

			return result;
		}
		else {
			return Common.setModelAndView("/login/login", request, locale, model);
		}
	}

	@RequestMapping(value = "/LogOut", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView LogOut(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) {

		SessionManager.sessionClear(request);

		RedirectView rv = new RedirectView(request.getContextPath()+"/");
		rv.setExposeModelAttributes(false);

		return new ModelAndView(rv);

		//return Common.setModelAndView("/", request, locale, model);
	}

	@RequestMapping(value = "/error404.html")
	public String error(ModelMap modelMap, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		modelMap.addAttribute("Data","error code : 404");
		return "error";
	}



	@RequestMapping(value = "/main", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Std(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> data 	= Common.setDataParam(request);

		Map<String, Object> result  = mainService.loginUserInfo(data);

		if(result == null) {
			response.setContentType("text/html; charset=UTF-8");


			try {
				String msg = "<script language='javascript'>alert('사용자 정보가 없습니다.'); location.href='/'</script>";

				PrintWriter out = null;
				out = response.getWriter();
				out.print(msg);
				out.flush();
			} catch (IOException e) {
				System.err.println("Error: IOException reading the input file.\n");
			}


			return null;
		}else {


			// 비밀번호 확인
			if(result.get("USER_PWD") != null) {
				if(!data.get("userPwd").equals(AesCryptUtil.decrypt(result.get("USER_PWD").toString()))) {
					response.setContentType("text/html; charset=UTF-8");

					try {
						String msg = "<script language='javascript'>alert('비밀번호를 확인해주십시오.'); location.href='/'</script>";

						PrintWriter out = null;
						out = response.getWriter();
						out.print(msg);
						out.flush();
					} catch (IOException e) {
						System.err.println("Error: IOException reading the input file.\n");
					}
					return null;
				}
			}


			String userId = data.get("userId").toString();


			data.put("menuId",result.get("LOGIN_PAGE"));
			
			List<Map<String, Object>> menuTop =  mainService.searchTopMenu(data);

			List<Map<String, Object>> menu =  mainService.searchMenu(data);

			List<Map<String, Object>> loginMenu =  menuService.search(data);


			SessionManager.setAttribute(request, "menuTop", menuTop);
			SessionManager.setAttribute(request, "menu", menu);
			SessionManager.setAttribute(request, "loginUserId", result.get("USER_ID"));
			SessionManager.setAttribute(request, "loginUserName", result.get("USER_NAME"));
			SessionManager.setAttribute(request, "loginUserDeptName", result.get("DEPT_NAME"));
			SessionManager.setAttribute(request, "loginUserDate",DateUtil.DateToString(new Date(), "yyyy-MM-dd HH:mm"));
			SessionManager.setAttribute(request, "loginUserRole", result.get("ROLE_ID"));
			SessionManager.setAttribute(request, "loginUserCelTel", result.get("CEL_TEL"));
			SessionManager.setAttribute(request, "loginCmgrpCd", result.get("CMGRP_CD"));
			SessionManager.setAttribute(request, "loginSsoUseYn", "N");
			SessionManager.setAttribute(request, "loginPage", loginMenu.get(0));

			data.put("use_yn", "Y");

			List<Map<String, Object>> message =  messageService.search(data);

			SessionManager.setAttribute(request, "message", MessageUtil.setMessage(message, "MSG_ID", "MSG_CONTENTS" ));

			return Common.sessionCheck(request,locale,model,userActHstService,loginMenu.get(0).get("MENU_ID").toString());

		}
	}

}
