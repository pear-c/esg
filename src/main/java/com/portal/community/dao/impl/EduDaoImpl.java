package com.portal.community.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.community.dao.EduDao;

@Repository("eduDao")
public class EduDaoImpl  extends EgovAbstractMapper implements EduDao{

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public int delete(Map<String, Object> data) {
		EduDao eduDao = (EduDao)sqlSession.getMapper(EduDao.class);
		return eduDao.delete(data);
	}

	@Override
	public int fileDelete(Map<String, Object> data) {
		EduDao eduDao = (EduDao)sqlSession.getMapper(EduDao.class);
		return eduDao.fileDelete(data);
	}

	@Override
	public int save(Map<String, Object> data) {
		EduDao eduDao = (EduDao)sqlSession.getMapper(EduDao.class);
		return eduDao.save(data);
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		EduDao eduDao = (EduDao)sqlSession.getMapper(EduDao.class);
		return eduDao.search(data);
	}


}
