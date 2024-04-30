//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var firstGrid;
var secondGrid;

var resultMap
var pagingCount;
var pageNum;

var nowPage = 0;

var files = new HashMap();
var fileUploadCnt = 0;
var fileTotalCnt = 0;
var fileUpdateList = [];
var fileNullCheck = [];

var CrossEditor;

var gParamData;

var namoEditor;
var namoEditor2;
var CrossEditor;
var CrossEditor2;

var fileflag = 0;
var bannerflag = 0;

let bar = $('.bar');
let percent = $('.percent');

var contentsPopData = '';

var imageUpload = [];

var quill;
var quill2;

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

      	data.startPage = nowPage * $("#paging").val();
        gfnTransation("/Notice/Search",data,"POST",fnSearchCallback)
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

    if(loginUserRole == 'R999' || loginUserRole == 'RDEV'){
   		var resultMapBannerCount = data.resData.resultMapBannerCount;
   		$("#bannerNow").html("총 <strong>"+resultMapBannerCount+"</strong>건의 배너가 있습니다.")
    }

    $("#noticeData tr").remove();

    var str = ""

    var today = getToday();

    if(resultMap.length > 0){
	    for(var i=0; i <resultMap.length;i++){
	    	str   = '<tr>';
	    	str  += '	<td class="number">'
	   		if(resultMap[i].WRITE_YMD == today )  str += '<img src="../../resources/img/board/icon_notice.png" alt="공지사항" class="icon_notice" />'
	   		else str  += resultMap[i].RID																						// 게시판 번호
	    	str  += '	<td class="title txt_left">'
	    	str  += '		<a href="javascript:void(0)" onclick="fnNoticeView('+resultMap[i].RID+')">'
	    	str  += '			<span>'+resultMap[i].TITLE+'</span>'															// 게시판 이름
	    	str  += '		</a>'
	    	// 파일 첨부가 새로운 글이 있을경우
	    	str  += '		<div class="board_icon_wrapper">'
	    	// 첨부파일이 있을경우
	    	for(var j=1; j< 6;j++){
	    		if(resultMap[i]['ATTACH_FILE_URL'+j] != null) {str  += '	<img src="../../resources/img/board/icon_download.png" class="icon_file" alt="첨부파일" />'; break;}
	    	}
	    	//str  += '			<img src="../../resources/img/board/icon_download.png" class="icon_file" alt="첨부파일" />'
	    	// 새로운 글이 있을경우
            if(resultMap[i].WRITE_YMD == today ) str  += '          <img src="../../resources/img/board/icon_new02.gif" class="icon_new02" alt="새글" />'
            // 배너가 Y인 경우
            if(resultMap[i].BANNER_REGI_YN == 'Y') str += '         <img src="../../resources/img/board/icon_banner02.gif" class="icon_banner02" alt="배너이미지" /> '
            // 게시글을 숨김일 경우
            if(resultMap[i].BBS_SHOW_YN == 'N') str += '         <img src="../../resources/img/board/icon_secret02.gif" class="icon_secret02" alt="잠긴글" /> '
            str  += '		</div>'
	    	str  += '	</td>'
	    	str  += '   <td class="gubun">'
	    	str  += resultMap[i].BBS_CATEGORY_NAME																				// 구분
	    	str  += '	</td>'
	    	str  += '	<td class="writer">'
	    	str  += resultMap[i].USER_NAME																						// 작성자 이름
	    	str  += '	</td>'
	    	str  +=	'	<td class="date">'
	    	str  += resultMap[i].CREATE_DATE																					// 생성 일자
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

/*********************************************
 * 상세 조회 콜백
 *********************************************/
function fnSearchDetailCallback(data) {
    resultMap = data.resData.resultMap;

    gfnInputClear();

    $("#noticTitle").text(resultMap.TITLE);
    $("#noticUserName").text(resultMap.USER_NAME);
    $("#noticCreateDate").text(resultMap.CREATE_DATE);
    $("#noticHit").text(resultMap.HIT);
	quill2.setContents(JSON.parse(resultMap.CONTENTS.replaceAll('&quot;','"')));

 	//contentsPopData = JSON.parse(resultMap.CONTENTS.replaceAll('&quot;','"'))

    if(resultMap.PRE_TITLE == null){
	     $("#noticePreTitle").text('이전 글이 없습니다.')
	     $("#noticePreMove").removeAttr('onclick')
    }
    else {
    	$("#noticePreTitle").text(resultMap.PRE_TITLE)
    	$("#noticePreMove").attr('onclick','fnNoticeView('+(resultMap.RID-1)+')')
    }
    if(resultMap.AFT_TITLE == null){
     	$("#noticeAftTitle").text('다음 글이 없습니다.')
     	$("#noticeAftMove").removeAttr('onclick')

    }
    else {
    	$("#noticeAftTitle").text(resultMap.AFT_TITLE)
    	$("#noticeAftMove").attr('onclick','fnNoticeView('+(resultMap.RID+1)+')')
    }

    $("#fileListView").text('');

    var fileView = "";

    for(var i=1;i< 6;i++){

    	if(resultMap['ATTACH_FILE_URL'+i] != null){
    		var fileName = resultMap['ATTACH_FILE_URL'+i]
    		    fileName = fileName.split("\\")[fileName.split("\\").length -1]

    		fileView += '<a href="/Notice/FileDown?rid='+resultMap.RID+'&num='+i+'" title="다운로드" style="color: blue;">'+fileName+'</a>'
    	}
    }

    if(fileView != ""){
    	$("#fileListView").append('<dt>첨부파일</dt><dd><p>'+fileView+'</p></dd>');
    }

    $("#hiddenNobieId").val(resultMap.ID);
    $("#hiddenNobieRid").val(resultMap.RID);

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


   gfnSetProcessBar('off')
}

/*********************************************
 * 상세 조회 콜백
 *********************************************/
function fnSearchSubCallback(data) {

   	resultMap = data.resData.resultMap;

    $("#noticeData3 tr").remove();

    var str = ""

    var today = getToday();

    if(resultMap.length > 0){
	    for(var i=0; i <resultMap.length;i++){
	    	str   = '<tr>';
	    	str  += '	<td class="number">'
	   		if(resultMap[i].WRITE_YMD == today )  str += '<img src="../../resources/img/board/icon_notice.png" alt="공지사항" class="icon_notice" />'
	   		else str  += resultMap[i].RID																						// 게시판 번호
	    	str  += '	<td class="title txt_left">'
	    	str  += '		<a href="javascript:void(0)" onclick="fnNoticeView('+resultMap[i].RID+')">'
	    	str  += '			<span>'+resultMap[i].TITLE+'</span>'															// 게시판 이름
	    	str  += '		</a>'
	    	// 파일 첨부가 새로운 글이 있을경우
	    	str  += '		<div class="board_icon_wrapper">'
	    	// 첨부파일이 있을경우
	    	//str  += '			<img src="../../resources/img/board/icon_download.png" class="icon_file" alt="첨부파일" />'
	    	// 새로운 글이 있을경우
	    	if(resultMap[i].WRITE_YMD == today ) str  += '			<img src="../../resources/img/board/icon_new02.gif" class="icon_new" alt="NEW" />'
	    	// 배너가 Y인 경우
	    	if(resultMap[i].BANNER_REGI_YN == 'Y') str += '         <img src="../../resources/img/board/icon_banner02.gif" class="icon_banner" alt="BANNER" /> '
	    	// 게시글을 숨김일 경우
	    	if(resultMap[i].BBS_SHOW_YN == 'N') str += '         <img src="../../resources/img/board/icon_secret02.gif" class="icon_secret" alt="SECRET" /> '
	    	str  += '		</div>'
	    	str  += '	</td>'
	    	str  += '	<td class="writer">'
	    	str  += resultMap[i].USER_NAME																						// 작성자 이름
	    	str  += '	</td>'
	    	str  +=	'	<td class="date">'
	    	str  += resultMap[i].CREATE_DATE																					// 생성 일자
	    	str  += '	</td>'
	    	str  += '	<td class="hit">'
	    	str  += resultMap[i].HIT																							// 조회수
	    	str  += '	</td>'
	    	str  += '</tr>'

	    	$("#noticeData3").append(str);
	    }
    }
}

/*********************************************
 * 업데이트 처리
 *********************************************/
function fnUpdateCallback(data) {

	if(data.success == 'Y'){
		$(".mainPage").attr("style","display: block")
		$(".writePage").attr("style","display: none")
		$(".viewPage").attr("style","display: none")
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
    if (!gfnBBSInputCheck()){
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
				fileUpload('/Notice/FileUpload',$("#writerUserId").val(),gParamData);
			}else if(bannerflag == 1){
				fileUpload2("/Notice/FileUpload",$("#writerUserId").val(),gParamData,$("#fileUpload2"),'bannerImgPath')
			}else{
				gfnSetProcessBar('on')
				fnFileUrlNullUpdate();

			    if($("#hiddenNobieId").val != '') gParamData.id = $("#hiddenNobieId").val();

				gParamData.title = $("#writeTitle").val();
				gParamData.contents = JSON.stringify(quill.getContents());
				gParamData.dateTo = $("#ch_04").prop('checked') == true ? replaceAll($("#toRcptYmd").val(),'-','') : '9999-01-01';
				gParamData.bannerRegiYn = $("#ch_01").prop('checked') == true ? 'Y' : 'N'
				gParamData.bannerImgYn = $("#ch_02").prop('checked') == true ? 'Y' : 'N'
				gParamData.bbsShowYn = $("#ch_03").prop('checked') == true ? 'Y' : 'N'
				gParamData.bbsCategory = $("#writeGubun").val();
				gParamData.bannerDefaultImg = $("#bannerImage").val();

				gfnTransation("/Notice/Save",gParamData,"POST",fnUpdateCallback);

			}

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

	data.rid = $("#hiddenNobieRid").val();

	gfnTransation("/Notice/SearchDetail",data,"POST",fnUpdateView)
}

function fnUpdateView(data){
	updateData = data.resData.resultMap;

	fileNullCheck = [];
	fileUploadCnt = 0;
	fileTotalCnt = 0;
	$("#noticeUploadFileList div").remove();

	$("#writeTitle").val(updateData.TITLE)

	$("#bannerImage").val(updateData.BANNER_DEFAULT_IMG)

	if($(".che_ch").eq(i).prop('checked') == true) {
				$("label[for="+$(".che_ch").eq(i).attr('id')+"]").click()
			}

	if(updateData.BANNER_REGI_YN == "Y"){
		if($("#ch_01").prop('checked') == false) $("label[for=ch_01]").click()

		if(updateData.BANNER_IMG_YN == "Y"){
			if($("#ch_02").prop('checked') == false) $("label[for=ch_02]").click()
				if(updateData.BANNER_IMG_PATH != null){
				    $("#imagePath").attr('src',updateData.BANNER_IMG_PATH.replace('C:\\upload\\','/upload/'))

					var cur = updateData.BANNER_IMG_PATH.split("\\");
		   			 $("#fileNm_02").val(cur[cur.length - 1]);
				}

		}else{
			if($("#ch_02").prop('checked') == true) $("label[for=ch_02]").click()
		}

	}
	else{
		if($("#ch_01").prop('checked') == true) $("label[for=ch_01]").click()
	}



	if(updateData.DATE_TO != null){
		if(updateData.DATE_TO == '9999-01-01'){
			if($("#ch_04").prop('checked') == true) $("label[for=ch_04]").click()
			$("input[name='toRcptYmd']").val(gfnGetDate(0));
		}else{
			if($("#ch_04").prop('checked') == false) $("label[for=ch_04]").click()
			$("#toRcptYmd").val(updateData.DATE_TO)
		}
		$("#ch_04").change();
	}else{
		$("input[name='toRcptYmd']").val(gfnGetDate(0));
	}

	quill.setContents(JSON.parse(updateData.CONTENTS.replaceAll('&quot;','"')));
	//namoEditor.editorTarget.SetBodyValue(updateData.CONTENTS);

	for(var i=1;i<6;i++){
		if(updateData['ATTACH_FILE_URL'+i] != null){
			var fileName = updateData['ATTACH_FILE_URL'+i]
    		    fileName = fileName.split("\\")[fileName.split("\\").length -1]

    		var str = '<div class="badge" style="">'+fileName+'<a href="javascript:void(0)" class="fileListMove" id="fileListUpdate'+i+'">X</a></div>';
			$("#noticeUploadFileList").append(str)
			fileNullCheck.push(i);
			$("#fileListUpdate"+i).click(function(){
				var id = $(this).attr('id');
				fileUpdateList.push(id);
				$(this).parent('div').remove();
				fileNullCheck.splice(fileNullCheck.indexOf(Number(id.replace("fileListUpdate",""))),1)
				fileTotalCnt--;
			})
			fileTotalCnt++;

		}
	}

	$('.half_box_wrapper .showClass').attr('style','display:block;')
	$('.half_box_wrapper .writerClass').addClass('half_box')

	if(updateData.BBS_SHOW_YN == "Y"){
		if($("#ch_03").prop('checked') == false) $("label[for=ch_03]").click()
	}
	else{
		if($("#ch_03").prop('checked') == true) $("label[for=ch_03]").click()
	}


	$(".mainPage").attr("style","display: none")
	$(".writePage").attr("style","display: block")
	$(".viewPage").attr("style","display: none")

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
    gfnTransation("/Notice/Delete",paramData,"POST",fnDeleteCallback)
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

         fnSearch();
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}


/********************************
 * 파일경로 NULL 처리
 ********************************/
function fnFileUrlNullUpdate(){
	fileNullCheck.length
	var data = new Object();
	data.id = $("#hiddenNobieId").val();
	for(var i=1; i<= 6; i++){
		if(fileNullCheck.indexOf(i) == -1)
			data['fileUrlDelete'+i] = 'Y'
	}

	gfnTransation("/Notice/FileDelete",data,"POST",null)

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

    var sendUrl = url+"?type=notice&Id="+id;

	var formData = new FormData();

	for(var i =0; i<= fileUploadCnt;i++){
	 if(files.get('fileList'+i) != null)
	 	formData.append('uploadFiles',files.get('fileList'+i));
	}



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

                	$("#processBarPop .PopMsg").text("FileUpload["+fileUploadCnt+"] ("+numberWithCommas(e.total)+" byte)")

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
	        		var cnt = 0;
	        		for(var i =1; i< 6;i++){
	        			if(fileNullCheck.indexOf(i) != -1) continue;

	        			inputParam['attachFileUrl'+i] = filePath[cnt];
	        			cnt++;
	        		}
	        	}
	        	fileflag = 0;
	        	fnInsert();

	        }else{

	        	gfnPopMsg.alert(gfnGetMessage(data.resData.message))

	        }

        }
    })
}

/**
 * 파일 업로드
 */
function fileUpload2(url,id, inputParam,data,param){

    var formData2 = new FormData();
    var inputFile = data;
    var files2 = inputFile[0].files
    var sendUrl = url+"?type=noticeBanner&Id="+id;

    formData2.append('key1','values1');
    formData2.append('key2','values2');
    for(var i=0;i<files2.length;i++){
        formData2.append('uploadFiles',files2[i]);
    }

     $("#processBarPop .PopMsg").text('')

    $.ajax({
        contentType : false,
        processData : false,
        async : true,
        url : sendUrl,
        data : formData2,
        type : "POST",
        xhr: function(){
            let xhr = $.ajaxSettings.xhr();
            xhr.upload.onprogress = function(e){
                if(e.lengthComputable){
                	$("#processBarPop").show()

		           $("#processBarPop .PopMsg").text(files2[0].name+"("+numberWithCommas(e.total)+" Byte)")

		            bar.width(Math.floor(e.loaded/e.total * 100)+'%')
		            percent.html(Math.floor(e.loaded/e.total * 100)+'%')

		             if(Math.floor(e.loaded/e.total * 100) == 100){
		               setTimeout(function(){
		             		$("#processBarPop").hide()
		             	},300)
		             }
                }
            };
            return xhr;
        },
        success:function(data){
            if(data.success == 'Y'){
	        	inputParam[param] = data.resData.filesPath[0];

	        	bannerflag = 0;
	        	fnInsert()
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

	//컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
	fnInit();

	fnInitComp();


	onDivContentHandler();
});

/*********************************************
 * 초기화
 * - 컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
 *********************************************/
function fnInit() {
	//각종 컴포넌트 데이터 초기화 및 이벤트 추가


	//그리드 초기화
	//fnInitGrid();
	//fnInitGrid2();

	//initSetting();

	//namoEditorSetting()

	utillEditorSetting()
}

/*********************************************
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 *********************************************/
function fnInitComp() {

	if(createRole == '0'){
		$("#noticeWrite").hide()
	}

	if(updateRole == '0'){
		$("#updateBtn").hide()
	}

	if(deleteRole == '0'){
		$("#deleteBtn").hide()
	}

	/*if(loginUserRole != 'R999' && loginUserRole != 'RDEV'){
		$("#noticeWrite").hide()
		$("#updateBtn").hide()
		$("#deleteBtn").hide()
	}*/

	//콤보(Select box) 바인딩 설정
    var combo = [
        {id: "searchCond", upprCode: "SEARCH_COND", isAll: false},
        {id: "writeGubun", upprCode: "NOTICE_CATEGORY", isAll: false},
        {id: "searchGubun", upprCode: "NOTICE_CATEGORY", isAll: true}

    ];
    gfnInitComboBind(combo);

    $('#startDate, #endDate').datepicker();
	$("input[name='startDate']").val(gfnGetDate(-28));
    $("input[name='endDate']").val(gfnGetDate(0));

    //각 컴포넌트 초기 설정
    //* numberFormat 클래스 : 숫자 Only
    //* data-length 속성 : 길이 제한
    //* checkFormat 클래스 : 필수 입력
    // isUpper : 대문자만 허용
    var arrObj = [
        {id : 'searchTxt', numberFormat: false, dataLength: 100, checkFormat: false, isUpper: false}
    ];
    gfnSetInitComp(arrObj);

	//공통 버튼 이벤트 핸들러 추가
	$("#searchBtn").click(function(e){

	if($("#pagingNum strong").text() != "1"){
		$("#pagingNum a").eq(2).click()
	}
	fnSearch();
	e.preventDefault();

	});

	$("#insertBtn").click(function(){

		if(fileUploadCnt != 0){	fileflag = 1;}
		else{	fileflag = 0;}

		if($("#fileUpload2").val().length > 0){	bannerflag = 1;}
		else {	bannerflag = 0;}

		gParamData = new Object();

		fnInsert();

	});

	$("#updateBtn").click(function(){ fnUpdate(); });

	$("#deleteBtn").click(function(){ fnPreDelete(); });

	$("#noticeWrite").click(function(){

		$("#imagePath").attr('src','')
		files.clear();
		gfnInputClear();
		fileUploadCnt = 0;
		fileTotalCnt = 0;
		fileNullCheck = [];
		if($("#ch_01").prop('checked') == true) $("label[for=ch_01]").click()
		$("input[name='toRcptYmd']").val(gfnGetDate(0));
		$("#noticeUploadFileList div").remove();
		quill.setContents()
		$('.half_box_wrapper .showClass').attr('style','display:none;')
		$('.half_box_wrapper .writerClass').removeClass('half_box')

		$(".mainPage").attr("style","display: none")
		$(".writePage").attr("style","display: block")
		$(".viewPage").attr("style","display: none")


	})

	$("#mainPageView").click(function(){
		fnSearch();

		$(".mainPage").attr("style","display: block")
		$(".writePage").attr("style","display: none")
		$(".viewPage").attr("style","display: none")
	})

	$("#noticeCancel").click(function(){
	    $("#imagePath").attr('src','')

		files.clear();
		gfnInputClear();

		fnSearch();

		$(".mainPage").attr("style","display: block")
		$(".writePage").attr("style","display: none")
		$(".viewPage").attr("style","display: none")
	})


	$("#fileUpload").change(function(){
		if(fileTotalCnt >= 5){
			gfnPopMsg.alert('파일 5개 넘음')
			$("#fileNm_01").val('')
			return;
		}

		var file = $(this)[0].files[0];

		//var ext = file.name.split('.').pop().toLowerCase();
		var ext = file.name.split('.')[file.name.split('.').length-1].toLowerCase()

		if($.inArray(ext, ['pdf','hwp','ppt','pptx','xls','xlsx','doc','docx','mp3','mp4','m4v','avi','wmv','mwa','asf','mpg','mpeg','mkv','mov']) == -1){
			gfnPopMsg.alert(gfnGetMessage(10077))
			$("#fileNm_01").val('')
			return;
		}

		if(files.containsValue(file)){
			gfnPopMsg.alert('동일한 파일이 있습니다.')
			$("#fileNm_01").val('')
			return;
		}

		files.put('fileList'+fileUploadCnt,file);
		var cur = $("#fileUpload").val().split("\\");

		if(cur[cur.length - 1].length > 60){
			gfnPopMsg.alert('파일이름이 60자리를 넘어갑니다.')
			$("#fileNm_01").val('')
			return;
		}

	    //$("#fileNm_01").val(cur[cur.length - 1]);
	    var str = '<div class="badge" style="">'+cur[cur.length - 1]+'<a href="javascript:void(0)" class="fileListMove" id="fileList'+fileUploadCnt+'">X</a></div>';
	    $("#noticeUploadFileList").append(str)


		$("#fileList"+fileUploadCnt).click(function(){
			var id = $(this).attr('id');
			files.remove(id);
			$(this).parent('div').remove();
			fileTotalCnt--;
		})

		fileTotalCnt++;
		fileUploadCnt++;
	})

	$("#fileUpload2").change(function(e){

        var file = $(this)[0].files[0];

		//var ext = file.name.split('.').pop().toLowerCase();
        var ext = file.name.split('.')[file.name.split('.').length-1].toLowerCase()

        if($.inArray(ext, ['jpg','jpeg','png']) == -1){
		    gfnPopMsg.alert(gfnGetMessage(10078))
		    return;
		}

        handleImgFileSelect(e);

		var cur = $("#fileUpload2").val().split("\\");
	    $("#fileNm_02").val(cur[cur.length - 1]);

	})

	$("#ch_01").change(function(){
		if($("#ch_01").prop('checked') == true){
			$('.half_box_wrapper .toRcpt').attr('style','display:block;')
			$('.half_box_wrapper .bannerClass').addClass('half_box')

			$('.imageSetting').attr('style','display:block;')

			$("#bannerImage").change();


		}else{
			$('.half_box_wrapper .toRcpt').attr('style','display:none;')
			$('.half_box_wrapper .bannerClass').removeClass('half_box')

			$('.imageSetting').attr('style','display:none;')
			if($("#ch_02").prop('checked') == true) $("label[for=ch_02]").click()
		}

	})

	$("#ch_02").change(function(){
	    $("#imagePath").attr('src','')
		if($("#ch_02").prop('checked') == true){
			//$('.half_box_wrapper .imageClass').addClass('half_box')

			$('.bannerPath').attr('style','display:none;')
			$('.imagePath').attr('style','display:block;')
			$("#fileNm_02").addClass('checkFormat')
		}else{
			$('.imagePath').attr('style','display:none;')
			$('.bannerPath').attr('style','display:block;')
			//$('.half_box_wrapper .imageClass').removeClass('half_box')
			$("#fileNm_02").val('');
			$("#fileUpload2").val('');
			$("#fileNm_02").css("outline","")
			$("#fileNm_02").removeClass('checkFormat')

			$("#bannerImage").change();

		}
	})

	$("#ch_04").change(function(){

    	if($("#ch_04").prop("checked")){
    		$("#toRcptYmd").removeAttr('disabled')
    	}else{
    		$("#toRcptYmd").attr('disabled','disabled')
    	}
    })

	$('#toRcptYmd').datepicker();
	$("input[name='toRcptYmd']").val(gfnGetDate(0));

	$("#imageDetail").click(function(){

       if($("#imagePath").attr('src') != ''){
            $("#imageView").show()
       }
    })

    $("#bannerImage").change(function(){

    	$("#imagePath").attr('src','../../resources/img/banner/'+$("#bannerImage").val()+'.jpg')
    })

    $("#imageDetail2").click(function(){

       if($("#imagePath").attr('src') != ''){
            $("#imageView").show()
       }
    })

    $("#ch_date").change(function(){

    	if($("#ch_date").prop("checked")){
    		$("#startDate").removeAttr('disabled')
    		$("#endDate").removeAttr('disabled')
    	}else{
    		$("#startDate").attr('disabled','disabled')
    		$("#endDate").attr('disabled','disabled')
    	}
    })

	if(searchId != ''){
	    setTimeout(function(){
	        fnNoticeIdView(searchId);
	    }, 500)

	}else{
		fnSearch();
	}
}

/*********************************************
 * 그리드 초기화
 *********************************************/
function fnInitGrid(){

  firstGrid = new ax5.ui.grid();

    firstGrid.setConfig({
        target: $('[data-ax5grid="first-grid"]'),
        showLineNumber: true,
        lineNumberColumnWidth: tLineNumberWidth,
        sortable: true,
        virtualScrollX: false,
        virtualScrollY: false,
        header:{
            align: "center",
            columnHeight: tHeaderColumnHeight,

        }
        ,
        body:{
            columnHeight: tBodyColumnHeight
        }
        ,
        columns:[
            {key: "TITLE", label: "제목", width:1020, align:"left", size :10 ,formatter : function(){return "<a href='javascript:void(0)' onclick='fnNoticeView("+this.item.ID+","+this.item.RID+")'>"+this.item.TITLE+"</a>" }},
            {key: "USER_NAME", label: "작성자", width:100, align:"center"},
            {key: "WRITE_YMD", label: "등록일", width:100, align:"center"},
            {key: "HIT", label: "조회", width:80, align:"right"},
            {key: "ID", label: "게시판 ID", width:0, align:"left"},
            {key: "USER_ID", label: "작성자 ID", width:0, align:"left"}
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')

}

/********************************
 * 두번째 그리드 초기화
 ********************************/
function fnInitGrid2(){

    secondGrid = new ax5.ui.grid();

    secondGrid.setConfig({
        target: $('[data-ax5grid="second-grid"]'),
        showLineNumber: true,
        lineNumberColumnWidth: tLineNumberWidth,
        sortable: true,
        virtualScrollX: false,
        virtualScrollY: false,
        header:{
            align: "center",
            columnHeight: tHeaderColumnHeight
        }
        ,
        body:{
            columnHeight: tBodyColumnHeight
        }
        ,
        columns:[
            {key: "TITLE", label: "제목", width:1015, align:"left", size :10 ,formatter : function(){return "<a href='javascript:void(0)' onclick='fnNoticeView("+this.item.ID+","+this.item.RID+")'>"+this.item.TITLE+"</a>" }},
            {key: "USER_NAME", label: "작성자", width:100, align:"center"},
            {key: "WRITE_YMD", label: "등록일", width:100, align:"center"},
            {key: "HIT", label: "조회", width:80, align:"right"},
            {key: "ID", label: "게시판 ID", width:0, align:"left"},
            {key: "USER_ID", label: "작성자 ID", width:0, align:"left"}
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')
}

function initSetting(){
    var data = new Object();

    data.eventId = "FAILOVER"
    data.eventCode = "EXEC_TYPE"
    data.eventSetting = "jobType";

    gfnTransation("/initSetting",data,"POST",fnSetting)


    data.eventCode = "JOB_STATE"
    data.eventSetting = "jobState";

    gfnTransation("/initSetting",data,"POST",fnSetting)

    /*data.jobStateName = "JOB_STATE_NAME";

    gfnTransation("/initSetting",data,"POST",fnSetting)*/

}


function fnSetting(data) {

    var select = data.resData.result;

    var eventId = data.resData.eventId;

    var tag = $("#"+data.resData.eventSetting);

    if(eventId == "FAILOVER"){

        for(var i = 0; i < select.length;i++){
            var option = "<option value='"+select[i].CODE+"'>"+select[i].CODE_NAME+"</option>"
            tag.append(option)
        }

        $("#"+data.resData.eventSetting+" option:eq(0)").prop("selected", true);
    }else if(eventId= "PROCESS"){
        $("#"+data.resData.eventSetting+" option").remove();
            tag.append(option)
        for(var i = 0; i < select.length;i++){
            var option = "<option value='"+select[i].PROCESS_ID+"'>"+select[i].PROCESS_NAME+"</option>"
            tag.append(option)
        }

        $("#"+data.resData.eventSetting+" option:eq(0)").prop("selected", true);
    }


}

function setGridData(_pageNo)
{
    var list = [];
    var totalPage = 0;
    pageNum = _pageNo;

    for(var i = (_pageNo*20) ; i <= (_pageNo*20)+19; i++)
    {
        list.push(resultMap[i]);
    }

    if((resultMap.length%20) == 0)
    {
        totalPage = (resultMap.length/20);
    }
    else
    {
        totalPage = (resultMap.length/20)+1;
    }

    firstGrid.setData({
        list: list,
        page: {
            currentPage: _pageNo,
            pageSize: 20,
            totalElements: resultMap.length,
            totalPages: parseInt(totalPage)
        }
    });


}


function setGridSort(key, order){

    resultMap.sort(function(a, b){
       if("asc" == order){
            return (a[key] > b[key]) ? 1 : ((a[key] < b[key]) ? -1 : 0);
       }else{
            return (b[key] > a[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
       }
    })


}

function fnNoticeView(rid){

	gfnSetProcessBar('on')
	var data = new Object();
	data.rid = rid;

	gfnTransation("/Notice/SearchDetail",data,"POST",fnSearchDetailCallback)

	//gfnTransation("/Notice/SearchSub",data,"POST",fnSearchSubCallback)
}

function fnNoticeIdView(id){

	gfnSetProcessBar('on')
	var data = new Object();
	data.id = id;

	gfnTransation("/Notice/SearchDetail",data,"POST",fnSearchDetailCallback)
}



function namoEditorSetting() {

		gfnSetProcessBar('on')

        CrossEditor = new NamoSE('editor1');
    	CrossEditor.params.Width = "100%";
    	CrossEditor.params.Height = "480px";
    	CrossEditor.params.UploadFileExecutePath = namoEditorFilePath;
		CrossEditor.params.ParentEditor = document.getElementById("writeContents");
		CrossEditor.SetActiveTab(0);
		CrossEditor.ShowTab(false);
		CrossEditor.params.ImageWidthLimit = 1200;
		CrossEditor.params.UserToolbar = true;
		var toolbar  = "newdoc|print|pagebreak|spacebar|undo|redo|cut|copy|paste|pastetext|search|replace|selectall|spacebar|image|backgroundimage|insertfile|spacebar|hyperlink|"
			toolbar += "bookmark|inserthorizontalrule|specialchars|emoticon|spacebar|layout|insertlayer|moveforward|movebackward|enter|bold|italic|underline|strikethrough|fontcolor|"
			toolbar += "fontbackgroundcolor|cancelattribute|spacebar|justifyleft|justifycenter|justifyright|justifyfull|outdent|indent|txtmargin|numberset|numbersettype|markset|spacebar|"
			toolbar += "marksettype|tableinsert|tabledraginsert|spacebar|tablerowinsert|tablerowdelete|tablecolumninsert|tablecolumndelete|spacebar|tablecellmerge|tablecellsplit|spacebar|"
			toolbar += "tablecellattribute|spacebar|spellchecker|enter|template|formatblock|fontname|fontsize|lineheight|spacebar|blockquote|subscript|superscript|spacebar|dirltr|dirrtl|"
			toolbar += "spacebar|fullscreen|help|information";

		CrossEditor.params.CreateToolbar = 	toolbar
		CrossEditor.EditorStart();

	    CrossEditor2 = new NamoSE('editor2');
    	CrossEditor2.params.Width = "100%";
    	CrossEditor2.params.Height = "450px";
    	CrossEditor2.params.ImageWidthLimit = 1200;
    	CrossEditor2.params.Readonly = true

    	CrossEditor2.params.UploadFileExecutePath = namoEditorFilePath;
		CrossEditor2.params.ParentEditor = document.getElementById("noticContents");

		CrossEditor2.EditorStart();

		$("#flash").parent('a').parent('span').remove()
}

function OnInitCompleted(e){ 		    //에디터가 사용할 준비가 완료된 이후 호출됨

   if(e.editorTarget.params.ParentEditor.attributes.id.value == 'writeContents'){
   	 namoEditor = e;
   }else{
     namoEditor2 = e;

     CrossEditor2.ShowTab(false);
	 CrossEditor2.ShowToolbar(0,0);
     CrossEditor2.ShowToolbar(1,0);
     CrossEditor2.ShowToolbar(2,0);
     CrossEditor2.SetActiveTab(2);

     //$("#NamoSE_Ifr__editor2").contents().find('#NamoSE_editorframe_editor2').contents().find('body').attr('style','-webkit-user-modify : read-only;')


     fnInitComp();
   }

   gfnSetProcessBar('off')

}

function utillEditorSetting() {

	var toolbarOptions = [
	  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	  ['blockquote', 'code-block'],

	  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
	  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
	  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
	  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	  [{ 'direction': 'rtl' }],                         // text direction

	  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

	  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	  [{ 'font': [] }],
	  ['link'],
	  ['image'],
	  [{ 'align': [] }],
	  ['clean']                                         // remove formatting button
	];

	quill = new Quill('#editor-container', {
	  modules: {
	    toolbar: toolbarOptions,
		keyboard: {
			bindings: {
					list: {
						key: 'backspace',
						context: {
						format: ['list']
						},
					handler: function (range, context) {
						if (range.length === 0 && range.index !== 0) {
							this.quill.deleteText(range.index - 1, 1, Quill.sources.USER);
						} else {
							this.quill.deleteText(range, Quill.sources.USER);
						}
					}
				}
			}
		},
	 	imageResize: {
          displaySize: true
        },
	  },
	  	theme: 'snow',
		placeholder: '게시글 작성...',
	});

	quill.on('text-change', function() {
        document.getElementById("quill_html").value = quill.root.innerHTML;
	});

	quill.getModule('toolbar').addHandler('image', function () {
        selectLocalImage();
    });

	quill2 = new Quill('#editor-container2', {
	    placeholder: '게시글 조회...',
		readOnly: true,
	    theme: 'bubble'
	  });
}


function onDivContentHandler(){
	var $drop = $("#writeContents");
	$drop.on("dragenter", function(e) {  //드래그 요소가 들어왔을떄
		$(this).addClass('drag-over');
	}).on("dragleave", function(e) {  //드래그 요소가 나갔을때
		$(this).removeClass('drag-over');
	}).on("dragover", function(e) {
		e.stopPropagation();
		e.preventDefault();
	}).on('drop', function(e) {  //드래그한 항목을 떨어뜨렸을때
		e.preventDefault();
		$(this).removeClass('drag-over');

		var files = e.originalEvent.dataTransfer.files;  //드래그&드랍 항목

		for(var i = 0; i < files.length; i++) {
			var file = files[i];
			var size = imageUpload.push(file);  //업로드 목록에 추가
			var type = file.type.split('/')[0]
			preview(file, size - 1,type);  //미리보기 만들기
		}
	});
}

function preview(file, idx, type) {
	var reader = new FileReader();
	reader.onload = (function(f, idx) {
		return function(e) {
			var divC= "";
			if(type == 'image')  divC = '<img src="' + e.target.result + '" title="' + escape(f.name) + '"/>'
			else if(type == 'video') divC =  '<video id="videoPlayer" src="' + e.target.result + '" preload="metadata" autoplay="autoplay"	height="195px" controls></video>'
		$("#writeContents").append(divC);
		};
	})(file, idx);
	reader.readAsDataURL(file);
}

function divContentKeyDown(e){
	if(e.keyCode == 8){

	}

}


