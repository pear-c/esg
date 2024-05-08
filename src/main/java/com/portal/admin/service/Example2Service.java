package com.portal.admin.service;

import java.util.List;
import java.util.Map;


/**
 * ??? 관리 Service Interface
 */
public interface Example2Service {
	//조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//저장
	public Map<String, Object> save(Map<String, Object> data);
	//삭제
	public Map<String, Object> delete(Map<String, Object> data);
}
