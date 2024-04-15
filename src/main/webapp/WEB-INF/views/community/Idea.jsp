<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
	<style type="text/css">
       #templeteDown{
       				position: absolute;
				    top: 4px;
				    right: 0;
				    display: block;
				    width: 150px;
				    height: 30px;
				    line-height: 28px;
				    text-align: center;
				    background: #31343f;
				    border: 1px solid #31343f;
				    border-radius: 0;
				    -webkit-appearance: none;
				    color: #fff;
				    font-size: 15px;
				    font-weight: 500;
				    box-sizing: border-box;
				    cursor: pointer;
				} 	   
	</style>
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
			<!-- 검색 -->
			<section id="search">
				<form class="searchSet">
					<div class="row">
						<div class="item">
							<span class="labl">등록일</span>
							<input class="che_chBox clearFormat" type="checkbox" name="checkboxUmsSt" id="ch_date" value="st">
							<label for="ch_date"></label>
							<div class="inptDt">
								<label for="startDate" class="blind">시작일</label> <input
									type="text" readonly="readonly" name="startDate" id="startDate" disabled="disabled"
									autocomplete="off"> <img
									src="../../resources/img/icon_calendar.gif" alt="날짜선택" title="날짜선택">
							</div>
							<span class="word_sign">-</span>
							<div class="inptDt">
								<label for="endDate" class="blind">종료일</label> <input
									type="text" readonly="readonly" name="endDate" id="endDate" disabled="disabled"
									autocomplete="off"> <img
									src="../../resources/img/icon_calendar.gif" alt="날짜선택" title="날짜선택">
							</div>
						</div>
						<div class="item">
							<span class="labl">게시구분</span> <select id="searchCond" name=""
								class="select">
							</select> <input class="inpt" data-search = 'searchBtn' id="searchTxt" data-search="search_btn"
								data-length="100" type="text">
						</div>
						<div class="item">
							<span class="labl">그룹정보</span> <select id="deptCode" name="" class="select" style="width: 135px;">
								<option value="">전체</option>
								<option value="001100004005">한울1발전소</option>
								<option value="001100004006">한울2발전소</option>
								<option value="001100004010">한울3발전소</option>
								<option value="001100004031">신한울1발전소</option>
								<option value="001100004013">건설소</option>						
								<option value="001100004028">대외협력처</option>
							</select> 
						</div>												
						<input class="btnSearch" id="searchBtn" type="button" value="조회">
						<!-- <input class="btn" id="search_btn" type="" value="조회"> -->
					</div>
				</form>
			</section>		
			<!-- // 검색 -->
			<!-- 공지사항 목록 -->
			<section class="pt10 inner">
				<div class="boardList">
					<table>
						<caption>커뮤니티 공지사항 목록표 : 번호, 제목, 댓글,작성자, 등록일, 조회</caption>
						<thead>
							<tr>
								<th scope="col" class="number">번호</th>
								<th scope="col" class="title">제목</th>								
								<th scope="col" class="writer">작성자</th>
								<th scope="col" class="gubun">소속</th>
								<th scope="col" class="date">등록일</th>
								<th scope="col" class="hit">댓글</th>
								<th scope="col" class="hit">조회</th>
							</tr>
						<thead>
						<tbody id="noticeData">

						</tbody>
					</table>
				</div>
				<!-- 페이징 네비게이션 -->
				<p class="pagingNav mt10" id="pagingNum"></p>
				<!-- //페이징 네비게이션 -->
				<div class="btnWrap">
					<div class="btns_left">
						<p class="total" style="font-size: 15px">
							<select style="display: none" class="sort" id="paging" title="">
								<option value="5">5개</option>
								<option value="10">10개</option>
								<option value="15" selected="selected">15개</option>
								<option value="20">20개</option>
							</select> 총 <strong id="noticeTotal"></strong> 건의 게시물이 있습니다. <strong id="noticeNow"></strong>
						</p>
						<p id="bannerNow" style="font-size: 14px;"></p>
					</div>
					<div class="btns_right">
						<a href="javascript:void(0)" id="noticeWrite"
							class="btn_m02 btn_color01">글쓰기</a>
					</div>
				</div>
			</section>
			<!-- //공지사항 목록 -->
		</div>
		<div id="contents" class="writePage" style="display: none">
			<nav class="breadcrumb">
				<ol>
					<li class="home"><a href="#"><img
							src="../../resources/img/breadcrumb_home.png" alt="홈"></a></li>
					<li><a href="#">${upprMenuName}</a></li>
					<li class="active">${menuName}</li>
				</ol>
			</nav>
			<!-- 공지사항 글쓰기 -->
			<section class="pt10 inner">
					<fieldset>
						<legend class="blind">글쓰기</legend>
						<div class="boardWrite">
							<div class="half_box_wrapper">
								<div class="half_box right_line writerClass">
									<dl>
										<dt>
											<label for="writer">작성자<strong class="required">*</strong></label>
										</dt>
										<dd>
											<input type="text" id="writerUserName" readonly="readonly"
												name="" value="${loginUserName}" /> <input type="hidden"
												id="writerUserId" value="${loginUserId}">
										</dd>
									</dl>
								</div>
								<div class="half_box left_line">
									<dl>
										<dt>
											<label for="title">소속<strong class="required">*</strong></label>
										</dt>
										<dd>
											<input type="text" id="writerDeptName" readonly="readonly"
												name="" value="${loginUserDeptName}" />	
										</dd>
									</dl>
								</div>									
							</div>
							<div class="half_box_wrapper">
								<div class="right_line">
									<dl>
										<dt>
											<label for="title">제목<strong class="required">*</strong></label>
										</dt>
										<dd>
											<input type="text" id="writeTitle" class="checkFormat clearFormat"
												name="" />												
											<input type="button" onclick="window.open('/Idea/FileDown?templete=1')" id="templeteDown" value="템플렛 파일 다운로드" style=""/>
										</dd>
									</dl>
								</div>								
							</div>
							<div class="one_box">
								<dl>
									<dt>
										<label for="title">파일첨부</label>
									</dt>
									<dd>
										<div class="attached_file_wrapper">
											<input type="file" name="files"
												class="fileUploadList clearFormat" id="fileUpload"
												style="display: none"> <input type="text"
												class="fileNmBox clearFormat" id="fileNm_01"
												readonly="readonly">																							
												<label for="fileUpload"
												class="fileUploadBtn">파일찾기</label>																
											<button id="fileClear" class="btn_delete"style="position: absolute; top: 5px; right: 155px; transform: rotate(45deg);"></button>								
										</div>	
									</dd>
								</dl>
							</div>							
							<div class="one_box" style="padding-top: 6px;">
								<div class="editer_wrapper">
										<textarea id="writeContents"  name="" class="clearFormat checkFormat" cols="50"	rows="50"></textarea>	
								</div>
							</div>
						</div>
						<div class="btnWrap center">
							<button type="button" id="insertBtn" class="btn_m02 btn_color01">등록</button>
							<a href="javascript:void(0)" id="noticeCancel"
								class="btn_m02 btn_color04">취소</a>
						</div>
					</fieldset>
			</section>
			<!-- //공지사항 글쓰기 -->
		</div>
		<div id="contents" class="viewPage" style="display: none;">
			<nav class="breadcrumb">
				<ol>
					<li class="home"><a href="#"><img
							src="../../resources/img/breadcrumb_home.png" alt="홈"></a></li>
					<li><a href="#">${upprMenuName}</a></li>
					<li class="active">${menuName}</li>
				</ol>
			</nav>
			<!-- 공지사항 보기 -->
			<section class="pt10 inner">
				<div class="boardView">
					<div class="title">
						<h4 id="noticTitle"></h4>
					</div>
					<div class="board_view_info">
						<dl>
							<dt>작성자</dt>
							<dd id="noticUserName"></dd>
						</dl>
						<dl>
							<dt>소속</dt>
							<dd id="noticDeptName"></dd>
						</dl>
						<dl>
							<dt>등록일</dt>
							<dd id="noticCreateDate"></dd>
						</dl>
						<dl>
							<dt>조회수</dt>
							<dd id="noticHit"></dd>
						</dl>												
					</div>
					<dl class="attached_file_wrapper" id="fileListView">						
					</dl>
					<div class="board_contents">
					    <!-- <div style="left: 29px; top: 92px; width: 94%; height: 66%; position: absolute; z-index: 9000"></div>  --> 
						<div style="width: 100%; height: 100%;"><pre id="noticContents" style="white-space: pre-wrap;"></pre></div>						
					</div>
					<div class="preview_next">
						<a href="javascript:void(0)" id="noticeAftMove">
							<dl>
								<dt class="next">다음글</dt>
								<dd id="noticeAftTitle"></dd>
							</dl>
						</a> <a href="javascript:void(0)" id="noticePreMove" class="line">
							<dl>
								<dt class="preview">이전글</dt>
								<dd id="noticePreTitle"></dd>
							</dl>
						</a>
					</div>
					<div class="btnWrap mt10">
						<div class="btns_left">
							<a href="javascript:void(0)" class="btn_m02 btn_color03"
								id="updateBtn">수정</a> <a href="javascript:void(0)"
								class="btn_m02 btn_color02" id="deleteBtn">삭제</a>
						</div>
						<div class="btns_right">
							<a href="javascript:void(0)" id="mainPageView"
								class="btn_m02 btn_color01">목록</a>
						</div>
						<input type="hidden" class="clearFormat" id="hiddenNobieId">
					</div>
					
					<!-- 댓글 시작 -->
					<div class="cmtView">
						<h4 class="comment_heading">
							댓글<span class="txt_red" id="replyCnt">0</span>개
						</h4>
						<ol id="replyContents">
						</ol>
						<p class="pagingNav mt10" id="pagingNum2"></p>
					</div>

					<fieldset class="cmtWrite">
						<legend>댓글 입력</legend>
						<dl>
							<dt>댓글 쓰기</dt>
							<dd>
								<textarea id="replyWrite" cols="50" rows="4" title="댓글 입력"></textarea>
								<input id="insertBtn2" type="button" value="확인">
							</dd>
						</dl>
					</fieldset>
				</div>
			</section>
			<!-- //공지사항 보기 -->
		</div>
		<div id="contents" class="templetePage" style="display: none;">
			<nav class="breadcrumb">
				<ol>
					<li class="home"><a href="#"><img
							src="../../resources/img/breadcrumb_home.png" alt="홈"></a></li>
					<li><a href="#">${upprMenuName}</a></li>
					<li class="active">${menuName}</li>
				</ol>
			</nav>
			<!-- 공지사항 보기 -->
			<section class="pt10 inner">
				<div class="boardView">
					<div class="title" style="height: 41px;">
						<h4>아이디어 게시판 작성 예시</h4>
					</div>
					<dl class="attached_file_wrapper" style="height: 41px;overflow: hidden;">
						<dt>첨부파일</dt>
						<dd>
							<p><a href="/Idea/FileDown?templete=2" title="다운로드" style="color: blue;">아이디어제안 양식.hwp</a></p>
						</dd>					
					</dl>
					<div class="board_contents">
					    <!-- <div style="left: 29px; top: 92px; width: 94%; height: 66%; position: absolute; z-index: 9000"></div>  --> 
						<div style="width: 100%; height: 100%;text-align: center;">사내 업무자동화(RPA) 아이디어 제안서에 대한 작성 예시 입니다.</div><br>
						<!-- <pre id="noticContents">
				        </pre> -->
				        <img alt="아이디에 제안서 예시" src="../../resources/img/board/ideaBoard.png">
				        
					</div>
					<div class="preview_next">
						
					</div>
					<div class="btnWrap mt10">
						<div class="btns_right">
							<a href="javascript:void(0)" id="mainPageView2"
								class="btn_m02 btn_color01">목록</a>
						</div>
					</div>
				</div>
			</section>
			<!-- //공지사항 보기 -->
		</div>
	</div>
</body>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript">
	var searchId		='${searchId}'
</script>

<script type="text/javascript"src="${pageContext.request.contextPath }/resources/js/community/Idea.js"></script>
</html>