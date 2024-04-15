package com.portal.community.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.portal.common.MessageUtil;
import com.portal.community.dao.QnaDao;
import com.portal.community.service.*;

@Service("qnaService")
public class QnaServiceImpl extends EgovAbstractServiceImpl implements QnaService{
	
	QnaDao qnaDao;
	
	@Autowired
	public QnaServiceImpl(@Qualifier("qnaDao") QnaDao qnaDao) {
		this.qnaDao = qnaDao;
	}
	
	@Override
	public List<Map<String, Object>> search(Map<String, Object> param)
	{		
		if(param.get("startPage") == null) {
			param.put("startPage", 0);
		}
		
		return qnaDao.search(param);
	};
	
	@Override
	public int searchCount(Map<String, Object> param) {
		return qnaDao.searchCount(param);
	}
	
	@Override
	public int searchReplyCount(Map<String, Object> data) {
		return qnaDao.searchReplyCount(data);
	}
	
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> param)
	{
		qnaDao.updateHit(param);
		
		return qnaDao.searchDetail(param);
	};
	
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		return qnaDao.searchSub(data);
	}
	
	@Override
	public List<Map<String, Object>> searchReply(Map<String, Object> data) {
		return qnaDao.searchReply(data);
	}
	
	@Override
	public Map<String, Object> searchReplyDetail(Map<String, Object> data) {
		return qnaDao.searchReplyDetail(data);
	}
	
	@Override
	public Map<String, Object> save(Map<String, Object> param)
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		
		String msgId = "";
		
		//정상처리 여부 체크
		cnt = qnaDao.save(param);
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
		cnt = qnaDao.saveReply(param);
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
		cnt = qnaDao.delete(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}
		
		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));
		
		return result;		//삭제처리 완료되었습니다.
	}
	
	@Override
	public int fileDelete(Map<String, Object> data) {
		return qnaDao.fileDelete(data);
	}
	
	@Override
	public Map<String, Object> updateReply(Map<String, Object> data) {	
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";		
		
		//정상처리 여부 체크
		cnt = qnaDao.updateReply(data);
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
		cnt = qnaDao.deleteReply(data);
		if (0 == cnt) {
			msgId = "10013";		//등록 처리 실패 하였습니다.
		}
		
		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));
		
		return result;
	}
	
	
}
