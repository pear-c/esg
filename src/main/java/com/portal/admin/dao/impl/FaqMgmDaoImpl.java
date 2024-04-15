package com.portal.admin.dao.impl;

import java.util.*;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.FaqMgmDao;

@Repository("faqMgmDao")
public class FaqMgmDaoImpl extends EgovAbstractMapper implements FaqMgmDao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public int delete(Map<String, Object> data) {
		FaqMgmDao faqMgmDao = (FaqMgmDao) sqlSession.getMapper(FaqMgmDao.class);
		return faqMgmDao.delete(data);
	}

	@Override
	public int save(Map<String, Object> data) {
		FaqMgmDao faqMgmDao = (FaqMgmDao) sqlSession.getMapper(FaqMgmDao.class);
		return faqMgmDao.save(data);
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		FaqMgmDao faqMgmDao = (FaqMgmDao) sqlSession.getMapper(FaqMgmDao.class);
		return faqMgmDao.search(data);
	}

}
