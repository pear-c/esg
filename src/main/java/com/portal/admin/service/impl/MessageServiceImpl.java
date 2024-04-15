package com.portal.admin.service.impl;

import java.util.*;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.admin.dao.MessageDao;
import com.portal.admin.service.MessageService;
import com.portal.common.MessageUtil;

@Service("messageService")
public class MessageServiceImpl extends EgovAbstractServiceImpl implements MessageService{

	MessageDao messageDao;

	@Autowired
	public MessageServiceImpl(@Qualifier("messageDao") MessageDao messageDao) {
		this.messageDao = messageDao;
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		return messageDao.search(data);
	}

	@Override
	public Map<String, Object> save(Map<String, Object> data) {
		// TODO Auto-generated method stub
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//추가
		if ("INSERT".equals(action)) {
			cnt = messageDao.save(data);

			//처리 실패
			if (0 == cnt) {
				msgId = "10013";		//등록처리 실패하였습니다.
			}
		}
		//수정
		else {
			//처리 실패
			cnt = messageDao.save(data);
			if (0 == cnt) {
				msgId = "10014";			//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@Override
	public Map<String, Object> delete(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//처리 실패
		cnt = messageDao.delete(data);
		if (0 == cnt) {
			msgId = "10014";			//삭제 처리 실패 하였습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}
}
