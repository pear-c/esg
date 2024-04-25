package com.portal.admin.service;

import java.util.List;
import java.util.Map;


/**
 * ESG 항목 관리 Service Interface
 */
public interface EsgInspItemService {
	//메세지 조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//메세지 저장
	public Map<String, Object> save(Map<String, Object> data);
	//메세지 삭제
	public Map<String, Object> delete(Map<String, Object> data);
}
