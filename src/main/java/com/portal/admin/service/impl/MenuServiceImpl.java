package com.portal.admin.service.impl;

import java.util.*;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.admin.dao.MenuDao;
import com.portal.admin.service.MenuService;
import com.portal.common.MessageUtil;

@Service("menuService")
public class MenuServiceImpl extends EgovAbstractServiceImpl implements MenuService{

	MenuDao menuDao;

	@Autowired
	public MenuServiceImpl(@Qualifier("menuDao") MenuDao menuDao) {
		this.menuDao = menuDao;
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
			//중복 체크
			cnt = Integer.parseInt(menuDao.searchMenuCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = menuDao.save(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.

				}
			}
		}
		//수정
		else {
			//처리 실패
			cnt = menuDao.save(data);
			if (0 == cnt) {
				msgId = "10014";			//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		return menuDao.search(data);
	}

	@Override
	public Map<String, Object> delete(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";		//삭제처리 완료되었습니다.

		//처리 실패
		cnt = menuDao.delete(data);
		if (0 == cnt) {
			msgId = "10014";			//삭제처리 실패되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	@Override
	public Map<String, Object> deleteDetail(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";		//삭제처리 완료되었습니다.

		//처리 실패
		cnt = menuDao.deleteDetail(data);
		if (0 == cnt) {
			msgId = "10014";			//삭제처리 실패되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}
}
