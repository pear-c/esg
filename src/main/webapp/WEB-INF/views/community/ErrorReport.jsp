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
</head>
<body>
	<div id="wrapper">
		<jsp:include page="../top.jsp"></jsp:include>
		<div id="contents" class="mainPage" style="display: none;">
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
							<span class="labl">구분</span> <select name="" id="searchGubun"
								class="select" style="min-width: 130px">
							</select>
						</div>
						<div class="item">
							<span class="labl">게시구분</span> <select id="searchCond" name=""
								class="select">
							</select> <input class="inpt" id="searchTxt" data-search="searchBtn"
								data-length="100" type="text">
						</div>
						<input class="btnSearch" id="searchBtn" type="button" value="조회">
						<!-- <input class="btn" id="search_btn" type="" value="조회"> -->
					</div>
				</form>
			</section>
			<!-- <form class="boardSearch">
                    <fieldset>
                        <legend class="blind">검색</legend>
                        <div class="search_wrapper">
                            <div class="search_area">
                                <select id="searchCond" title="검색 선택창">
                                </select>
                                <div class="search_box">
                                    <input type="search" id="searchTxt" name="" value=""
                                        title="검색어 입력" /> <input type="submit" id="searchBtn" name=""
                                        value="검색" class="btnSearch" />
                                </div>
                            </div>
                            <p class="total" style="font-size: 15px">
                                <select style="display: none" class="sort" id="paging" title="">
                                    <option value="5">5개</option>
                                    <option value="10">10개</option>
                                    <option value="15" selected="selected">15개</option>
                                    <option value="20">20개</option>
                                </select> 총 <strong id="noticeTotal"></strong> 건의 게시물이 있습니다. <strong
                                    id="noticeNow"></strong>
                            </p>
                        </div>
                    </fieldset>
                </form>
                -->
			<!-- // 검색 -->
			<!-- 공지사항 목록 -->
			<section class="pt10 inner" style="padding: 0 10px;">
				<div class="boardList">
					<table>
						<caption>커뮤니티 공지사항 목록표 : 번호, 제목, 구분,작성자, 등록일, 조회</caption>
						<thead>
							<tr>
								<th scope="col" class="number">번호</th>
								<th scope="col" class="title">제목</th>
								<th scope="col" class="gubun">댓글</th>
								<th scope="col" class="gubun">구분</th>
								<th scope="col" class="writer">작성자</th>
								<th scope="col" class="date">등록일</th>
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
							</select> 총 <strong id="noticeTotal"></strong> 건의 게시물이 있습니다. <strong
								id="noticeNow"></strong>
						</p>
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
				<form action="" method="">
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
								<div class="half_box left_line showClass">
									<dl>
										<dt>
											<label>숨기기</label>
										</dt>
										<dd>
											<div class="checkbox_wrapper">
												<input class="che_ch" type="checkbox" name="checkbox"
													id="ch_03" checked="checked"> <label for="ch_03">표시</label>
											</div>
										</dd>
									</dl>
								</div>
							</div>
							<div class="half_box_wrapper">
								<div class="half_box right_line">
									<dl>
										<dt>
											<label for="title">제목<strong class="required">*</strong></label>
										</dt>
										<dd>
											<input type="text" id="writeTitle" class="checkFormat clearFormat"
												name="" />
										</dd>
									</dl>
								</div>
								<div class="half_box left_line">
									<dl>
										<dt>
											<label for="title">구분<strong class="required">*</strong></label>
										</dt>
										<dd>
											<select id="writeGubun" name=""
												class="select checkFormat selectIsNull" style="width: 205px">
											</select>
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
												readonly="readonly"> <label for="fileUpload"
												class="fileUploadBtn">파일찾기</label>
										</div>
										<div id="noticeUploadFileList"></div>
									</dd>
								</dl>
							</div>
							<div class="half_box_wrapper" style="display: none">
								<div class="half_box right_line bannerClass">
									<dl>
										<dt>
											<label>배너</label>
										</dt>
										<dd>
											<div class="checkbox_wrapper">
												<input class="che_ch" type="checkbox" name="checkbox"
													id="ch_01" checked="checked"> <label for="ch_01">배너등록
													여부</label>
											</div>
										</dd>
									</dl>
								</div>
								<div class="half_box left_line toRcpt">
									<dl>
										<dt>
											<label>배너종료일<strong class="required">*</strong></label>
										</dt>
										<dd>
											<div class="inptDt">
												<label for="toRcptYmd" class="blind">종료일</label> <input
													type="text" name="toRcptYmd" id="toRcptYmd"
													autocomplete="off" style="width: 130px;"> <img
													src="../../resources/img/icon_calendar.gif" alt="날짜선택" title="날짜선택">
											</div>
										</dd>
									</dl>
								</div>
							</div>
							<div class="half_box_wrapper imageSetting" style="display: none">
								<div class="half_box right_line imageClass">
									<dl>
										<dt>
											<label>이미지</label>
										</dt>
										<dd>
											<div class="checkbox_wrapper">
												<input class="che_ch" type="checkbox" name="checkbox"
													id="ch_02" checked="checked"> <label for="ch_02">이미지등록
													여부</label>
											</div>
										</dd>
									</dl>
								</div>
								<div class="half_box left_line imagePath">
									<dl>
										<dt>
											<label>이미지경로<strong class="required">*</strong></label>
										</dt>
										<dd>
											<div class="attached_file_wrapper">
												<input type="file" name="files" class="clearFormat"
													id="fileUpload2" style="display: none"> <input
													type="text" class="fileNmBox clearFormat" id="fileNm_02"
													readonly="readonly"> <label for="fileUpload2"
													class="fileUploadBtn">파일찾기</label>
											</div>
										</dd>
									</dl>
								</div>
							</div>
							<div class="one_box" style="padding-top: 6px;">
								<<div id="editor-container" style="height: 470px;">
								</div>
								<input type="hidden" id="quill_html" name="content">
							</div>
						</div>
						<div class="btnWrap center">
							<button type="button" id="insertBtn" class="btn_m02 btn_color01">등록</button>
							<a href="javascript:void(0)" id="noticeCancel"
								class="btn_m02 btn_color04">취소</a>
						</div>
					</fieldset>
				</form>
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
							<dt>등록일</dt>
							<dd id="noticCreateDate"></dd>
						</dl>
						<dl>
							<dt>조회수</dt>
							<dd id="noticHit"></dd>
						</dl>
						<dl>
							<dt>댓글수</dt>
							<dd id="noticReply"></dd>
						</dl>
					</div>
					<dl class="attached_file_wrapper" id="fileListView">
						<dt>첨부파일</dt>
						<dd>
							<p>
								<a href="#" title="다운로드">첨부파일.pdf</a>
								<button class="btn_s01 btn_color08">다운로드</button>
								<a href="#" title="다운로드">첨부파일.pdf</a>
								<button class="btn_s01 btn_color08">다운로드</button>
							</p>
						</dd>
					</dl>
					<div class="one_box" style="padding-top: 6px;">
					<!-- <div class="board_contents"> -->
					    <!-- <div style="left: 29px; top: 92px; width: 94%; height: 66%; position: absolute; z-index: 9000"></div>  -->
					    <div id="editor-container2" style="height: 470px;"></div>
						<!-- <pre id="noticContents">
				        </pre> -->
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
					<div class="btnWrap mt40">
						<div class="btns_left">
							<a href="javascript:void(0)" class="btn_m02 btn_color03"
								id="updateBtn">수정</a> <a href="javascript:void(0)"
								class="btn_m02 btn_color02" id="deleteBtn">삭제</a>
						</div>
						<div class="btns_right">
							<a href="javascript:void(0)" id="mainPageView"
								class="btn_m02 btn_color01">목록</a>
						</div>
						<input type="hidden" class="clearFormat" id="hiddenNobieRid">
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
					<!-- 댓글 종료 -->
				</div>
			</section>
			<!-- //공지사항 보기 -->
			<!-- 공지사항 목록 -->
			<section class="pt30 pb30 inner" style="display: none">
				<div class="boardList mt10">
					<table>
						<caption>커뮤니티 공지사항 목록표 : 번호, 제목, 작성자, 등록일, 조회</caption>
						<thead>
							<tr>
								<th scope="col" class="number">번호</th>
								<th scope="col" class="title">제목</th>
								<th scope="col" class="writer">작성자</th>
								<th scope="col" class="date">등록일</th>
								<th scope="col" class="hit">조회</th>
							</tr>
						<thead>
						<tbody id="noticeData3">

						</tbody>
					</table>
				</div>
			</section>
			<!-- //공지사항 목록 -->
		</div>
	</div>
</body>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/jquery-ui.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/datepicker-ko.js"></script>
<script type="text/javascript">
    //var loginUserId = '${loginUserId}';
	var searchId		='${searchId}'
</script>

<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/community/ErrorReport.js"></script>
</html>