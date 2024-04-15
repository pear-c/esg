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

		/*if("Y".equals(SessionManager.getStringAttr(request, "loginSsoUseYn"))) {
			return Common.setModelAndView("/dashboard/RpaMon2", request, locale, model);
		};*/

		Principal principal = request.getUserPrincipal();
		String name = (null != principal ? principal.getName() : "");
		String username = request.getRemoteUser();
		
		if(request.getLocalPort() == 443) {
			if(request.getParameter("SSOLogin") != null) {

				// SSO Login 복호화
				/*
				 * SSO 로그인 사용시점에 코멘트 해제해서 사용 할것, 아래 대신 "1"로 고정
				String userId = SSOLoginUtil.getSsoLoginId(request.getParameter("SSOLogin"));
				*/
				String userId = "1";
				//String userId = request.getParameter("SSOLogin");
				Map<String, Object> data 	= new HashMap<String, Object>();
				 data.put("userId", userId);
				 // SSOLOGIN 로그인시 권한을 고정적으로 일반사용자로 변경 [적용 예정]
				 //data.put("SSOLogin", "1");

				Map<String, Object> result  = mainService.loginUserInfo(data);


				if(result == null) {
					response.setContentType("text/html; charset=UTF-8");


					try {
						String msg = "<script language='javascript'>alert('사용자 정보가 없습니다.'); top.window.open('about:blank','_self').close()</script>";

						PrintWriter out = null;
						out = response.getWriter();
						out.print(msg);
						out.flush();
					} catch (IOException e) {
						System.err.println("Error: IOException reading the input file.\n");
					}


					return null;
				}else {

					// 관리자 권한(R999) 만 로그인으로 접속 가능(SSO는 임시용)
					// 통신인프라부가 아닐경우
					// 축구단 김정하 직원 임시 추가, 황우연 대리 요청, 2021.09.28
					// 코드관리 기능으로 로그인 제한 설정

					data.put("upprCode", "LOGIN_AUTH");
					data.put("useYn", "Y");

					if(codeService.searchUpperCodeCount(data) > 0  && !"R999".equals(result.get("ROLE_ID")) && !"RDEV".equals(result.get("ROLE_ID"))) {

						List<Map<String,Object>> loginAuth = codeService.searchCode(data);

						//로그인 제한이 Y 일때
						if(loginAuth.size() != 0) {
							boolean loginSucc = false;
							for(int i=0; i< loginAuth.size();i++) {
								// 허용된 그룹이 존재하는지 확인
								if(loginAuth.get(i).get("CODE").equals("A")) {
									if(loginAuth.get(i).get("VAL1") != null && !"".equals(loginAuth.get(i).get("VAL1"))) {
										// 허용된 그룹을 , 기준으로 분류
										String[] deptCodeAuth = loginAuth.get(i).get("VAL1").toString().split(",");
										for(int j=0; j< deptCodeAuth.length; j++) {
											if(result.get("DEPT_CODE").toString().contains(deptCodeAuth[j].trim())) {
												loginSucc = true;
												break;
											}
										}
									}
								}else if(loginAuth.get(i).get("CODE").equals("B")) {
									if(loginAuth.get(i).get("VAL1") != null && !"".equals(loginAuth.get(i).get("VAL1"))) {
										// 허용된 사번 , 기준으로 분류
										String[] userIdAuth = loginAuth.get(i).get("VAL1").toString().split(",");
										for(int j=0; j< userIdAuth.length; j++) {
											if(userId.equals(userIdAuth[j].trim())) {
												loginSucc = true;
												break;
											}
										}
									}
								}

								// 로그인 허용이 true일 경우 break;
								if(loginSucc) {
									break;
								}

								// 로그인 제한이 Y이고 허용된 그룹 및 사번이 없을경우 로그인 불가
								if(i == loginAuth.size()-1) {
									response.setContentType("text/html; charset=UTF-8");

									try {
										String msg = "<script language='javascript'>alert('로그인 권한이 없습니다. 관리자에게 문의하시기 바랍니다.'); top.window.open('about:blank','_self').close()</script>";

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
						}else {
							response.setContentType("text/html; charset=UTF-8");

							try {
								String msg = "<script language='javascript'>alert('로그인 권한이 없습니다. 관리자에게 문의하시기 바랍니다.'); top.window.open('about:blank','_self').close()</script>";

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

					/*if(!"R999".equals(result.get("ROLE_ID")) && !result.get("DEPT_CODE").toString().contains("001033001003")
							&& !"14197109".equals(userId)) {
						response.setContentType("text/html; charset=UTF-8");

						try {
							String msg = "<script language='javascript'>alert('아직 오픈 전입니다.(임시)'); top.window.open('about:blank','_self').close()</script>";

							PrintWriter out = null;
							out = response.getWriter();
							out.print(msg);
							out.flush();
						} catch (IOException e) {
							System.err.println("Error: IOException reading the input file.\n");
						}
						return null;
					}*/

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
					SessionManager.setAttribute(request, "loginSsoUseYn", "Y");
					SessionManager.setAttribute(request, "loginPage", loginMenu.get(0));

					data.put("use_yn", "Y");

					List<Map<String, Object>> message =  messageService.search(data);


					SessionManager.setAttribute(request, "message", MessageUtil.setMessage(message, "MSG_ID", "MSG_CONTENTS" ));


					return Common.sessionCheck(request,locale,model,userActHstService,loginMenu.get(0).get("MENU_ID").toString());
				}
			}else {
				response.setContentType("text/html; charset=UTF-8");


				try {
					String msg = "<script language='javascript'>alert('세션이 해제되었습니다.'); top.window.open('about:blank','_self').close()</script>";

					PrintWriter out = null;
					out = response.getWriter();
					out.print(msg);
					out.flush();
				} catch (IOException e) {
					System.err.println("Error: IOException reading the input file.\n");
				}

				return null;
			}
		}else {

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

		if(data.get("SSOLogin") != null) data.put("userId", data.get("SSOLogin"));

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

			data.put("upprCode", "LOGIN_AUTH");
			data.put("useYn", "Y");

			if(codeService.searchUpperCodeCount(data) > 0 && !"R999".equals(result.get("ROLE_ID")) && !"RDEV".equals(result.get("ROLE_ID"))) {

				List<Map<String,Object>> loginAuth = codeService.searchCode(data);

				//로그인 제한이 Y 일때
				if(loginAuth.size() != 0) {
					boolean loginSucc = false;
					for(int i=0; i< loginAuth.size();i++) {
						// 허용된 그룹이 존재하는지 확인
						if(loginAuth.get(i).get("CODE").equals("A")) {
							if(loginAuth.get(i).get("VAL1") != null && !"".equals(loginAuth.get(i).get("VAL1"))) {
								// 허용된 그룹을 , 기준으로 분류
								String[] deptCodeAuth = loginAuth.get(i).get("VAL1").toString().split(",");
								for(int j=0; j< deptCodeAuth.length; j++) {
									if(result.get("DEPT_CODE").toString().contains(deptCodeAuth[j].trim())) {
										loginSucc = true;
										break;
									}
								}
							}
						}else if(loginAuth.get(i).get("CODE").equals("B")) {
							if(loginAuth.get(i).get("VAL1") != null && !"".equals(loginAuth.get(i).get("VAL1"))) {
								// 허용된 사번 , 기준으로 분류
								String[] userIdAuth = loginAuth.get(i).get("VAL1").toString().split(",");
								for(int j=0; j< userIdAuth.length; j++) {
									if(userId.equals(userIdAuth[j].trim())) {
										loginSucc = true;
										break;
									}
								}
							}
						}

						// 로그인 허용이 true일 경우 break;
						if(loginSucc) {
							break;
						}

						// 로그인 제한이 Y이고 허용된 그룹 및 사번이 없을경우 로그인 불가
						if(i == loginAuth.size()-1) {
							response.setContentType("text/html; charset=UTF-8");

							try {
								String msg = "<script language='javascript'>alert('로그인 권한이 없습니다. 관리자에게 문의하시기 바랍니다.'); top.window.open('about:blank','_self').close()</script>";

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
				}else {
					response.setContentType("text/html; charset=UTF-8");

					try {
						String msg = "<script language='javascript'>alert('로그인 권한이 없습니다. 관리자에게 문의하시기 바랍니다.'); top.window.open('about:blank','_self').close()</script>";

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

			String requestIp = Common.getClientIp(request);

			// 허용 가능 IP 체크
			if(result.get("ACCESS_IP") != null && !"".equals(result.get("ACCESS_IP")) && !requestIp.equals(result.get("ACCESS_IP"))) {
				response.setContentType("text/html; charset=UTF-8");

				try {
					String msg = "<script language='javascript'>alert('접속이 허용되지 않은 IP입니다.'); location.href='/'</script>";

					PrintWriter out = null;
					out = response.getWriter();
					out.print(msg);
					out.flush();
				} catch (IOException e) {
					System.err.println("Error: IOException reading the input file.\n");
				}


				return null;
			}

			
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
