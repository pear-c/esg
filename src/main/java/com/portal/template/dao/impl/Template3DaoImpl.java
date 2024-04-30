package com.portal.template.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.template.dao.Template3Dao;

/**
 * ??? 관리 DAO Implement
 */
@Repository("template3Dao")
public class Template3DaoImpl extends EgovAbstractMapper implements Template3Dao {

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
		Template3Dao dao = (Template3Dao)sqlSession.getMapper(Template3Dao.class);
		return dao.delete(data);
	}

	/**
	 * 저장
	 */
	@Override
	public int save(Map<String, Object> data) {
		Template3Dao dao = (Template3Dao)sqlSession.getMapper(Template3Dao.class);
		return dao.save(data);
	}

	/**
	 * 조회
	 */
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		Template3Dao dao = (Template3Dao)sqlSession.getMapper(Template3Dao.class);
		return dao.search(data);
	}

}
