<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>공급망 K-ESG</title>
    <link rel="icon" href="${pageContext.request.contextPath }/resources/images3/favicon.ico">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css3/common.css">
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/library/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/library/jquery-easing/jquery.easing.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/library/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/library/bootstrap/datepicker.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/library/bootstrap/datepicker.ko.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/library/bootstrap-select/js/bootstrap-select.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/library/feather/feather.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/common.js"></script>
</head>

<body>
    <!-- 로그인 -->
    <div class="loginCon">
        <h1 class="login_h1"><span class="sr_only">공급망 K-ESG</span></h1>
        <div class="bg_area"></div>
        <form id="loginForm" name="inform" action="/main" method="post" class="loginForm">
            <h2 class="login_h2">로그인</h2>
            <P>공급망 K-ESG</P>
            <div class="input_wrap">
                <label for="userId">아이디</label>
                <input type="text" id="userId" name="userId" autocomplete="off" class="with_ico" placeholder="아이디를 입력해 주세요">  
                <span class="ico_id"></span>
            </div>
            <div class="input_wrap">
                <label for="userPwd">비밀번호</label>
                <input type="password" id="userPwd" name="userPwd" onkeyup="loginCheck()" class="with_ico" placeholder="비밀번호를 입력해 주세요.">
                <span class="ico_pw"></span>
            </div>
            <button class="btn_login" type="button" onclick="Javascript:login();">로그인</button>
            <!-- <P>Ctrl + Alt + Del 비밀번호를 입력해 주세요.</P> -->
        </form>
        <p class="copyright">COPYRIGHT 2024 IAMZRoad. ALL RIGHTS RESERVED.</p>
    </div>
    <!-- //로그인 -->
</body>

<script type="text/javascript">
function login() {
		
	if(typeof $("#userId").val() == "undefined" ||  $("#userId").val() == null || $("#userId").val() == ""){alert("사번을 입력 하세요.");$("#userId").focus();return;}
	if(typeof $("#userPwd").val() == "undefined" ||  $("#userPwd").val() == null || $("#userPwd").val() == ""){alert("비밀번호를 입력 하세요.");$("#userPwd").focus();return;}
	
	document.inform.submit();
}

function loginCheck(){
	if(window.event.keyCode == 13){
		login()
    }	
}

</script>
</html>
