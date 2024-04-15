package com.portal.admin.dao.impl;

import java.util.*;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.portal.admin.dao.CodeDao;

@Repository("codeDao")
public class CodeDaoImpl extends EgovAbstractMapper implements CodeDao{

	private SqlSession sqlSession;

	@Autowired
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession =  sqlSession;
	}

	@Override
	public List<Map<String, Object>> searchUpperCode(Map<String, Object> data) {

		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.searchUpperCode(data);
	}

	@Override
	public List<Map<String, Object>> searchCode(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.searchCode(data);
	}

	@Override
	public List<Map<String, Object>> searchCodeBind(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.searchCodeBind(data);
	}

	@Override
	public int saveUpperCode(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.saveUpperCode(data);
	}

	@Override
	public int saveCode(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.saveCode(data);
	}

	@Override
	public int deleteUpperCode(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.deleteUpperCode(data);
	}

	@Override
	public int deleteUpperCode2(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.deleteUpperCode2(data);
	}

	@Override
	public int deleteCode(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.deleteCode(data);
	}

	@Override
	public Map<String, Object> searchUpperCodeCount(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.searchUpperCodeCount(data);
	}

	@Override
	public Map<String, Object> searchCodeCount(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.searchCodeCount(data);
	}

	@Override
	public Map<String, Object> searchCodeCount2(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.searchCodeCount2(data);
	}
	
	@Override
	public int updateVal1(Map<String, Object> data) {
		CodeDao codeDao = (CodeDao) sqlSession.getMapper(CodeDao.class);
		return codeDao.updateVal1(data);
	}
}
