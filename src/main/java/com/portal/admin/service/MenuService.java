package com.portal.admin.service;

import java.util.*;
import java.util.Map;



public interface MenuService {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public Map<String, Object> save(Map<String, Object> data);
	public Map<String, Object> delete(Map<String, Object> data);
	public Map<String, Object> deleteDetail(Map<String, Object> data);
}
