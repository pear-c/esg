package com.portal.admin.dao.impl;

import java.util.*;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.MenuDao;

@Repository("menuDao")
public class MenuDaoImpl extends EgovAbstractMapper implements MenuDao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public int delete(Map<String, Object> data) {
		MenuDao menuDao = (MenuDao)sqlSession.getMapper(MenuDao.class);
		return menuDao.delete(data);
	}

	@Override
	public int deleteDetail(Map<String, Object> data) {
		MenuDao menuDao = (MenuDao)sqlSession.getMapper(MenuDao.class);
		return menuDao.deleteDetail(data);
	}

	@Override
	public int save(Map<String, Object> data) {
		MenuDao menuDao = (MenuDao)sqlSession.getMapper(MenuDao.class);
		return menuDao.save(data);
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		MenuDao menuDao = (MenuDao)sqlSession.getMapper(MenuDao.class);
		return menuDao.search(data);
	}

	@Override
	public Map<String, Object> searchMenuCount(Map<String, Object> data) {
		MenuDao menuDao = (MenuDao)sqlSession.getMapper(MenuDao.class);
		return menuDao.searchMenuCount(data);
	}

}
