<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <!DOCTYPE html>
<html>
<header>
	<div class="gnbWrap">
		<div class="top">
			<h1>
				<!-- <a href="/Main/"><img-->
				<a href="javascript:void(0)" onclick="menuHref('${loginPage.MENU_URL}','${loginPage.MENU_ID}')"><img
					src="${pageContext.request.contextPath }/resources/img/logo_rpa_busanbank.png"
					alt="RPA 업무자동화포털">
					<!-- <h2 class="color01" style="float: right; margin: 2px 10px 10px 15px;font-size: 22px;color: #003869;font-family: auto;">RPA성과평가포털</h2> -->
					</a>


			</h1>
		<!-- <a href="/Main/"><img
				src="${pageContext.request.contextPath }/resources/img/logo_khnp.png"
				alt="한국수력원자력 업무포털"></a>-->
			<div class="user_log align_top_right">
				<strong>${loginUserName}</strong>님 반갑습니다! <span>[${loginUserDate}]</span>
				<button class="btn_logout" type="button" id="btnLogout">
					<span class="blind">로그아웃</span>
				</button>
			</div>
		</div>
		<nav class="top_menu align_left">
			<ul>
				<c:forEach var="menuTop" items="${menuTop}" varStatus="status">
					<li><a
					<c:if test="${status.first}"> onclick="menuHref('${menu[0].MENU_URL}','${menu[0].MENU_ID}')" </c:if>
					 href="#" class="topmenu-${status.count}"><span
							class="title"><span class="off">${menuTop.UPPR_MENU_NM}</span><span
								class="on">${menuTop.UPPR_MENU_NM}</span></span></a>
						<div class="top_submenu">
							<ul>
								<c:forEach var="menu" items="${menu}" varStatus="status2">
									<c:if test="${menuTop.UPPR_MENU_ID eq menu.UPPR_MENU_ID}">
										<c:if test="${menu.MENU_ID != 'MB0070'}">
										<!-- <c:choose> 
											<c:when test="${property[0].UPPR_CODE eq 'SOURCE_DIV' && property[0].CODE eq '1' && menu.MENU_ID eq 'MB0040'}">
												<li><a
													onclick="menuHref('/Main/','MA0010')"
													href="#"><span class="title">메인 페이지</span></a></li>
											</c:when> 
											<c:otherwise>												
												<li><a
													onclick="menuHref('${menu.MENU_URL}','${menu.MENU_ID}')"
													href="#"><span class="title">${menu.MENU_NM}</span></a></li>
											</c:otherwise> 
										</c:choose> -->
											<li><a
												onclick="menuHref('${menu.MENU_URL}','${menu.MENU_ID}')"
												href="#"><span class="title">${menu.MENU_NM}</span></a></li>
										</c:if>
									</c:if>
								</c:forEach>
							</ul>
						</div></li>
				</c:forEach>
			</ul>
		</nav>
		<div class="bg"></div>
	</div>
	<div class="mask_totalmenu"></div>
</header>
</html>