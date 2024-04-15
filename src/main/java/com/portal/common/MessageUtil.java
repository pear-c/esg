package com.portal.common;

import java.util.HashMap;
import java.util.*;
import java.util.Map;

import javax.servlet.http.HttpSession;

public class MessageUtil {

	private static MessageUtil instance;

	private static Map<String,Object> messages;

	private MessageUtil() {	}

	public static synchronized MessageUtil getInstance() {

		if(instance == null) {
			instance = new MessageUtil();
		}

		return instance;
	}

	/**
	 * 메세지 저장 함수
	 * @param msgId
	 * @return String
	 */
	public static Map<String,Object> setMessage(List<Map<String, Object>> listMap, String key, String value) {

		Map<String, Object> map = new HashMap<String, Object>();

		for(int  i =0; i< listMap.size(); i++) {
			Map<String, Object> tempMap = listMap.get(i);

			map.put(tempMap.get(key).toString(), tempMap.get(value));
		}

		messages = map;

		return messages;
	}


	/**
	 * 메세지 ID를 통해서 메세지를 리턴 하는 함수
	 * @param msgId
	 * @return String
	 */
	public static String getMessage(String msgId) {
		String message = "["+msgId+"] ";

		if (null == msgId)
			return "";

		if(messages == null)
			return message;

		if(messages.get(msgId) == null)
			return message;

		message += (String) messages.get(msgId);

		return message;
	}

	public static Map<String,Object> getMapMessage(){
		return messages;
	}

}
