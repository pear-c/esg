package com.portal.admin.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.Example2Dao;

/**
 * 연습용 관리 DAO Implement
 */
@Repository("example2Dao")
public class Example2DaoImpl extends EgovAbstractMapper implements Example2Dao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	/**
	 * 삭제
	 */
	@Override
	public int delete(Map<String, Object> data) {
		Example2Dao dao = (Example2Dao)sqlSession.getMapper(Example2Dao.class);
		return dao.delete(data);
	}

	/**
	 * 저장
	 */
	@Override
	public int save(Map<String, Object> data) {
		Example2Dao dao = (Example2Dao)sqlSession.getMapper(Example2Dao.class);
		return dao.save(data);
	}

	/**
	 * 조회
	 */
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		Example2Dao dao = (Example2Dao)sqlSession.getMapper(Example2Dao.class);
		return dao.search(data);
	}

}
