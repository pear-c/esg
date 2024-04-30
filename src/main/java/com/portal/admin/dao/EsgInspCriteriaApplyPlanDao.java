package com.portal.admin.dao;

import java.util.*;
import java.util.Map;


/**
 * 점검 기준 적용 방안 관리 DAO Interface
 */
public interface EsgInspCriteriaApplyPlanDao {
	//조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//저장
	public int save(Map<String, Object> data);
	//삭제
	public int delete(Map<String, Object> data);
	//건수 조회
	public Map<String, Object> searchCount(Map<String, Object> data);
}
