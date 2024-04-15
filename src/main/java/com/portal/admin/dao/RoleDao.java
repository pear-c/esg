package com.portal.admin.dao;

import java.util.*;
import java.util.Map;



public interface RoleDao {
	public List<Map<String, Object>> searchRole(Map<String, Object> data);
	public List<Map<String, Object>> searchRoleMenu(Map<String, Object> data);
	public List<Map<String, Object>> searchUserPriv();
	public List<Map<String, Object>> searchLoginMenu();

	public int saveRoleMenu(Map<String, Object> data);
	public int saveRoleMenu2(Map<String, Object> data);
	public int saveRole(Map<String, Object> data);
	public int saveUserRole(Map<String, Object> data);
	public int deleteUserRole(Map<String, Object> data);
	public int deleteRole(Map<String, Object> data);

	public Map<String, Object> searchRoleCount(Map<String, Object> data);
	public Map<String, Object> searchUserCount(Map<String, Object> data);
}
