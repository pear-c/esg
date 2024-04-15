package com.portal.community.dao;

import java.util.*;



public interface NoticeDao {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public int searchCount(Map<String, Object> data);
	public int searchBannerCount(Map<String, Object> data);	
	
	public Map<String, Object> searchDetail(Map<String, Object> data);
	public List<Map<String, Object>> searchSub(Map<String, Object> data);
	
	public int save(Map<String, Object> data);
	public int delete(Map<String, Object> data);
	public int updateHit(Map<String, Object> data);
	public int fileDelete(Map<String, Object> data);
}
