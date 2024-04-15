package com.portal.admin.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.ConfigDao;

@Repository("configDao")
public class ConfigDaoImpl extends EgovAbstractMapper implements ConfigDao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public List<Map<String, Object>> dbConn(Map<String, Object> data) {
		ConfigDao configDao = (ConfigDao) sqlSession.getMapper(ConfigDao.class);
		return configDao.dbConn(data);
	}

	@Override
	public List<Map<String, Object>> JobInfo(Map<String, Object> data) {
		ConfigDao configDao = (ConfigDao) sqlSession.getMapper(ConfigDao.class);
		return configDao.JobInfo(data);
	}

	@Override
	public int save(Map<String, Object> data) {
		ConfigDao configDao = (ConfigDao) sqlSession.getMapper(ConfigDao.class);
		return configDao.save(data);
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		ConfigDao configDao = (ConfigDao) sqlSession.getMapper(ConfigDao.class);
		return configDao.search(data);
	}

	@Override
	public List<Map<String, Object>> searchCnt() {
		ConfigDao configDao = (ConfigDao) sqlSession.getMapper(ConfigDao.class);
		return configDao.searchCnt();
	}

	@Override
	public List<Map<String, Object>> searchConfig(Map<String, Object> data) {
		ConfigDao configDao = (ConfigDao) sqlSession.getMapper(ConfigDao.class);
		return configDao.searchConfig(data);
	}

	@Override
	public int JobInsert(Map<String, Object> data) {
		ConfigDao configDao = (ConfigDao) sqlSession.getMapper(ConfigDao.class);
		return configDao.JobInsert(data);
	}
}
