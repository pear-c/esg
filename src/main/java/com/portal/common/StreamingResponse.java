package com.portal.common;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class StreamingResponse {

	public static String stream(String filePath ,String fileName, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException, IOException {
		String[] filename_seperate = fileName.split("\\.");
		String exp;
		if(filename_seperate.length <= 1) {
			throw new RuntimeException("Wrong file name. You Need to include expand file name");
		}else {
			exp = filename_seperate[1];
			
			File file = new File(filePath);
			if(!file.exists()) throw new FileNotFoundException();
			
			RandomAccessFile randomFile = new RandomAccessFile(file, "r");
			long rangeStart = 0;
			long rangeEnd = 0;
			boolean isPart = false;
			
			try {
				long movieSize = randomFile.length();
				
				String range = request.getHeader("range");
				
				if(range != null) {
					
					if(range.endsWith("-")) {
						range = range+(movieSize -1 );
					}
					int idxm = range.trim().indexOf("-");
					rangeStart = Long.parseLong(range.substring(6,idxm));
					rangeEnd = Long.parseLong(range.substring(idxm+1));
					if(rangeStart > 0) {
						isPart = true;
					}
				}else {
					rangeStart = 0;
					rangeEnd = movieSize -1;
				}
				
				long partSize = rangeEnd - rangeStart +1;
				
				response.reset();
				
				response.setStatus(isPart ? 206 : 200);
				
				response.setContentType("video/mp4");
				
				response.setHeader("Content-Range", "bytes "+rangeStart+"-"+rangeEnd+"/"+movieSize);
				response.setHeader("Accept-Ranges", "bytes");
				response.setHeader("Content-Length", ""+partSize);
				
				OutputStream out = response.getOutputStream();
				
				randomFile.seek(rangeStart);
				
				int bufferSize = 8*1024;
				byte[] buf = new byte[bufferSize];
				do {
					int block = partSize > bufferSize ? bufferSize : (int)partSize;
					int len = randomFile.read(buf, 0, block);
					out.write(buf,0,len);
					partSize -= block;
				}while(partSize > 0);
			}catch (IOException e) {
				
			}finally {
				randomFile.close();
			}
			return null;
		}
	}
}
