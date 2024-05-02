package com.portal.common;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.HtmlUtils;

import com.portal.admin.service.UserActHstService;
import com.portal.community.service.EduService;

public class Common {

	public static ModelAndView setModelAndView(String viewName, HttpServletRequest request, Locale locale, Model model) {

		//HttpSession session = SessionManager.getSession(request);

		//세선에 정보가 있는지 확인
		//if(session.getAttribute("userInfo") != null) {


		ModelAndView result = new ModelAndView();

		result.setViewName(viewName);

		return result;
		/*}else {
			//세션에 정보가 없을경우 로그인 화면으로 이동시킨다.
			RedirectView rv = new RedirectView(request.getContextPath()+"/login");
			rv.setExposeModelAttributes(false);

			return new ModelAndView(rv);
		}*/
	}

	public static String getClientIp(HttpServletRequest request) {

		String ip = (null != request.getHeader("X-FORWARDED-FOR")) ? request.getHeader("X-FORWARDED") : request.getRemoteAddr();

		if(ip.equals("0:0:0:0:0:0:0:1")) ip = "127.0.0.1";

		return ip;
	}

	@SuppressWarnings("unchecked")
	public static ModelAndView sessionCheck(HttpServletRequest request, Locale locale, Model model, UserActHstService userActHstService, String menuId) {

		HttpSession session = SessionManager.getSession(request);

		if(session.getAttribute("loginUserId") != null){

			if(menuId == null) {

				menuId = Common.getCookie(request, "menuId");
			}


			ModelAndView result = new ModelAndView();

			String userId = (String)session.getAttribute("loginUserId");
			String loginCmgrpCd = (String)session.getAttribute("loginCmgrpCd");
			
			Map<String, Object> data = new HashMap<String, Object>();

			List<Map<String, Object>> menu = (List<Map<String, Object>>)session.getAttribute("menu");
			Map<String,Object> menuInfo = null;
			try {
				menuInfo =  MapUtil.ListMapSearchMap(menu, "MENU_ID", menuId);
			}catch (NoSuchElementException e) {
				RedirectView rv = new RedirectView(request.getContextPath()+"/");
			    rv.setExposeModelAttributes(false);
			    return new ModelAndView(rv);
			}

		    data.put("loginUserId", userId);
		    data.put("event", menuInfo.get("MENU_NM"));
		    data.put("ip", Common.getClientIp(request));

		    userActHstService.save(data);

		    result.setViewName((String)menuInfo.get("MENU_PATH"));
//		    if(!(((String)menuInfo.get("SOURCE_DIV")) == null)) {
//		    	result.setViewName((String)menuInfo.get("MENU_PATH") + (String)menuInfo.get("SOURCE_DIV"));
//		    }
//		    else {
//		    	result.setViewName((String)menuInfo.get("MENU_PATH"));
//		    }

		    data.put("menuId", menuId);
		    data.put("roleId", session.getAttribute("loginUserRole"));



		    model.addAttribute("createRole", userActHstService.searchUserRole(data).get("CREATE_ROLE"));
		    model.addAttribute("updateRole", userActHstService.searchUserRole(data).get("UPDATE_ROLE"));
		    model.addAttribute("deleteRole", userActHstService.searchUserRole(data).get("DELETE_ROLE"));
		    model.addAttribute("gMenuId", request.getParameter("menuId"));
		    model.addAttribute("menuName", menuInfo.get("MENU_NM"));
		    model.addAttribute("upprMenuName", menuInfo.get("UPPR_MENU_NM"));

			return result;
		}else {
			RedirectView rv = new RedirectView(request.getContextPath()+"/");
		    rv.setExposeModelAttributes(false);
		    return new ModelAndView(rv);
		}


	}

	public static boolean seesionCheck(HttpServletRequest request) {
		boolean result = false;

		HttpSession session = SessionManager.getSession(request);

		if(session.getAttribute("loginUserId") == null){
			result = true;
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public static ModelAndView sessionCheck(HttpServletRequest request, Locale locale, Model model, String menuId, String viewName) {

		HttpSession session = SessionManager.getSession(request);

		if(session.getAttribute("loginUserId") != null){

			ModelAndView result = new ModelAndView();

			String userId = (String)session.getAttribute("loginUserId");

			Map<String, Object> data = new HashMap<String, Object>();

			List<Map<String, Object>> menu = (List<Map<String, Object>>)session.getAttribute("menu");

			Map<String,Object> menuInfo =  MapUtil.ListMapSearchMap(menu, "MENU_ID", menuId);

			result.setViewName(viewName);

			model.addAttribute("menuName", menuInfo.get("MENU_NM"));
			model.addAttribute("upprMenuName", menuInfo.get("UPPR_MENU_NM"));

			return result;
		}else {
			RedirectView rv = new RedirectView(request.getContextPath()+"/");
		    rv.setExposeModelAttributes(false);
		    return new ModelAndView(rv);
		}


	}


	public static @ResponseBody String getJobFileDown( HttpServletRequest request, HttpServletResponse response) {

		InputStream in = null;
		OutputStream os = null;
		File file = null;
		String fileName = "";
		String filePath = "C:/upload/"+request.getParameter("filePath");

		try {

			String name = filePath.substring(filePath.lastIndexOf("/")+1);
			String path = filePath.substring(0, filePath.lastIndexOf("/")+1);

			name = name.replaceAll("/", "");
			name = name.replaceAll("\\\\", "");
			//name = name.replaceAll(".", "");
			name = name.replaceAll("&", "");

			file = new File(path+name);
			if(filePath == null || !file.exists()) {
				return "File Not Found";
			}
			fileName = fileNameEncodeing(file.getName(),request);
			in = new FileInputStream(file);
		}catch (IOException e) {
			System.err.println("Error: IOException reading the input file.\n");
		}

		response.reset();
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Description", "File DownLoad");
		response.setHeader("Content-Disposition", "attachment; filename=\""+fileName+"\"");
		response.setHeader("Content-Transfer-Encoding", "binary");
		response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
		response.setHeader("Content-Length", ""+file.length());

		try {
			os = response.getOutputStream();

			byte b[] = new byte[(int)file.length()];

			int leng = 0;

			if(in != null) {
				while((leng = in.read(b)) > 0) {
					os.write(b,0,leng);
				}

				in.close();
			}

			os.close();
		} catch (IOException e) {
			System.err.println("Error: IOException reading the input file.\n");
		}




		return "1";
	}

	public static @ResponseBody String getJobZipFileDown( HttpServletRequest request, HttpServletResponse response) throws Throwable {

		InputStream in = null;
		OutputStream os = null;
		File file = null;
		String fileName = "";
		String filePath = "C:/upload/bucket/"+request.getParameter("filePath");

		try {

			ZipUtil.compress(filePath, filePath.substring(0, filePath.length() - filePath.split("/")[filePath.split("/").length-1].length()) , filePath.split("/")[filePath.split("/").length-1]);


			String name = filePath.split("/")[filePath.split("/").length-1]+".zip";
			String path = filePath.substring(0,filePath.length() - filePath.split("/")[filePath.split("/").length-1].length());

			name = name.replaceAll("/", "");
			name = name.replaceAll("\\\\", "");
			//name = name.replaceAll(".", "");
			name = name.replaceAll("&", "");

			file = new File(path+name);
			if(filePath == null || !file.exists()) {
				return "File Not Found";
			}
			fileName = fileNameEncodeing(file.getName(),request);
			in = new FileInputStream(file);
		}catch (IOException e) {
			System.err.println("Error: IOException reading the input file.\n");
		}

		response.reset();
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Description", "File DownLoad");
		response.setHeader("Content-Disposition", "attachment; filename=\""+fileName+"\"");
		response.setHeader("Content-Transfer-Encoding", "binary");
		response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
		response.setHeader("Content-Length", ""+file.length());

		try {
			os = response.getOutputStream();

			byte b[] = new byte[(int)file.length()];

			int leng = 0;

			if(in != null) {
				while((leng = in.read(b)) > 0) {
					os.write(b,0,leng);
				}

				in.close();
			}

			os.close();
		} catch (IOException e) {
			System.err.println("Error: IOException reading the input file.\n");
		}




		return "1";
	}


	public static String getVideoPlay( HttpServletRequest request, HttpServletResponse response, EduService eduService) {

		String id = cleanData(request.getParameter("id"));

		Map<String, Object> data = new HashMap<String, Object>();

		data.put("step", 2);
		data.put("id", id);

		Map<String, Object> result = eduService.search(data).get(0);

		String FilePath = (String) result.get("VIDEO_URL");

		File file = null;
		String fileName= null;

		try {
			String name = FilePath.substring(FilePath.lastIndexOf("\\")+1);
			String path = FilePath.substring(0, FilePath.lastIndexOf("\\")+1);

			name = name.replaceAll("/", "");
			name = name.replaceAll("\\\\", "");
			//name = name.replaceAll(".", "");
			name = name.replaceAll("&", "");

			file = new File(path+name);
			if(FilePath == null || !file.exists()) {
				return "0";
			}
			fileName = fileNameEncodeing(file.getName(),request);

			StreamingResponse.stream(FilePath, fileName, request, response);
		}catch (IOException e) {
			System.err.println("Error: IOException reading the input file.\n");
		}


		return null;
	}


    /**
	 * Request에서 Service 호출시 필요로 하는 인자 설정
	 * @param request
	 * @param paramSet
	 * @return
	 */
	public static Map<String, Object> setDataParam(HttpServletRequest request, String [] paramSet) {
		HttpSession session = SessionManager.getSession(request);

		String loginUserId = (String)session.getAttribute("loginUserId");

		Map<String, Object> result = new HashMap<String, Object>();

		for (String str : paramSet) {
			if(!StringUtil.isNull(request.getParameter(str),true)) {
				result.put(str, request.getParameter(str));
			}
		}

		if(!StringUtil.isNull(loginUserId,true)) {
			result.put("loginUserId", loginUserId);
		}


		return result;
	}

	/**
	 * Request에서 Service 호출시 필요로 하는 인자 설정
	 * @param request
	 * @param paramSet
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map<String, Object> setDataParam(HttpServletRequest request) {
		HttpSession session = SessionManager.getSession(request);
		Map<String, Object> result = new HashMap<String, Object>();

		Iterator iter = request.getParameterMap().keySet().iterator();
		String key;
		while(iter.hasNext()) {
			key = iter.next().toString();
			if(!StringUtil.isNull(request.getParameter(key),true)) {

				//나모 웹 에디터에서 태그를 사용하기 때문에 나모 웹 에디터는 태그 제거 제외
				if(key.equals("contents")) {
					result.put(key, HtmlUtils.htmlUnescape(request.getParameter(key)));
				}else {
					result.put(key, CommonUtils.removeTag(HtmlUtils.htmlUnescape(request.getParameter(key))));
				}
			}
		}



		if(session.getAttribute("loginUserId") != null) {
			String loginUserId = (String)session.getAttribute("loginUserId");
			if(!StringUtil.isNull(loginUserId,true)) {
				result.put("loginUserId", loginUserId);
			}
		}

		if(session.getAttribute("loginUserRole") != null) {
			String loginUserRole = (String)session.getAttribute("loginUserRole");
			if(!StringUtil.isNull(loginUserRole,true)) {
				result.put("loginUserRole", loginUserRole);
			}
		}
		
		if(session.getAttribute("loginCmgrpCd") != null) {
			String loginCmgrpCd = (String)session.getAttribute("loginCmgrpCd");
			if(!StringUtil.isNull(loginCmgrpCd, true)){
				result.put("loginCmgrpCd", loginCmgrpCd);
			}
		}

		return result;
	}

	public static Map<String, Object> filePathDecrypt(Map<String, Object> data){

		Map<String, Object> result = data;

		Iterator<String> keys = result.keySet().iterator();

		while(keys.hasNext()) {
			String key = keys.next();
			if(key.contains("attachFileUrl") ||
			   key.contains("bannerImgPath") ||
			   key.contains("pdd") ||
			   key.contains("templateFile") ||
			   key.contains("ideaFileUrl") ||
			   key.contains("trainingFileUrl") ||
			   key.contains("videoUrl")
			) {
				String value = AesCryptUtil.decrypt(result.get(key).toString());

				result.put(key, value);
			}
		}
		return result;
	}

	public static Map<String, Object> specialStringRemove(Map<String, Object> data){

		Map<String, Object> result = data;

		Iterator<String> keys = result.keySet().iterator();

		while(keys.hasNext()) {
			String key = keys.next();
			String value = result.get(key).toString();
			if(value.contains(",")
			) {
				String changeValue = value.replaceAll(",", " ");

				result.put(key, changeValue);
			}
		}
		return result;
	}


	/**
	 * js의 encodeURIComponent 함수 자바로 구현
	 * @param String
	 * @return String
	 */
	public static String encodeURIComponent(String data) {
		String result = null;

		try {
			result = URLEncoder.encode(data,"UTF-8")
							   .replaceAll("\\+", "%20")
							   .replaceAll("\\%21", "!")
							   .replaceAll("\\%27", "'")
							   .replaceAll("\\%28", "(")
							   .replaceAll("\\%29", ")")
							   .replaceAll("\\%7E", "~");
		}catch (UnsupportedEncodingException e) {
			result = data;
		}

		return result;
	}


	/**
	 * 플랫폼에 의한 인코딩 문제
	 * @param String
	 * @return String
	 * @throws UnsupportedEncodingException
	 */
	public static String fileNameEncodeing(String fileName, HttpServletRequest request) throws UnsupportedEncodingException {
		String result = fileName;

		String header = request.getHeader("User-Agent");

		if(header.contains("Edge")) {
			result = URLEncoder.encode(result, "UTF-8").replaceAll("\\+", "%20");
		}else if (header.contains("MSIE") || header.contains("Trident")) {
			result = URLEncoder.encode(result, "UTF-8").replaceAll("\\+", "%20");
		}else if(header.contains("Chrome")) {
			result = new String(result.getBytes("UTF-8"),"ISO-8859-1");
		}

		return result;
	}

	private  static String cleanData(String data) {
          data=data.replaceAll("[\\r\\n]","");
          return data;
	}

	public static boolean FileExtCheck(String fileName, String extGubun) {

		String[] PERMISSION_FILE_EXT_ARR= null;

		if(extGubun.equals("doc")){
			PERMISSION_FILE_EXT_ARR = new String[]{"pdf","hwp","ppt","pptx","xls","xlsx","doc","docx","mp3","mp4","m4v","avi","wmv","mwa","asf","mpg","mpeg","mkv","mov"};
		}else if(extGubun.equals("image")){
			PERMISSION_FILE_EXT_ARR = new String[]{"jpg","jpeg","png"};
		}else if(extGubun.equals("excel")){
			PERMISSION_FILE_EXT_ARR = new String[]{"xls","xlsx","zip","xml","hwp"};

		}else {
			PERMISSION_FILE_EXT_ARR = new String[]{"mp4","mp3","mov"};
		}

		String ext = fileName.split("\\.")[fileName.split("\\.").length-1].toLowerCase();

		for(int i =0; i<PERMISSION_FILE_EXT_ARR.length;i++) {
			if(PERMISSION_FILE_EXT_ARR[i].equals(ext)) {
				return false;
			}
		}
		return true;

	}

	public static String getCookie(HttpServletRequest request, String key) {
		Cookie[] cookies = request.getCookies();

		if(cookies != null) {
			for(Cookie c : cookies) {
				String name = c.getName();
				String value = c.getValue();
				if(name.equals(key)) {
					return value;
				}
			}

			return "";
		}else {
			return "";
		}
	}

	public static int ObjectToInt(Object obj) {
		if(obj != null) {
			return Integer.parseInt(obj.toString());
		}else {
			return 0;
		}
	}

	public static int ListMapToCsv(List<Map<String,Object>> map, String path){

		try {
			String rowData = "";
			System.out.println("userSelectData.size()::"+map.size());

			Collection rowDataHeader = map.get(0).keySet(); //1. 0번째 key
			Iterator<String> rowDataKeyHeader = rowDataHeader.iterator(); //

			while( rowDataKeyHeader.hasNext()){ //header
				String headerKeys = rowDataKeyHeader.next();
				if(rowDataKeyHeader.hasNext() == true){ //다음값이 있을경우 true 반환 아닐시 false.
					rowData += headerKeys +",";
				}else{
					rowData += headerKeys +"\r\n";
				}
			}

			for(int i=0; i< map.size(); i++) {
				Collection rowData_k = map.get(i).keySet(); //1. 0번째 key
				Collection rowData_v = map.get(i).values(); // value

				Iterator<String> rowDataKeys = rowData_k.iterator(); //
				Iterator<String> rowDataValues = rowData_v.iterator(); //



				while(rowDataKeys.hasNext()){
					String rowData_keys = rowDataKeys.next();
					String rowData_val = String.valueOf(rowDataValues.next());
					System.out.println("rowData_keys::::"+rowData_keys+"  rowData_val:"+rowData_val); // java.lang.ArrayIndexOutOfBoundsException발생
					if(rowDataKeys.hasNext() == rowDataKeys.hasNext()){ // header의 key값과 일치할때!
						if(rowDataKeys.hasNext() ==true){
							rowData += rowData_val +",";
						}else{
							rowData += rowData_val +"\r\n";
						}

					}

				}
			}


			BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), "euc-kr"));

			writer.write(rowData);
	        writer.close();

	        return 0;
		}catch (Exception e) {
			return 500;
		}

	}

	public static List<List<String>> readCSVFile(String filePath) {

	    //List<List<String>> list = new ArrayList<List<String>>();
		List<List<String>> list = new ArrayList<List<String>>();
	    BufferedReader bufferedReader = null;

	    try {
	      bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath),"euc-kr"));
	      String line = "";

	      while ((line = bufferedReader.readLine()) != null) {

	        List<String> stringList = new ArrayList<>();
	        String stringArray[] = line.split(",");

	        stringList = Arrays.asList(stringArray);
	        list.add(stringList);
	      }
	    } catch (IOException e) {
	      e.printStackTrace();
	    } finally {
	      try {
	        assert bufferedReader != null;
	        bufferedReader.close();
	      } catch (IOException e) {
	        e.printStackTrace();
	      }
	    }

	    return list;
	  }

}
