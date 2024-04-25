package com.portal.admin.service;

import java.util.*;
import java.util.Map;

/**
 * 점검 기준 관리 Service Interface
 */
public interface EsgInspCriteriaService {
	//점검 항목 조회
	public List<Map<String, Object>> searchEsgInspItem(Map<String, Object> data);
	//점검 기준 조회
	public List<Map<String, Object>> searchEsgInspCriteria(Map<String, Object> data);
	//점검 항목 저장
	public Map<String, Object> saveEsgInspItem(Map<String, Object> data);
	//점검 기준 저장
	public Map<String, Object> saveEsgInspCriteria(Map<String, Object> data);
	//점검 항목 삭제
	public Map<String, Object> deleteEsgInspItem(Map<String, Object> data);
	//점검 기준 삭제
	public Map<String, Object> deleteEsgInspCriteria(Map<String, Object> data);
	//점검 항목 건수 조회
	public int searchEsgInspItemCount(Map<String, Object> data);
	//점검 기준 건수 조회
	public int searchEsgInspCriteriaCount(Map<String, Object> data);
}
