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
	<div id="wrapper">
		<jsp:include page="../top.jsp"></jsp:include>
		<div id="contents">
			<nav class="breadcrumb ad">
				<ol>
					<li class="home"><a href="#"><img
							src="../../resources/img/breadcrumb_home.png" alt="홈"></a></li>
					<li><a href="#">${upprMenuName}</a></li>
					<li class="active">${menuName}</li>
				</ol>
			</nav>
			<!-- 검색영역 -->
			<section id="search">
				<form class="searchSet">
					<div class="row">
						<div class="item">
							<span class="labl">활동일자</span>
							<div class="inptDt">
								<label for="startDt" class="blind">시작일</label> <input
									type="text" id="startYmd" name="startYmd" autocomplete="off">
								<img src="../../resources/img/icon_calendar.gif" alt="날짜선택" title="날짜선택">
							</div>
							<span class="word_sign">-</span>
							<div class="inptDt">
								<label for="endDt" class="blind">종료일</label> <input type="text"
									id="endYmd" name="endYmd" autocomplete="off"> <img
									src="../../resources/img/icon_calendar.gif" alt="날짜선택" title="날짜선택">
							</div>
						</div>
						<div class="item">
							<span class="labl">사원명</span> <input class="inpt" id="userName" type="text"
								placeholder="사용자를 입력하세요.">
						</div>
						<input class="btnSearch" id="searchBtn" type="submit" value="조회">
					</div>
					<div class="row">
						<div class="item">
							<span class="labl">이벤트</span> <input class="inpt" id="event" type="text"
								placeholder="이벤트를 입력하세요.">
						</div>
					</div>
				</form>
			</section>
			<!-- //검색영역 -->
			<!-- 사용자 활동 이력 -->
			<section class="resultWarp height_s1">
				<div class="inner pt10">
					<div class="grid_wrapper" style="position: relative">
						<div id="first-grid" tabIndex="0" data-ax5grid="first-grid"
							data-ax5grid-config="{}"
							style="font-size: 20px; width: 100%; height: 93%"></div>							
						<div class="btnWrap">
			                <div class="btns_right">
			                    <button type="button" id="excelDown" class="btn_m03 btn_color10">Excel Download</button>
			                </div>
			            </div> 
					</div>					
				</div>
			</section>
			<!-- //사용자 활동 이력 -->
			    
		</div>
	</div>
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/admin/UserActHst.js"></script>
</html>