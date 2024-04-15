package com.portal.common;

import java.io.File;

public class FileUtil {

	public static void fileDelete(String folderPath) {
		
		File[] files = new File(folderPath).listFiles();
		
		for(File f : files) {
			if(f.isDirectory()) {
							
				File[] deleteFolderList = f.listFiles();
				
				if(deleteFolderList.length == 0) {
					f.delete();				
				}else {
					for(File f2 : deleteFolderList) {
						if(f2.isDirectory()) {
							fileDelete(f2.getAbsolutePath());
						}else {
							f2.delete();
						}
						deleteFolderList = f.listFiles();
						
						if(deleteFolderList.length == 0) {
							f.delete();				
						}						
					}		
				}	
				
			}else {
				f.delete();
			}
		}
		
		if(new File(folderPath).isDirectory()) {		
			files = new File(folderPath).listFiles();			
			if(files.length == 0) {
				new File(folderPath).delete();
			}
		}
	}
}
