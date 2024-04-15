package com.portal.common;

import java.io.IOException;
import java.util.*;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.function.Predicate;

import org.json.simple.JSONObject;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MapUtil {

	public static Map<String,Object> ListMapSearchMap(List<Map<String,Object>> listMap, final String key, final String value) throws NoSuchElementException{
		
		List<Map<String, Object>> menu = listMap;
	    
	    Map<String, Object> map = menu.stream().filter(new Predicate<Map<String, Object>>() {
			@Override
			public boolean test(Map<String, Object> x) {
				return x.get(key).equals(value);
			}
		}).findAny().get();
	    
	    
		return map;
	}
	
	public static Map<String,Object> ListMapSearchMap2(List<Map<String,Object>> listMap, final String key, final String value) throws NoSuchElementException{
		
		List<Map<String, Object>> menu = listMap;
		Map<String, Object> map = null;
	    
		try {
		    map = menu.stream().filter(new Predicate<Map<String, Object>>() {
				@Override
				public boolean test(Map<String, Object> x) {
					return x.get(key).equals(value);
				}
			}).findAny().get();
		}catch (NoSuchElementException e) {
			map = null;
		}
	    
	    
		return map;
	}
	
	/**
	 * @param JSONObject
	 * @apiNote JSONObject를 Map<String, String> 형식으로 변환처리.
	 * @return Map<String,String>
	 * **/
	public static Map<String, Object> getMapFromJsonObject(JSONObject jsonObj){
	    Map<String, Object> map = null;
	    
	    try {
	       map = new ObjectMapper().readValue(jsonObj.toString(), Map.class);
	    } catch (JsonParseException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (JsonMappingException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (IOException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }
	    return map;
	}
}
