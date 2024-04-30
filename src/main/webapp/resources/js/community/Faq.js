//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var resultMap
var pagingCount;

var pageNum;

var nowPage = 0;

var paging = 5

var clickEvent = "";

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
      	var data = gfnGetInputParam();

      	data.startPage = nowPage * 5;
        gfnTransation("/Faq/Search",data,"POST",fnSearchCallback)
    }

}


/*********************************************
 * 조회 콜백
 *********************************************/
function fnSearchCallback(data) {
    resultMap = data.resData.resultMap;
    var resultMapCount = data.resData.resultMapCount;


    $("#noticeTotal").text(resultMapCount);
    if(resultMapCount >= paging){
    	pagingCount = Math.ceil(resultMapCount/paging)
    }else{
    	pagingCount = 1;
    }

    $("#faqData li").remove();

    var str = ""

    if(resultMap.length > 0){
	    for(var i=0; i <resultMap.length;i++){
	    	str  = '<li>'
	    	str += '	<a class="faq_tit" href="javascript:void(0)">'+resultMap[i].QUESTION+'</a>'
	    	str += '	<div class="faq_cont">'
	    	str += '		<div class="text">'
	    	str += ' <pre style = "font-weight: bold;">' +resultMap[i].ANSWER + '</pre>'
	    	str += ' <input type = "hidden"  class="faqId"   val="'+resultMap[i].FAQ_ID+'">'
	    	str += '		</div>'
	    	str += ' 	</div>'
	    	str += '</li>'


	    	$("#faqData").append(str);
	    }

		$(".faqList ul li .faq_tit").on("click", function() {
			if($(this).next(".faq_cont").css("display") == "none") {
				$(".faqList ul li").removeClass('active');
				$(".faqList ul li .faq_cont").slideUp(75);
				$(this).parent('li').addClass('active');
				$(this).next(".faqList ul li .faq_cont").slideDown(75);
			} else {
				$(".faqList ul li").removeClass('active');
				$(".faqList ul li .faq_cont").slideUp(75);
			}
		});

    }

    if(searchId != ''){
		var data = new Object();
        data.faqId = searchId;
        searchId = '';
        gfnTransation("/Faq/SearchDetail",data,"POST",fnSearchDetailCallback);
	}

    if(clickEvent != ""){
    	$(".faqId[val="+clickEvent+"]").parent('div').parent('div').prev().click()
    	clickEvent = "";
    }
}


function fnNoticePageMove(page){
	if(page < 1) page = 0;
	if(page >= pagingCount) page = pagingCount-1;

	$("#pagingNum strong").contents().unwrap().wrap('<a href="javascript:void(0)" class="paginigNum"></a>');
	$("#pagingNum a.paginigNum").eq(page).contents().unwrap().wrap('<strong></strong>');

	nowPage = page;

	fnSearch();
}

function fnReplyPageMove(page){
    if(page < 1) page = 0;
    if(page >= pagingCount2) page = pagingCount2-1;

    $("#pagingNum2 strong").contents().unwrap().wrap('<a href="javascript:void(0)" class="paginigNum2"></a>');
    $("#pagingNum2 a.paginigNum").eq(page).contents().unwrap().wrap('<strong></strong>');

    nowPage2 = page;

    fnSearch2();
}

/*********************************************
 * 상세 조회 콜백
 *********************************************/
function fnSearchDetailCallback(data) {

  resultMap = data.resData.resultMap;

  var paginNum = Math.ceil(resultMap.RID/paging);

  if(paginNum > 1){
  	clickEvent = resultMap.FAQ_ID;
  	$(".paginigNum").eq((paginNum-2)).click()
  }

  $(".faqId[val="+resultMap.FAQ_ID+"]").parent('div').parent('div').prev().click()

  var offset = $(".faqId[val="+resultMap.FAQ_ID+"]").parent('div').parent('div').prev().offset()

  $('html').animate({scrollTop: (offset.top - $("html").height()/5)},400)

}

/*********************************************
 * 상세 조회 콜백
 *********************************************/
function fnSearchSubCallback(data) {

}

/*********************************************
 * 생성 처리
 *********************************************/
function fnInsertCallback(data) {

}

/*********************************************
 * 업데이트 처리
 *********************************************/
function fnUpdateCallback(data) {

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

}

/*********************************************
 * 입력 처리2
 *********************************************/
function fnInsert2() {
    if (fnPreInsert()){

            //fnFileUrlNullUpdate();


            var data = new Object();

            data.orgId = $("#hiddenNobieId").val();
            data.contents = $("#replyWrite").val();

            gfnTransation("/Qna/SaveReply",data,"POST",fnInsertCallback);

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

	var data = new Object();

	data.rid = $("#hiddenNobieRid").val();

	gfnTransation("/Qna/SearchDetail",data,"POST",fnUpdateView)
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

	gfnTransation("/Qna/FileDelete",data,"POST",null)

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


//-------------------------------------------------------------------------------
// JQuery
//-------------------------------------------------------------------------------
$(function(){

	//컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
	fnInit();

	//초기 조회
	fnSearch();

});

/*********************************************
 * 초기화
 * - 컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
 *********************************************/
function fnInit() {

	fnInitComp();
}

/*********************************************
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 *********************************************/
function fnInitComp() {


	//공통 버튼 이벤트 핸들러 추가
	$("#searchBtn").click(function(e){

	fnSearch();
	e.preventDefault();

	});

	$("#insertBtn").click(function(){ fnInsert(); });

	$("#insertBtn2").click(function(){ fnInsert2(); });

	$("#updateBtn").click(function(){ fnUpdate(); });

	$("#deleteBtn").click(function(){ fnPreDelete(); });
}

