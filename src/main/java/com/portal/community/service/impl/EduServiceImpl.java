package com.portal.community.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.portal.common.MessageUtil;
import com.portal.community.dao.EduDao;
import com.portal.community.service.*;

@Service("eduService")
public class EduServiceImpl extends EgovAbstractServiceImpl implements EduService{

	EduDao eduDao;

	@Autowired
	public EduServiceImpl(@Qualifier("eduDao") EduDao eduDao) {
		this.eduDao = eduDao;
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> param)
	{
		if(param.get("startPage") == null) {
			param.put("startPage", 0);
		}

		return eduDao.search(param);
	};



	@Override
	public Map<String, Object> save(Map<String, Object> param)
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;

		String msgId = "";

		//정상처리 여부 체크
		cnt = eduDao.save(param);
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
		cnt = eduDao.delete(data);
		if (0 == cnt) {
			msgId = "10015";			//삭제처리 실패되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;		//삭제처리 완료되었습니다.
	}

	@Override
	public int fileDelete(Map<String, Object> data) {
		return eduDao.fileDelete(data);
	}

}
