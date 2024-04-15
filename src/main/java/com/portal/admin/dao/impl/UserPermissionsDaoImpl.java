package com.portal.admin.dao.impl;

import java.util.*;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.UserPermissionsDao;

@Repository("userPermissionsDao")
public class UserPermissionsDaoImpl extends EgovAbstractMapper implements UserPermissionsDao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public int deleteUserRole(Map<String, Object> data) {
		UserPermissionsDao userPermissionsDao = (UserPermissionsDao) sqlSession.getMapper(UserPermissionsDao.class);
		return userPermissionsDao.deleteUserRole(data);
	}

	@Override
	public int saveUserRole(Map<String, Object> data) {
		UserPermissionsDao userPermissionsDao = (UserPermissionsDao) sqlSession.getMapper(UserPermissionsDao.class);
		return userPermissionsDao.saveUserRole(data);
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		UserPermissionsDao userPermissionsDao = (UserPermissionsDao) sqlSession.getMapper(UserPermissionsDao.class);
		return userPermissionsDao.search(data);
	}

	@Override
	public List<Map<String, Object>> searchRole(Map<String, Object> data) {
		UserPermissionsDao userPermissionsDao = (UserPermissionsDao) sqlSession.getMapper(UserPermissionsDao.class);
		return userPermissionsDao.searchRole(data);
	}

	@Override
	public Map<String, Object> searchUserCount(Map<String, Object> data) {
		UserPermissionsDao userPermissionsDao = (UserPermissionsDao) sqlSession.getMapper(UserPermissionsDao.class);
		return userPermissionsDao.searchUserCount(data);
	}

}
