package com.portal.admin.service;

import java.util.*;
import java.util.Map;



public interface UserActHstService {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public List<Map<String, Object>> searchUser(Map<String, Object> data);
	public List<Map<String, Object>> searchUserActHst(Map<String, Object> data);
	public Map<String, Object> searchUserRole(Map<String, Object> data);
	public int save(Map<String, Object> data);

}
