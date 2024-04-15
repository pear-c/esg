package com.portal.community.service;

import java.util.*;



public interface PromotionService {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public int searchCount(Map<String, Object> data);
	public int searchBannerCount(Map<String, Object> data);	
	
	public Map<String, Object> searchDetail(Map<String, Object> data);
	public List<Map<String, Object>> searchSub(Map<String, Object> data);
		
	public Map<String, Object> save(Map<String, Object> data);
	
	public Map<String, Object> delete(Map<String, Object> data);
	
	public int fileDelete(Map<String, Object> data);
}
