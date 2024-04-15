package com.portal.community.dao;

import java.util.*;
import java.util.Map;



public interface FaqDao {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public Map<String, Object> searchDetail(Map<String, Object> data);	
	
	public int count();
}
