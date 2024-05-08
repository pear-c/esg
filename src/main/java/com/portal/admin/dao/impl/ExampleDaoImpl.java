package com.portal.admin.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.ExampleDao;

/**
 * 알아ㅓㄹㅇ 관리 DAO Implement
 */
@Repository("exampleDao")
public class ExampleDaoImpl extends EgovAbstractMapper implements ExampleDao {

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	/**
	 * 메세지 삭제
	 */
	@Override
	public int delete(Map<String, Object> data) {
		ExampleDao dao = (ExampleDao)sqlSession.getMapper(ExampleDao.class);
		return dao.delete(data);
	}

	/**
	 * 메세지 저장
	 */
	@Override
	public int save(Map<String, Object> data) {
		ExampleDao dao = (ExampleDao)sqlSession.getMapper(ExampleDao.class);
		return dao.save(data);
	}

	/**
	 * 메세지 조회
	 */
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		ExampleDao dao = (ExampleDao)sqlSession.getMapper(ExampleDao.class);
		return dao.search(data);
	}

}
