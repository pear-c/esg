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
							<span class="labl">필드2</span> <input class="inpt" type="text" id="fld2"
								placeholder="필드2를 입력하세요.">
						</div>
						<input class="btnSearch" id="searchBtn" type="submit" value="조회">
					</div>
				</form>
			</section>
			<!-- //검색영역 -->
			<!-- Contents 관리 -->
			<section class="resultWarp height_s1t1">
				<div class="inner">
					<div class="titleArea">
						<button type="button" class="btn add" id="btnAdd"
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
								<h3>필드 관리</h3>
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

											<th scope="row">필드1</th>
											<td>
											     <input type="hidden" id="hiddenFld1" name="" value="" /> 
												 <input type="text" id="popFld1" name="" value="" />
											</td>
										</tr>
										<tr>
											<th scope="row">필드2</th>
												 <td><input type="text" id="popFld2" name="" value="" />
											     </td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="btnWrap txt_center">
								<input class="btn blue" id="btnSave" type="submit" value="저장">
								<button class="btn" id="btnDelete" type="button" style="display:none;">삭제</button>
							</div>
						</div>
					</div>
					<!--- //레이어 팝업 (메세지 추가) -->
				</div>
			</section>
			<!-- //메시지 관리 -->
		</div>
	</div>
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/admin/Example2.js"></script>
</html>