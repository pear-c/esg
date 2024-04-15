package com.portal.main.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.main.dao.MainDao;
import com.portal.main.service.MainService;

@Service("mainService")
public class MainServiceImpl extends EgovAbstractServiceImpl implements MainService {

	@Autowired
	MainDao mainDao;

	public MainServiceImpl(@Qualifier("mainDao") MainDao mainDao) {
		this.mainDao = mainDao;
	}

	@Override
	public List<Map<String, Object>> searchMenu(Map<String, Object> data) {
		return mainDao.searchMenu(data);
	}

	@Override
	public List<Map<String, Object>> searchTopMenu(Map<String, Object> data) {
		return mainDao.searchTopMenu(data);
	}

	@Override
	public List<Map<String, Object>> searchUserInfo(Map<String, Object> data) {
		return mainDao.searchUserInfo(data);
	}

	@Override
	public Map<String, Object> loginUserInfo(Map<String, Object> data) {
		return mainDao.loginUserInfo(data);
	}

	@Override
	public List<Map<String, Object>> searchBanner(Map<String, Object> data) {
		return mainDao.searchBanner(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSEdu(Map<String, Object> data) {
		return mainDao.searchBBSEdu(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSErrorReport(Map<String, Object> data) {
		return mainDao.searchBBSErrorReport(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSFaq(Map<String, Object> data) {
		return mainDao.searchBBSFaq(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSNotice(Map<String, Object> data) {
		return mainDao.searchBBSNotice(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSPromotion(Map<String, Object> data) {
		return mainDao.searchBBSPromotion(data);
	}

	@Override
	public List<Map<String, Object>> searchBBSQna(Map<String, Object> data) {
		return mainDao.searchBBSQna(data);
	}

	@Override
	public Map<String, Object> searchBotStoreSummary(Map<String, Object> data) {
		return mainDao.searchBotStoreSummary(data);
	}

	@Override
	public Map<String, Object> searchProcPerform(Map<String, Object> data) {
		return mainDao.searchProcPerform(data);
	}

	@Override
	public Map<String, Object> searchUserJobInfo(Map<String, Object> data) {
		return mainDao.searchUserJobInfo(data);
	}

	@Override
	public List<Map<String, Object>> searchYearBizAutomationTime(Map<String, Object> data) {
		return mainDao.searchYearBizAutomationTime(data);
	}

	@Override
	public List<Map<String, Object>> searchYearProcAutomationTime(Map<String, Object> data) {
		return mainDao.searchYearProcAutomationTime(data);
	}

	@Override
	public List<Map<String, Object>> searchYearProcAutomationTime2(Map<String, Object> data) {
		return mainDao.searchYearProcAutomationTime2(data);
	}

	@Override
	public List<Map<String, Object>> searchYearProcAutomationTime3(Map<String, Object> data) {
		return mainDao.searchYearProcAutomationTime3(data);
	}
}
