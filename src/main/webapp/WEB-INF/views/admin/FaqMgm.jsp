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
							<span class="labl">그룹사명</span> <select id="cmgrpCd" name=""
								class="select">
							</select>
						</div>
						<input class="btnSearch" id="searchBtn" type="submit" value="조회">
					</div>
				</form>
			</section>
			<!-- //검색영역 -->
			<!-- FAQ 관리 -->
			<section class="resultWarp height_t1">
				<div class="inner">
					<div class="titleArea">
						<button type="button" id="popParamAdd" class="btn add">추가</button>
					</div>
					<div class="grid_wrapper" style="position: relative" >
						<div id="first-grid" data-ax5grid="first-grid"
							data-ax5grid-config="{}"
							style="font-size: 20px; width: 100%; height: 100%"></div>
					</div>
					<!--- 레이어 팝업 (FAQ 관리) -->
					<div class="layPop" id="layPop01">
						<div class="popCon" style="width: 1300px">
							<div class="titleArea">
								<h3>FAQ 관리</h3>
								<button type="button" class="btnClose"
									onclick="document.getElementById('layPop01').style.display='none'">닫기</button>
							</div>
							<div class="tableType popUpForm">
								<table style="width: 100%">
									<colgroup>
										<col style="width: 115px" />
										<col style="width: /" />
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">그룹사명</th>
											<td><select id="popParamCmgrpCd" name=""
												class="select checkFormat selectIsNull" style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">질문</th>
											<td><textarea name="" id="popParamQuestion"
													class="checkFormat" cols="" rows="3" style="height: 75px"></textarea>
											</td>
										</tr>
										<tr>
											<th scope="row">답변</th>
											<td><textarea name="" id="popParamAnswer"
													class="checkFormat" cols="" rows="12" style="height: 265px"></textarea>
											</td>
										</tr>
										<tr>
											<th scope="row">사용여부</th>
											<td><select id="popParamUseYn" name=""
												class="select checkFormat" style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">순번</th>
											<td><input type="text" class="checkFormat numberFormat"
												id="popParamSortNo" name="" /></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="btnWrap txt_center">
								<button type="button" class="btn blue" id="updateBtn"
									class="btn">저장</button>
								<button class="btn" style="display: none" id="deleteBtn"
									type="button">삭제</button>
							</div>
							<input type="hidden" id="hiddenFaqId">
						</div>
					</div>
					<!--- //레이어 팝업 -->
				</div>
			</section>
			<!-- //FAQ 관리 -->
		</div>
	</div>
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/admin/FaqMgm.js"></script>
</html>