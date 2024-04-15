package com.portal.admin.dao.impl;

import java.util.*;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.MenuDao;
import com.portal.admin.dao.MessageDao;

@Repository("messageDao")
public class MessageDaoImpl extends EgovAbstractMapper implements MessageDao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public int delete(Map<String, Object> data) {
		MessageDao messageDao = (MessageDao)sqlSession.getMapper(MessageDao.class);
		return messageDao.delete(data);
	}

	@Override
	public int save(Map<String, Object> data) {
		MessageDao messageDao = (MessageDao)sqlSession.getMapper(MessageDao.class);
		return messageDao.save(data);
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		MessageDao messageDao = (MessageDao)sqlSession.getMapper(MessageDao.class);
		return messageDao.search(data);
	}

}
