package com.portal.admin.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.admin.dao.EsgInspCriteriaDao;
import com.portal.admin.service.EsgInspCriteriaService;
import com.portal.common.MessageUtil;

@Service("esgInspCriteriaService")
public class EsgInspCriteriaServiceImpl extends EgovAbstractServiceImpl implements EsgInspCriteriaService {


	EsgInspCriteriaDao dao;

	@Autowired
	public EsgInspCriteriaServiceImpl(@Qualifier("esgInspCriteriaDao") EsgInspCriteriaDao dao) {
			this.dao = dao;
	}

	/**
	 * 점검 항목 조회
	 */
	@Override
	public List<Map<String, Object>> searchEsgInspItem(Map<String, Object> data) {
		return dao.searchEsgInspItem(data);
	}

	/**
	 * 점검 기준 조회
	 */
	@Override
	public List<Map<String, Object>> searchEsgInspCriteria(Map<String, Object> data) {
		return dao.searchEsgInspCriteria(data);
	}

	/**
	 * 점검 기준 저장
	 */
	@Override
	public Map<String, Object> saveEsgInspItem(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId = "";

		//추가
		if ("INSERT".equals(action)) {

			//중복건수
			cnt = Integer.parseInt(dao.searchEsgInspItemCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0 ) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = dao.saveEsgInspItem(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.
				}
			}
		}
		else {

			//정상처리 여부 체크
			cnt = dao.saveEsgInspItem(data);
			if (0 == cnt) {
				msgId = "10014";		//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	/**
	 * 점검 기준 저장
	 */
	@Override
	public Map<String, Object> saveEsgInspCriteria(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//추가
		if ("INSERT".equals(action)) {

			//중복 체크
			cnt = Integer.parseInt(dao.searchEsgInspCriteriaCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = dao.saveEsgInspCriteria(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.

				}
			}
		}
		//수정
		else {
			//처리 실패
			cnt = dao.saveEsgInspCriteria(data);
			if (0 == cnt) {
				msgId = "10014";			//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;

	}

	/**
	 * 점검 기준 삭제
	 */
	@Override
	public Map<String, Object> deleteEsgInspItem(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";
		
		/*
		//점검 기준 존재 여부 체크
		Map<String, Object> codeCnt = dao.searchEsgInspCriteriaCount2(data);
		if (Integer.parseInt(codeCnt.get("CNT").toString()) > 0) {
			cnt = dao.deleteEsgInspItem2(data);
			if (0 == cnt) {
				msgId = "10015";			//삭제처리 실패되었습니다.
			}
			else {
				cnt = dao.deleteEsgInspItem(data);
				if (0 == cnt) {
					msgId = "10015";			//삭제처리 실패되었습니다.
				}
			}
		}
		else {
			cnt = dao.deleteEsgInspItem(data);
			if (0 == cnt) {
				msgId = "10015";			//삭제처리 실패되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));
		*/
		return result;		//삭제처리 완료되었습니다.
	}

	/**
	 * 점검 기준 삭제
	 */
	@Override
	public Map<String, Object> deleteEsgInspCriteria(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";

		//정상처리 여부 체크
		cnt = dao.deleteEsgInspCriteria(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	/**
	 * 점검 기준 건수 조회
	 */
	@Override
	public int searchEsgInspItemCount(Map<String, Object> data) {
		return Integer.parseInt(dao.searchEsgInspItemCount(data).get("CNT").toString());
	}

	/**
	 * 점검 기준 건수 조회
	 */
	@Override
	public int searchEsgInspCriteriaCount(Map<String, Object> data) {
		return Integer.parseInt(dao.searchEsgInspCriteriaCount(data).get("CNT").toString());
	}
}
