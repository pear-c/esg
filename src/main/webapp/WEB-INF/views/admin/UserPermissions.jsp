<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta charset="UTF-8">
<title></title>
<style type="text/css">
    		
			::placeholder {
				font-family: 'NanumSquare' , sans-serif;
				opacity : 1;
			}
			
			::-ms-input-placeholder {
				font-family: 'NanumSquare' , sans-serif;
			}
    </style>
</head>
<body>
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
					<div class="item">
						<span class="labl">사번</span> <input class="inpt" type="text"
							id="userId" placeholder="사번을 입력하세요.">
					</div>
					<div class="item">
						<span class="labl">직원명</span> <input class="inpt" type="text"
							id="userName" placeholder="직원명을 입력하세요.">
					</div>
					<div class="item">
						<span class="labl">Role코드</span> <input class="inpt" type="text"
							id="roleId" placeholder="Role 코드를 입력하세요.">
					</div>
					<input class="btnSearch" id="searchBtn" type="submit" value="조회">
				</div>
			</form>
		</section>
		<!-- //검색영역 -->
		<!-- 롤 관리 -->
		<section class="resultWarp height_s1t1">
			<div class="inner">
				<div class="titleArea">
					<h2>사용자별 권한</h2>
					<button type="button" id="insertBtn" class="btn add">추가</button>
					<!-- <input class="btn add"id="insertBtn" type="submit" value="추가"> -->
				</div>
				<div class="grid_wrapper" style="position: relative">
					<div id="first" tabIndex="0" data-ax5grid="firstGrid"
					data-ax5grid-config="{}"
					style="font-size: 20px; height: 100%; outline: none;"></div>
				</div>
			</div>
			<!--- 레이어 팝업 (파라미터 추가) -->
			<div class="layPop" id="layPop01">
				<div class="popCon" style="width: 500px">
					<div class="titleArea">
						<h3 id="insertUserPopTitle">사용자 관리</h3>
						<button type="button" id="closeBtn" class="btnClose"
							onblur="gfnFocus()">닫기</button>
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
									<th scope="row">그룹사명</th>
										<td colspan="2"><select id="popParamCmgrpCd" name=""
											class="select checkFormat selectIsNull" style="width: 100%">
										</select></td>
								</tr>
								<tr>
									<th scope="row">사번</th>
									<td colspan="2"><input type="text" id="popUserId" name="" />
									</td>
								</tr>
								<tr>
									<th scope="row">사용자명</th>
									<td colspan="2"><input type="text" id="popUserNameRole"
										name="" /></td>
								</tr>
								<tr>
									<th scope="row">비밀번호</th>
									<td colspan="2"><input type="password" id="popUserPwd"
										name="" style="width: 100%"/></td>
								</tr>
								<tr>
									<th scope="row">비밀번호 확인</th>
									<td colspan="2"><input type="password" id="popUserPwdConfirm"
										name="" style="width: 100%"/></td>
								</tr>
								<tr>
									<th scope="row">롤</th>
									<td><select name="" id="popRole" class="select"
										style="width: 355%">
									</select></td>
								</tr>
								<tr>
									<th scope="row">접근IP</th>
									<td colspan="2"><input type="text" id="popAccessIp"
										name="" /></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btnWrap txt_center">
						<button class="btn blue" id="popUserSave" onblur="gfnFocus()"
							type="button">저장</button>
						<button class="btn" id="popUserDelete" style="display: none;"
							type="button">삭제</button>
					</div>

				</div>
			</div>
			<!--- //레이어 팝업 (파라미터 추가)-->
		</section>
		<!-- //롤 관리 -->
	</div>
</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/admin/UserPermissions.js"></script>
</html>