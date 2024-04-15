package com.portal.community.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.community.dao.IdeaDao;

@Repository("ideaDao")
public class IdeaDaoImpl  extends EgovAbstractMapper implements IdeaDao{

	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}
	
	@Override
	public int delete(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.delete(data);
	}
	
	@Override
	public int fileDelete(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.fileDelete(data);
	}
	
	@Override
	public int save(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.save(data);
	}
	
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.search(data);
	}
	
	@Override
	public int searchBannerCount(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.searchBannerCount(data);
	}
	
	@Override
	public int searchCount(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.searchCount(data);
	}
	
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.searchDetail(data);
	}
	
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.searchSub(data);
	}
	
	@Override
	public int updateHit(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.updateHit(data);
	}
	
	@Override
	public int deleteReply(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.deleteReply(data);
	}
	
	@Override
	public int saveReply(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.saveReply(data);
	}
	
	@Override
	public List<Map<String, Object>> searchDeptCnt() {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.searchDeptCnt();
	}
	
	@Override
	public List<Map<String, Object>> searchReply(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.searchReply(data);
	}
	
	@Override
	public int updateReply(Map<String, Object> data) {
		IdeaDao ideaDao = (IdeaDao)sqlSession.getMapper(IdeaDao.class);
		return ideaDao.updateReply(data);
	}
}
