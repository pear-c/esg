package com.portal.admin.controller;

import java.io.IOException;
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
@RequestMapping("/UserPermissions")
public class UserPermissionsController {

	@Autowired
	UserPermissionsService userPermissionsService;


	@Autowired UserActHstService userActHstService;


	@RequestMapping(value = "/", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {

		String menuId = request.getParameter("menuId");
		return Common.sessionCheck(request,locale,model,userActHstService,menuId);
	}


	@RequestMapping(value = "/Search", method = {RequestMethod.GET, RequestMethod.POST})
	  public @ResponseBody AJaxResVO SearchUserPriv(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		  AJaxResVO res = new AJaxResVO();

			if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

		  //View Parameter set from Request
		 // String [] paramSet = {"UserNane"};
		  Map<String, Object> data = Common.setDataParam(request);

		  List<Map<String, Object>> searchUserMap = userPermissionsService.search(data);

		  res.setSuccess(AJaxResVO.SUCCESS_Y);
		  res.addAttribute("searchUserPriv", searchUserMap);
			}
		  return res;
	  }

	@RequestMapping(value = "/SearchRole", method = {RequestMethod.GET, RequestMethod.POST})
	  public @ResponseBody AJaxResVO SearchRole(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		  AJaxResVO res = new AJaxResVO();

			if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

		  //View Parameter set from Request
		  String [] paramSet = {"roleNm"};
		  Map<String, Object> data = Common.setDataParam(request, paramSet);

		  List<Map<String, Object>> searchRoleMap = userPermissionsService.searchRole(data);

		  res.setSuccess(AJaxResVO.SUCCESS_Y);
		  res.addAttribute("searchRole", searchRoleMap);
			}
		  return res;
	  }

	@RequestMapping(value = "/SaveUserRole", method = {RequestMethod.GET, RequestMethod.POST})
  	public @ResponseBody AJaxResVO SaveUserRole(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

  		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

  		//View Parameter set from Request
  		//String [] paramSet = {"userId", "userName", "role", "accessIp", "action"};
  		Map<String, Object> data = Common.setDataParam(request);

  		if(data.get("userPwd") != null)	data.replace("userPwd", AesCryptUtil.encrypt((String) data.get("userPwd")));

  		Map<String, Object> result = userPermissionsService.saveUserRole(data);



  		res.setSuccess(result.get("SUCC_YN").toString());
  		res.addAttribute("message", result.get("MSG").toString());

		}

  		return res;
  	}

	@RequestMapping(value = "/DeleteUserRole", method = {RequestMethod.GET, RequestMethod.POST})
  	public @ResponseBody AJaxResVO DeleteUserRole(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

  		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

  		//View Parameter set from Request
  		//String [] paramSet = {"userId", "userName", "action"};
  		Map<String, Object> data = Common.setDataParam(request);

  		Map<String, Object> result = userPermissionsService.deleteUserRole(data);

  		res.setSuccess(result.get("SUCC_YN").toString());
  		res.addAttribute("message", result.get("MSG").toString());

		}

  		return res;
  	}

}
