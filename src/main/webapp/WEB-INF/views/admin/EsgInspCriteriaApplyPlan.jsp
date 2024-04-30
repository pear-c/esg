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
							<span class="labl">진단 항목</span> <input class="inpt" type="text"
								id="dagnssItm" placeholder="진단 항목명을 입력하세요.">
						</div>
						<input class="btnSearch" id="searchBtn" type="submit" value="조회">
					</div>
				</form>
			</section>
			<!-- //검색영역 -->
			<!-- 코드관리 -->
			<section class="resultWarp height_s1t1">
				<div class="inner col_2">
					<div class="col" style="width: 660px">
						<div class="titleArea">
							<h2>분류항목</h2>
							<!-- <div class="align_right">
							<button type="button" id="upperCodeAdd" class="btn add">추가</button>
							</div> -->
							<!-- 팝업 레이어 열림 -->
						</div>
						<div class="grid_wrapper" style="position: relative">
							<div id="first-grid" data-ax5grid="first-grid"
								data-ax5grid-config="{}" tabIndex="0"
								style="font-size: 20px; width: 100%; height: 100%"></div>
						</div>
					</div>
					<div class="col" style="width: 680px">
						<div class="titleArea">
							<h2>점검기준 적용방안</h2>
							<div class="align_right"><button type="button" id="codeAdd" class="btn add">추가</button></div>
							<!-- 팝업 레이어 열림 -->
						</div>
						<div class="grid_wrapper" style="position: relative">
							<div id="second-grid" tabIndex="0" data-ax5grid="second-grid"
								data-ax5grid-config="{}"
								style="font-size: 20px; width: 100%; height: 100%"></div>
						</div>
					</div>
				</div>
				<!--- 레이어팝업 02 -->
				<div class="layPop" id="layPop02">
					<div class="popCon" style="width: 500px">
						<div class="titleArea">
							<h3>점검 기준 적용 방안</h3>
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
										<th scope="row">분류 번호</th>
										<td><input type="text" id="popEsgClassificationNo" name=""
											readonly="readonly" /></td>
									</tr>
									<tr>
										<th scope="row">단계및 충족 건수</th>
										<td><input type="text" id="popStepCnt"
											readonly="readonly" name="" /></td>
									</tr>
									<tr>
										<th scope="row">점수</th>
										<td><input type="text" id="popScore" name="" />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="btnWrap txt_center">
							<button class="btn blue" id="popParamSave2" type="button">저장</button>
							<button class="btn" id="popParamDelete2" type="button">삭제</button>
							<input type="hidden" id="hiddenEsgClassificationNo">
						</div>
					</div>
				</div>
				<!--- //레이어팝업 02 -->
			</section>
			<!-- //코드관리 -->
		</div>
	</div>
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/admin/EsgInspCriteriaApplyPlan.js"></script>
</html>