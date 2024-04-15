package com.portal.admin.service;

import java.util.*;
import java.util.Map;



public interface FaqMgmService {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public Map<String, Object> save(Map<String, Object> data);
	public Map<String, Object> delete(Map<String, Object> data);
}
