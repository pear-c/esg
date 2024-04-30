<%@page import="org.apache.ibatis.reflection.SystemMetaObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>ESG경영 솔루션 </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta content="user-scalable=yes, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" name="viewport">
    <link href="${pageContext.request.contextPath }/resources/css/content.css" rel="stylesheet" type="text/css" >
    <link href="${pageContext.request.contextPath }/resources/css/jquery-ui.css" rel="stylesheet" type="text/css" >
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/ax5ui/src/ax5core/dist/ax5core.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/ax5ui/src/ax5ui-grid/dist/ax5grid.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/common.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/chartjs/Chart.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery.minicolors.js"></script>
    <!-- page specific script -->
    <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/swiper.min.css">
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/swiper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/namo_scripteditor.js"></script>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/ax5ui/src/ax5ui-grid/dist/ax5grid.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/jquery.minicolors.css">
    <%-- <script type="text/javascript" src="${pageContext.request.contextPath }/resources/ax5ui/jquery-3.2.1.min.js"></script> --%>

    <link href="${pageContext.request.contextPath }/resources/css/select2.min.css" rel="stylesheet" type="text/css" >
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/select2.min.js"></script>

    <link href="${pageContext.request.contextPath }/resources/css/top.css" rel="stylesheet" type="text/css" >

	<!-- Core build with no theme, formatting, non-essential modules -->
	<link href="${pageContext.request.contextPath }/resources/css/quill/quill.core.css" rel="stylesheet">
	<script src="${pageContext.request.contextPath }/resources/js/quill/quill.core.js"></script>


	<script src="${pageContext.request.contextPath }/resources/js/quill/quill.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/quill/quill.min.js"></script>
	
	<script src="${pageContext.request.contextPath }/resources/js/ag-grid-community/ag-grid-community.min.js"></script>

	<script src="${pageContext.request.contextPath }/resources/js/quill/highlight.min.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/quill/katex.min.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/quill/image-resize.min.js"></script>
	<link href="${pageContext.request.contextPath }/resources/css/quill/quill.snow.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath }/resources/css/quill/quill.bubble.css" rel="stylesheet">

</head>
<%
    Object message = session.getAttribute("message");

	Object gMenuId = request.getAttribute("gMenuId");
%>

<body>

	<jsp:include page="./common/header.jsp"></jsp:include>
    <jsp:include page="./common/footer.jsp"></jsp:include>

    <!--- 팝업  -->
    <div class="layPop" id="tPopUserInfo">
        <div class="popCon" style="width: 600px">
            <div class="titleArea">
                <h3>사용자 검색</h3>
                <button type="button" class="btnClose"
                    onclick="document.getElementById('tPopUserInfo').style.display='none'">닫기</button>
            </div>
            <div class="searchArea mt10">
                <div class="item">
                    <label>이름</label><input class="inpt" id="popUserName"
                        data-search="pop_search" type="text" placeholder="">
                </div>
                <div class="item">
                    <label>부서</label><input class="inpt" id="popUserDeptName"
                        data-search="pop_search" type="text" placeholder="">
                </div>
                <input class="btn_search" id="pop_search" type="button" value="조회">
            </div>
            <div class="gridType">
                <div style="position: relative; height: 400px;" >
                    <div data-ax5grid="popUp-grid" data-ax5grid-config="{}"
                        style="font-size: 30px; height: 100%;"></div>
                </div>
            </div>
        </div>
    </div>
    <!--- 팝업 -->
    <!--- 알림팝업 -->
    <div class="layPop" id="confirmPop" style="padding-top:300px; z-index: 300">
        <div class="popCon" style="width: 500px">
            <div class="titleArea">
                <h3>알림</h3>
                <button type="button" class="btnClose"
                    onclick="document.getElementById('confirmPop').style.display='none'">닫기</button>
            </div>
            <pre class="PopMsg" style="text-align:center"></pre>
            <div class="btnWrap center">
                <button class="btn blue btn_ok" onclick="document.getElementById('confirmPop').style.display='none'">예</button>
                <button class="btn gray" onclick="document.getElementById('confirmPop').style.display='none'">아니오</button>
            </div>
        </div>
    </div>
    <!--- 알림팝업 -->
    <!--- 알림팝업 -->
    <div class="layPop" id="alertPop" style="padding-top:300px; z-index: 300">
        <div class="popCon" style="width: 500px">
            <div class="titleArea">
                <h3>알림</h3>
                <button type="button" class="btnClose btn_ok"
                    onclick="document.getElementById('alertPop').style.display='none'">닫기</button>
            </div>
            <p class="PopMsg" id="PopMsg" style="text-align:center"></p>
            <div class="btnWrap center">
                <button class="btn blue btn_ok" onclick="gfnPopSetNormal()">확인</button>
            </div>
        </div>
    </div>
    <!--- 알림팝업 -->
    <!--- DatePicker  -->
    <div id="datePickerPop2" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="position: absolute; top: 201px; left: 380px; z-index: 100; display: none;">
        <div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
        <a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="이전달">
        <span class="ui-icon ui-icon-circle-triangle-w">이전달</span>
        </a>
        <a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="다음달">
        <span class="ui-icon ui-icon-circle-triangle-e">다음달</span>
        </a>
        <div class="ui-datepicker-title">
          <span class="ui-datepicker-year" id="datepickerTitleYear">2021</span>년&nbsp;<span class="ui-datepicker-month" id="datepickerTitleMonth">8월</span>
        </div>
        </div>

        <table class="ui-datepicker-calendar">
        <thead>
        <tr>
        <th scope="col" class="ui-datepicker-week-end">
        <span title="일요일">일</span>
        </th>
        <th scope="col">
        <span title="월요일">월</span>
        </th>
        <th scope="col">
        <span title="화요일">화</span>
        </th>
        <th scope="col">
        <span title="수요일">수</span>
        </th>
        <th scope="col">
        <span title="목요일">목</span>
        </th>
        <th scope="col">
        <span title="금요일">금</span>
        </th>
        <th scope="col" class="ui-datepicker-week-end">
        <span title="토요일">토</span>
        </th>
        </tr>
        </thead>
        <tbody id="datePickerDay">
        </tbody>
        </table>
        </div>
    <!--- DatePicker  -->
    <!--- 프로세스바 -->
    <div class="layPop" id="processBarPop" style="padding-top:300px; z-index: 300">
        <div class="popCon" style="width: 500px">
            <div class="titleArea">
                <h3>파일 업로드</h3>
            </div>
            <p class="PopMsg" style="text-align:center"></p>
            <div class="btnWrap center">
                <div class="progress">
                    <div class="bar"></div>
                    <div class="percent">0%</div>
                </div>
            </div>
        </div>
    </div>
    <!--- 프로세스바 -->
     <!--- 프로세스바 -->
    <div class="layPop" id="imageView" style="padding-top:300px; z-index: 300; width: 21%; height: 33%; top: 20%; left: 55%; overflow: hidden;">
        <div class="popCon" style="width: 100%; height: 100%">
            <div class="titleArea">
                <h3>배너 이미지</h3>
                <button type="button" class="btnClose btn_ok"
                    onclick="document.getElementById('imageView').style.display='none'">닫기</button>
            </div>
            <div class="btnWrap center">
                <img id="imagePath" style="width: 325px; height: 215px;" alt="" src="">
            </div>
        </div>
    </div>
    <!--- 프로세스바 -->
     <!--- 프로세스바 -->
    <div class="layPop" id="contentsPopview" style="padding-top: 300px;z-index: 300;display: block;width: 98%;left: 1%;top: 7%;height: 85%;display: none">
        <div class="popCon" style="width: 100%; height: 100%; top:0%; left:0%; transform:translate(0%, 0%);overflow-y:auto;">
            <div class="titleArea">
                <h3>팝업 조회</h3>
                <button type="button" class="btnClose btn_ok"
                    onclick="document.getElementById('contentsPopview').style.display='none'">닫기</button>
            </div>
            <div class="btnWrap center">
                <div id="namoContents"></div>
            </div>
        </div>
    </div>
    <input type="hidden" id="csrfToken" value="${CSRF_TOKEN }"/>
    <!--- 프로세스바 -->
</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/top.js"></script>
<script type="text/javascript">
	var ssoLoginYn = "${loginSsoUseYn}"
	var loginUserRole = "${loginUserRole}"
	var loginUserId = '${loginUserId}';
    var messageTemp = "${message}";
        messageTemp = messageTemp.replace("{","").replace("}","");
        messageTemp = messageTemp.split(",")
    var tMessage = new HashMap();

        for(var i=0; i< messageTemp.length;i++){
            tMessage.put(messageTemp[i].split("=")[0].trim(),messageTemp[i].split("=")[1])
        }

    var gMenuId = "${gMenuId}";

    var createRole = '${createRole}';
    var updateRole = '${updateRole}';
    var deleteRole = '${deleteRole}';

</script>

</html>