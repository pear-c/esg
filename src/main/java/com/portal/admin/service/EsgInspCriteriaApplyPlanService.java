package com.portal.admin.service;

import java.util.*;
import java.util.Map;

/**
 * 점검 기준 적용 방안 관리 Service Interface
 */
public interface EsgInspCriteriaApplyPlanService {
	//조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//저장
	public Map<String, Object> save(Map<String, Object> data);
	//삭제
	public Map<String, Object> delete(Map<String, Object> data);
	//건수 조회
	public int searchCount(Map<String, Object> data);
}
