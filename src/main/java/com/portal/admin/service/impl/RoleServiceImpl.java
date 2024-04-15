package com.portal.admin.service.impl;

import java.util.*;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.portal.admin.dao.RoleDao;
import com.portal.admin.service.RoleService;
import com.portal.common.MessageUtil;

@Service("roleService")
public class RoleServiceImpl extends EgovAbstractServiceImpl implements RoleService {


	RoleDao roleDao;

	@Autowired
	public RoleServiceImpl(@Qualifier("roleDao") RoleDao roleDao) {
		this.roleDao = roleDao;
	}

	@Override
	public List<Map<String, Object>> searchRole(Map<String, Object> data) {
		return roleDao.searchRole(data);
	}

	@Override
	public List<Map<String, Object>> searchRoleMenu(Map<String, Object> data) {
		return roleDao.searchRoleMenu(data);
	}

	@Override
	public List<Map<String, Object>> searchUserPriv() {
		return roleDao.searchUserPriv();
	}

	@Override
	public List<Map<String, Object>> searchLoginMenu() {
		return roleDao.searchLoginMenu();
	}

	@Override
	public Map<String, Object> saveRole(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//추가
		if ("INSERT".equals(action)) {

			//중복 체크
			cnt = Integer.parseInt(roleDao.searchRoleCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = roleDao.saveRole(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.

				}
			}
		}
		//수정
		else {
			//처리 실패
			cnt = roleDao.saveRole(data);
			if (0 == cnt) {
				msgId = "10014";			//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@SuppressWarnings({ "unused", "unchecked" })
	@Override
	public Map<String, Object> saveRoleMenu(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>) data.get("updateList");

		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//처리 실패
		cnt = roleDao.saveRoleMenu(data);
		if (0 == cnt) {
			msgId = "10014";			//수정실패 되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@Override
	public Map<String, Object> saveRoleMenu2(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt;

		String msgId	= "";

		//처리 실패
		cnt = roleDao.saveRoleMenu2(data);
		if (0 == cnt) {
			msgId = "10014";			//수정실패 되었습니다.
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@Override
	public Map<String, Object> saveUserRole(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//추가
		if ("INSERT".equals(action)) {

			//중복 체크
			cnt = Integer.parseInt(roleDao.searchUserCount(data).get("CNT").toString());

			//중복 오류
			if (cnt > 0) {
				msgId = "10009";			//기존에 동일 자료가 있습니다.
			}
			else {
				cnt = roleDao.saveUserRole(data);

				//처리 실패
				if (0 == cnt) {
					msgId = "10013";		//등록처리 실패하였습니다.

				}
			}
		}
		//수정
		else {
			//처리 실패
			cnt = roleDao.saveUserRole(data);
			if (0 == cnt) {
				msgId = "10014";			//수정실패 되었습니다.
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@Override
	public Map<String, Object> deleteUserRole(Map<String, Object> data) {
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId	= "";

		//삭제
		if("DELETE".equals(action)) {

			cnt = roleDao.deleteUserRole(data);

			//처리 실패
			if (0 == cnt) {
				msgId = "10015";		//삭제 처리 실패 하였습니다.

			}

		}
		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG",("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));

		return result;
	}

	@Override
	public Map<String, Object> deleteRole(Map<String, Object> data) {
		// TODO Auto-generated method stub
		Map<String, Object> result = new HashMap<String, Object>();
		String action = (String)data.get("action");
		int cnt;

		String msgId = "";

		//삭제
		if("DELETE".equals(action)) {

			cnt = roleDao.deleteRole(data);

			//처리 실패
			if(0 == cnt) {
				msgId = "10015";
			}
		}

		result.put("SUCC_YN", ("".equals(msgId) ? "Y" : "N"));
		result.put("MSG", ("".equals(msgId) ? "" : MessageUtil.getMessage(msgId)));
		return result;
	}

}
