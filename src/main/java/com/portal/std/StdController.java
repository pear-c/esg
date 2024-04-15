package com.portal.std;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.portal.common.AJaxResVO;
import com.portal.common.DrmUtil;
import com.portal.common.FileUtil;
import com.portal.common.ZipUtil;

@Controller
@RequestMapping("/Std")
public class StdController {

	@RequestMapping(value = "/", method = {RequestMethod.GET ,RequestMethod.POST } )
	public ModelAndView Login(Locale locale, Model model, HttpServletRequest request) {
					
		ModelAndView result = new ModelAndView();
		
		result.setViewName("/std/std");
		return result;
	}
	
	@RequestMapping(value = "/DrmDec", method = {RequestMethod.POST } )
	public  @ResponseBody AJaxResVO DrmDec(MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws Throwable {
			
		String fileName = file.getOriginalFilename();
		String uploadFilePath = "c:/upload/std";
		File target = new File(uploadFilePath,fileName);
		
		if(!new File(uploadFilePath).exists()) {
			new File(uploadFilePath).mkdirs();
		}
		
		try
		{
			FileCopyUtils.copy(file.getBytes(), target);	
			
			String ext = target.getName().substring(target.getName().lastIndexOf(".")+1).toUpperCase();
			
			if("ZIP".equals(ext)) {
				if(ZipUtil.unZip(target.getAbsolutePath(), true)) {
					String zipPath = target.getAbsolutePath().replace(".zip", "").replace(".ZIP", "");
					
					ZipUtil.compress(zipPath,target.getParentFile()+"\\",target.getName());
					
					FileUtil.fileDelete(zipPath);
				}
			}else {			
				DrmUtil.Decryption2(target.getAbsolutePath());				
			}
			
			OutputStream os = null;
			InputStream in = null;
			
			in = new FileInputStream(target);
			
			response.reset();
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Description", "File DownLoad");	
			response.setHeader("Content-Disposition", "attachment; filename="+URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20"));
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
			response.setHeader("Content-Length", ""+target.length());
			
			try {
				os = response.getOutputStream();
				
				byte b[] = new byte[(int)target.length()];
				
				int leng = 0;
				
				if(in != null) {			
					while((leng = in.read(b)) > 0) {
						os.write(b,0,leng);
					}		
					
					in.close();
				}			
				
				os.close();
				
				if(target.exists()) target.delete();
				
			} catch (IOException e) {
				System.err.println("Error: IOException reading the input file.\n");
			}
		}catch (IOException e) {
			e.printStackTrace();
		}
		
		AJaxResVO res = new AJaxResVO();	
		
		return res;
	}
	
	//@Scheduled(cron = "0/10 * * * * *")
	public void testSchedule() {
		System.out.println("test schedule...");
	}
}
