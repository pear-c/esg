package com.portal.common;

import java.util.Map;

import org.json.simple.JSONObject;

public class JsonUtil {
	/**
	 * @param Map<String, Object>
	 * @apiNote Map<String, Object>를 JSONObject로 변환처리.
	 * @return JSONObject
	 * **/
	public JSONObject convertMapToJson(Map<String, Object> map) {
	    
	    JSONObject json = new JSONObject();
	    String key = "";
	    Object value = null;
	    for(Map.Entry<String, Object> entry : map.entrySet()) {
	        key = entry.getKey();
	        value = entry.getValue();
	        json.put(key, value);
	    }
	    return json;
	}

}
