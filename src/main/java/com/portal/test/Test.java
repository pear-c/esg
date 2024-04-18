package com.portal.test;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;

import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import com.portal.common.HttpUtil;

public class Test {
	/*
	 * public static void main(String[] args) { try { String name =
	 * InetAddress.getLocalHost().getCanonicalHostName(); System.out.println(name);
	 * } catch (UnknownHostException e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } }
	 */
	
	public static void main(String[] args) {
		
		JSONObject body = new JSONObject();
		JSONObject input = new JSONObject();
		input.put("topic", "부산에 대해서 알려줘");
		//COMP_CD
		body.put("input", input);
		
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(0,new StringHttpMessageConverter());
//		String url = "http://localhost:8000/prompt/stream";
		String url = "http://localhost:8000/prompt/invoke";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		@SuppressWarnings("rawtypes")
		HttpEntity entityParam= new HttpEntity(body, headers);
		
		JSONObject result = restTemplate.postForObject(url, entityParam, JSONObject.class);
		System.out.println(result.toString());
	}
}
