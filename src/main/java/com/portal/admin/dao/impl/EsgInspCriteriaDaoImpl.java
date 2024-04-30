package com.portal.admin.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.EsgInspCriteriaDao;

/**
 * 점검 기준 관리 DAO Implement
 */
@Repository("esgInspCriteriaDao")
public class EsgInspCriteriaDaoImpl extends EgovAbstractMapper implements EsgInspCriteriaDao{

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	/**
	 * 점검 기준 조회
	 */
	@Override
	public List<Map<String, Object>> search(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.search(data);
	}

	/**
	 * 점검 기준 저장
	 */
	@Override
	public int save(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.save(data);
	}

	/**
	 * 점검 기준 삭제
	 */
	@Override
	public int delete(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.delete(data);
	}

	/**
	 * 점검 기준 건수 조회
	 */
	@Override
	public Map<String, Object> searchCount(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.searchCount(data);
	}
}
