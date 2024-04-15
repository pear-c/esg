package com.portal.community.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.community.dao.ErrorReportDao;

@Repository("errorReportDao")
public class ErrorReportDaoImpl  extends EgovAbstractMapper implements ErrorReportDao{

	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}
	
	@Override
	public int delete(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.delete(data);
	}
	@Override
	public int deleteReply(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.deleteReply(data);
	}
	
	@Override
	public int fileDelete(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.fileDelete(data);
	}
	
	@Override
	public int save(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.save(data);
	}
	
	@Override
	public int saveReply(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.saveReply(data);
	}
	
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.search(data);
	}
	
	@Override
	public int searchCount(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.searchCount(data);
	}
	
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.searchDetail(data);
	}
	
	@Override
	public List<Map<String, Object>> searchReply(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.searchReply(data);
	}
	
	@Override
	public int searchReplyCount(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.searchReplyCount(data);
	}
	
	@Override
	public Map<String, Object> searchReplyDetail(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.searchReplyDetail(data);
	}
	
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.searchSub(data);
	}
	
	@Override
	public int updateHit(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.updateHit(data);
	}
	
	@Override
	public int updateReply(Map<String, Object> data) {
		ErrorReportDao errorReportDao = (ErrorReportDao)sqlSession.getMapper(ErrorReportDao.class);
		return errorReportDao.updateReply(data);
	}
}
