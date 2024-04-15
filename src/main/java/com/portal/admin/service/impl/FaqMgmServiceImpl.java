package com.portal.admin.service.impl;

import java.util.*;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.admin.dao.FaqMgmDao;
import com.portal.admin.service.FaqMgmService;
import com.portal.common.MessageUtil;

@Service("faqMgmService")
public class FaqMgmServiceImpl extends EgovAbstractServiceImpl implements FaqMgmService {

	FaqMgmDao faqMgmDao;

	@Autowired
	public FaqMgmServiceImpl(@Qualifier("faqMgmDao") FaqMgmDao faqMgmDao) {
		this.faqMgmDao = faqMgmDao;
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		// TODO Auto-generated method stub
		return faqMgmDao.search(data);
	}

	@Override
	public Map<String, Object> save(Map<String, Object> data) {
		// TODO Auto-generated method stub
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId = "";

		//추가
		if ("INSERT".equals(action)) {
			cnt = faqMgmDao.save(data);

			//처리 실패
			if (0 == cnt) {
				msgId = "10013";		//등록처리 실패하였습니다.
			}
		}
		else {

			//정상처리 여부 체크
			cnt = faqMgmDao.save(data);
			if (0 == cnt) {
				msgId = "10014";		//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@Override
	public Map<String, Object> delete(Map<String, Object> data) {
		// TODO Auto-generated method stub
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;

		String msgId = "";

		//정상처리 여부 체크
		cnt = faqMgmDao.delete(data);
		if (0 == cnt) {
			msgId = "10014";		//삭제 처리 실패 하였습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

}
