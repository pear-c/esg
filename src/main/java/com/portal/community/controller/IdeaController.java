package com.portal.community.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.*;
import org.springframework.web.servlet.view.RedirectView;

import com.portal.admin.service.UserActHstService;
import com.portal.common.*;
import com.portal.community.service.*;

@Controller
@RequestMapping(value = "/Idea")
public class IdeaController {
	
	@Autowired
	IdeaService	ideaService;
				
	@Autowired
	UserActHstService userActHstService;
	
	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {
								
		String menuId = request.getParameter("menuId");
		
		if(request.getParameter("searchId") != null) {		
			model.addAttribute("searchId", request.getParameter("searchId"));		
		}

		return Common.sessionCheck(request,locale,model,userActHstService,menuId);
	}	
	
	@RequestMapping(value = "/ideaLink", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView ideaLink(Locale locale, Model model, HttpServletRequest request) {
					
		HttpSession session = SessionManager.getSession(request);
		
		if(session.getAttribute("loginUserId") != null){
									
			ModelAndView result = new ModelAndView();
			
		    result.setViewName("/community/IdeaLink");
		    
			return result;
		}else {
			RedirectView rv = new RedirectView(request.getContextPath()+"/");
		    rv.setExposeModelAttributes(false);		    
		    return new ModelAndView(rv);			
		}		
	}
	
	@RequestMapping(value = "/Search", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Search(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
			
		AJaxResVO res = new AJaxResVO();	
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
			
			Map<String, Object> data = Common.setDataParam(request);
			
			List<Map<String,Object>> resultMap = ideaService.search(data);
			
			int totlaCount = ideaService.searchCount(data);
					
			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
			res.addAttribute("resultMapCount", totlaCount);	
		
		}
		
		return res;
	}
	
	@RequestMapping(value = "/SearchDetail", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SerachDetail(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {	
		
			Map<String, Object> data = Common.setDataParam(request);
			
			Map<String,Object> resultMap = ideaService.searchDetail(data);
							
			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		
		return res;
	}
	
	@RequestMapping(value = "/SearchSub", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchSub(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
			Map<String, Object> data = Common.setDataParam(request);
			
			List<Map<String,Object>> resultMap = ideaService.searchSub(data);
			
			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		return res;
	}
	
	@RequestMapping(value = "/SearchReply", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchReply(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
			Map<String, Object> data = Common.setDataParam(request);
			
			List<Map<String,Object>> resultMap = ideaService.searchReply(data);
			
			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		return res;
	}
	
	@RequestMapping(value = "/SearchDeptCnt", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SearchDeptCnt(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
			List<Map<String,Object>> resultMap = ideaService.searchDeptCnt();
			
			res.setSuccess(AJaxResVO.SUCCESS_Y);
			res.addAttribute("resultMap", resultMap);
		}
		return res;
	}
	
	@RequestMapping(value = "/FileUpload", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO FileUpload(@RequestParam(value="uploadFiles", required = true) MultipartFile[] uploadFiles, HttpServletRequest request, HttpServletResponse response) throws IOException{
						
		AJaxResVO res = new AJaxResVO();
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
						
		String type = request.getParameter("type");	
		
		for(int i=0;i < uploadFiles.length;i++) {
			
			// PDF | HWP | 오피스 파일만 업로드 가능합니다.
			if(Common.FileExtCheck(uploadFiles[i].getOriginalFilename(), "doc")) {
				res.setSuccess(AJaxResVO.SUCCESS_N);
				res.addAttribute("message", "10077");
				
				return res;
			}
			
			
			// 파일 사이즈가 1G넘어가면 에러발생			
			if(uploadFiles[i].getSize() > 1000000000) {
				res.setSuccess(AJaxResVO.SUCCESS_N);
				res.addAttribute("message", "10023");
				
				return res;
			}
		}
		
		String savePath = "C:/upload/";
		
		
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
		
		Date date = new Date(System.currentTimeMillis());
		
		String Id = request.getParameter("Id")+"/";
		
		String path = savePath+type+"/"+Id;
		
		String datePath = simpleDateFormat.format(date);
		
		datePath = datePath.replaceAll("/", "");
		datePath = datePath.replaceAll("\\\\", "");
		//datePath = datePath.replaceAll(".", "");
		datePath = datePath.replaceAll("&", "");
		
		File fileCheck = new File(path+datePath);
				
		if(!fileCheck.isDirectory()) fileCheck.mkdirs();
			
		ArrayList<String> filePath = new ArrayList<String>();
		
		for(int i=0;i < uploadFiles.length;i++) {
			
			Path copyOfLocation = Paths.get(path+datePath+"/"+StringUtils.cleanPath(uploadFiles[i].getOriginalFilename()));
			try {
				Files.copy(uploadFiles[i].getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);
				
				filePath.add(AesCryptUtil.encrypt(copyOfLocation.toString()));
				
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
	
	@RequestMapping(value = "/Save", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Save(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();		
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
			Map<String, Object> data = Common.setDataParam(request);
			
			data = Common.filePathDecrypt(data);
			
			Map<String, Object> result = ideaService.save(data);
			
			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());	
			
		}
		
		return res;
		
	}
	
	@RequestMapping(value = "/SaveReply", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO SaveReply(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();		
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
			Map<String, Object> data = Common.setDataParam(request);
						
			Map<String, Object> result = ideaService.saveReply(data);
			
			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());	
			
		}
		
		return res;
		
	}
	
	@RequestMapping(value = "/Delete", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Delete(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();	
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
		
			Map<String, Object> data = Common.setDataParam(request);
			
			Map<String, Object> result = ideaService.delete(data);
			
			res.setSuccess(result.get("SUCC_YN").toString());
			res.addAttribute("message", result.get("MSG").toString());	
		}
		return res;
	}
	
	@RequestMapping(value = "/UpdateReply", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO UpdateReply(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();		
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {	
		
			Map<String, Object> data = Common.setDataParam(request);
						
			ideaService.updateReply(data);
		
		}
		
		res.setSuccess(AJaxResVO.SUCCESS_Y);
		
		return res;
	}
	
	@RequestMapping(value = "/DeleteReply", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO DeleteReply(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();		
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {	
		
			Map<String, Object> data = Common.setDataParam(request);
							
			ideaService.deleteReply(data);		
		}
		
		res.setSuccess(AJaxResVO.SUCCESS_Y);
		
		return res;
	}
	
	@RequestMapping(value = "/FileDown", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String FileDown(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		String result12 = "";
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {					
			String FilePath = null;
			
			Map<String, Object> data = Common.setDataParam(request);
			
			if(data.get("templete") != null) {
				
				if("1".equals(data.get("templete"))) {				
					FilePath = "C:\\upload\\idea\\templete\\아이디어제안.hwp";				
				}else {
					FilePath = "C:\\upload\\idea\\templete\\아이디어제안 양식.hwp";	
				}
			}else {
										
				Map<String, Object> result = ideaService.searchDetail(data);
				
				FilePath = (String) result.get("IDEA_FILE_URL");
			
			}
			
							
			InputStream in = null;
			OutputStream os = null;
			File file = null;
			String client = "";
			String fileName = "";
			
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
				fileName = Common.fileNameEncodeing(file.getName(),request);
				in = new FileInputStream(file);
			}catch (IOException e) {
				System.err.println("Error: IOException reading the input file.\n");
			}
			
			client = request.getHeader("User-Agent");
			
			response.reset();
			response.setContentType("application/octet-stream");
			String contentDescription = "File DownLoad";			
			response.setHeader("Content-Description", contentDescription);	
			response.setHeader("Content-Disposition", "attachment; filename=\""+fileName+"\"");
			String contentTransfetEncoding = "binary";			
			response.setHeader("Content-Transfer-Encoding", contentTransfetEncoding);
			String contentType = "application/octet-stream; charset=utf-8";
			response.setHeader("Content-Type", contentType);
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
		}
		return result12;
	}
	
	@RequestMapping(value = "/FileDelete", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO FileDelete(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		AJaxResVO res = new AJaxResVO();		
		
		if(Common.seesionCheck(request)) {
			
			response.sendError(503);			
		
		}else {		
		
		Map<String, Object> data = Common.setDataParam(request);
						
		int result = ideaService.fileDelete(data);
		
		res.setSuccess("Y");	
		
		}
		
		return res;
	}
	 
}