package com.portal.community.service;

import java.util.*;



public interface EduService {
	public List<Map<String, Object>> search(Map<String, Object> data);

	public Map<String, Object> save(Map<String, Object> data);

	public Map<String, Object> delete(Map<String, Object> data);

	public int fileDelete(Map<String, Object> data);
}
