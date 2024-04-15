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
		
		//COMP_CD
		body.put("input", "how can langsmith help with testing?");
		body.put("chat_history", new ArrayList());
		
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(0,new StringHttpMessageConverter());
		String url = "http://localhost:8000/agent/";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		@SuppressWarnings("rawtypes")
		HttpEntity entityParam= new HttpEntity(body, headers);
		JSONObject result = restTemplate.postForObject(url, entityParam, JSONObject.class);
		/*
	       [
				{
				"QUE_ID":71314,
				"QUE_NM":"테스트큐",
				"BOX_ID":2,
				"BOX_VER":112,
				"REG_DT":"2021-03-12T13:19:23.233",
				"COMP_CD":"SYMATION",
				"QUE_GRP":1,
				"OWNER":null
				}
		  ]
		 */
		System.out.println(result.toString());
	}
}
