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
<jsp:include page="../top.jsp"></jsp:include>
<div id="contents">
            <nav class="breadcrumb">
                <ol>
                    <li class="home"><a href="#"><img src="../../resources/img/breadcrumb_home.png" alt="홈"></a></li>
                    <li><a href="#">커뮤니티</a></li>
                    <li class="active">FAQ</li>
                </ol>
            </nav>
            <!-- FAQ 목록 -->
            <section class="pt30 inner">
                <h2 class="sub_title">FAQ</h2>
                <div class="faqList">
                    <ul id="faqData"></ul>
                </div>
                <!-- 페이징 네비게이션 -->
                <!-- <p class="pagingNav mt10 mb10" id="pagingNum"></p> -->
                <!-- //페이징 네비게이션 -->
            </section>
            <!-- //FAQ 목록 -->
        </div>
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/community/Faq.js"></script>
<script type="text/javascript">
	var searchId		='${searchId}'
</script>

</html>