package com.portal.template.service;

import java.util.List;
import java.util.Map;


/**
 * 메세지 관리 Service Interface
 */
public interface Template2Service {
	//메세지 조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//메세지 저장
	public Map<String, Object> save(Map<String, Object> data);
	//메세지 삭제
	public Map<String, Object> delete(Map<String, Object> data);
}
