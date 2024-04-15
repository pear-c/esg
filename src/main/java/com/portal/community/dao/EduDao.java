package com.portal.community.dao;

import java.util.*;



public interface EduDao {

	public List<Map<String, Object>> search(Map<String, Object> data);

	public int save(Map<String, Object> data);
	public int delete(Map<String, Object> data);
	public int fileDelete(Map<String, Object> data);
}
