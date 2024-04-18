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
	<div class="wrapper">
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
							<span class="labl">Role 명</span> <input class="inpt" type="text" id="roleNm"
								placeholder="롤명을 입력하세요.">
						</div>
						<input class="btnSearch" id="searchBtn" type="submit" value="조회">
					</div>
				</form>
			</section>
			<!-- //검색영역 -->
			<!-- 롤 관리 -->
			<section class="resultWarp height_s1t1">
				<div class="inner col_2">
					<div class="col" style="width: 500px;">
						<div class="titleArea">
							<h2>Role 관리</h2>
							<button type="button" id="insertRoleBtn" class="btn add">추가</button>
						</div>
						<div class="grid_wrapper" style="position: relative">
							<div id="first" tabIndex="0" data-ax5grid="firstGrid"
								data-ax5grid-config="{}"
								style="font-size: 20px; width: 100%; width: 100%; outline: none; height: 100%"></div>
						</div>
					</div>
					<div class="col" style="width: 840px;">
						<div class="titleArea">
							<h2>Role별 사용메뉴</h2>
							<button type="button" id="saveRoleBtn" style="display: none" class="btn add">설정</button>
						</div>
						<div class="grid_wrapper" style="position: relative">
							<div id="second" data-ax5grid="secondGrid"
								data-ax5grid-config="{}"
								style="font-size: 20px; width: 100%; height: 100%"></div>
						</div>
					</div>
					<!--- 레이어 팝업 (파라미터 추가) -->
					<div class="layPop" id="roleAddPop">
						<div class="popCon" style="width: 500px">
							<div class="titleArea">
								<h3 id="insertRolePopTitle">롤 관리</h3>
								<button type="button" id="roleAddCloseBtn"
									onblur="gfnRoleFocus()" class="btnClose">닫기</button>
							</div>
							<div class="tableType popUpForm">
								<table style="width: 100%">
									<colgroup>
										<col style="width: 115px" />

										<col style="width: 115px" />
										<col style="width: /" />
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">롤 ID</th>
											<td colspan="2"><input type="text" id="popRoleId"
												name="" /></td>
										</tr>
										<tr>
											<th scope="row">롤 명</th>
											<td colspan="2"><input type="text" id="popRoleName"
												name="" /></td>
										<tr>
											<th scope="row">기본 페이지</th>
											<td colspan="2">
											<select id="popLogin" style="width: 100%" name="" class="select">
											</select>
										</td>
									</tbody>
								</table>
							</div>
							<div class="btnWrap txt_center">
								<button class="btn blue" id="popRoleSave"
									onblur="gfnRoleFocus()" type="button">저장</button>
								<button class="btn" id="popRoleDelete" style="display: none;"
									type="button">삭제</button>
							</div>

						</div>
					</div>
					<!--- //레이어 팝업 -->
				</div>
			</section>
			<!-- //롤 관리 -->
		</div>
	</div>
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/admin/Role.js"></script>
</html>