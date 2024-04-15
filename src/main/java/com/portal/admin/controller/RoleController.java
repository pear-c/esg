package com.portal.admin.controller;

import java.io.*;
import java.util.*;

import javax.servlet.http.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.*;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import com.portal.admin.service.*;
import com.portal.common.*;
@Controller
@RequestMapping("/Role")
public class RoleController {

	@Autowired
	RoleService roleService;

	@Autowired
	UserActHstService userActHstService;

	@RequestMapping(value = "/", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {

		String menuId = request.getParameter("menuId");
		return Common.sessionCheck(request,locale,model,userActHstService,menuId);
	}


	  @RequestMapping(value = "/SearchRole", method = {RequestMethod.GET, RequestMethod.POST})
	  public @ResponseBody AJaxResVO SearchRole(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		  AJaxResVO res = new AJaxResVO();


		  if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

			  //View Parameter set from Request
			  //String [] paramSet = {"roleNm"};
			  Map<String, Object> data = Common.setDataParam(request);

			  List<Map<String, Object>> searchRoleMap = roleService.searchRole(data);

			  res.setSuccess(AJaxResVO.SUCCESS_Y);
			  res.addAttribute("searchRole", searchRoleMap);
		  }

		  return res;
	  }

	  @RequestMapping(value = "/SearchRoleMenu", method = {RequestMethod.GET, RequestMethod.POST})
	  public @ResponseBody AJaxResVO SearchRoleMenu(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		  AJaxResVO res = new AJaxResVO();

		  if(Common.seesionCheck(request)) {

				response.sendError(503);

		}else {

		  //View Parameter set from Request
		  String [] paramSet = {"roleId"};
		  Map<String, Object> data = Common.setDataParam(request, paramSet);

		  List<Map<String, Object>> searchRoleMap = roleService.searchRoleMenu(data);

		  res.setSuccess(AJaxResVO.SUCCESS_Y);
		  res.addAttribute("searchRoleMenu", searchRoleMap);
		}
		  return res;
	  }

	  @RequestMapping(value = "/SearchUserPriv", method = {RequestMethod.GET, RequestMethod.POST})
	  public @ResponseBody AJaxResVO SearchUserPriv(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		  AJaxResVO res = new AJaxResVO();

		  if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

		  List<Map<String, Object>> searchUserMap = roleService.searchUserPriv();

		  res.setSuccess(AJaxResVO.SUCCESS_Y);
		  res.addAttribute("searchUserPriv", searchUserMap);
			}
		  return res;
	  }

	  @RequestMapping(value = "/SearchLoginMenu", method = {RequestMethod.GET, RequestMethod.POST})
	  public @ResponseBody AJaxResVO SearchLoginMenu(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		  AJaxResVO res = new AJaxResVO();

		  if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

		  List<Map<String, Object>> searchUserMap = roleService.searchLoginMenu();

		  res.setSuccess(AJaxResVO.SUCCESS_Y);
		  res.addAttribute("searchLoginMenu", searchUserMap);
			}
		  return res;
	  }

	  	@RequestMapping(value = "/SaveRole", method = {RequestMethod.GET, RequestMethod.POST})
		public @ResponseBody AJaxResVO SaveRole(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

			AJaxResVO res = new AJaxResVO();

			if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

			Map<String, Object> data = Common.setDataParam(request);

			Map<String, Object> result = roleService.saveRole(data);

			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());
			}

			return res;
		}
	  	@SuppressWarnings({ "rawtypes", "unchecked" })
		@RequestMapping(value = "/SaveRoleMenu", method = {RequestMethod.GET, RequestMethod.POST})
	  	public @ResponseBody AJaxResVO SaveRoleMenu(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
	  		HttpSession session = SessionManager.getSession(request);
			String loginUserId = (String)session.getAttribute("loginUserId");

	  		AJaxResVO res = new AJaxResVO();

	  		if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

	  		String updateList = request.getParameter("updateList").replaceAll("&quot;", "\"");
	  		ObjectMapper mapper = new ObjectMapper();
	  		int failCnt = 0;
	  		try {
				List<Map> updateData = Arrays.asList(mapper.readValue(updateList, Map[].class));

				for (Map<String,Object> map : updateData) {
					Map<String, Object> data = new HashMap<String, Object>();
					data.put("chk", map.get("CHK"));
					data.put("createRole", map.get("CREATE_ROLE"));
					data.put("updateRole", map.get("UPDATE_ROLE"));
					data.put("deleteRole", map.get("DELETE_ROLE"));
					data.put("roleId", map.get("ROLE_ID"));
					data.put("menuId", map.get("MENU_ID"));
					data.put("loginUserId", loginUserId);
			  		Map<String, Object> result = roleService.saveRoleMenu(data);

			  		res.setSuccess(result.get("SUCC_YN").toString());
			  		res.addAttribute("message", result.get("MSG").toString());

			  		if (!"Y".equals(result.get("SUCC_YN").toString())) {
			  			break;
			  		}
		  		}
			} catch (JsonParseException e) {
			} catch (JsonMappingException e) {
			} catch (IOException e) {
				System.err.println("Error: IOException reading the input file.\n");
				throw new IOException(e);
			}


			}
	  		return res;
	  	}

	  	@SuppressWarnings({ "rawtypes", "unchecked" })
		@RequestMapping(value = "/SaveRoleMenu2", method = {RequestMethod.GET, RequestMethod.POST})
	  	public @ResponseBody AJaxResVO SaveRoleMenu2(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
	  		HttpSession session = SessionManager.getSession(request);
			String loginUserId = (String)session.getAttribute("loginUserId");

	  		AJaxResVO res = new AJaxResVO();

	  		if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

				Map<String, Object> data = Common.setDataParam(request);

				Map<String, Object> result = roleService.saveRoleMenu2(data);

		  		res.setSuccess(result.get("SUCC_YN").toString());
		  		res.addAttribute("message", result.get("MSG").toString());

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
	  		String [] paramSet = {"userId", "userName", "role", "accessIp", "action"};
	  		Map<String, Object> data = Common.setDataParam(request, paramSet);

	  		Map<String, Object> result = roleService.saveUserRole(data);

	  		res.setSuccess(result.get("SUCC_YN").toString());
	  		res.addAttribute("message", result.get("MSG").toString());

			}

	  		return res;
	  	}


	  	@RequestMapping(value = "/DeleteRole", method = {RequestMethod.GET, RequestMethod.POST})
	  	public @ResponseBody AJaxResVO DeleteRole(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

	  		AJaxResVO res = new AJaxResVO();

	  		if(Common.seesionCheck(request)) {

				response.sendError(503);

			}else {

	  		//View Parameter set from Request
	  		Map<String, Object> data = Common.setDataParam(request);

	  		Map<String, Object> result = roleService.deleteRole(data);

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
	  		String [] paramSet = {"userId", "userName", "action"};
	  		Map<String, Object> data = Common.setDataParam(request, paramSet);

	  		Map<String, Object> result = roleService.deleteUserRole(data);

	  		res.setSuccess(result.get("SUCC_YN").toString());
	  		res.addAttribute("message", result.get("MSG").toString());

			}

	  		return res;
	  	}
}
