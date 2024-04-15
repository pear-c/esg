package com.portal.common;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

public class AJaxResVO implements Serializable {

	private static final long serialVersionUID = 1546950804264681014L;
	public static final String SUCCESS_Y = "Y";
	public static final String SUCCESS_N = "N";
	
	private String success = "Y";
	
	private String result = "0";
	
	private Map<String,Object> resData = new LinkedHashMap<String, Object>();
	
	public Map<String,Object> addAttribute(String name, Object value){
		if(name != null && name != "") {
			resData.put(name, value);
		}
		return resData;
	}

	public String getSuccess() {
		return success;
	}

	public void setSuccess(String success) {
		this.success = success;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public Map<String, Object> getResData() {
		return resData;
	}

	public void setResData(Map<String, Object> resData) {
		this.resData = resData;
	}	
}
