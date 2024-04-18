//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호

var firstGrid;

//-------------------------------------------------------------------------------
// 공통 함수영역
//-------------------------------------------------------------------------------
/*********************************************
 * 조회 처리전 사전 체크
 *********************************************/
function fnPreSearch() {
    return true;
}

/********************************
 * 조회 처리
 ********************************/
function fnSearch() {

    if (fnPreSearch()){
		var param = new Object();
		param = gfnGetInputParam();
		gfnTransation("/FaqMgm/Search",param,"POST",fnSearchCallback)
	}
        
}

/********************************
 * 조회 콜백
 ********************************/
function fnSearchCallback(data) {
    resultMap = data.resData.resultMap;

    fnInitGrid();
    if (resultMap.length <= 0) {
        gfnSetNoDataMsg('first-grid');
    }
    firstGrid.setData(resultMap);
}

/********************************
 * 저장 처리전 사전 체크
 ********************************/
function fnPreSave() {
	//공통 체크 사항
    if (!gFnInputCheck())
    	return false;

 	return true;
}

/********************************
 * 저장 처리
 ********************************/
function fnSave() {
	if (fnPreSave()){
	   var paramData = new Object();

		if($("#hiddenFaqId").val() != ''){
            paramData.faqId = $("#hiddenFaqId").val();
        }
        paramData.question = $("#popParamQuestion").val();
        paramData.answer = $("#popParamAnswer").val();
        paramData.sortNo = $("#popParamSortNo").val();
        paramData.useYn = $("#popParamUseYn").val();
		paramData.action = tAction;

		gfnTransation("/FaqMgm/Save",paramData,"POST",fnSaveCallback)
	}
}

/********************************
 * 저장 콜백
 ********************************/
function fnSaveCallback(data) {

    if(data.success == 'Y'){
        $("#layPop01").css("display","none");

         fnSearch();
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}

/********************************
 * 삭제 처리전 사전 체크
 ********************************/
function fnPreDelete() {
    //삭제 하시겠습니까?
    /*if(!confirm(gfnGetMessage('10002')))
        return false;

    return true;*/
    gfnPopMsg.confirm(gfnGetMessage(10002), fnDelete);
}

/********************************
 * 삭제 처리
 ********************************/
function fnDelete() {

		var paramData = new Object();

		paramData.faqId = $("#hiddenFaqId").val();

		gfnTransation("/FaqMgm/Delete",paramData,"POST",fnDeleteCallback)

}

/********************************
 * 삭제 콜백ㄱ
 ********************************/
function fnDeleteCallback(data) {
    fnSaveCallback(data);
}

//-------------------------------------------------------------------------------
// 사용자 정의 함수
// ::: 자유롭게 작성 하되 fn Prefix와 함께 Camel 케이스 표기법으로 작성
//-------------------------------------------------------------------------------
/********************************
 * 추가 버튼 이벤트 핸들러
 ********************************/
function fnPopParamAdd() {
	gFnAllClear();
    $("#popParamQuestion").val('')
    $("#popParamAnswer").val('')
    $("#popParamSortNo").val('')
    $("#hiddenFaqId").val('')
    $("#popParamUseYn option:eq(0)").prop("selected", true);

    $("#updateBtn").html('저장');
	$("#updateBtn").show();

    $("#deleteBtn").css("display","none");
    $("#layPop01").css("display","block");
    tAction = "INSERT";
}

/********************************
 * 그리드 Body 더블클릭 이벤트 핸들러
 ********************************/
function fnGridDBClick(rowIdx) {
    gFnAllClear();

    $("#popParamQuestion").val(firstGrid.getList()[rowIdx]['QUESTION'])
    $("#popParamAnswer").val(firstGrid.getList()[rowIdx]['ANSWER'])
    $("#popParamSortNo").val(firstGrid.getList()[rowIdx]['SORT_NO'])
    $("#popParamUseYn").val(firstGrid.getList()[rowIdx]['USE_YN'])
    $("#hiddenFaqId").val(firstGrid.getList()[rowIdx]['FAQ_ID'])

    $("#updateBtn").html('수정');
	if(updateRole == '0'){
	$("#updateBtn").hide();
	}
	if(deleteRole == '1'){
    $("#deleteBtn").css("display","inline-block");
	}

    $("#layPop01").css("display","block");
    tAction = "UPDATE";
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

/********************************
 * 초기화
 * - 컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
 ********************************/
function fnInit() {
	//각종 컴포넌트 데이터 초기화 및 이벤트 추가
	fnInitComp();

	//그리드 초기화
	fnInitGrid();
}

/********************************
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 ********************************/
function fnInitComp() {

	if(createRole == '0'){
		$("#popParamAdd").hide()
	}

	if(updateRole == '0'){
		$("#updateBtn").hide()
	}

	if(deleteRole == '0'){
		$("#deleteBtn").hide()
	}

	//콤보(Select box) 바인딩 설정
    var combo = [
			{id: "popParamUseYn", upprCode: "YN", isAll: false}
    ];
    gfnInitComboBind(combo);


	//공통 버튼 이벤트 핸들러 추가
	$("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});

	//저장 버튼 이벤트
	$("#updateBtn").click(function(){
	   fnSave();
	});

	//삭제 버튼 이벤트
	$("#deleteBtn").click(function(){
	   fnPreDelete();
	});

	//추가 버튼 이벤트
	$("#popParamAdd").click(function(){
        fnPopParamAdd();
    });

    //각 컴포넌트 초기 설정
    //* numberFormat 클래스 : 숫자 Only
    //* data-length 속성 : 길이 제한
    //* checkFormat 클래스 : 필수 입력
    // isUpper : 대문자만 허용
    var arrObj = [
        {id : 'popParamQuestion', numberFormat: false, dataLength: 0, checkFormat: true, isUpper: false},
        {id : 'popParamAnswer', numberFormat: false, dataLength: 0, checkFormat: true, isUpper: false},
        {id : 'popParamUseYn', numberFormat: false, dataLength: 0, checkFormat: true, isUpper: false},
        {id : 'popParamSortNo', numberFormat: true, dataLength: 3, checkFormat: true, isUpper: false}
    ];
    gfnSetInitComp(arrObj);
}

/**
 * 그리드 초기화
 */
function fnInitGrid(){

    firstGrid = new ax5.ui.grid();

    firstGrid.setConfig({
        target: $('[data-ax5grid="first-grid"]'),
      	showLineNumber: true,
        lineNumberColumnWidth: tLineNumberWidth,
        sortable: true,
        header:{
            align: "center",
            columnHeight: tHeaderColumnHeight,

        }
        ,
        body:{
            columnHeight: tBodyColumnHeight,
        	onDBLClick: function(){
        		fnGridDBClick(this.dindex);
        	}
        }
        ,
        columns:[
            {key: "QUESTION", label: "질문", width:550, size :10},
            {key: "ANSWER", label: "답변", width:550, align:"left"},
            {key: "USE_YN", label: "사용", width:100, align:"center"},
            {key: "SORT_NO", label: "순서", width:98, align:"center"},
            {key: "FAQ_ID", label: "FAQ ID", width:0},
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')

}
