package com.portal.main.service;

import java.util.*;
import java.util.Map;



public interface MainService {
	public List<Map<String, Object>> searchTopMenu(Map<String, Object> data);
	public List<Map<String, Object>> searchMenu(Map<String, Object> data);
	public List<Map<String, Object>> searchUserInfo(Map<String, Object> data);
	public Map<String, Object> loginUserInfo(Map<String, Object> data);

	//사용자 작업 및 과제 현황
	public Map<String, Object> searchUserJobInfo(Map<String, Object> data);
	//배터 조회
	public List<Map<String, Object>> searchBanner(Map<String, Object> data);
	//연간 수행 실적
	public Map<String, Object> searchProcPerform(Map<String, Object> data);
	//연간 자동화 시간(사업소)
	public List<Map<String, Object>> searchYearBizAutomationTime(Map<String, Object> data);
	//연간 자동화 시간(과제별)
	public List<Map<String, Object>> searchYearProcAutomationTime(Map<String, Object> data);

	public List<Map<String, Object>> searchYearProcAutomationTime2(Map<String, Object> data);

	public List<Map<String, Object>> searchYearProcAutomationTime3(Map<String, Object> data);

	//BOT STORE 조회
	public Map<String, Object> searchBotStoreSummary(Map<String, Object> data);
	//공지사항
	public List<Map<String, Object>> searchBBSNotice(Map<String, Object> data);
	//교육
	public List<Map<String, Object>> searchBBSEdu(Map<String, Object> data);
	//홍보
	public List<Map<String, Object>> searchBBSPromotion(Map<String, Object> data);
	//Q&A
	public List<Map<String, Object>> searchBBSQna(Map<String, Object> data);
	//FAQ
	public List<Map<String, Object>> searchBBSFaq(Map<String, Object> data);
	//장애신고
	public List<Map<String, Object>> searchBBSErrorReport(Map<String, Object> data);
}
