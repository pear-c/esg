package com.portal.community.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.community.dao.PromotionDao;

@Repository("promotionDao")
public class PromotionDaoImpl  extends EgovAbstractMapper implements PromotionDao{

	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}
	
	@Override
	public int delete(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.delete(data);
	}
	@Override
	public int fileDelete(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.fileDelete(data);
	}
	@Override
	public int save(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.save(data);
	}
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.search(data);
	}
	@Override
	public int searchBannerCount(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.searchBannerCount(data);
	}
	@Override
	public int searchCount(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.searchCount(data);
	}
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.searchDetail(data);
	}
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.searchSub(data);
	}
	@Override
	public int updateHit(Map<String, Object> data) {
		PromotionDao promotionoDao = (PromotionDao)sqlSession.getMapper(PromotionDao.class);
		return promotionoDao.updateHit(data);
	}
}
