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
							<span class="labl">영역</span> 
							<select name="" id="esgDomain"
								class="select" style="min-width: 130px">
							</select>
						</div>
						<div class="item">
							<span class="labl">범주</span>
							<select name="" id="esgCtgry"
								class="select" style="min-width: 130px">
							</select>
						</div>
						<input class="btnSearch" id="searchBtn" type="submit" value="조회">
					</div>
				</form>
			</section>
			<!-- //검색영역 -->
			<!-- 팝업 관리 -->
			<section class="resultWarp height_s1t1">
				<div class="inner">
					<div class="titleArea">
						<button type="button" class="btn add" id="insertBtn"
							onclick="document.getElementById('layPop01').style.display='block'">추가</button>
						<!-- 팝업 레이어 열림 -->
					</div>
					<div class="grid_wrapper" style="position: relative">
						<div id="firstGrid" tabIndex="0" data-ax5grid="firstGrid"
							data-ax5grid-config="{}" style="font-size: 20px; height: 100%;"></div>
					</div>
					<!--- 레이어 팝업 (메세지 추가) -->
					<div class="layPop" id="layPop01">
						<div class="popCon" style="width: 700px">
							<div class="titleArea">
								<h3>진단항목 관리</h3>
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

											<th scope="row">영역</th>
											<td><select name="" id="popEsgDomain" class="select"
													style="width: 100%">
												</select></td>
										</tr>
										<tr>
											<th scope="row">범주</th>
											<td><select name="" id="popEsgCtgry" class="select"
												style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">분류 번호</th>
											<td><input type="text" id="popEsgClassificationNo" name="" />
											</td>
										</tr>
										<tr>
											<th scope="row">진단 항목</th>
											<td><input type="text" id="popDagnssItm" name="" />
											</td>
										</tr>
										<tr>
											<th scope="row">항목 설명</th>
											<td><textarea name="" id="popDagnssItmDesc"
													class="checkFormat" cols="" rows="5" style="height: 125px"></textarea>
											</td>
										</tr>
										<tr>
											<th scope="row">적용 방안</th>
											<td><select name="" id="popAplcnMethod" class="select"
												style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">기초/심화</th>
											<td><select name="" id="popBasicAdvance" class="select"
												style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">첨부 파일 여부</th>
											<td><select name="" id="popIsAttachFiles" class="select"
												style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">사용 여부</th>
											<td><select name="" id="popUseYn" class="select"
												style="width: 100%">
											</select></td>
										</tr>
										<tr>
											<th scope="row">정렬 순서</th>
											<td><input type="text" id="popSortNo" name="" />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="btnWrap txt_center">
								<input class="btn blue" id="msgSave" type="submit" value="저장">
								<button class="btn" id="msgDel" type="button" style="display:none;">삭제</button>
							</div>
						</div>
					</div>
					<!--- //레이어 팝업 (메세지 추가) -->
				</div>
			</section>
			<!-- // 팝업 관리 -->
		</div>
	</div>
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/admin/EsgDagnssItm.js"></script>
</html>