package com.portal.admin.dao;

import java.util.*;
import java.util.Map;



public interface UserPermissionsDao {
	public List<Map<String, Object>> search(Map<String, Object> data);
	public List<Map<String, Object>> searchRole(Map<String, Object> data);
	public int saveUserRole(Map<String, Object> data);

	public Map<String, Object> searchUserCount(Map<String, Object> data);
	public int deleteUserRole(Map<String, Object> data);

	/*
	 * public List<Map<String, Object>> searchRole(Map<String, Object> data); public
	 * List<Map<String, Object>> searchRoleMenu(Map<String, Object> data); public
	 * List<Map<String, Object>> searchUserPriv(); public int
	 * saveRoleMenu(Map<String, Object> data); public int saveRole(Map<String,
	 * Object> data); public int saveUserRole(Map<String, Object> data); public int
	 * deleteUserRole(Map<String, Object> data); public int deleteRole(Map<String,
	 * Object> data);
	 *
	 * public Map<String, Object> searchRoleCount(Map<String, Object> data); public
	 * Map<String, Object> searchUserCount(Map<String, Object> data);
	 */
}
