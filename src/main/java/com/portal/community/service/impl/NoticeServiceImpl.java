package com.portal.community.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.portal.common.MessageUtil;
import com.portal.community.dao.NoticeDao;
import com.portal.community.service.*;


@Service("noticeService")
public class NoticeServiceImpl extends EgovAbstractServiceImpl implements NoticeService{
		
	NoticeDao noticeDao;
	
	@Autowired
	public NoticeServiceImpl(@Qualifier("noticeDao") NoticeDao noticeDao) {
		this.noticeDao = noticeDao;
	}
	
	@Override
	public List<Map<String, Object>> search(Map<String, Object> param)
	{		
		if(param.get("startPage") == null) {
			param.put("startPage", 0);
		}
		
		return noticeDao.search(param);
	};
	
	@Override
	public int searchCount(Map<String, Object> param) {
		return noticeDao.searchCount(param);
	}
	
	@Override
	public int searchBannerCount(Map<String, Object> param) {
		return noticeDao.searchBannerCount(param);
	}
	
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> param)
	{
		noticeDao.updateHit(param);
		
		return noticeDao.searchDetail(param);
	};
	
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		return noticeDao.searchSub(data);
	}
	
	@Override
	public Map<String, Object> save(Map<String, Object> param)
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		
		String msgId = "";
		
		//정상처리 여부 체크
		cnt = noticeDao.save(param);
		if (0 == cnt) {
			msgId = "10013";		//등록 처리 실패 하였습니다.
		}
		
		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));
		
		return result;
	};
	
	@Override
	public Map<String, Object> delete(Map<String, Object> data) {
		// TODO Auto-generated method stub
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		String msgId = "";		
		
		//정상처리 여부 체크
		cnt = noticeDao.delete(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}
		
		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));
		
		return result;		//삭제처리 완료되었습니다.
	}
	
	@Override
	public int fileDelete(Map<String, Object> data) {
		return noticeDao.fileDelete(data);
	}
}
