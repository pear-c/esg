package com.portal.admin.dao;

import java.util.*;
import java.util.Map;



public interface MenuDao {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public int save(Map<String, Object> data);
	public int delete(Map<String, Object> data);
	public int deleteDetail(Map<String, Object> data);
	public Map<String, Object> searchMenuCount(Map<String, Object> data);
}
