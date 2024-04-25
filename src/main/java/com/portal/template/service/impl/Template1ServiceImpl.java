package com.portal.template.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.common.MessageUtil;
import com.portal.template.dao.Template1Dao;
import com.portal.template.service.Template1Service;

@Service("template1Service")
public class Template1ServiceImpl extends EgovAbstractServiceImpl implements Template1Service {


	Template1Dao dao;

	@Autowired
	public Template1ServiceImpl(@Qualifier("template1Dao") Template1Dao dao) {
			this.dao = dao;
	}

	/**
	 * 상위코드 조회
	 */
	@Override
	public List<Map<String, Object>> searchUpperCode(Map<String, Object> data) {
		return dao.searchUpperCode(data);
	}

	/**
	 * 코드 조회
	 */
	@Override
	public List<Map<String, Object>> searchCode(Map<String, Object> data) {
		return dao.searchCode(data);
	}

	/**
	 * 상위 코드 저장
	 */
	@Override
	public Map<String, Object> saveUpperCode(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId = "";

		//추가
		if ("INSERT".equals(action)) {

			//중복건수
			cnt = Integer.parseInt(dao.searchUpperCodeCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0 ) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = dao.saveUpperCode(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.
				}
			}
		}
		else {

			//정상처리 여부 체크
			cnt = dao.saveUpperCode(data);
			if (0 == cnt) {
				msgId = "10014";		//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	/**
	 * 코드 저장
	 */
	@Override
	public Map<String, Object> saveCode(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//추가
		if ("INSERT".equals(action)) {

			//중복 체크
			cnt = Integer.parseInt(dao.searchCodeCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = dao.saveCode(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.

				}
			}
		}
		//수정
		else {
			//처리 실패
			cnt = dao.saveCode(data);
			if (0 == cnt) {
				msgId = "10014";			//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;

	}

	/**
	 * 상위 코드 삭제
	 */
	@Override
	public Map<String, Object> deleteUpperCode(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";

		//하위코드 존재 여부 체크
		Map<String, Object> codeCnt = dao.searchCodeCount2(data);
		if (Integer.parseInt(codeCnt.get("CNT").toString()) > 0) {
			cnt = dao.deleteUpperCode2(data);
			if (0 == cnt) {
				msgId = "10015";			//삭제처리 실패되었습니다.
			}
			else {
				cnt = dao.deleteUpperCode(data);
				if (0 == cnt) {
					msgId = "10015";			//삭제처리 실패되었습니다.
				}
			}
		}
		else {
			cnt = dao.deleteUpperCode(data);
			if (0 == cnt) {
				msgId = "10015";			//삭제처리 실패되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	/**
	 * 코드 삭제
	 */
	@Override
	public Map<String, Object> deleteCode(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";

		//정상처리 여부 체크
		cnt = dao.deleteCode(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	/**
	 * 상위 코드 건수 조회
	 */
	@Override
	public int searchUpperCodeCount(Map<String, Object> data) {
		return Integer.parseInt(dao.searchUpperCodeCount(data).get("CNT").toString());
	}

	/**
	 * 코드 건수 조회
	 */
	@Override
	public int searchCodeCount(Map<String, Object> data) {
		return Integer.parseInt(dao.searchCodeCount(data).get("CNT").toString());
	}
	
	/**
	 * Val1 수정
	 */
	@Override
	public int updateVal1(Map<String, Object> data) {
		return dao.updateVal1(data);
	}

}
