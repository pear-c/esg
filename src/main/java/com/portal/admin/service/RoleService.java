package com.portal.admin.service;

import java.util.*;
import java.util.Map;



public interface RoleService {
	public List<Map<String, Object>> searchRole(Map<String, Object> data);
	public List<Map<String, Object>> searchRoleMenu(Map<String, Object> data);
	public List<Map<String, Object>> searchUserPriv();
	public List<Map<String, Object>> searchLoginMenu();

	public Map<String, Object> saveRole(Map<String, Object> data);
	public Map<String, Object> saveRoleMenu(Map<String, Object> data);
	public Map<String, Object> saveRoleMenu2(Map<String, Object> data);
	public Map<String, Object> saveUserRole(Map<String, Object> data);
	public Map<String, Object> deleteUserRole(Map<String, Object> data);
	public Map<String, Object> deleteRole(Map<String, Object> data);
}
