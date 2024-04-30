package com.portal.admin.service;

import java.util.*;
import java.util.Map;

/**
 * 점검 기준 관리 Service Interface
 */
public interface EsgInspCriteriaService {
	//점검 기준 조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//점검 기준 저장
	public Map<String, Object> save(Map<String, Object> data);
	//점검 기준 삭제
	public Map<String, Object> delete(Map<String, Object> data);
	//점검 기준 건수 조회
	public int searchCount(Map<String, Object> data);
}
