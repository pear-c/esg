<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta charset="UTF-8">
    <title></title>
</head>
<body>


<!-- 디자이너 영역 -->


</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>

<script type="text/javascript">
//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호


//-------------------------------------------------------------------------------
// 공통 함수영역
//-------------------------------------------------------------------------------
/**
 * 조회 처리전 사전 체크
 */
function fnPreSearch() {
    
    if ("" == $("#checkValId").val()) {
        //"" 이(은) 필수 입력 항목 입니다.
        gfnAlert("CHECK", "ERROR");
        return false;
    }
    
    
    return true;
}

/**
 * 조회 처리
 */
function fnSearch() {
    
    if (fnPreSearch())
        gfnSearch();
}

/**
 * 조회 콜백
 */
function fnSearchCallback() {
    
}

/**
 * 입력 처리전 사전 체크
 */
function fnPreInsert() {
    if ("" == $("#checkValId").val()) {
        //"" 이(은) 필수 입력 항목 입니다.
        gfnAlert("CHECK", "ERROR");
        return false;
    }
    
    
    return true;
}

/**
 * 입력 처리
 */
function fnInsert() {
    if (fnPreInsert())
        gfnInsert();
}

/**
 * 수정 처리전 사전 체크
 */
function fnPreUpdate() {
    if ("" == $("#checkValId").val()) {
        //"" 이(은) 필수 입력 항목 입니다.
        gfnAlert("CHECK", "ERROR");
        return false;
    }
    
    
    return true;
}

/**
 * 수정 처리
 */
function fnUpdate() {
    if (fnPreUpdate())
        gfnUpdate();
}

/**
 * 삭제 처리전 사전 체크
 */
function fnPreDelete() {
    if ("" == $("#checkValId").val()) {
        //"" 이(은) 필수 입력 항목 입니다.
        gfnAlert("CHECK", "ERROR");
        return false;
    }
    
    
    return true;
}

/**
 * 삭제 처리
 */
function fnDelete() {
    if (fnPreDelete())
        gfnDelete();
}

//-------------------------------------------------------------------------------
// 사용자 정의 함수
// ::: 자유롭게 작성 하되 fn Prefix와 함께 Camel 케이스 표기법으로 작성
//-------------------------------------------------------------------------------
/**
 * 사용자 정의 함수 입니다.
 */
function fnUserDefine() {
    
}

//-------------------------------------------------------------------------------
// JQuery
//-------------------------------------------------------------------------------
$(function(){
    
    //공통 버튼 이벤트 핸들러 추가
    $("#search_btn").click(function(){
        fnSearch();
    });
    
    $("#insert_btn").click(function(){
        fnInsert();
    });
    
    $("#update_btn").click(function(){
        fnUpdate();
    });
    
    $("#delete_btn").click(function(){
        fnDelete();
    });
    
    //로딩 후 조회시
    //fnSearch();
}

</script>

</html>