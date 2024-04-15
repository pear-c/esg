package com.portal.community.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.portal.common.MessageUtil;
import com.portal.community.dao.PromotionDao;
import com.portal.community.service.*;

@Service("promotionService")
public class PromotionServiceImpl extends EgovAbstractServiceImpl implements PromotionService{
	
	PromotionDao promotionDao;
	
	@Autowired
	public PromotionServiceImpl(@Qualifier("promotionDao") PromotionDao promotionDao) {
		this.promotionDao = promotionDao;
	}
	
	@Override
	public List<Map<String, Object>> search(Map<String, Object> param)
	{		
		if(param.get("startPage") == null) {
			param.put("startPage", 0);
		}
		
		return promotionDao.search(param);
	};
	
	@Override
	public int searchCount(Map<String, Object> param) {
		return promotionDao.searchCount(param);
	}
	
	@Override
	public int searchBannerCount(Map<String, Object> param) {
		return promotionDao.searchBannerCount(param);
	}
	
	@Override
	public Map<String, Object> searchDetail(Map<String, Object> param)
	{
		promotionDao.updateHit(param);
		
		return promotionDao.searchDetail(param);
	};
	
	@Override
	public List<Map<String, Object>> searchSub(Map<String, Object> data) {
		return promotionDao.searchSub(data);
	}
	
	@Override
	public Map<String, Object> save(Map<String, Object> param)
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;
		
		String msgId = "";
		
		//정상처리 여부 체크
		cnt = promotionDao.save(param);
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
		cnt = promotionDao.delete(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}
		
		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));
		
		return result;		//삭제처리 완료되었습니다.
	}
	
	@Override
	public int fileDelete(Map<String, Object> data) {
		return promotionDao.fileDelete(data);
	}
}
