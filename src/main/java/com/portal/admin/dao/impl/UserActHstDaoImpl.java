package com.portal.admin.dao.impl;

import java.util.*;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.UserActHstDao;

@Repository("userActHstDao")
public class UserActHstDaoImpl extends EgovAbstractMapper implements UserActHstDao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		UserActHstDao userActHstDao = (UserActHstDao) sqlSession.getMapper(UserActHstDao.class);
		return userActHstDao.search(data);
	}

	@Override
	public List<Map<String, Object>> searchUser(Map<String, Object> data) {
		UserActHstDao userActHstDao = (UserActHstDao) sqlSession.getMapper(UserActHstDao.class);
		return userActHstDao.searchUser(data);
	}

	@Override
	public List<Map<String, Object>> searchUserActHst(Map<String, Object> data) {
		UserActHstDao userActHstDao = (UserActHstDao) sqlSession.getMapper(UserActHstDao.class);
		return userActHstDao.searchUserActHst(data);
	}

	@Override
	public Map<String, Object> searchUserRole(Map<String, Object> data) {
		UserActHstDao userActHstDao = (UserActHstDao) sqlSession.getMapper(UserActHstDao.class);
		return userActHstDao.searchUserRole(data);
	}

	@Override
	public int save(Map<String, Object> data) {
		UserActHstDao userActHstDao = (UserActHstDao) sqlSession.getMapper(UserActHstDao.class);
		return userActHstDao.save(data);
	}
}
