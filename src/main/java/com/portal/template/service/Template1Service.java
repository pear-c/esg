package com.portal.template.service;

import java.util.*;
import java.util.Map;

/**
 * 코드 관리 Service Interface
 */
public interface Template1Service {
	//상위 코드 조회
	public List<Map<String, Object>> searchUpperCode(Map<String, Object> data);
	//코드 조회
	public List<Map<String, Object>> searchCode(Map<String, Object> data);
	//상위 코드 저장
	public Map<String, Object> saveUpperCode(Map<String, Object> data);
	//코드 저장
	public Map<String, Object> saveCode(Map<String, Object> data);
	//상위 코드 삭제
	public Map<String, Object> deleteUpperCode(Map<String, Object> data);
	//코드 삭제
	public Map<String, Object> deleteCode(Map<String, Object> data);
	//상위 코드 건수 조회
	public int searchUpperCodeCount(Map<String, Object> data);
	//코드 건수 조회
	public int searchCodeCount(Map<String, Object> data);
	//Val1 수정
	public int updateVal1(Map<String, Object> data);
}
