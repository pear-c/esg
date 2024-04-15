package com.portal.community.service;

import java.util.*;



public interface FaqService {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public Map<String, Object> searchDetail(Map<String, Object> data);	
	
	public int count();
}
