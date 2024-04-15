package com.portal.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class ZipUtil {
	/**
	 * * @description 압축 메소드 *
	 * 
	 * @param path           압축할 폴더 경로 *
	 * @param outputFileName 출력파일명
	 */
	public static boolean compress(String path, String outputPath, String outputFileName) throws Throwable {
		// 파일 압축 성공 여부
		boolean isChk = false;
		File file = new File(path);
		// 파일의 .zip이 없는 경우, .zip 을 붙여준다.
		int pos = outputFileName.lastIndexOf(".") == -1 ? outputFileName.length() : outputFileName.lastIndexOf(".");
		// outputFileName .zip이 없는 경우
		if (!outputFileName.substring(pos).equalsIgnoreCase(".zip")) {
			outputFileName += ".zip";
		} // 압축 경로 체크
		if (!file.exists()) {
			throw new Exception("Not File!");
		}
		// 출력 스트림
		FileOutputStream fos = null;
		// 압축 스트림
		ZipOutputStream zos = null;
		try {
			fos = new FileOutputStream(new File(outputPath + outputFileName));
			zos = new ZipOutputStream(fos);
			// 디렉토리 검색를 통한 하위 파일과 폴더 검색
			searchDirectory(file, file.getPath(), zos);
			// 압축 성공.
			isChk = true;
		} catch (Throwable e) {
			throw e;
		} finally {
			if (zos != null)
				zos.close();
			if (fos != null)
				fos.close();
		}
		return isChk;
	}

	/**
	 * * @description 디렉토리 탐색 *
	 * 
	 * @param file 현재 파일 *
	 * @param root 루트 경로 *
	 * @param zos  압축 스트림
	 */
	private static void searchDirectory(File file, String root, ZipOutputStream zos) throws Exception {
		// 지정된 파일이 디렉토리인지 파일인지 검색
		if (file.isDirectory()) {
			// 디렉토리일 경우 재탐색(재귀)
			File[] files = file.listFiles();
			for (File f : files) {
				searchDirectory(f, root, zos);
			}
		} else {
			// 파일일 경우 압축을 한다.
			try {
				compressZip(file, root, zos);
			} catch (Throwable e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	/**
	 * * @description압축 메소드 *
	 * 
	 * @param file *
	 * @param root *
	 * @param zos  *
	 * @throws Throwable
	 */
	private static void compressZip(File file, String root, ZipOutputStream zos) throws Throwable {
		FileInputStream fis = null;
		try {
			String zipName = file.getPath().replace(root + "\\", "");
			// 파일을 읽어드림
			fis = new FileInputStream(file);
			// Zip엔트리 생성(한글 깨짐 버그)
			ZipEntry zipentry = new ZipEntry(zipName);
			// 스트림에 밀어넣기(자동 오픈)
			zos.putNextEntry(zipentry);
			int length = (int) file.length();
			byte[] buffer = new byte[length];
			// 스트림 읽어드리기
			fis.read(buffer, 0, length);
			// 스트림 작성
			zos.write(buffer, 0, length);
			// 스트림 닫기
			zos.closeEntry();
		} catch (Throwable e) {
			throw e;
		} finally {
			if (fis != null)
				fis.close();
		}
	}
	
	public static boolean unZip(String zipPath) {
		
		// 파일 정상적으로 압축이 해제확인
		boolean isChk = false;
			
		
		// zip파일
		File zipFile = new File(zipPath);
		
		FileInputStream fis = null;
		ZipInputStream zis = null;
		ZipEntry zipentry = null;
		
		try {
			
			String zipFilePath = zipFile.getAbsolutePath().replace(".zip", "").replace(".ZIP", "");
			
			fis = new FileInputStream(zipFile);
			
			// Zip 파일 스트림
			zis = new ZipInputStream(fis, Charset.forName("EUC-KR"));
			
			// 압축되어 있는 ZIP 파일의 목록 조회
			while((zipentry = zis.getNextEntry()) != null) {
				String fileName = zipentry.getName();
				
				File file = new File(zipFilePath,fileName);
				
				// entiry가 폴더면 폴더 생성
				if(zipentry.isDirectory()) {
					file.mkdirs();
				}else {
					try {
						createFile(file,zis);
					}catch (Throwable e) {
						e.printStackTrace();
					}
				}
			}
			isChk  = true;
		}catch (Exception e) {
			isChk = false;
		}finally {
			if(zis != null) {
				try {
					zis.close();
				}catch (IOException e) {
				}
			}
			
			if(fis != null) {
				try {
					fis.close();
				}catch (IOException e) {
				}
			}
		}
		
		return isChk;
	}
	
	public static boolean unZip(String zipPath, boolean drmUse) {
		
		// 파일 정상적으로 압축이 해제확인
		boolean isChk = false;
			
		
		// zip파일
		File zipFile = new File(zipPath);
		
		FileInputStream fis = null;
		ZipInputStream zis = null;
		ZipEntry zipentry = null;
		
		try {
			
			String zipFilePath = zipFile.getAbsolutePath().replace(".zip", "").replace(".ZIP", "");
			
			fis = new FileInputStream(zipFile);
			
			// Zip 파일 스트림
			zis = new ZipInputStream(fis, Charset.forName("EUC-KR"));
			
			// 압축되어 있는 ZIP 파일의 목록 조회
			while((zipentry = zis.getNextEntry()) != null) {
				String fileName = zipentry.getName();
				
				File file = new File(zipFilePath,fileName);
				
				// entiry가 폴더면 폴더 생성
				if(zipentry.isDirectory()) {
					file.mkdirs();
				}else {
					try {
						createFile(file,zis);
						
						if(drmUse == true) {
							DrmUtil.Decryption2(file.getAbsolutePath());
						}
					}catch (Throwable e) {
						e.printStackTrace();
					}
				}
			}
			isChk  = true;
		}catch (Exception e) {
			isChk = false;
		}finally {
			if(zis != null) {
				try {
					zis.close();
				}catch (IOException e) {
				}
			}
			
			if(fis != null) {
				try {
					fis.close();
				}catch (IOException e) {
				}
			}
		}
		
		return isChk;
	}
	
	private static void createFile(File file, ZipInputStream zis) throws Throwable {
		
		// 디렉토리 확인
		File parentDir = new File(file.getParent());
		// 디렉토리가 없으면 생성
		if(!parentDir.exists()) {
			parentDir.mkdirs();
		}
		
		FileOutputStream fos = null;
		// 파일 스트림 생성
		try {
			fos = new FileOutputStream(file);
			byte[] buffer = new byte[256];
			int size = 0;
			// zip스트림으로부터 byte 뽑아내기
			while((size = zis.read(buffer)) > 0) {
				// byte로 파일 만들기
				fos.write(buffer,0,size);
			}			
		}catch (Throwable e) {
			throw e;
		}finally {
			if(fos != null) {
				try {
					fos.close();
				}catch (IOException e) {
					// TODO: handle exception
				}
			}
		}
		
		
	}

}
