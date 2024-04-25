package com.portal.template.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.template.dao.Template1Dao;

/**
 * 코드 관리 DAO Implement
 */
@Repository("template1Dao")
public class Template1DaoImpl extends EgovAbstractMapper implements Template1Dao{

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	/**
	 * 상위 코드 조회
	 */
	@Override
	public List<Map<String, Object>> searchUpperCode(Map<String, Object> data) {

		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.searchUpperCode(data);
	}

	/**
	 * 코드 조회
	 */
	@Override
	public List<Map<String, Object>> searchCode(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.searchCode(data);
	}

	/**
	 * 코드 매핑 조회
	 */
	@Override
	public List<Map<String, Object>> searchCodeBind(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.searchCodeBind(data);
	}

	/**
	 * 상위 코드 저장
	 */
	@Override
	public int saveUpperCode(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.saveUpperCode(data);
	}

	/**
	 * 코드 저장
	 */
	@Override
	public int saveCode(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.saveCode(data);
	}

	/**
	 * 상위 코드 삭제
	 */
	@Override
	public int deleteUpperCode(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.deleteUpperCode(data);
	}

	/**
	 * 상위 코드 삭제2
	 */
	@Override
	public int deleteUpperCode2(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.deleteUpperCode2(data);
	}

	/**
	 * 코드 삭제
	 */
	@Override
	public int deleteCode(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.deleteCode(data);
	}

	/**
	 * 상위 코드 건수 조회
	 */
	@Override
	public Map<String, Object> searchUpperCodeCount(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.searchUpperCodeCount(data);
	}

	/**
	 * 코드 건수 조회
	 */
	@Override
	public Map<String, Object> searchCodeCount(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.searchCodeCount(data);
	}

	/**
	 * 코드 건수 조회2
	 */
	@Override
	public Map<String, Object> searchCodeCount2(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.searchCodeCount2(data);
	}
	
	/**
	 * Val1 수정
	 */
	@Override
	public int updateVal1(Map<String, Object> data) {
		Template1Dao dao = (Template1Dao) sqlSession.getMapper(Template1Dao.class);
		return dao.updateVal1(data);
	}
}
