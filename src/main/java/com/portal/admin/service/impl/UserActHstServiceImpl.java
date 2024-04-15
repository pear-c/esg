package com.portal.admin.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.admin.dao.UserActHstDao;
import com.portal.admin.service.UserActHstService;

@Service("userActHstService")
public class UserActHstServiceImpl extends EgovAbstractServiceImpl implements UserActHstService{

	UserActHstDao userActHstDao;

	@Autowired
	public UserActHstServiceImpl(@Qualifier("userActHstDao") UserActHstDao userActHstDao) {
		this.userActHstDao = userActHstDao;
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		return userActHstDao.search(data);
	}

	@Override
	public int save(Map<String, Object> data) {
		return userActHstDao.save(data);
	}

	@Override
	public List<Map<String, Object>> searchUser(Map<String, Object> data) {
		return userActHstDao.searchUser(data);
	}

	@Override
	public List<Map<String, Object>> searchUserActHst(Map<String, Object> data) {
		return userActHstDao.searchUserActHst(data);
	}

	@Override
	public Map<String, Object> searchUserRole(Map<String, Object> data) {
		return userActHstDao.searchUserRole(data);
	}
}
