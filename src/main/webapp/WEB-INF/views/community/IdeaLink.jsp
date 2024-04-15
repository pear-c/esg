<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="../css/idea/common.css">
<link rel="stylesheet" type="text/css" href="../css/idea/style.css">
 <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-3.4.1.min.js"></script>
<title></title>
</head>
<body>

	<section class="section main">
        <div class="inner">     		
        	<div class="performChart" style="right: 30%">
	  			<h2 class="title_st02 color01">한울본부 현장 설명회</h2>
	            <div class="main_menu">
	                <a href="javascript:void(0)" onclick="menuHref2('/Idea/','CM0070','001100004005')" class="menu_bot">1발전소<span id="001100004005" style="display: block;">(0건)</span></a>
	                <a href="javascript:void(0)" onclick="menuHref2('/Idea/','CM0070','001100004006')" class="menu_bot">2발전소<span id="001100004006" style="display: block;">(0건)</span></a>
	            </div>
	            <div class="main_menu">
	             	<a href="javascript:void(0)" onclick="menuHref2('/Idea/','CM0070','001100004010')" class="menu_bot">3발전소<span id="001100004010" style="display: block;">(0건)</span></a>             	
	                <a href="javascript:void(0)" onclick="menuHref2('/Idea/','CM0070','001100004031')" class="menu_bot">신한울1발전소<span id="001100004031" style="display: block;">(0건)</span></a>
	            </div>
	            <div class="main_menu">            	
	             	<a href="javascript:void(0)" onclick="menuHref2('/Idea/','CM0070','001100004013')" class="menu_bot">건설소<span id="001100004013" style="display: block;">(0건)</span></a>
	             	<a href="javascript:void(0)" onclick="menuHref2('/Idea/','CM0070','001100004028')" class="menu_bot">대외협력처<span id="001100004028" style="display: block;">(0건)</span></a>
	            </div>
            </div>
            
            <div class="main_menu2" style="position: absolute;right: 5%;top: 8%">
	                <a href="javascript:void(0)" onclick="menuHref('/Idea/','CM0070')" style="font-weight: bold;" class="menu_bot2"><img alt="" src="../resources/img/main/link_bg01_1.png" style="width: 30%"><span style="display: block;" >기존</span>아이디어 제안</a>
	        </div>
        </div>
    </section>
</body>
<script type="text/javascript"src="${pageContext.request.contextPath }/resources/js/community/IdeaLink.js"></script>
</html>