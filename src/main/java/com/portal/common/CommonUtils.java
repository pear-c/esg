package com.portal.common;
import java.util.*;
public class CommonUtils {
	public static String getRandomString(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	public static String removeTag(String html){
		if(html == null) return "";

		return html.replace("<", "").replace(">", "");
//		return html.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>","");
	}

	public static Boolean IsOperationServer(String url){

		if( url.contentEquals("https://luidiaxps15-pc") ) {

			return true;
		}else {
			return false;

		}
	}

	public static String LicenseState(Object state) {
		String result = "미사용";

		if(state != null) {

			try{

	            if(state instanceof Integer) {

					switch ((Integer)state) {
						case 0 :
							result = "신청중";
						break;
						case 1 :
							result = "사용중";
						break;
						case 2 :
							result = "만료";
						break;
						case 3 :
							result = "반려";
						break;
						case 4:
							result = "반납";
						break;
						default:
							result = "에러발생";
						break;
					}

	            }
			}catch (Exception e) {
				e.printStackTrace();
			}
		}

		return result;
	}

}
