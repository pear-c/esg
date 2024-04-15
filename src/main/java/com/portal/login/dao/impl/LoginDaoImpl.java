package com.portal.login.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.login.dao.LoginDao;

@Repository("loginDao")
public class LoginDaoImpl extends EgovAbstractMapper implements LoginDao {

	SqlSession sqlSession;
	
	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}
	
	
}
