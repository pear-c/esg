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

import com.portal.admin.service.UserActHstService;
import com.portal.common.*;
import com.portal.community.service.*;

@Controller
@RequestMapping(value = "/Edu")
public class EduController {

	@Autowired
	EduService eduService;

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

	@RequestMapping(value = "/Search", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO Search(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {


		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

		Map<String, Object> data = Common.setDataParam(request);

		List<Map<String,Object>> resultMap = eduService.search(data);

		res.setSuccess(AJaxResVO.SUCCESS_Y);
		res.addAttribute("resultMap", resultMap);
		}
		return res;
	}



	@RequestMapping(value = "/FileUpload", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AJaxResVO FileUpload(@RequestParam(value="uploadFiles", required = true) MultipartFile[] uploadFiles, HttpServletRequest request, HttpServletResponse response) throws IOException {

		AJaxResVO res = new AJaxResVO();

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

		String type = request.getParameter("type");

		for(int i=0;i < uploadFiles.length;i++) {

			if(type.equals("videoUrl")) {
				// PDF | HWP | 오피스 파일만 업로드 가능합니다.
				if(Common.FileExtCheck(uploadFiles[i].getOriginalFilename(), "doc")) {
					res.setSuccess(AJaxResVO.SUCCESS_N);
					res.addAttribute("message", "10077");

					return res;
				}
			}else {
				// JPG | JPEG | PNG 파일만 업로드 가능합니다.
				if(Common.FileExtCheck(uploadFiles[i].getOriginalFilename(), "excel")) {
					res.setSuccess(AJaxResVO.SUCCESS_N);
					res.addAttribute("message", "10078");

					return res;
				}
			}

			// 파일 사이즈가 1G넘어가면 에러발생
			if(uploadFiles[i].getSize() > 1000000000) {
				res.setSuccess(AJaxResVO.SUCCESS_N);
				res.addAttribute("message", "10023");

				return res;
			}
		}

		String savePath = "C:/upload/education";

		String Id = request.getParameter("Id");

		String path = savePath +"/"+ Id +"/"+ type+"/";

		File fileCheck = new File(path);

		if(!fileCheck.isDirectory()) fileCheck.mkdirs();

		String filePath = "";

		for(int i=0;i < uploadFiles.length;i++) {

			Path copyOfLocation = Paths.get(path+"/"+StringUtils.cleanPath(uploadFiles[i].getOriginalFilename()));
			try {
				Files.copy(uploadFiles[i].getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);

				filePath = AesCryptUtil.encrypt(copyOfLocation.toString());

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

		data = Common.specialStringRemove(data);

		Map<String, Object> result = eduService.save(data);

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

		Map<String, Object> result = eduService.delete(data);

		res.setSuccess(result.get("SUCC_YN").toString());
		res.addAttribute("message", result.get("MSG").toString());

		}
		return res;
	}

	@RequestMapping(value = "/FileDown", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String FileDown(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		String result12 = "";

		if(Common.seesionCheck(request)) {

			response.sendError(503);

		}else {

			String FilePath = null;

			Map<String, Object> data = new HashMap<String, Object>();

			data.put("step", "2");
			data.put("id", request.getParameter("id"));

			Map<String, Object> result = eduService.search(data).get(0);

			FilePath = result.get("TRAINING_FILE_URL_PATH").toString();


			InputStream in = null;
			OutputStream os = null;
			File file = null;
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

		int result = eduService.fileDelete(data);

		res.setSuccess("Y");

		}

		return res;
	}

	@RequestMapping(value = "/FilePlay", method = {RequestMethod.GET, RequestMethod.POST})
	public void FilePlay(Locale locale, Model model,HttpServletRequest request, HttpServletResponse response) throws IOException {

		Common.getVideoPlay(request, response, eduService);
	}

}
