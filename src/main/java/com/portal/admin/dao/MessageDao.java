package com.portal.admin.dao;

import java.util.*;
import java.util.Map;



public interface MessageDao {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public int save(Map<String, Object> data);
	public int delete(Map<String, Object> data);
}
