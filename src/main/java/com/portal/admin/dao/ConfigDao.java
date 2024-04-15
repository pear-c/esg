package com.portal.admin.dao;

import java.util.*;
import java.util.Map;



public interface ConfigDao {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public List<Map<String, Object>> searchCnt();
	public List<Map<String, Object>> searchConfig(Map<String, Object> data);

	public List<Map<String, Object>> dbConn(Map<String, Object> data);

	public List<Map<String, Object>> JobInfo(Map<String, Object> data);


	int save(Map<String, Object> data);

	int JobInsert(Map<String, Object> data);

}
