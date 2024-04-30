//-------------------------------------------------------------------------------
//전역변수 영역
//-------------------------------------------------------------------------------
//Page에서 사용하는 그리드의 객체를 담는 변수
var firstGrid;
//그리드의 현재 로우 인덱스를 담는 변수
var rowIndex;
//그리드의 현재 로우 인덱스를 찾기 위한 그리드의 Unique 한 컬럼을 담는 객체
var trsData = {};

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

    if (fnPreSearch()) {
        var data = gfnGetInputParam();

        gfnTransation("/Template2/Search",data,"POST",fnSearchCallback)
    }

}

/********************************
 * 조회 콜백
 ********************************/
function fnSearchCallback(data) {
    var resultMap = data.resData.resultMap;
    
    fnInitGrid();
    firstGrid.setData(resultMap);
    if (resultMap.length <= 0) {
        gfnSetNoDataMsg('firstGrid');
    }
    else {
        rowIndex = gfnGetTrsDataRowPos(firstGrid, trsData);
        trsData = {};

        gfnSelectFocus('firstGrid', rowIndex-1, rowIndex);
        firstGrid.focus(rowIndex);
    }

}



/********************************
 * 저장 처리전 사전 체크
 ********************************/
function fnPreSave() {
   //필수 입력 체크
    if (!gfnInputCheck())
        return false;

    return true;
}

/********************************
 * 저장 처리
 ********************************/
function fnSave() {
    if(fnPreSave()) {
		var paramData = new Object();
		
        trsData = {};
        trsData.MSG_ID = $("#hiddenMsgId").val();

        paramData = new Object();
		
        paramData.msgId = $("#hiddenMsgId").val();
        paramData.msgCon = $("#popParamMsgCon").val();
        paramData.useYn = $("#popParamUseYn").val();
        paramData.action = tAction;
        gfnTransation("/Template2/Save", paramData, "POST",fnSaveCallback);
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
    gfnPopMsg.confirm(gfnGetMessage(10002), fnDelete);
}

/********************************
 * 삭제 처리
 ********************************/
function fnDelete() {
    var paramData = new Object();

    paramData.msgId = $("#hiddenMsgId").val();

    gfnTransation("/Template2/Delete", paramData, "Post", fnDeleteCallback);
}

/********************************
 * 삭제 콜백
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
function fnAdd() {
    gfnAllClear();

    $("#btnSave").val("저장");
	$("#btnSave").show();
    $("#hiddenMsgId").val('')
    $("#popParamMsgCon").val('')
    $("#popParamUseYn option:eq(0)").prop("selected", true);
    $("#btnDelete").css("display","none");
    $("#layPop01").css("display","block");
    tAction = "INSERT";
}

/********************************
 * 그리드 Double Click 이벤트 핸들러
 ********************************/
function fnGridDBClick(rowIdx) {
    gfnAllClear();

    $("#hiddenMsgId").val(firstGrid.getList()[rowIdx]['MSG_ID'])
    $("#popParamMsgCon").val(firstGrid.getList()[rowIdx]['MSG_CONTENTS'])
    $("#popParamUseYn").val(firstGrid.getList()[rowIdx]['USE_YN'])
    $("#popParamUseYn").change();
	$("#btnSave").val("수정");
	if(updateRole == '0'){
	$("#btnSave").hide();
	}
	if(deleteRole == '1'){
    $("#btnDelete").css("display","inline-block");
	}
    $("#layPop01").css("display","block");
    tAction = "UPDATE";
}

function fnAdGridDBClick(params) {
    gfnAllClear();

    $("#hiddenMsgId").val(params.MSG_ID)
    $("#popParamMsgCon").val(params.MSG_CONTENTS)
    $("#popParamUseYn").val(params.USE_YN)
    $("#popParamUseYn").change();
	$("#btnSave").val("수정");
	if(updateRole == '0'){
	$("#btnSave").hide();
	}
	if(deleteRole == '1'){
    $("#btnDelete").css("display","inline-block");
	}
    $("#layPop01").css("display","block");
    tAction = "UPDATE";
}
/********************************
 * 그리드(롤) KeyDown 이벤트 핸들러
 ********************************/
function fnGridKeyDown(e) {
    if(e.keyCode == 38)
    {
        if(rowIndex == 0)
            return;
        else
            gfnSelectFocus('firstGrid', rowIndex, rowIndex-=1);
    }
    if(e.keyCode == 40)
    {
        if(rowIndex == firstGrid.getList().length-1)
            return;
        else
            gfnSelectFocus('firstGrid', rowIndex, rowIndex+=1);
    }
}
/********************************
 * 그리드(롤) KeyUp 이벤트 핸들러
 ********************************/
function fnGridKeyUp(e) {
    if(e.keyCode == 38 || e.keyCode == 40)
        gfnSelectFocus('firstGrid', rowIndex-1, rowIndex);
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
 * 초기화 - 컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
 ********************************/
function fnInit() {
    //각종 컴포넌트 데이터 초기화 및 이벤트 추가
    fnInitComp();

    //그리드 초기화
//    fnInitAgGrid()
    fnInitGrid();
}

/********************************
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 ********************************/
function fnInitComp() {

	if(createRole == '0'){
		$("#btnAdd").hide()
	}

	if(updateRole == '0'){
		$("#btnSave").hide()
	}

	if(deleteRole == '0'){
		$("#btnDelete").hide()
	}

    //콤보(Select box) 바인딩 설정
    var combo = [
        	{id: "popParamUseYn", upprCode: "YN", isAll: false}
    ];
    gfnInitComboBind(combo);

    //공통 버튼 이벤트 핸들러 추가
    $("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});

    $("#btnAdd").click(function(){
        fnAdd();
     });

    $("#btnSave").click(function(){
       fnSave();
    })

    $("#btnDelete").click(function(){
       fnPreDelete();
    })

    $("#firstGrid").keydown(function(e){
        fnGridKeyDown(e);
    });

    //그리드(롤) keyup
    $("#firstGrid").keyup(function(e){
        fnGridKeyUp(e);
    });

    //각 컴포넌트 초기 설정
    //* numberFormat 클래스 : 숫자 Only
    //* data-length 속성 : 길이 제한
    //* checkFormat 클래스 : 필수 입력
    // isUpper : 대문자만 허용
    var arrObj = [
        {id : 'msgNm', numberFormat: false, dataLength: 30, checkFormat: false, isUpper: false},
        {id : 'msgId', numberFormat: true, dataLength: 5, checkFormat: false, isUpper: false},
        {id : 'popParamMsgCon', numberFormat: false, dataLength: 100, checkFormat: true, isUpper: false},
        {id : 'popParamUseYn', numberFormat: false, dataLength: 0, checkFormat: true, isUpper: false}
    ];
    gfnSetInitComp(arrObj);
}

/********************************
 * 그리드 초기화
 ********************************/
function fnInitGrid(){

    firstGrid = new ax5.ui.grid();

    firstGrid.setConfig({
        target: $('[data-ax5grid="firstGrid"]'),
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
            onClick: function(){
                gfnSelectFocus('firstGrid', rowIndex, this.dindex);
                rowIndex = this.dindex;
            },
            onDBLClick: function(){
                gfnSelectFocus('firstGrid', rowIndex, this.dindex);
                rowIndex = this.dindex;
                fnGridDBClick(this.dindex);
            }
        }
        ,
        columns:[
            {key: "MSG_ID", label: "메세지ID", width:179, align:"center"},
            {key: "MSG_CONTENTS", label: "메세지명", width:960, align:"left"},
            {key: "USE_YN", label: "사용여부", width:159, align:"center"}
        ]

    });

     $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')
}

