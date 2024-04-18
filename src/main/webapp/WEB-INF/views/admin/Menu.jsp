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
							<span class="labl">메뉴명</span> <input class="inpt" id="menuName" type="text"
								placeholder="메뉴명을 입력하세요.">
						</div>
						<input class="btnSearch" id="searchBtn" type="submit" value="조회">
					</div>
				</form>
			</section>
			<!-- //검색영역 -->
			<!-- 메뉴 관리 -->
			<section class="resultWarp height_s1t1">
				<!-- <div class="inner"> -->
				<div class="inner col_2">
					<div class="col" style="width: 455px;">
						<div class="titleArea">
							<h2>상위메뉴</h2>
							<button type="button" id="upperMenuAdd" class="btn add">추가</button>
							<!-- 팝업 레이어 열림 -->
						</div>
						<div class="grid_wrapper" style="position: relative;" >
							<div id="first-grid" data-ax5grid="first-grid"
								data-ax5grid-config="{}" tabIndex="0"
								style="font-size: 20px; width: 100%; height: 100%"></div>
						</div>
					</div>
					<div class="col" style="width: 885px;">
						<div class="titleArea">
							<h2>메뉴</h2>
							<button type="button" id="menuAdd" class="btn add">추가</button>
							<!-- 팝업 레이어 열림 -->
						</div>
						<div class="grid_wrapper" style="position: relative; height: 644px;" >
							<div id="second-grid" tabIndex="0" data-ax5grid="second-grid"
								data-ax5grid-config="{}"
								style="font-size: 20px; width: 100%; height: 100%"></div>
						</div>
					</div>
					<!-- </div> -->
					<!--- 레이어 팝업 메뉴 추가 -->
					<div class="layPop" id="layPop01">
						<div class="popCon" style="width: 500px">
							<div class="titleArea">
								<h3>상위메뉴 관리</h3>
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
											<th scope="row">상위메뉴 ID</th>
											<td><input type="text" id="popParamUpperMenuId" name="" />
											</td>
										</tr>
										<tr>
											<th scope="row">상위메뉴 명</th>
											<td><input type="text" id="popParamUpperMenuName"
												name="" /></td>
										</tr>
										<tr>
											<th scope="row">사용</th>
											<td><select name="" id="popParamUpperMenuUseYn"
												class="select" style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">순번</th>
											<td><input type="text" id="popParamUpperMenuSortNo"
												name="" /></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="btnWrap txt_center">
								<button class="btn blue" id="popParamSave" type="button">저장</button>
								<button class="btn" id="popParamDelete" type="button">삭제</button>
							</div>
						</div>
					</div>
					<!--- //레이어 팝업 -->
					<!--- 레이어 팝업 메뉴 추가 -->
					<div class="layPop" id="layPop02">
						<div class="popCon" style="width: 500px">
							<div class="titleArea">
								<h3>메뉴 관리</h3>
								<button type="button" class="btnClose"
									onclick="document.getElementById('layPop02').style.display='none'">닫기</button>
							</div>
							<div class="tableType popUpForm">
								<table style="width: 100%">
									<colgroup>
										<col style="width: 115px" />
										<col style="width: /" />
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">상위메뉴</th>
											<td><input type="text" id="popParamUpperMenuName2"
												readonly="readonly"></td>
										</tr>
										<tr>
											<th scope="row">메뉴 ID</th>
											<td><input type="text" id="popParamMenuId" name="" /></td>
										</tr>
										<tr>
											<th scope="row">메뉴 명</th>
											<td><input type="text" id="popParamMenuName" name="" />
											</td>
										</tr>
										<tr>
											<th scope="row">메뉴 경로</th>
											<td><input type="text" id="popParamMenuPath" name="" />
											</td>
										</tr>
										<tr>
											<th scope="row">메뉴 URL</th>
											<td><input type="text" id="popParamMenuUrl" name="" /></td>
										</tr>
										<tr>
											<th scope="row">사용여부</th>
											<td><select name="" id="popParamMenuUseYn"
												class="select" style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">순번</th>
											<td><input type="text" id="popParamMenuSortNo" name="" />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="btnWrap txt_center">
								<button class="btn blue" id="popParamSave2" type="button">저장</button>
								<button class="btn" id="popParamDelete2" type="button">삭제</button>
								<input type="hidden" id="hiddenUpperMenu"> <input
									type="hidden" id="hiddenUpperMenuName">
							</div>
						</div>
					</div>
					<!--- //레이어 팝업 -->
				</div>
			</section>
			<!-- //메뉴 관리 -->
		</div>
	</div>
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/admin/Menu.js"></script>
</html>