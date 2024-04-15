package com.portal.admin.service;

import java.util.*;
import java.util.Map;

public interface CodeService {
	public List<Map<String, Object>> searchUpperCode(Map<String, Object> data);
	public List<Map<String, Object>> searchCode(Map<String, Object> data);
	public Map<String, Object> saveUpperCode(Map<String, Object> data);
	public Map<String, Object> saveCode(Map<String, Object> data);
	public Map<String, Object> deleteUpperCode(Map<String, Object> data);
	public Map<String, Object> deleteCode(Map<String, Object> data);

	public int searchUpperCodeCount(Map<String, Object> data);
	public int searchCodeCount(Map<String, Object> data);
	
	public int updateVal1(Map<String, Object> data);
}
