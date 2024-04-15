package com.portal.main.dao.impl;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.main.dao.MainDao;

@Repository("mainDao")
public class MainDaoImpl extends EgovAbstractMapper implements MainDao{

	SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public int insertUMS(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.insertUMS(data);
	}

	@Override
	public Map<String, Object> loginUserInfo(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.loginUserInfo(data);
	}

	@Override
	public List<Map<String, Object>> searchBanner(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchBanner(data);
	}
	@Override
	public List<Map<String, Object>> searchBBSEdu(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchBBSEdu(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSErrorReport(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchBBSErrorReport(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSFaq(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchBBSFaq(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSNotice(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchBBSNotice(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSPromotion(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchBBSPromotion(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSQna(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchBBSQna(data);
	}

	@Override
	public Map<String, Object> searchBotStoreSummary(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchBotStoreSummary(data);
	}

	@Override
	public List<Map<String, Object>> searchMenu(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchMenu(data);
	}

	@Override
	public Map<String, Object> searchProcPerform(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchProcPerform(data);
	}

	@Override
	public List<Map<String, Object>> searchTopMenu(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchTopMenu(data);
	}

	@Override
	public List<Map<String, Object>> searchUserInfo(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchUserInfo(data);
	}

	@Override
	public Map<String, Object> searchUserJobInfo(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchUserJobInfo(data);
	}

	@Override
	public List<Map<String, Object>> searchYearBizAutomationTime(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchYearBizAutomationTime(data);
	}

	@Override
	public List<Map<String, Object>> searchYearProcAutomationTime(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchYearProcAutomationTime(data);
	}

	@Override
	public List<Map<String, Object>> searchYearProcAutomationTime2(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchYearProcAutomationTime2(data);
	}

	@Override
	public List<Map<String, Object>> searchYearProcAutomationTime3(Map<String, Object> data) {
		MainDao mainDao = (MainDao)sqlSession.getMapper(MainDao.class);
		return mainDao.searchYearProcAutomationTime3(data);
	}

}
