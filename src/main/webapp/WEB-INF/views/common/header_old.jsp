<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <!DOCTYPE html>
 <html>
	<header id="header">
       <div class="gnb">
           <h1><a href="#" class="logo"><span>KHCP RPA</span></a></h1>
           <div class="gnbMenu">
               <ul class="depth1">
               		<c:forEach var="menuTop" items="${menuTop}" varStatus="status">
               		<li>
               			<a href="#">${menuTop.UPPR_MENU_NM}</a>
               			<ul class="depth2">
               			<c:forEach var="menu" items="${menu}" varStatus="status">
               				<c:if test="${menuTop.UPPR_MENU_ID eq menu.UPPR_MENU_ID}">               				
               					<li><a onclick="menuHref('${menu.MENU_URL}','${menu.MENU_ID}')" href="#">${menu.MENU_NM}</a></li>
               				</c:if>               				
               			</c:forEach>
               			</ul>
               		<li>               		
               		</c:forEach>         
               </ul>
           </div>
           <div class="gnbUser">
               <button class="userInfo">
                   <div class="profileImg"><img src="${pageContext.request.contextPath }/resources/img/gnb_user_photo.png" alt="프로필이미지"></div>   
                   <span>홍길동 님</span>
               </button>
               <ul class="dropdownCont">
                   <li>작업대기<span class="badge cyan">2</span></li>
                   <li>진행중<span class="badge green">1</span></li>
                   <li>실패<span class="badge gray">1</span></li>
                   <li>성공<span class="badge blue">1</span></li>
               </ul>
           </div>
       </div>
   </header>   
</html>