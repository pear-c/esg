<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <!DOCTYPE html>
 <html>
	<header id="header">
		
       <div class="gnb">
           <h1><span>FileList</span></h1>
           <div>
               <ul>
               		<c:forEach var="fileList" items="${fileList}" varStatus="status">
               		<li>
               			<a href="/FileDown?FileName=${fileList}">${fileList}</a>
               		<li>               		
               		</c:forEach>            
               </ul>
           </div>
       </div>
   </header>
</html>