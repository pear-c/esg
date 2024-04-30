package com.portal.admin.dao;

import java.util.*;
import java.util.Map;


/**
 * ESG 점검 기준 관리 DAO Interface
 */
public interface EsgInspCriteriaDao {
	//점검 기준 조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//점검 기준 저장
	public int save(Map<String, Object> data);
	//점검 기준 삭제
	public int delete(Map<String, Object> data);
	//점검 기준 건수 조회
	public Map<String, Object> searchCount(Map<String, Object> data);
}
