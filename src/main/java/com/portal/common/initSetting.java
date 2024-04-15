package com.portal.common;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.*;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portal.admin.dao.CodeDao;
//import com.portal.admin.dao.ProcessRegiDao;
import com.portal.admin.dao.UserActHstDao;
import com.portal.main.service.MainService;

@Controller
public class initSetting {

	@Autowired
	UserActHstDao userActHstDao;

	@Autowired
	CodeDao codeDao;

//	@Autowired
//	ProcessRegiDao processRegiDao;

	@Autowired
	MainService mainService;


	@RequestMapping(value = "/initSetting", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchDetail(Locale locale, Model model, HttpServletRequest request) {

		AJaxResVO res = new AJaxResVO();
		List<Map<String, Object>> result = null;

		String eventId = request.getParameter("eventId");

		String eventSetting = request.getParameter("eventSetting").replaceAll("&quot;", "\"");;

		if(eventId.equals("USER")) {

			Map<String, Object> data = new HashMap<String, Object>();

			result = userActHstDao.searchUser(data);
		}
//		else if(eventId.equals("PROCESS")) {
//			Map<String, Object> data = new HashMap<String, Object>();
//
//			data.put("serverId", request.getParameter("serverId"));
//
//			result = processRegiDao.search(data);
//
//		}
		else {

			String eventCode = request.getParameter("eventCode").replaceAll("&quot;", "\"");;

			Map<String, Object> data = new HashMap<String, Object>();
			data.put("upprCode", eventCode);
			data.put("useYn", "Y");


			result = codeDao.searchCode(data);

		}


		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("result", result);
		res.addAttribute("eventId", eventId);
		res.addAttribute("eventSetting", eventSetting);

		return res;
	}

	@RequestMapping(value = "/userInfoSetting", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO UserInfoSetting(Locale locale, Model model, HttpServletRequest request) {

		AJaxResVO res = new AJaxResVO();

		Map<String, Object> data = new HashMap<String, Object>();

		if(!StringUtil.isNull(request.getParameter("userName"),true)) {
			data.put("userName", request.getParameter("userName"));
		}

		if(!StringUtil.isNull(request.getParameter("deptName"),true)) {
			data.put("deptName", request.getParameter("deptName"));
		}

		if(!StringUtil.isNull(request.getParameter("userId"),true)) {
			data.put("userId", request.getParameter("userId"));
		}

		List<Map<String, Object>> result = mainService.searchUserInfo(data);

		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("result", result);

		return res;
	}

	@RequestMapping(value="/optionSetting", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO optionSetting(Locale locale, Model model, HttpServletRequest request) {

		AJaxResVO res = new AJaxResVO();

		Map<String, Object> data = Common.setDataParam(request);

		List<Map<String, Object>> code = codeDao.searchCodeBind(data);

		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("code", code);

		return res;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/searchCodeData", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO searchCodeData(Locale locale, Model model, HttpServletRequest request) {

		AJaxResVO res = new AJaxResVO();
		String list = request.getParameter("upprCodeList").replaceAll("&quot;", "\"");
		ObjectMapper mapper = new ObjectMapper();
		List<Map<String, Object>> resultMap = new ArrayList<Map<String, Object>>();

		try {
			List<Map> listData = Arrays.asList(mapper.readValue(list, Map[].class));

			for (Map<String,Object> map : listData) {
				Map<String, Object> data = new HashMap<String, Object>(map);
				data.put("codeData", codeDao.searchCodeBind(data));
				resultMap.add(data);
			}

			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		} catch (JsonParseException e) {
		} catch (JsonMappingException e) {
		} catch (IOException e) {
			System.err.println("Error: IOException reading the input file.\n");
		}

		return res;
	}

	@RequestMapping(value = "/SessionAlive", method = {RequestMethod.GET ,RequestMethod.POST } )
	public @ResponseBody AJaxResVO SessionAlive(Locale locale, Model model, HttpServletRequest request) {

		AJaxResVO res = new AJaxResVO();

		res.setSuccess(AJaxResVO.SUCCESS_Y);

		return res;
	}

	@RequestMapping(value = "/QuillFileUpload", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO QuillFileUpload(@RequestParam(value="uploadFiles", required = true) MultipartFile[] uploadFiles, HttpServletRequest request, HttpServletResponse response) throws IOException{

		AJaxResVO res = new AJaxResVO();
		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

		Map<String, Object> data = Common.setDataParam(request);

		String savePath = "C:/upload/quill";

		String path = savePath+"/"+data.get("loginUserId");

		File fileCheck = new File(path);

		if(!fileCheck.isDirectory()) fileCheck.mkdirs();

		ArrayList<String> filePath = new ArrayList<String>();

		for(int i=0;i < uploadFiles.length;i++) {

			Path copyOfLocation = Paths.get(path+"/"+StringUtils.cleanPath(uploadFiles[i].getOriginalFilename()));
			try {
				Files.copy(uploadFiles[i].getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);

				filePath.add(copyOfLocation.getFileName().toString());

			}catch (IOException e) {
				res.setSuccess(AJaxResVO.SUCCESS_N);
				return res;
			}

		}

		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("filesPath", filePath);

		}

		return res;
	}

	@ResponseBody
	@GetMapping(value = "/display")
	public ResponseEntity<byte[]> showImageGET(@RequestParam("fileName") String fileName,HttpServletRequest request) {

		Map<String, Object> data = Common.setDataParam(request);

		File file = new File("C:/upload/quill/"+data.get("loginUserId")+"/"+fileName);

		ResponseEntity<byte[]> result = null;

		try {

			HttpHeaders header = new HttpHeaders();

			/*
			 * Files.probeContentType() 해당 파일의 Content 타입을 인식(image, text/plain ...) 없으면
			 * null 반환
			 *
			 * file.toPath() -> file 객체를 Path객체로 변환
			 *
			 */
			header.add("Content-type", Files.probeContentType(file.toPath()));

			result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);

		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}

}
