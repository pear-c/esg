//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------

var files = new HashMap();
var fileUpdateList = [];
var fileNullCheck = [];

var resultMap;
var pagingCount;
var pageNum;

var nowPage = 0;

var gParamData;

let bar = $('.bar');
let percent = $('.percent');

//-------------------------------------------------------------------------------
// 공통 함수영역
//-------------------------------------------------------------------------------
/*********************************************
 * 조회 처리전 사전 체크
 *********************************************/
function fnPreSearch() {

	if ("" == $("#checkValId").val()) {
        //"" 이(은) 필수 입력 항목 입니다.
        gfnPopMsg.alert("CHECK", "ERROR");
        return false;
    }


    return true;
}

/*********************************************
 * 조회 처리
 *********************************************/
function fnSearch() {

    if (fnPreSearch())
    {

    	gfnSetProcessBar('on')
      	var data = gfnGetInputParam();
      	data.dateUse = $("#ch_date").prop("checked") ? 1 : 0
      	data.deptCode = $("#deptCode").val();

      	data.startPage = nowPage * $("#paging").val();
        gfnTransation("/Idea/Search",data,"POST",fnSearchCallback)
    }

}


/*********************************************
 * 조회 처리
 *********************************************/
function fnSearch2() {

    if (fnPreSearch())
    {
        var data = new Object();

        data.boardId = $("#hiddenNobieId").val()
        gfnTransation("/Idea/SearchReply",data,"POST",fnSearchReplyCallback)
    }

}

/*********************************************
 * 조회 콜백
 *********************************************/
function fnSearchCallback(data) {
        resultMap = data.resData.resultMap;
    var resultMapCount = data.resData.resultMapCount;

    var paging = $("#paging").val();
    $("#noticeTotal").text(resultMapCount);
    if(resultMapCount >= paging){
    	pagingCount = Math.ceil(resultMapCount/paging)
    	$("#noticeNow").text("("+(nowPage+1)+"/"+(Math.ceil(resultMapCount/paging))+")")
    }else{
    	pagingCount = 1;
    	$("#noticeNow").text("(1/1)")
    }
    $("#noticeNow").text("("+(nowPage+1)+"/"+pagingCount+")")

    $("#noticeData tr").remove();

    //템플렛 설명 추가
    var templete   = '<tr>'
    	templete  += '<td class="number">'
    	templete  += '<img src="../../resources/img/board/icon_bullhron.png" alt="템플렛" class="icon_notice" />'
    	templete  += '	<td class="title txt_left">'
    	templete  += '		<a href="javascript:void(0)" onclick="fnNoticeView2()">'
    	templete  += '			<span style="color: blue;font-weight: bold;">아이디어 게시판 작성 예시</span>'
	    templete  += '		</a>'
	    templete  += '		<div class="board_icon_wrapper">'
    	templete  += '	<img src="../../resources/img/board/icon_download.png" class="icon_file" alt="첨부파일" />';
    	templete  += '		</div>'
    	templete  += '	</td>'
    	templete  += '	<td class="writer">'
    	templete  += '	</td>'
    	templete  += '	<td class="writer">'
    	templete  += '	</td>'
    	templete  +=	'	<td class="date">'
    	templete  += '	</td>'
    	templete  += '   <td class="hit">'
    	templete  += '	</td>'
    	templete  += '	<td class="hit">'
    	templete  += '	</td>'
    	templete  += '</tr>'

    $("#noticeData").append(templete);

    var str = ""

    var today = getToday();

    if(resultMap.length > 0){
	    for(var i=0; i <resultMap.length;i++){
	    	str   = '<tr>';
	    	str  += '	<td class="number">'
	   		if(resultMap[i].WRITE_YMD == today )  str += '<img src="../../resources/img/board/icon_notice.png" alt="공지사항" class="icon_notice" />'
	   		else str  += resultMap[i].RID																						// 게시판 번호
	    	str  += '	<td class="title txt_left">'
	    	str  += '		<a href="javascript:void(0)" onclick="fnNoticeView('+resultMap[i].ID+')">'
	    	str  += '			<span>'+resultMap[i].TITLE+'</span>'															// 게시판 이름
	    	str  += '		</a>'
	    	// 파일 첨부가 새로운 글이 있을경우
	    	str  += '		<div class="board_icon_wrapper">'
	    	// 첨부파일이 있을경우
	    	if(resultMap[i]['IDEA_FILE_URL'] != null) str  += '	<img src="../../resources/img/board/icon_download.png" class="icon_file" alt="첨부파일" />';
	    	//str  += '			<img src="../../resources/img/board/icon_download.png" class="icon_file" alt="첨부파일" />'
	    	// 새로운 글이 있을경우
            if(resultMap[i].WRITE_YMD == today ) str  += '          <img src="../../resources/img/board/icon_new02.gif" class="icon_new02" alt="새글" />'
            str  += '		</div>'
	    	str  += '	</td>'
	    	str  += '	<td class="writer">'
	    	str  += resultMap[i].USER_NAME																						// 작성자 이름
	    	str  += '	</td>'
	    	str  += '	<td class="writer">'
	    	str  += resultMap[i].DEPT_NAME																						// 소속
	    	str  += '	</td>'
	    	str  +=	'	<td class="date">'
	    	str  += resultMap[i].CREATE_DATE																					// 생성 일자
	    	str  += '	</td>'
	    	str  += '   <td class="hit">'
	    	str  +=  resultMap[i].REPLY_COUNT
	    	str  += '	</td>'
	    	str  += '	<td class="hit">'
	    	str  += resultMap[i].HIT																							// 조회수
	    	str  += '	</td>'
	    	str  += '</tr>'

	    	$("#noticeData").append(str);
	    }

	    $("#pagingNum").text('');

		    str  = '<a href="javascript:void(0)" onclick="fnNoticePageMove(0)" class="btn_first">처음 페이지로 이동</a>'
		    str += '<a href="javascript:void(0)" onclick="fnNoticePageMove('+(nowPage-1)+')" class="btn_previous">이전 페이지로 이동</a>'

	    	if(nowPage <10)
            {
                if(pagingCount < 11)
                {
                    for(var i = 0; i < pagingCount; i++)
                    {
                        if(nowPage == (i)) str += '<strong id="no' + i +'">'+(i+1)+'</strong>'
                        else               str += '<a href="javascript:void(0)" class="paginigNum">'+(i+1)+'</a>'
                    }
                }
                else
                {
                    for(var i = 0; i < 10; i++)
                    {
                        if(nowPage == (i)) str += '<strong id="no' + i +'">'+(i+1)+'</strong>'
                        else               str += '<a href="javascript:void(0)" class="paginigNum">'+(i+1)+'</a>'
                    }
                }

            }
            else if(parseInt(nowPage.toString()/10) >= parseInt((pagingCount-1).toString()/10))
            {
                for(var i = parseInt(nowPage.toString()/10)*10; i <= pagingCount-1; i++)
                {
                    if(nowPage == (i)) str += '<strong id="no' + i +'">'+(i+1)+'</strong>'
                    else               str += '<a href="javascript:void(0)" class="paginigNum">'+(i+1)+'</a>'
                }
            }
            else
            {
                for(var i =parseInt(nowPage.toString()/10)*10; i< (parseInt(nowPage.toString()/10)+1)*10; i++)
                {
                    if(nowPage == (i)) str += '<strong id="no' + i +'">'+(i+1)+'</strong>'
                    else               str += '<a href="javascript:void(0)" class="paginigNum">'+(i+1)+'</a>'
                }
            }

	    	str += '<a href="javascript:void(0)" onclick="fnNoticePageMove('+(nowPage+1)+')" class="btn_next">다음 페이지로 이동</a>'
	    	str += '<a href="javascript:void(0)" onclick="fnNoticePageMove('+(pagingCount-1)+')" class="btn_last">마지막 페이지로 이동</a>'

	    $("#pagingNum").append(str);

	    $("#pagingNum a.paginigNum").click(function(){
	    	var pagingNum = $(this).text()

	    	$("#pagingNum strong").contents().unwrap().wrap('<a href="javascript:void(0)" class="paginigNum"></a>');
	    	$(this).contents().unwrap().wrap('<strong></strong>');

	    	nowPage = pagingNum-1;

	    	fnSearch();
	    })
    }

    gfnSetProcessBar('off')


	$(".mainPage").show();
}

function fnNoticePageMove(page){
	if(page < 1) page = 0;
	if(page >= pagingCount) page = pagingCount-1;

	$("#pagingNum strong").contents().unwrap().wrap('<a href="javascript:void(0)" class="paginigNum"></a>');
	$("#pagingNum a.paginigNum").eq(page).contents().unwrap().wrap('<strong></strong>');

	nowPage = page;

	fnSearch();
}

function fnNoticeView(id){

	gfnSetProcessBar('on')
	var data = new Object();
	data.id = id;

	data.deptCode = $("#deptCode").val();

	gfnTransation("/Idea/SearchDetail",data,"POST",fnSearchDetailCallback)

}

function fnNoticeView2(){
	$(".mainPage").attr("style","display: none")
	$(".writePage").attr("style","display: none")
	$(".viewPage").attr("style","display: none")
	$(".templetePage").attr("style","display: block")
}


/*********************************************
 * 상세 조회 콜백
 *********************************************/
function fnSearchDetailCallback(data) {
    resultMap = data.resData.resultMap;

    gFnInputClear();

    $("#noticTitle").text(resultMap.TITLE);
    $("#noticUserName").text(resultMap.USER_NAME);
    $("#noticDeptName").text(resultMap.DEPT_NAME);
    $("#noticCreateDate").text(resultMap.CREATE_DATE);
    $("#noticHit").text(resultMap.HIT);
    $("#noticContents").text(resultMap.CONTENTS);

    if(resultMap.PRE_TITLE == null){
	     $("#noticePreTitle").text('이전 글이 없습니다.')
	     $("#noticePreMove").removeAttr('onclick')
    }
    else {
    	$("#noticePreTitle").text(resultMap.PRE_TITLE)
    	$("#noticePreMove").attr('onclick','fnNoticeView('+(resultMap.PRE_ID)+')')
    }
    if(resultMap.AFT_TITLE == null){
     	$("#noticeAftTitle").text('다음 글이 없습니다.')
     	$("#noticeAftMove").removeAttr('onclick')

    }
    else {
    	$("#noticeAftTitle").text(resultMap.AFT_TITLE)
    	$("#noticeAftMove").attr('onclick','fnNoticeView('+(resultMap.AFT_ID)+')')
    }

    $("#fileListView").text('');

    var fileView = "";


	if(resultMap['IDEA_FILE_URL'] != null){
		var fileName = resultMap['IDEA_FILE_URL']
		    fileName = fileName.split("\\")[fileName.split("\\").length -1]

		fileView += '<a href="/Idea/FileDown?id='+resultMap.ID+'" title="다운로드" style="color: blue;">'+fileName+'</a>'
	}

    if(fileView != ""){
    	$("#fileListView").append('<dt>첨부파일</dt><dd><p>'+fileView+'</p></dd>');
    }

    $("#hiddenNobieId").val(resultMap.ID);

	//작성자 본인만 수정 및 삭제가능
    //삭제 및 수정 권한이 있을 경우만 가능
    if(loginUserId != resultMap.USER_ID){

		 if(updateRole == '0'){
         	$("#updateBtn").hide()
		 }
         if(deleteRole == '0'){
            $("#deleteBtn").hide()
         }


    }else{
        $("#updateBtn").show()
        $("#deleteBtn").show()
    }

    $(".title").eq(0).focus()

    $(".mainPage").attr("style","display: none")
	$(".writePage").attr("style","display: none")
	$(".viewPage").attr("style","display: block")
	$(".templetePage").attr("style","display: none")

	fnSearch2()

   //gfnSetProcessBar('off')
}

/*********************************************
 * 상세 조회 콜백
 *********************************************/
function fnSearchSubCallback(data) {

}

function fnSearchReplyCallback(data){
    resultMap = data.resData.resultMap;

    $("#replyCnt").text(resultMap.length);

    var str = ""

    $("#replyContents ll").remove();

    if(resultMap.length > 0){
        for(var i=0; i <resultMap.length;i++){
            str   = '<ll>';
            str  += '   <div class="comment_container" style="border-bottom: 2px solid #d8d8d8;margin-bottom: 10px;">'
            str  += '       <p class="comment_head">'
            str  += '            <span class="name"'; if(resultMap[i].USER_ROLE == 'R999' || resultMap[i].USER_ROLE == 'RDEV') str += 'style="color : blue"'; str+= '>'+resultMap[i].USER_NAME+'</span>'
            str  += '            <span class="date">'+resultMap[i].CREATE_DATE+'</span>'
            str  += '       </p>'
            str  += '       <p class="comment_text">'+resultMap[i].CONTENTS+'</p>'
            str  += '       <div class="comment_btns">'
            if(loginUserRole == 'R999' || loginUserRole == 'RDEV'){
            	str  += '           <button class="btn_s01 btn_color08 replayUpdate">수정</button>'
                str  += '           <button class="btn_s01 btn_color08 replayDelete">삭제</button>'
            }
            str  += '       </div>'
            str  += '       <input type="hidden" class="replyId" value="'+resultMap[i].ID+'">'
            str  += '   </div>'
            str  += '</ll>'

            $("#replyContents").append(str);
        }
    }

    $(".replayUpdate").click(function(){
        var replayId = $(this).parent().next().val();
        var origin = $(this).parent().prev('p.comment_text').text();

        var topLength = $(this).parent().prevAll('p.comment_reply').length == 1 ? 53 : 32

       $(this).parent().prev('p.comment_text').contents().unwrap().wrap('<textarea class="comment_text" style="height : 51px; width : 90%"></textarea>').parent()
       .after('<input type="button" id="replyUpdate'+replayId+'" value="수정" autocomplete="off" style="position: absolute;top: '+topLength+'px;right: 70px;width: 60px;height: 51px;color: #fff;background: #313131;border-width: 0;transition: all 0.3s ease-in-out;">')
       .after('<input type="button" id="replyCancel'+replayId+'" value="취소" autocomplete="off" style="position: absolute;top: '+topLength+'px;right: 9px;width: 60px;height: 51px;color: #fff;background: #0014ff;border-width: 0;transition: all 0.3s ease-in-out;">')
       .after('<input type="hidden" class="replyOrigin" value="'+origin+'">')
        $("#replyUpdate"+replayId).click(function(){

        	gfnSetProcessBar('on')
            var changeContents = $(this).prevAll('textarea').val();

            var data = new Object();
            data.id = $(this).attr('id').replace('replyUpdate','');
            data.boardId = $("#hiddenNobieId").val();
            data.contents = changeContents;
            gfnTransation("/Idea/UpdateReply",data,"POST",null)

            $(this).prevAll('textarea').contents().unwrap().wrap('<p class="comment_text"></p>')
            $(this).prevAll('p.comment_text').text(changeContents)
            $(this).prevAll('input').remove()
            $(this).remove()

            gfnSetProcessBar('off')
        })

         $("#replyCancel"+replayId).click(function(){
           $(this).prevAll('textarea').val($(this).prevAll('.replyOrigin').val())
           $(this).prevAll('textarea').contents().unwrap().wrap('<p class="comment_text"></p>')
           $(this).prev('input').remove()
           $(this).next('input').remove()
           $(this).remove()

        })
    });

    $(".replayDelete").click(function(){
    	gfnSetProcessBar('on')
        var replayId = $(this).parent().next().val();

        var data = new Object();
        data.boardId = $("#hiddenNobieId").val();
        data.id = replayId;
        gfnTransation("/Idea/DeleteReply",data,"POST",null)
        fnSearch2()
        //$(this).parents('ll').remove()
        //$("#replyCnt").text($("#replyCnt").text()-1)
    })


    gfnSetProcessBar('off')

}


/*********************************************
 * 업데이트 처리
 *********************************************/
function fnUpdateCallback(data) {

	if(data.success == 'Y'){
		$(".mainPage").attr("style","display: block")
		$(".writePage").attr("style","display: none")
		$(".viewPage").attr("style","display: none")
		$(".templetePage").attr("style","display: none")

		files.clear();

		gfnSetProcessBar('off')
   	    fnSearch();
	}else{
		alert(data.resData.message);
	}
}

/*********************************************
 * 입력 처리전 사전 체크
 *********************************************/
function fnPreInsert() {
	//공통 체크 사항
    if (!gFnBBSInputCheck()){
    	return false;
    }
 	return true;
}

/*********************************************
 * 입력 처리
 *********************************************/
function fnInsert() {
	if (fnPreInsert()){
			if(fileflag == 1){
				fileUpload('/Idea/FileUpload',$("#writerUserId").val(),gParamData);
			}else{
				gfnSetProcessBar('on')
				fnFileUrlNullUpdate();

			    if($("#hiddenNobieId").val != '') gParamData.id = $("#hiddenNobieId").val();

				gParamData.title = $("#writeTitle").val();
				gParamData.contents = $("#writeContents").val();

				gfnTransation("/Idea/Save",gParamData,"POST",fnUpdateCallback);

			}
	}

}

/*********************************************
 * 입력 처리2
 *********************************************/
function fnInsert2() {

    var data = new Object();

    data.boardId = $("#hiddenNobieId").val();
    data.contents = $("#replyWrite").val();

    gfnTransation("/Idea/SaveReply",data,"POST",fnInsertCallback);


}

/*********************************************
 * 생성 처리
 *********************************************/
function fnInsertCallback(data) {

    if(data.success == 'Y'){

        $("#replyWrite").val('');

        data.boardId = $("#hiddenNobieId").val()
        gfnTransation("/Idea/SearchReply",data,"POST",fnSearchReplyCallback)

    }else{
        alert(data.resData.message);
    }
}

/*********************************************
 * 수정 처리전 사전 체크
 *********************************************/
function fnPreUpdate() {
	if ("" == $("#checkValId").val()) {
        //"" 이(은) 필수 입력 항목 입니다.
        gfnPopMsg.alert("CHECK", "ERROR");
        return false;
    }


    return true;
}

/*********************************************
 * 수정 처리
 *********************************************/
function fnUpdate() {

	gfnSetProcessBar('on')

	var data = new Object();

	data.id = $("#hiddenNobieId").val();

	gfnTransation("/Idea/SearchDetail",data,"POST",fnUpdateView)
}

function fnUpdateView(data){
	updateData = data.resData.resultMap;

	fileNullCheck = [];

	$("#writeTitle").val(updateData.TITLE)


	if(updateData.DATE_TO != null){
		$("#toRcptYmd").val(updateData.DATE_TO)
	}else{
		$("input[name='toRcptYmd']").val(gfnGetDate(0));
	}

	$("#writeContents").val(updateData.CONTENTS);


	if(updateData.IDEA_FILE_URL != null){
		var fileName = updateData['IDEA_FILE_URL']
		    fileName = fileName.split("\\")[fileName.split("\\").length -1]

		$("#fileNm_01").val(fileName);

	}

	$(".mainPage").attr("style","display: none")
	$(".writePage").attr("style","display: block")
	$(".viewPage").attr("style","display: none")
	$(".templetePage").attr("style","display: none")

	gfnSetProcessBar('off')
}


/*********************************************
 * 삭제 처리전 사전 체크
 *********************************************/
function fnPreDelete() {
	var msgId = '10002';      //삭제 하시겠습니까?

    gfnPopMsg.confirm(gfnGetMessage(msgId), fnDelete);
}

/*********************************************
 * 삭제 처리
 *********************************************/
function fnDelete() {

	var paramData = new Object();
    paramData.id =  $("#hiddenNobieId").val();
    gfnTransation("/Idea/Delete",paramData,"POST",fnDeleteCallback)
}

/********************************
 * 상위코드 삭제 처리 콜백
 ********************************/
function fnDeleteCallback(data) {
    fnSaveCallback(data);
}

/********************************
 * 상위 코드 저장 콜백
 ********************************/
function fnSaveCallback(data) {

    if(data.success == 'Y'){

         $(".mainPage").attr("style","display: block")
		 $(".writePage").attr("style","display: none")
		 $(".viewPage").attr("style","display: none")
         $(".templetePage").attr("style","display: none")

         fnSearch();
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}


/********************************
 * 파일경로 NULL 처리
 ********************************/
function fnFileUrlNullUpdate(){

	if($("#fileNm_01").val() == ''){
		var data = new Object();
		data.id = $("#hiddenNobieId").val();

		gfnTransation("/Idea/FileDelete",data,"POST",null)

	}

}

//-------------------------------------------------------------------------------
// 사용자 정의 함수
// ::: 자유롭게 작성 하되 fn Prefix와 함께 Camel 케이스 표기법으로 작성
//-------------------------------------------------------------------------------
/*********************************************
 * 사용자 정의 함수 입니다.
 *********************************************/
function fnUserDefine() {

}

/**
 * 파일 업로드
 */
function fileUpload(url,id, inputParam){

    var sendUrl = url+"?type=idea&Id="+id;

	var formData = new FormData();


	 formData.append('uploadFiles',files.get('fileList0'));




    $.ajax({
        contentType : false,
        processData : false,
        async : true,
        url : sendUrl,
        data : formData,
        type : "POST",
        xhr: function(){
            let xhr = $.ajaxSettings.xhr();
            xhr.upload.onprogress = function(e){
                if(e.lengthComputable){
                	$("#processBarPop").show()

                	$("#processBarPop .PopMsg").text("FileUpload[0] ("+numberWithCommas(e.total)+" byte)")

		            bar.width(Math.floor(e.loaded/e.total * 100)+'%')
		            percent.html(Math.floor(e.loaded/e.total * 100)+'%')

		             if(Math.floor(e.loaded/e.total * 100) == 100){

		             	setTimeout(function(){
		             		$("#processBarPop").hide()
		             	},500)

		             }
                }
            };
            return xhr;
        },
        success:function(data){
        	if(data.success == 'Y'){
	        	var filePath = data.resData.filesPath;

	        	if(filePath.length > 0){
        			inputParam['ideaFileUrl'] = filePath[0];
	        	}
	        	fileflag = 0;
	        	fnInsert();

	        }else{

	        	gfnPopMsg.alert(gfnGetMessage(data.resData.message))

	        }

        }
    })
}


function getDate(diffDay) {
    var date = new Date();
    date.setDate(date.getDate() + (diffDay));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (("" + month).length == 1) {
        month = "0" + month;
    }
    if (("" + day).length == 1) {
        day = "0" + day;
    }
    var today = year + "-" + month + "-" + day;
    return today
}


function datepickerSetting(){
    //datepicker 한국어로 사용하기 위한 언어설정
    $.datepicker.setDefaults($.datepicker.regional['ko']);

    // 시작일(startDt)은 종료일(endDt) 이후 날짜 선택 불가
    // 종료일(endDt)은 시작일(startDt) 이전 날짜 선택 불가

    //시작일
    $('#startDt').datepicker({
        showOn: "both", // 달력을 표시할 타이밍 (both: focus or button)
        buttonImage: "../../resources/img/icon_calendar.gif", // 버튼 이미지
        buttonImageOnly: true, // 버튼 이미지만 표시할지 여부
        buttonText: "날짜선택", // 버튼의 대체 텍스트
        dateFormat: "yy-mm-dd", // 날짜의 형식
        changeYear: true,
        changeMonth: true, // 월을 이동하기 위한 선택상자 표시여부
        //minDate: 0,                       // 선택할수있는 최소날짜, ( 0 : 오늘 이전 날짜 선택 불가)
        onClose: function(selectedDate) {
            // 시작일(startDt) datepicker가 닫힐때
            // 종료일(endDt)의 선택할수있는 최소 날짜(minDate)를 선택한 시작일로 지정
            $("#endDt").datepicker("option", "minDate", selectedDate);
        }
    });

    //종료일
    $('#endDt').datepicker({
        showOn: "both",
        buttonImage: "../../resources/img/icon_calendar.gif",
        buttonImageOnly: true,
        buttonText: "날짜선택",
        dateFormat: "yy-mm-dd",
        changeYear: true,
        changeMonth: true,
        //minDate: 0, // 오늘 이전 날짜 선택 불가
        onClose: function(selectedDate) {
            // 종료일(endDt) datepicker가 닫힐때
            // 시작일(startDt)의 선택할수있는 최대 날짜(maxDate)를 선택한 종료일로 지정
            $("#startDt").datepicker("option", "maxDate", selectedDate);
        }
    });
}


//-------------------------------------------------------------------------------
// JQuery
//-------------------------------------------------------------------------------
$(function(){

	gFnInit();

	//컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
	fnInit();

	//버튼 이벤트 세팅
	fnEventInit();

	fnSearch();

});

/*********************************************
 * 초기화
 * - 컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
 *********************************************/
function fnInit() {

	if(createRole == '0'){
		$("#noticeWrite").hide()
	}

	if(updateRole == '0'){
		$("#updateBtn").hide()
	}

	if(deleteRole == '0'){
		$("#deleteBtn").hide()
	}

	//콤보(Select box) 바인딩 설정
    var combo = [
        {id: "searchCond", upprCode: "SEARCH_COND", isAll: false}
    ];
    gfnInitComboBind(combo);

	$('#startDate, #endDate').datepicker();
	$("input[name='startDate']").val(gfnGetDate(-28));
    $("input[name='endDate']").val(gfnGetDate(0));

    $("#ch_date").change(function(){

    	if($("#ch_date").prop("checked")){
    		$("#startDate").removeAttr('disabled')
    		$("#endDate").removeAttr('disabled')
    	}else{
    		$("#startDate").attr('disabled','disabled')
    		$("#endDate").attr('disabled','disabled')
    	}
    });

    if(loginUserRole != 'R999' && loginUserRole != 'RDEV') {
    	$(".cmtWrite").hide();
    }

    if(searchId != null && searchId.length > 0){
      	$("#deptCode").val(searchId)
  	}


}

function fnEventInit(){

	$("#noticeWrite").click(function(){

		$("#imagePath").attr('src','')
		files.clear();
		gFnInputClear();
		fileNullCheck = [];

		$(".mainPage").attr("style","display: none")
		$(".writePage").attr("style","display: block")
		$(".viewPage").attr("style","display: none")
		$(".templetePage").attr("style","display: none")

	});

	$("#noticeCancel").click(function(){
	    $("#imagePath").attr('src','')

		files.clear();
		gFnInputClear();

		fnSearch();

		$(".mainPage").attr("style","display: block")
		$(".writePage").attr("style","display: none")
		$(".viewPage").attr("style","display: none")
		$(".templetePage").attr("style","display: none")
	});

	//공통 버튼 이벤트 핸들러 추가
	$("#searchBtn").click(function(e){

		if($("#pagingNum strong").text() != "1"){
			$("#pagingNum a").eq(2).click()
		}
		fnSearch();
		e.preventDefault();

	});

	$("#mainPageView").click(function(){
		fnSearch();

		$(".mainPage").attr("style","display: block")
		$(".writePage").attr("style","display: none")
		$(".viewPage").attr("style","display: none")
		$(".templetePage").attr("style","display: none")
	});

	$("#mainPageView2").click(function(){
		fnSearch();

		$(".mainPage").attr("style","display: block")
		$(".writePage").attr("style","display: none")
		$(".viewPage").attr("style","display: none")
		$(".templetePage").attr("style","display: none")
	});

	$("#insertBtn").click(function(){

		if($("#fileUpload").val() != ''){	fileflag = 1;}
		else{	fileflag = 0;}

		gParamData = new Object();

		fnInsert();

	});

	$("#insertBtn2").click(function(){ if($("#replyWrite").val().length == 0){return;} fnInsert2(); });

	$("#updateBtn").click(function(){ fnUpdate(); });

	$("#deleteBtn").click(function(){ fnPreDelete(); });

	$("#fileUpload").change(function(){

		if($("#fileUpload").val() == '') return;

		var file = $(this)[0].files[0];

		//var ext = file.name.split('.').pop().toLowerCase();
		var ext = file.name.split('.')[file.name.split('.').length-1].toLowerCase()

		if($.inArray(ext, ['pdf','hwp','ppt','pptx','xls','xlsx','doc','docx','mp3','mp4','m4v','avi','wmv','mwa','asf','mpg','mpeg','mkv','mov']) == -1){
			gfnPopMsg.alert(gfnGetMessage(10077))
			$("#fileNm_01").val('')
			return;
		}

		files.put('fileList'+0,file);
		var cur = $("#fileUpload").val().split("\\");

		if(cur[cur.length - 1].length > 60){
			gfnPopMsg.alert('파일이름이 60자리를 넘어갑니다.')
			$("#fileNm_01").val('')
			return;
		}

	   $("#fileNm_01").val(cur[cur.length - 1]);
	});

	$("#fileClear").unbind('click');

	$("#fileClear").click(function(){
    	$("#fileUpload").val('');
    	$("#fileNm_01").val('');
    });

}
