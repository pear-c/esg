package com.portal.community.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.common.MessageUtil;
import com.portal.community.dao.IdeaDao;
import com.portal.community.service.IdeaService;


@Service("ideaService")
public class IdeaServiceImpl extends EgovAbstractServiceImpl implements IdeaService{
	
	@Autowired
	IdeaDao ideaDao;
	
	public IdeaServiceImpl(@Qualifier("ideaDao") IdeaDao ideaDao) {
		this.ideaDao = ideaDao;
	}
	
	@Override
	public List<Map<String, Object>> search(Map<String, Object> param)
	{		
		if(param.get("startPage") == null) {
			param.put("startPage", 0);
		}
		
		return ideaDao.search(param);
	};
	
	@Override
	public int searchCount(Map<String, Object> param) {
		return ideaDao.searchCount(param);
	}
	
	@Override
	public int searchBannerCount(Map<String, Object> param) {
		return ideaDao.searchBannerCount(param);
	}
	
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> param)
	{
		ideaDao.updateHit(param);
		
		return ideaDao.searchDetail(param);
	};
	
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		return ideaDao.searchSub(data);
	}
	
	@Override
	public List<Map<String, Object>> searchReply(Map<String, Object> data) {
		return ideaDao.searchReply(data);
	}
	
	@Override
	public List<Map<String, Object>> searchDeptCnt() {
		return ideaDao.searchDeptCnt();
	}
	
	@Override
	public Map<String, Object> save(Map<String, Object> param)
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		
		String msgId = "";
		
		//정상처리 여부 체크
		cnt = ideaDao.save(param);
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
		cnt = ideaDao.saveReply(param);
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
		cnt = ideaDao.delete(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}
		
		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));
		
		return result;		//삭제처리 완료되었습니다.
	}
	
	@Override
	public int updateReply(Map<String, Object> data) {		
		return ideaDao.updateReply(data);
	}
	
	@Override
	public int deleteReply(Map<String, Object> data) {
		return ideaDao.deleteReply(data);
	}
	
	@Override
	public int fileDelete(Map<String, Object> data) {
		return ideaDao.fileDelete(data);
	}
}
