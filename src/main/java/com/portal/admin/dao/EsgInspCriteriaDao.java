package com.portal.admin.dao;

import java.util.*;
import java.util.Map;


/**
 * ESG 점검 기준 관리 DAO Interface
 */
public interface EsgInspCriteriaDao {
	//점검 항목 조회
	public List<Map<String, Object>> searchEsgInspItem(Map<String, Object> data);
	//점검 기준 조회
	public List<Map<String, Object>> searchEsgInspCriteria(Map<String, Object> data);
	//점검 항목 저장
	public int saveEsgInspItem(Map<String, Object> data);
	//점검 기준 저장
	public int saveEsgInspCriteria(Map<String, Object> data);
	//점검 항목 삭제
	public int deleteEsgInspItem(Map<String, Object> data);
	//점검 기준 삭제
	public int deleteEsgInspCriteria(Map<String, Object> data);
	//점검 항목 건수 조회
	public Map<String, Object> searchEsgInspItemCount(Map<String, Object> data);
	//점검 기준 건수 조회
	public Map<String, Object> searchEsgInspCriteriaCount(Map<String, Object> data);
}
