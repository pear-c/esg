package com.portal.common;

public class StringUtil {

	
	public static boolean isNull(String str) {
		return isNull(str, false);
	}
	
	public static boolean isNull(String str, boolean withTrim) {
		boolean result = (str == null) ? true : false;
		
		if(!result && withTrim) {
			result = (str.trim().length() == 0) ? true : false;
		}
		return result;
	}
	
	public static String toString(Object obj, String defaultStr) {
		return toString(obj, defaultStr, false);
	}
	
	public static String toString(Object obj, String defaultStr, boolean withTrim) {
		String retVal = "";
		if(obj == null) {
			retVal = defaultStr;
		}else {
			if(obj instanceof String) {
				retVal = (String) obj;
			}else {
				retVal = obj.toString();
			}
		}
	
		if(withTrim) {
			retVal = retVal.trim();
		}
		
		return retVal;
	}
	
	public static String lpad(String str, int length, String padChar) {
		if(isNull(str)) {
			str = "";
		}
		
		StringBuilder sb = new StringBuilder();
		int padLen = length - str.length();
		for(int i=0; i< padLen; i++) {
			sb.append(padChar);
		}
		sb.append(str);
		
		return sb.toString();
		
	}
	
	public static String lpad(Number num, int length, String padChar) {
		String str = "";
		if(num != null) {
			str = lpad(num.toString(), length, padChar);
		}
		
		return str;
		
	}
	
	public static String rpad(String str, int length, String padChar) {
		if(isNull(str)) {
			str = "";
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append(str);
		int padLen = length - str.length();
		for(int i=0; i< padLen; i++) {
			sb.append(padChar);
		}
		
		return sb.toString();
		
	}
	
	public static String rpad(Number num, int length, String padChar) {
		String str = "";
		if(num != null) {
			str = rpad(num.toString(), length, padChar);
		}
		
		return str;
		
	}
}
