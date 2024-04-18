package com.portal.template.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.template.dao.Template2Dao;

/**
 * 메세지 관리 DAO Implement
 */
@Repository("template2Dao")
public class Template2DaoImpl extends EgovAbstractMapper implements Template2Dao {

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
		Template2Dao template2Dao = (Template2Dao)sqlSession.getMapper(Template2Dao.class);
		return template2Dao.delete(data);
	}

	/**
	 * 메세지 저장
	 */
	@Override
	public int save(Map<String, Object> data) {
		Template2Dao template2Dao = (Template2Dao)sqlSession.getMapper(Template2Dao.class);
		return template2Dao.save(data);
	}

	/**
	 * 메세지 조회
	 */
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		Template2Dao template2Dao = (Template2Dao)sqlSession.getMapper(Template2Dao.class);
		return template2Dao.search(data);
	}

}
