package com.portal.community.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.community.dao.FaqDao;

@Repository("faqDao")
public class FaqDaoImpl  extends EgovAbstractMapper implements FaqDao{

	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}
	
	@Override
	public int count() {
		FaqDao faqDao = (FaqDao)sqlSession.getMapper(FaqDao.class);
		return faqDao.count();
	}
	
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		FaqDao faqDao = (FaqDao)sqlSession.getMapper(FaqDao.class);
		return faqDao.search(data);
	}
	
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> data) {
		FaqDao faqDao = (FaqDao)sqlSession.getMapper(FaqDao.class);
		return faqDao.searchDetail(data);
	}
}
