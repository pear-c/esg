<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>ESG경영 솔루션</title>
</head>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-2.2.4.min.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/admin_pc.css">

<body class="login_wrap">

<div id="container_index">
  <ul>
    <li class="wrapper">
       <div id="login_wrap">         
         <div>
            <ul>
           	 <form id="loginForm" name="inform" action="/main" method="post">
              <h5><img src="${pageContext.request.contextPath }/resources/img/login_logo.png" /></h5>
              <li style="margin-top:20px;"><label for="inp_id">사번</label> <input type="text" id="userId" name="userId" autocomplete="off" /></li>
              <li><label for="inp_pw">비밀번호</label> <input type="password" onkeyup="loginCheck()" id="userPwd" name="userPwd"/></li>             
              <li><a href="Javascript:login();">
              <img src="${pageContext.request.contextPath }/resources/img/login.png" /></a></li>
              </form>
              <!-- <li><a href="Javascript:registered();">
              <img src="${pageContext.request.contextPath }/resources/img/join.png" /></a></li>-->
            </ul>
         </div>
       </div>
    </li>
  </ul>
  
</div>	

<div class="login_pop">
    <div class="popbox" id="write01" style="display:none;">
       <ul id="outBox">

        </ul>
      
       <div id="bt_btn">
         <p onclick="submitForm()">확인</p>
         <p id="closebtn">취소</p>
       </div>
    </div>
    
</div>

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

