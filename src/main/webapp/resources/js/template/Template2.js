//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호
var gMsgData;


var firstGrid;
var rowIndex;
var trsData = {};

var gridOptions;
var gridApi;
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
    var resultMap = data.resData.search;
    
    //ag grid 데이터 업데이트
//	gridApi.setGridOption('rowData', resultMap);
	
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
    if (!gFnInputCheck())
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
function fnInsertBtn() {
    gFnAllClear();

    $("#msgSave").val("저장");
	$("#msgSave").show();
    $("#hiddenMsgId").val('')
    $("#popParamMsgCon").val('')
    $("#popParamUseYn option:eq(0)").prop("selected", true);
    $("#msgDel").css("display","none");
    $("#layPop01").css("display","block");
    tAction = "INSERT";
}

/********************************
 * 그리드 Double Click 이벤트 핸들러
 ********************************/
function fnGridDBClick(rowIdx) {
    gFnAllClear();

    $("#hiddenMsgId").val(firstGrid.getList()[rowIdx]['MSG_ID'])
    $("#popParamMsgCon").val(firstGrid.getList()[rowIdx]['MSG_CONTENTS'])
    $("#popParamUseYn").val(firstGrid.getList()[rowIdx]['USE_YN'])
    $("#popParamUseYn").change();
	$("#msgSave").val("수정");
	if(updateRole == '0'){
	$("#msgSave").hide();
	}
	if(deleteRole == '1'){
    $("#msgDel").css("display","inline-block");
	}
    $("#layPop01").css("display","block");
    tAction = "UPDATE";
}

function fnAdGridDBClick(params) {
    gFnAllClear();

    $("#hiddenMsgId").val(params.MSG_ID)
    $("#popParamMsgCon").val(params.MSG_CONTENTS)
    $("#popParamUseYn").val(params.USE_YN)
    $("#popParamUseYn").change();
	$("#msgSave").val("수정");
	if(updateRole == '0'){
	$("#msgSave").hide();
	}
	if(deleteRole == '1'){
    $("#msgDel").css("display","inline-block");
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
		$("#insertBtn").hide()
	}

	if(updateRole == '0'){
		$("#msgSave").hide()
	}

	if(deleteRole == '0'){
		$("#msgDel").hide()
	}

    //콤보(Select box) 바인딩 설정
    var combo = [
        	{id: "popParamUseYn", upprCode: "YN", isAll: false}
    ];
    gfnInitComboBind(combo);

    //공통 버튼 이벤트 핸들러 추가
    $("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});

    $("#insertBtn").click(function(){
        fnInsertBtn();
     });

    $("#msgSave").click(function(){
       fnSave();
    })

    $("#msgDel").click(function(){
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

/********************************
 * AG 그리드 초기화
 ********************************/
function fnInitAgGrid(rowData){
	// 통합 설정 객체, 아주 많은 속성들이 제공됨(일단 몇개만)
        gridOptions = {
            rowData: rowData,
            columnDefs: [                            // 컬럼 정의
                { field: "MSG_ID", headerName: "메세지ID" },
                { field: "MSG_CONTENTS", headerName: "메세지명" },
                { field: "USE_YN", headerName: "사용여부" }
            ],
            autoSizeStrategy: {                    // 자동사이즈정책
                type: 'fitGridWidth',              // 그리드넓이기준으로
                defaultMinWidth: 150               // 컬럼 최소사이즈
            },
            onRowClicked: function (params) {
			   	rowIndex = params.node.rowIndex;
			},
            onRowDoubleClicked: function (params) {
			   	rowIndex = params.node.rowIndex;
			   	fnAdGridDBClick(params.data)
			},
            rowHeight: 45                          // row 높이지정
        };

        const gridDiv = document.querySelector('#myGrid');
        //  new agGrid.Grid(gridDiv, gridOptions);  // deprecated
        gridApi = agGrid.createGrid(gridDiv, gridOptions);
}