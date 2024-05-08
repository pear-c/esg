package com.portal.admin.dao;

import java.util.*;
import java.util.Map;


/**
 * 아랑아렁 관리 DAO Interface
 */
public interface ExampleDao {
	//메세지 조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//메세지 저장
	public int save(Map<String, Object> data);
	//메세지 삭제
	public int delete(Map<String, Object> data);
}
