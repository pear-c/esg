package com.portal.community.service;

import java.util.*;



public interface QnaService {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public int searchCount(Map<String, Object> data);
	public int searchReplyCount(Map<String, Object> data);
	
	
	public Map<String, Object> searchDetail(Map<String, Object> data);
	public List<Map<String, Object>> searchSub(Map<String, Object> data);
	public List<Map<String, Object>> searchReply(Map<String, Object> data);		
	
	public Map<String, Object> save(Map<String, Object> data);
	public Map<String, Object> saveReply(Map<String, Object> data);
	public Map<String, Object> searchReplyDetail(Map<String, Object> data);
	
	
	public Map<String, Object> delete(Map<String, Object> data);
	
	public int fileDelete(Map<String, Object> data);
	
	public Map<String, Object> updateReply(Map<String, Object> data);
	public Map<String, Object> deleteReply(Map<String, Object> data);
}
