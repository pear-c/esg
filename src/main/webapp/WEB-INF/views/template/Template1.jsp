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
							<span class="labl">상위코드명</span> <input class="inpt" type="text"
								id="upperCodeName" placeholder="상위코드명을 입력하세요.">
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
							<h2>상위코드</h2>
							<div class="align_right">
							<button type="button" id="upperCodeAdd" class="btn add">추가</button>
							</div>
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
							<h2>상세코드</h2>
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
				<!--- 레이어 팝업 01 -->
				<div class="layPop" id="layPop01">
					<div class="popCon" style="width: 500px">
						<div class="titleArea">
							<h3>주코드 내역</h3>
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
										<th scope="row">상위코드</th>
										<td><input type="text" readonly="readonly"
											id="popParamUpperCode" name="" /></td>
									</tr>
									<tr>
										<th scope="row">상위코드명</th>
										<td><input type="text" id="popParamUpperCodeName" name="" />
										</td>
									</tr>
									<tr>
										<th scope="row">환경설정</th>
										<td><select name="" id="popParamConfigYn" class="select"
											style="width: 100%">
										</select></td>
									</tr>
									<tr>
										<th scope="row">입력설정</th>
										<td><select name="" id="popParamInputYn" class="select"
											style="width: 100%">
										</select></td>
									</tr>
									<tr>
										<th scope="row">사용여부</th>
										<td><select name="" id="popParamCodeUseYn" class="select"
											style="width: 100%">
										</select></td>
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
				<!--- //레이어팝업 01 -->
				<!--- 레이어팝업 02 -->
				<div class="layPop" id="layPop02">
					<div class="popCon" style="width: 500px">
						<div class="titleArea">
							<h3>코드 정보</h3>
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
										<th scope="row">주코드</th>
										<td><input type="text" id="popParamUpperCodeName2" name=""
											readonly="readonly" /></td>
									</tr>
									<tr>
										<th scope="row">코드</th>
										<td><input type="text" id="popParamCode"
											readonly="readonly" name="" /></td>
									</tr>
									<tr>
										<th scope="row">코드명</th>
										<td><input type="text" id="popParamCodeName" name="" />
										</td>
									</tr>
									<tr>
										<th scope="row">Val1</th>
										<td><input type="text" id="popParamVal1" name="" />
										</td>
									</tr>
									<tr>
										<th scope="row">Val2</th>
										<td><input type="text" id="popParamVal2" name="" />
										</td>
									</tr>
									<tr>
										<th scope="row">순번</th>
										<td><input type="text" id="popParamSortNo" name="" /></td>
									</tr>
									<tr>
										<th scope="row">사용여부</th>
										<td><select name="" id="popParamCodeUseYn2"
											class="select" style="width: 100%">
										</select></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="btnWrap txt_center">
							<button class="btn blue" id="popParamSave2" type="button">저장</button>
							<button class="btn" id="popParamDelete2" type="button">삭제</button>
							<input type="hidden" id="hiddenUpperCode"> <input
								type="hidden" id="hiddenUpperCodeName">
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
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/template/Template1.js"></script>
</html>