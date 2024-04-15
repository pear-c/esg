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
	<div class="container">
		<div class="py-5 text-center">
			<h2>파일 업로드</h2>
		</div>	
	</div>
	
	<div style="margin: 10% 10% 10% 10%;">
		<form action="/Std/DrmDec" method="post" enctype="multipart/form-data">
			<input type="file" name="file"/>
			<input class="btn btn-primary btn-sm" type="submit" value="업로드"/>
		</form>
	</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/std/std.js"></script>
</html>