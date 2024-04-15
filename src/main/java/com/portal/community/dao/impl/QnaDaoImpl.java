package com.portal.community.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.community.dao.QnaDao;

@Repository("qnaDao")
public class QnaDaoImpl  extends EgovAbstractMapper implements QnaDao{

	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}
	
	@Override
	public int delete(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.delete(data);
	}
	@Override
	public int fileDelete(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.fileDelete(data);
	}
	@Override
	public int save(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.save(data);
	}
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.search(data);
	}
	@Override
	public int searchCount(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.searchCount(data);
	}
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.searchDetail(data);
	}
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.searchSub(data);
	}
	@Override
	public int updateHit(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.updateHit(data);
	}
	
	@Override
	public int deleteReply(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.deleteReply(data);
	}
	
	@Override
	public int saveReply(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.saveReply(data);
	}
	
	@Override
	public List<Map<String, Object>> searchReply(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.searchReply(data);
	}
	
	@Override
	public int searchReplyCount(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.searchReplyCount(data);
	}
	
	@Override
	public Map<String, Object> searchReplyDetail(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.searchReplyDetail(data);
	}
	
	@Override
	public int updateReply(Map<String, Object> data) {
		QnaDao qnaDao = (QnaDao)sqlSession.getMapper(QnaDao.class);
		return qnaDao.updateReply(data);
	}
}
