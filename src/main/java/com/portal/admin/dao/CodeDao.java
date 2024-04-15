package com.portal.admin.dao;

import java.util.*;
import java.util.Map;



public interface CodeDao {
	public List<Map<String, Object>> searchUpperCode(Map<String, Object> data);
	public List<Map<String, Object>> searchCode(Map<String, Object> data);
	public List<Map<String, Object>> searchCodeBind(Map<String, Object> data);
	public int saveUpperCode(Map<String, Object> data);
	public int saveCode(Map<String, Object> data);
	public int deleteUpperCode(Map<String, Object> data);
	public int deleteUpperCode2(Map<String, Object> data);
	public int deleteCode(Map<String, Object> data);

	public Map<String, Object> searchUpperCodeCount(Map<String, Object> data);
	public Map<String, Object> searchCodeCount(Map<String, Object> data);
	public Map<String, Object> searchCodeCount2(Map<String, Object> data);
	
	public int updateVal1(Map<String, Object> data);
}
