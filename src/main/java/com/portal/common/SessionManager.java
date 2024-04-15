package com.portal.common;

import java.util.HashMap;
import java.util.*;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionManager{

	/**
	 * request에서 session을 획득한다.
	 * request에 session이 없을 경우 새로운 session을 생성한다.
	 * 
	 * @param request 리퀘스트
	 * @return Session 세션
	 */
	public static HttpSession getSession(HttpServletRequest request) {
		return getSession(request, true);
	}
	
	/**
	 * request에서 session을 획득한다.
	 * request에 session이 없을 경우, create가 true이면 새로운 세션을 작성
	 *  
	 * @param request 리퀘스트
	 * @param create 리퀘스트에 세션이 없을 경우, 새로운 세션 생성 유무(true:생성, flase:미생성)
	 * @return Session 세션
	 */
	public static HttpSession getSession(HttpServletRequest request, boolean create) {
		if(request != null) {
			return request.getSession(create);
		}
		return null;
	}
	
	/**
	 * request의 session에 Attribute를 설정한다.
	 * 
	 * @param request 리퀘스트
	 * @param sesKey 세션에 저장할 키
	 * @param sesVal 세션에 저장할 값
	 */
	public static void setAttribute(HttpServletRequest request, String sesKey, Object sesVal) {
		HttpSession session = getSession(request);
		if(session != null && sesKey != null) {
			session.setAttribute(sesKey, sesVal);
		}
		
	}
	
	/**
	 * request의 session에 String형으로 저장한 Attribute를 취득한다.
	 * 
	 * @param request 리퀘스트
	 * @param sesKey 세션에 저장할 키
	 */
	public static String getStringAttr(HttpServletRequest request, String sesKey) {
		HttpSession session = getSession(request);
		if(session != null && sesKey != null) {
			return (String) session.getAttribute(sesKey);
		}
		return null;
	}
	
	/**
	 * request의 session에 저장된 모든 Attribute값을 삭제한다.
	 * 
	 * @param request 리퀘스트
	 */
	public static void sessionClear(HttpServletRequest request) {
		HttpSession session = getSession(request);
		if(session != null) {
			session.invalidate();
		}
	}
	
	public static void sessionSave(HttpServletRequest request, String sessionKey,List<Map<String, Object>> listMap, String key, String value ) {
		
		HttpSession session = getSession(request);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		for(int  i =0; i< listMap.size(); i++) {
			Map<String, Object> tempMap = listMap.get(i);
			
			map.put(tempMap.get(key).toString(), tempMap.get(value));
		}
		
		session.setAttribute(sessionKey, map);
		
	}
	
	//public static void 
	
}
