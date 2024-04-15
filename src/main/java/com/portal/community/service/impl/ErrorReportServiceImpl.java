package com.portal.community.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.common.MessageUtil;
import com.portal.community.dao.ErrorReportDao;
import com.portal.community.service.ErrorReportService;

@Service("errorReportService")
public class ErrorReportServiceImpl extends EgovAbstractServiceImpl implements ErrorReportService {

	ErrorReportDao errorReportDao;

	@Autowired
	public ErrorReportServiceImpl(@Qualifier("errorReportDao") ErrorReportDao errorReportDao) {
		this.errorReportDao = errorReportDao;
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> param)
	{
		if(param.get("startPage") == null) {
			param.put("startPage", 0);
		}

		return errorReportDao.search(param);
	};

	@Override
	public int searchCount(Map<String, Object> param) {
		return errorReportDao.searchCount(param);
	}

	@Override
	public int searchReplyCount(Map<String, Object> data) {
		return errorReportDao.searchReplyCount(data);
	}

	@Override
	public Map<String, Object> searchDetail(Map<String, Object> param)
	{
		errorReportDao.updateHit(param);

		return errorReportDao.searchDetail(param);
	};

	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		return errorReportDao.searchSub(data);
	}

	@Override
	public List<Map<String, Object>> searchReply(Map<String, Object> data) {
		return errorReportDao.searchReply(data);
	}

	@Override
	public Map<String, Object> searchReplyDetail(Map<String, Object> data) {
		return errorReportDao.searchReplyDetail(data);
	}

	@Override
	public Map<String, Object> save(Map<String, Object> param)
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;

		String msgId = "";

		//정상처리 여부 체크
		cnt = errorReportDao.save(param);
		if (0 == cnt) {
			msgId = "10013";		//등록 처리 실패 하였습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	};

	@Override
	public Map<String, Object> saveReply(Map<String, Object> param) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;

		String msgId = "";

		//정상처리 여부 체크
		cnt = errorReportDao.saveReply(param);
		if (0 == cnt) {
			msgId = "10013";		//등록 처리 실패 하였습니다.
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
		cnt = errorReportDao.delete(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	@Override
	public int fileDelete(Map<String, Object> data) {
		return errorReportDao.fileDelete(data);
	}

	@Override
	public Map<String, Object> updateReply(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";

		//정상처리 여부 체크
		cnt = errorReportDao.updateReply(data);
		if (0 == cnt) {
			msgId = "10014";			//삭제처리 실패되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	@Override
	public Map<String, Object> deleteReply(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;

		String msgId = "";

		//정상처리 여부 체크
		cnt = errorReportDao.deleteReply(data);
		if (0 == cnt) {
			msgId = "10013";		//등록 처리 실패 하였습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}


}
