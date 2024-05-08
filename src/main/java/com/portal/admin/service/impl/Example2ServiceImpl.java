package com.portal.admin.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.admin.dao.Example2Dao;
import com.portal.admin.service.Example2Service;
import com.portal.common.MessageUtil;

/**
 * ??? 관리 Service Implement
 */
@Service("example2Service")
public class Example2ServiceImpl extends EgovAbstractServiceImpl implements Example2Service{

	Example2Dao dao;

	@Autowired
	public Example2ServiceImpl(@Qualifier("example2Dao") Example2Dao dao) {
		this.dao = dao;
	}

	/**
	 * 조회
	 */
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		return dao.search(data);
	}

	/**
	 * 저장
	 */
	@Override
	public Map<String, Object> save(Map<String, Object> data) {
		// TODO Auto-generated method stub
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//추가
		if ("INSERT".equals(action)) {
			cnt = dao.save(data);

			//처리 실패
			if (0 == cnt) {
				msgId = "10013";		//등록처리 실패하였습니다.
			}
		}
		//수정
		else {
			//처리 실패
			cnt = dao.save(data);
			if (0 == cnt) {
				msgId = "10014";			//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	/**
	 * 삭제
	 */
	@Override
	public Map<String, Object> delete(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//처리 실패
		cnt = dao.delete(data);
		if (0 == cnt) {
			msgId = "10014";			//삭제 처리 실패 하였습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}
}
