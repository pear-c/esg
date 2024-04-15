package com.portal.common;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


public class DrmUtil {

	//static SLDsFile sFile;

	public DrmUtil() {
		/*sFile = new SLDsFile();

		// 세팅값 불러오기
		sFile.SettingPathForProperty(DrmUtil.class.getClassLoader().getResource("config/softcamp.properties").getPath());

		// 서비스링커를 사용하기 위한 초기화 작업 함수
		sFile.SLDsInitDAC();

		// 보안문서의 헤더의 보안정책에 사용자를 추가하는 함수
		//	    키 구분 	  읽기 권한		 수정 권한		   복호화 권한		  외부전송권한		 프린트권한		 마킹유무			자동파기		 	권한변경
		// 1:그룹 0:개인  1:권한O 0:권한X  1:권한O 0:권한X	 1:권한O 0:권한X	1:권한O 0:권한X  1:권한O 0:권한X	  1:마킹O 0:마킹X	 1:자동파기 0:영향X	  1:변경O 0:변경X
		sFile.SLDsAddUserDAC("SECURITYDOMAIN", "111001100", 0, 0, 0);*/
	}

	public static int Encryption(String srcFile, String dstFile ) {

		//int ret = sFile.SLDsEncFileDACV2(DrmUtil.class.getClassLoader().getResource("/key/keyDAC_SVR0.sc").getPath(), "System", srcFile, dstFile, 1);
		//System.out.println("SLDsEncFileDAC :" + ret);

		return 0;
	}

	public static int Encryption2(String srcFile) {

		/*String fileName = srcFile.split("\\\\")[srcFile.split("\\\\").length-1];

		fileName = srcFile.split(fileName)[0]+fileName.split("\\.")[0]+"_DEC"+"."+fileName.split("\\.")[1];

		int ret = sFile.SLDsEncFileDACV2(DrmUtil.class.getClassLoader().getResource("/key/keyDAC_SVR0.sc").getPath(), "System", srcFile, fileName, 1);
		System.out.println("SLDsEncFileDAC :" + ret);

		if(ret == 0) {
			try {
				Files.move(Paths.get(fileName), Paths.get(srcFile), StandardCopyOption.REPLACE_EXISTING);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		 */
		return 0;
	}

	public static int Decryption(String srcFile, String dstFile ) {

		/*SLDsFile sFile = new SLDsFile();
		SLBsUtil slBsUtil = new SLBsUtil();
		// 세팅값 불러오기
		sFile.SettingPathForProperty(DrmUtil.class.getClassLoader().getResource("config/softcamp.properties").getPath());

		if(slBsUtil.isEncryptFile(srcFile) != 1) return 0;

		int retVal = sFile.CreateDecryptFileDAC (
				DrmUtil.class.getClassLoader().getResource("/key/keyDAC_SVR0.sc").getPath(),
				"SECURITYDOMAIN",
				srcFile,
				dstFile);

		System.out.println( " CreateDecryptFileDAC [" + retVal + "]");
		 */
		return 0;
	}

	public static int Decryption2(String srcFile) {

		/*SLBsUtil slBsUtil = new SLBsUtil();

		if(slBsUtil.isEncryptFile(srcFile) != 1) return 0;

		String[] spChars = {"\\(","\\)","\\{","\\}","\\[","\\]"};

		String  srcFileTemp = srcFile;

		for(int i=0;i<spChars.length;i++) {
			srcFileTemp = srcFileTemp.replaceAll(spChars[i], "");
		}

		String fileName = srcFileTemp.split("\\\\")[srcFileTemp.split("\\\\").length-1];

		fileName = srcFileTemp.split(fileName)[0]+fileName.split("\\.")[0]+"_DEC"+"."+fileName.split("\\.")[1];
		int  retVal = sFile.CreateDecryptFileDAC (
				DrmUtil.class.getClassLoader().getResource("/key/keyDAC_SVR0.sc").getPath(),
				"SECURITYDOMAIN",
				srcFile,
				fileName);

		System.out.println( " CreateDecryptFileDAC [" + retVal + "]");

		if(retVal == 0) {
			try {
				Files.move(Paths.get(fileName), Paths.get(srcFile), StandardCopyOption.REPLACE_EXISTING);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		 */
		return 0;
	}

}
