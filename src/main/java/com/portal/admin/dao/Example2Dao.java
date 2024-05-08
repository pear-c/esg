package com.portal.admin.dao;

import java.util.*;
import java.util.Map;


/**
 * ??? 관리 DAO Interface
 */
public interface Example2Dao {
	//조회
	public List<Map<String, Object>> search(Map<String, Object> data);
	//저장
	public int save(Map<String, Object> data);
	//삭제
	public int delete(Map<String, Object> data);
}
