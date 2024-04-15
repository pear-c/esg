package com.portal.admin.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.RoleDao;

@Repository("roleDao")
public class RoleDaoImpl extends EgovAbstractMapper implements RoleDao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public int deleteRole(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.deleteRole(data);
	}

	@Override
	public int deleteUserRole(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.deleteUserRole(data);
	}

	@Override
	public int saveRole(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.saveRole(data);
	}

	@Override
	public int saveRoleMenu(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.saveRoleMenu(data);
	}

	@Override
	public int saveRoleMenu2(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.saveRoleMenu2(data);
	}

	@Override
	public int saveUserRole(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.saveUserRole(data);
	}

	@Override
	public List<Map<String, Object>> searchRole(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.searchRole(data);
	}

	@Override
	public Map<String, Object> searchRoleCount(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.searchRoleCount(data);
	}

	@Override
	public List<Map<String, Object>> searchRoleMenu(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.searchRoleMenu(data);
	}

	@Override
	public Map<String, Object> searchUserCount(Map<String, Object> data) {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.searchUserCount(data);
	}

	@Override
	public List<Map<String, Object>> searchUserPriv() {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.searchUserPriv();
	}

	@Override
	public List<Map<String, Object>> searchLoginMenu() {
		RoleDao  roleDao = (RoleDao)sqlSession.getMapper(RoleDao.class);
		return roleDao.searchLoginMenu();
	}
}
