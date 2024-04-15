package com.portal.community.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.community.dao.NoticeDao;

@Repository("noticeDao")
public class NoticeDaoImpl  extends EgovAbstractMapper implements NoticeDao{

	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}
	
	@Override
	public int delete(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.delete(data);
	}
	@Override
	public int fileDelete(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.fileDelete(data);
	}
	@Override
	public int save(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.save(data);
	}
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.search(data);
	}
	@Override
	public int searchBannerCount(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.searchBannerCount(data);
	}
	@Override
	public int searchCount(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.searchCount(data);
	}
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.searchDetail(data);
	}
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.searchSub(data);
	}
	@Override
	public int updateHit(Map<String, Object> data) {
		NoticeDao noticeDao = (NoticeDao)sqlSession.getMapper(NoticeDao.class);
		return noticeDao.updateHit(data);
	}
}
