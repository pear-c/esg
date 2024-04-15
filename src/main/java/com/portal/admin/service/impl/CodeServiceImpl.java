package com.portal.admin.service.impl;

import java.util.*;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.admin.dao.CodeDao;
import com.portal.admin.service.CodeService;
import com.portal.common.MessageUtil;

@Service("codeService")
public class CodeServiceImpl extends EgovAbstractServiceImpl implements CodeService {


	CodeDao codeDao;

	@Autowired
	public CodeServiceImpl(@Qualifier("codeDao") CodeDao codeDao) {
			this.codeDao = codeDao;
	}

	@Override
	public List<Map<String, Object>> searchUpperCode(Map<String, Object> data) {
		return codeDao.searchUpperCode(data);
	}

	@Override
	public List<Map<String, Object>> searchCode(Map<String, Object> data) {
		return codeDao.searchCode(data);
	}

	@Override
	public Map<String, Object> saveUpperCode(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId = "";

		//추가
		if ("INSERT".equals(action)) {

			//중복건수
			cnt = Integer.parseInt(codeDao.searchUpperCodeCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0 ) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = codeDao.saveUpperCode(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.
				}
			}
		}
		else {

			//정상처리 여부 체크
			cnt = codeDao.saveUpperCode(data);
			if (0 == cnt) {
				msgId = "10014";		//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@Override
	public Map<String, Object> saveCode(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//추가
		if ("INSERT".equals(action)) {

			//중복 체크
			cnt = Integer.parseInt(codeDao.searchCodeCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = codeDao.saveCode(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.

				}
			}
		}
		//수정
		else {
			//처리 실패
			cnt = codeDao.saveCode(data);
			if (0 == cnt) {
				msgId = "10014";			//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;

	}

	@Override
	public Map<String, Object> deleteUpperCode(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";

		//하위코드 존재 여부 체크
		Map<String, Object> codeCnt = codeDao.searchCodeCount2(data);
		if (Integer.parseInt(codeCnt.get("CNT").toString()) > 0) {
			cnt = codeDao.deleteUpperCode2(data);
			if (0 == cnt) {
				msgId = "10015";			//삭제처리 실패되었습니다.
			}
			else {
				cnt = codeDao.deleteUpperCode(data);
				if (0 == cnt) {
					msgId = "10015";			//삭제처리 실패되었습니다.
				}
			}
		}
		else {
			cnt = codeDao.deleteUpperCode(data);
			if (0 == cnt) {
				msgId = "10015";			//삭제처리 실패되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	@Override
	public Map<String, Object> deleteCode(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";

		//정상처리 여부 체크
		cnt = codeDao.deleteCode(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	@Override
	public int searchUpperCodeCount(Map<String, Object> data) {
		return Integer.parseInt(codeDao.searchUpperCodeCount(data).get("CNT").toString());
	}

	@Override
	public int searchCodeCount(Map<String, Object> data) {
		return Integer.parseInt(codeDao.searchCodeCount(data).get("CNT").toString());
	}
	
	@Override
	public int updateVal1(Map<String, Object> data) {
		return codeDao.updateVal1(data);
	}

}
