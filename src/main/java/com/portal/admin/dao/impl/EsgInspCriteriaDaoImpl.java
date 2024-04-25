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
	 * 점검 항목 조회
	 */
	@Override
	public List<Map<String, Object>> searchEsgInspItem(Map<String, Object> data) {

		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.searchEsgInspItem(data);
	}

	/**
	 * 점검 기준 조회
	 */
	@Override
	public List<Map<String, Object>> searchEsgInspCriteria(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.searchEsgInspCriteria(data);
	}

	/**
	 * 점검 항목 저장
	 */
	@Override
	public int saveEsgInspItem(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.saveEsgInspItem(data);
	}

	/**
	 * 점검 기준 저장
	 */
	@Override
	public int saveEsgInspCriteria(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.saveEsgInspCriteria(data);
	}

	/**
	 * 점검 항목 삭제
	 */
	@Override
	public int deleteEsgInspItem(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.deleteEsgInspItem(data);
	}

	/**
	 * 점검 기준 삭제
	 */
	@Override
	public int deleteEsgInspCriteria(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.deleteEsgInspCriteria(data);
	}

	/**
	 * 점검 항목 건수 조회
	 */
	@Override
	public Map<String, Object> searchEsgInspItemCount(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.searchEsgInspItemCount(data);
	}

	/**
	 * 점검 기준 건수 조회
	 */
	@Override
	public Map<String, Object> searchEsgInspCriteriaCount(Map<String, Object> data) {
		EsgInspCriteriaDao dao = (EsgInspCriteriaDao) sqlSession.getMapper(EsgInspCriteriaDao.class);
		return dao.searchEsgInspCriteriaCount(data);
	}
}
