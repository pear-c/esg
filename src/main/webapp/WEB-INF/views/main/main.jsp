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
 <!-- mainContent -->
 <jsp:include page="../top.jsp"></jsp:include>
 <div class="mainContent">
    <div class="row">
        <section class="userInfo">
            <div class="user_log">
                <p><strong>${loginUserName}</strong><span>${loginUserDeptName}</span></p>
                <p>[최종접속정보 : ${loginUserDate}]</p>
            </div>
            <ul class="status_list">
                <li>작업중<span class="badge green" id="jobState1">0</span></li>
                <li>작업대기<span class="badge yellow" id="jobState0">0</span></li>
                <li>성공<span class="badge blue" id="jobState5">0</span></li>
                <li>실패<span class="badge red" id="jobState4">0</span></li>
                <li>보유과제<span class="badge gray" id="procStateA">0</span></li>
                <li>승인대기<span class="badge cloud" id="procStateS">0</span></li>
            </ul>
        </section>
        <section class="mainBanner" id="bannerView">

        </section>
        <div class="main_bg"></div>
    </div>
    <div class="row mt20">
        <section class="performChart">
            <h2 class="title_st01">연간 수행실적</h2>
            <ul>
                <li onmouseup="menuHref2('/AutomationTime/','DS0030','1')"><span>수행건수/건</span><strong id="procCnt">0</strong></li>
                <li onmouseup="menuHref('/AutomationTime/','DS0030')"><span>자동화시간/시간</span><strong id="automationTime">0</strong></li>
            </ul>
        </section>
        <section class="timeChart">
        	<div class="swiper-pagination"></div>
            <h2 class="title_st01">사업소별 자동화시간</h2>
            <div class="chart" style="border:1px solid #d6d6d6; padding:5px 20px">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                    	<div class="swiper-slide"><canvas id="myChart" style="width:456px;height:198px"></canvas></div>
                    	<div class="swiper-slide"><canvas id="myChart2" style="width:456px;height:198px"></canvas></div>
                    </div>
                </div>
            </div>
        </section>
        <section class="mainTime" id="TimeView"></section>
        <section class="storeLink">
            <h2 class="title_st01"><a href="javascript:void(0)" onclick="menuHref('/BotStore/','MB0010')">BOT STORE<i class="arrow"></i></a></h2>
            <div style="background-color:#4777b7">
                <ul>
                    <li><a href="javascript:void(0)" onclick="menuHref2('/BotStore/','MB0010','A')"><img src="../../resources/img/main/store_icon01.png" alt="아이콘이미지"><span>발전/정비</span><strong id="categoryA"></strong></a></li>
                    <li><a href="javascript:void(0)" onclick="menuHref2('/BotStore/','MB0010','B')"><img src="../../resources/img/main/store_icon02.png" alt="아이콘이미지"><span>회계/예산</span><strong id="categoryB"></strong></a></li>
                    <li><a href="javascript:void(0)" onclick="menuHref2('/BotStore/','MB0010','C')"><img src="../../resources/img/main/store_icon03.png" alt="아이콘이미지"><span>조달</span><strong id="categoryC"></strong></a></li>
                    <li><a href="javascript:void(0)" onclick="menuHref2('/BotStore/','MB0010','D')"><img src="../../resources/img/main/store_icon04.png" alt="아이콘이미지"><span>인사/총무</span><strong id="categoryD"></strong></a></li>
                    <li><a href="javascript:void(0)" onclick="menuHref2('/BotStore/','MB0010','E')"><img src="../../resources/img/main/store_icon05.png" alt="아이콘이미지"><span>신재생/ICT</span><strong id="categoryE"></strong></a></li>
                    <li><a href="javascript:void(0)" onclick="menuHref2('/BotStore/','MB0010','Z')"><img src="../../resources/img/main/store_icon06.png" alt="아이콘이미지"><span>기타</span><strong id="categoryZ"></strong></a></li>
                    <li><a href="javascript:void(0)"><span></span><strong></strong></a></li>
                    <li><a href="javascript:void(0)" onclick="menuHref('/BotStore/','MB0010')"><span>합계</span><strong id="categorySum"></strong></a></li>
                </ul>
            </div>
        </section>
    </div>
    <div class="row mt25">
        <section class="etcLink">
            <ul>
                <li><a href="javascript:void(0)" onclick="menuHref('/Idea/ideaLink','CM0070')"><span>아이디어 제안</span><i class="arrow"></i></a></li>
                <li><a href="javascript:void(0)" onclick="window.open('/upload/RPA포털_간략매뉴얼.pdf', '초보자 가이드','location=no, width=800, height=800, left=500, top=100')"><span>초보자 가이드</span><i class="arrow"></i></a></li>
            </ul>
        </section>
        <section class="tabBoard tabBoard_1" style="width:498px">
            <ul class="main_board_menu">
                <li><a href="#tabmenu" id="board1" class="active">공지사항</a></li>
                <li style="display: none"><a href="#tabmenu" id="board2">교육</a></li>
                <li><a href="#tabmenu" id="board3">홍보</a></li>
            </ul>
            <div class="main_board_box active" id="main_board_box1">
                <a href="javascript:void(0)" onclick="menuHref('/Notice/','CM0010')" class="more" title="공지사항 더보기"></a>
            </div>
            <div class="main_board_box" id="main_board_box2">
                <a href="javascript:void(0)" onclick="menuHref('/Edu/','CM0020')" class="more" title="교육 더보기"></a>
            </div>
            <div class="main_board_box" id="main_board_box3">
                <a href="javascript:void(0)" onclick="menuHref('/Promotion/','CM0030')" class="more" title="홍보 더보기"></a>
            </div>
        </section>
        <section class="tabBoard tabBoard_2" style="width:497px">
            <ul class="main_board_menu">
                <li><a href="#tabmenu" id="board4" class="active">Q&amp;A</a></li>
                <li><a href="#tabmenu" id="board5">FAQ</a></li>
                <li><a href="#tabmenu" id="board6">장애신고</a></li>
            </ul>
            <div class="main_board_box active" id="main_board_box4">
                <a href="javascript:void(0)" onclick="menuHref('/Qna/','CM0040')" class="more" title="Q&A 더보기"></a>
            </div>
            <div class="main_board_box" id="main_board_box5">
                <a href="javascript:void(0)" onclick="menuHref('/Faq/','CM0050')" class="more" title="FAQ 더보기"></a>
            </div>
            <div class="main_board_box" id="main_board_box6">
                <a href="javascript:void(0)" onclick="menuHref('/ErrorReport/','CM0060')" class="more" title="장애신고 더보기"></a>
            </div>
        </section>
    </div>
 </div>
 <!-- //mainContent -->
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/chartjs/Chart.bundle.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/main/main.js"></script>
<script type="text/javascript">
	var loginSsoUserId = '${loginSsoUserId}';
</script>
</html>