package com.portal.community.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.portal.community.dao.FaqDao;
import com.portal.community.service.*;

@Service("faqService")
public class FaqServiceImpl extends EgovAbstractServiceImpl implements FaqService{
		
	FaqDao faqDao;
	
	@Autowired
	public FaqServiceImpl(@Qualifier("faqDao") FaqDao faqDao) {
		this.faqDao = faqDao;
	}
	
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		return faqDao.search(data);
	}
	
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> data) {
		return faqDao.searchDetail(data);
	}
	
	@Override
	public int count() {
		return faqDao.count();
	}
}
