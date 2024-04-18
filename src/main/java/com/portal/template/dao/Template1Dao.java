package com.portal.template.dao;

import java.util.*;
import java.util.Map;


/**
 * 코드 관리 DAO Interface
 */
public interface Template1Dao {
	//상위 코드 조회
	public List<Map<String, Object>> searchUpperCode(Map<String, Object> data);
	//코드 조회
	public List<Map<String, Object>> searchCode(Map<String, Object> data);
	//코드 매핑
	public List<Map<String, Object>> searchCodeBind(Map<String, Object> data);
	//상위 코드 저장
	public int saveUpperCode(Map<String, Object> data);
	//코드 저장
	public int saveCode(Map<String, Object> data);
	//상위 코드 삭제
	public int deleteUpperCode(Map<String, Object> data);
	//상위 코드 삭제2
	public int deleteUpperCode2(Map<String, Object> data);
	//코드 삭제
	public int deleteCode(Map<String, Object> data);
	//상위 코드 건수 조회
	public Map<String, Object> searchUpperCodeCount(Map<String, Object> data);
	//코드 건수 조회
	public Map<String, Object> searchCodeCount(Map<String, Object> data);
	//코드 건수 조회2
	public Map<String, Object> searchCodeCount2(Map<String, Object> data);
	//Val1 수정
	public int updateVal1(Map<String, Object> data);
}
