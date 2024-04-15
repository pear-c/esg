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
		<div id="contents" class="mainPage">
			<nav class="breadcrumb">
				<ol>
					<li class="home"><a href="#"><img
							src="../../resources/img/breadcrumb_home.png" alt="홈"></a></li>
					<li><a href="#">${upprMenuName}</a></li>
					<li class="active">${menuName}</li>
				</ol>
			</nav>

			<!-- FAQ 목록 -->
            <section class="pt30 inner">
                <h2 class="sub_title">RPA 교육 게시판
                	<a href="javascript:void(0)" style="float: right;" id="eduWrite"
						class="btn_m02 btn_color01">추가</a>
                </h2>

                <div class="faqList">
                    <ul id="faqData"></ul>
                </div>
                <!-- 페이징 네비게이션 -->
                <!-- <p class="pagingNav mt10 mb10" id="pagingNum"></p> -->
                <!-- //페이징 네비게이션 -->
            </section>
            <!-- //FAQ 목록 -->
		</div>

	</div>

	<!--- 레이어 팝업 (파라미터 추가) -->
	<div class="layPop" id="layPop01">
		<div class="popCon" style="width: 800px">
			<div class="titleArea">
				<h3>교육 추가</h3>
				<button type="button" class="btnClose"
					onclick="document.getElementById('layPop01').style.display='none'">닫기</button>
			</div>
			<div class="tableType popUpForm">
				<table style="width: 100%">
					<colgroup>
						<col style="width: 140px" />
						<col style="width: /" />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">제목</th>
							<td><input type="text" id="popParamTitle"
								name="" class="checkFormat clearFormat" /></td>
						</tr>
						<tr style="display: none">
							<th scope="row">내용</th>
							<td><input type="text" id="popParamContents"
								name="" class="checkFormat clearFormat" /></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="btnWrap txt_center">
				<button class="btn blue" id="popParamSave" type="button">저장</button>
			</div>
		</div>
	</div>

	<!--- 레이어 팝업 (파라미터 추가) -->
	<div class="layPop" id="layPop02">
		<div class="popCon" style="width: 800px">
			<div class="titleArea">
				<h3>동영상 게시판</h3>
				<button type="button" class="btnClose"
					onclick="document.getElementById('layPop02').style.display='none'">닫기</button>
			</div>
			<div class="btnWrap">
					<div class="btns_right">
						<a href="javascript:void(0)" id="eduWrite2"
							class="btn_m02 btn_color01">추가</a>
					</div>
					</div>
			<div class="tableType popUpForm">
				<div class="boardList">
					<table>
						<caption></caption>
						<thead>
							<tr>
								<th scope="col" class="number">번호</th>
								<th scope="col" class="journal">제목</th>
								<th scope="col" class="title">내용</th>
							</tr>
						<thead>
						<tbody id="eduData2">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!--- 레이어 팝업 (파라미터 추가) -->
	<div class="layPop" id="layPop03">
		<div class="popCon" style="width: 800px">
			<div class="titleArea">
				<h3>동영상 추가</h3>
				<button type="button" class="btnClose"
					onclick="document.getElementById('layPop03').style.display='none'">닫기</button>
			</div>
			<div class="tableType popUpForm">
				<table style="width: 100%">
					<colgroup>
						<col style="width: 140px" />
						<col style="width: /" />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">제목</th>
							<td style="width: 100%;"><input type="text" id="popParamTitle2"
								name="" class="checkFormat clearFormat" /></td>
						</tr>
						<tr>
							<th scope="row">학습목표</th>
							<td><input type="text" id="popParamContents2"
								name="" class="checkFormat clearFormat" /></td>
						</tr>
						<tr>
							<th scope="row">상세내용</th>
							<td><textarea
								class="processInput trans" name="" id="popParamContentDetail" cols=""
								rows="3" style="height: 75px"></textarea>
						</tr>
						<tr>
							<th scope="row">동영상 파일</th>
							<td colspan="3"><input type="file"
								name="files" id="videoUpload" class="clearFormat"
								style="display: none" onChange="fnVideoChange()" /> <input
								type="text" class="fileNmBox clearFormat" id="videoNm"
								readonly="readonly" /> <label for='videoUpload'
								id="videoFileUpload"
								class='fileUploadBtn'>찾기</label><button id="videoClear" class="btn_delete"></button></td>
						</tr>
						<tr>
							<th scope="row">첨부 파일</th>
							<td colspan="3"><input type="file"
								name="files" id="tempUpload" class="clearFormat"
								style="display: none" onChange="fnTempChange()" /> <input
								type="text" class="fileNmBox clearFormat" id="tempNm"
								readonly="readonly" /> <label for='tempUpload'
								id="tempFileUpload"
								class='fileUploadBtn'>찾기</label><button id="tempClear" class="btn_delete"></button></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="btnWrap txt_center">
				<button class="btn blue" id="popParamSave2" type="button">저장</button>
			</div>
		</div>
	</div>

	<!--- 레이어 팝업 01 -->
	<div class="layPop" id="layPop04">
		<div class="popCon" style="width: 1060px">
			<div class="titleArea">
				<h3>교육 시청</h3>
				<button type="button" class="btnClose"	onclick="document.getElementById('layPop04').style.display='none'">닫기</button>
			</div>
			<div class="tableType">
				<table style="width: 100%">
					<colgroup>
						<col style="width: 115px" />
						<col style="width: /" />
						<col style="width: 115px" />
						<col style="width: /" />
						<col style="width: 115px" />
						<col style="width: /" />
						<col style="width: 115px" />
						<col style="width: /" />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">제목</th>
							<td colspan="7"><input id="popParamTitle3"
								class="processInput trans" type="text" name="" value=""
								readonly="readonly" /></td>
						</tr>
						<tr>
							<th scope="row">학습목표</th>
							<td colspan="7"><input id="popParamContents3"
								class="processInput trans" type="text" name="" value=""
								readonly="readonly" /></td>
						</tr>
						<tr>
							<th scope="row">상세내용</th>
							<td colspan="7"><textarea
									class="processInput trans" name="" id="popParamContentDetail2" cols=""
									rows="3" style="height: 75px" readonly="readonly"></textarea>
							</td>
						</tr>
						<tr>
							<th scope="row">첨부파일</th>
							<td colspan="7"><input id="tempFile" class="processInput trans"
								type="text" name="" value=""
								style="cursor: pointer;" readonly="readonly" />
								<!--  <label	id="pddDown" class='downloadBtn'>다운로드</label> -->
								</td>
						</tr>
						<tr>
							<td colspan="7" rowspan="4"
								style="border-left: 1px solid #c4cfda; border-bottom: 0; text-align: center; height: 240px;">
								<video id="videoPlayer" preload="metadata" autoplay="autoplay"
									height="500px" controls></video> <label id="videoText"
								style="display: none; font-size: 20px;">동영상 파일이 없습니다.</label>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="btnWrap txt_center">
					<button class="btn" id="popParamDelete" type="button">삭제</button>
					<button class="btn blue" onclick="document.getElementById('layPop04').style.display='none'" type="button">닫기</button>
				</div>

				<input type="hidden" id="popParamId">
			</div>
		</div>
	</div>
	<!--- //레이어팝업 01 -->

</body>

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>

<script type="text/javascript">
	var searchId		='${searchId}'
</script>
<script type="text/javascript"src="${pageContext.request.contextPath }/resources/js/community/Edu.js"></script>

</html>