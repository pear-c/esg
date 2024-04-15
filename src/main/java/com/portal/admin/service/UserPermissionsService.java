package com.portal.admin.service;

import java.util.*;
import java.util.Map;



public interface UserPermissionsService {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public List<Map<String, Object>> searchRole(Map<String, Object> data);
	public Map<String, Object> saveUserRole(Map<String, Object> data);
	public Map<String, Object> deleteUserRole(Map<String, Object> data);
	/*
	 * public List<Map<String, Object>> searchRole(Map<String, Object> data); public
	 * List<Map<String, Object>> searchRoleMenu(Map<String, Object> data); public
	 * List<Map<String, Object>> searchUserPriv(); public Map<String, Object>
	 * saveRole(Map<String, Object> data); public Map<String, Object>
	 * saveRoleMenu(Map<String, Object> data); public Map<String, Object>
	 * saveUserRole(Map<String, Object> data); public Map<String, Object>
	 * deleteUserRole(Map<String, Object> data); public Map<String, Object>
	 * deleteRole(Map<String, Object> data);
	 */
}
