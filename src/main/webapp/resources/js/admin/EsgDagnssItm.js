//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
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

        gfnTransation("/EsgDagnssItm/Search",data,"POST",fnSearchCallback)
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
        trsData.ESG_CLASSIFICATION_NO = $("#popEsgClassificationNo").val();
		
        paramData.esgDomain = $("#popEsgDomain").val();
        paramData.esgCtgry = $("#popEsgCtgry").val();
        paramData.esgClassificationNo = $("#popEsgClassificationNo").val();
        paramData.dagnssItm = $("#popDagnssItm").val();
        paramData.dagnssItmDesc = $("#popDagnssItmDesc").val();
        paramData.aplcnMethod = $("#popAplcnMethod").val();
        paramData.basicAdvance = $("#popBasicAdvance").val();
        paramData.isAttachFiles = $("#popIsAttachFiles").val();
        paramData.useYn = $("#popUseYn").val();
        paramData.sortNo = $("#popSortNo").val();
        paramData.action = tAction;
        gfnTransation("/EsgDagnssItm/Save", paramData, "POST",fnSaveCallback);
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

    paramData.esgDomain = $("#popEsgDomain").val();
    paramData.esgCtgry = $("#popEsgCtgry").val();
    paramData.esgClassificationNo = $("#popEsgClassificationNo").val();

    gfnTransation("/EsgDagnssItm/Delete", paramData, "Post", fnDeleteCallback);
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
    gfnAllClear();

	//버튼 제어
    $("#msgSave").val("저장");
	$("#msgSave").show();
	
	//팝업 항목 초기화
    $("#popEsgDomain option:eq(0)").prop("selected", true);
    $("#popEsgCtgry option:eq(0)").prop("selected", true);
    $("#popEsgClassificationNo").val('')
    $("#popDagnssItm").val('')
    $("#popDagnssItmDesc").val('')
    $("#popAplcnMethod option:eq(0)").prop("selected", true);
    $("#popBasicAdvance option:eq(0)").prop("selected", true);
    $("#popIsAttachFiles option:eq(0)").prop("selected", true);
    $("#popUseYn option:eq(0)").prop("selected", true);
    $("#layPop01").css("display","block");
    tAction = "INSERT";
}

/********************************
 * 그리드 Double Click 이벤트 핸들러
 ********************************/
function fnGridDBClick(rowIdx) {
    gfnAllClear();

    $("#popEsgDomain").val(firstGrid.getList()[rowIdx]['ESG_DOMAIN'])
    $("#popEsgCtgry").val(firstGrid.getList()[rowIdx]['ESG_CTGRY'])
    $("#popEsgClassificationNo").val(firstGrid.getList()[rowIdx]['ESG_CLASSIFICATION_NO'])
    $("#popDagnssItm").val(firstGrid.getList()[rowIdx]['DAGNSS_ITM'])
    $("#popDagnssItmDesc").val(firstGrid.getList()[rowIdx]['DAGNSS_ITM_DESC'])
    $("#popAplcnMethod").val(firstGrid.getList()[rowIdx]['APLCN_METHOD'])
    $("#popAplcnMethod").change();
    $("#popBasicAdvance").val(firstGrid.getList()[rowIdx]['BASIC_ADVANCE'])
    $("#popBasicAdvance").change();
    $("#popIsAttachFiles").val(firstGrid.getList()[rowIdx]['IS_ATTACH_FILES'])
    $("#popIsAttachFiles").change();
    $("#popUseYn").val(firstGrid.getList()[rowIdx]['USE_YN'])
    $("#popUseYn").change();
    $("#popSortNo").val(firstGrid.getList()[rowIdx]['SORT_NO'])
    
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
        	{id: "esgDomain", upprCode: "ESG_DOMAIN", isAll: true},
        	{id: "esgCtgry", upprCode: "ESG_CTGRY", isAll: true},
        	{id: "popEsgDomain", upprCode: "ESG_DOMAIN", isAll: false},
        	{id: "popEsgCtgry", upprCode: "ESG_CTGRY", isAll: false},
        	{id: "popAplcnMethod", upprCode: "APLCN_METHOD", isAll: false},
        	{id: "popBasicAdvance", upprCode: "BASIC_ADVANCE", isAll: false},
        	{id: "popIsAttachFiles", upprCode: "YN", isAll: false},
        	{id: "popUseYn", upprCode: "YN", isAll: false}
    ];
    gfnInitComboBind(combo);
    
	$("#esgDomain").change(function(){
		//콤보(Select box) 바인딩 설정
        var combo = [
            {id: "esgCtgry", upprCode: "ESG_CTGRY", isAll: true, val1: $(this).val().substring(0,1)}
        ];
        gfnInitComboBind(combo);
	});
	
	$("#popEsgDomain").change(function(){
		//콤보(Select box) 바인딩 설정
        var combo = [
            {id: "popEsgCtgry", upprCode: "ESG_CTGRY", isAll: true, val1: $(this).val().substring(0,1)}
        ];
        gfnInitComboBind(combo);
	});
	
    //공통 버튼 이벤트 핸들러 추가
    $("#searchBtn").click(function(e){ 
		fnSearch();  
		e.preventDefault();
	});

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
            mergeCells:["ESG_DOMAIN_NAME", "ESG_CTGRY_NAME"],
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
            {key: "ESG_DOMAIN", label: "ESG_DOMAIN", width:0, align:"center"},
            {key: "ESG_DOMAIN_NAME", label: "영역", width:100, align:"center"},
            {key: "ESG_CTGRY", label: "ESG_CTGRY", width:0, align:"center"},
            {key: "ESG_CTGRY_NAME", label: "범주", width:180, align:"left"},
            {key: "ESG_CLASSIFICATION_NO", label: "분류번호", width:100, align:"center"},
            {key: "DAGNSS_ITM", label: "진단 항목", width:260, align:"left"},
            {key: "DAGNSS_ITM_DESC", label: "영역", width:0, align:"left"},
            {key: "BASIC_ADVANCE", label: "BASIC_ADVANCE", width:0, align:"left"},
            {key: "BASIC_ADVANCE_NAME", label: "기초/심화", width:100, align:"center"},
            {key: "APLCN_METHOD", label: "APLCN_METHOD", width:0, align:"left"},
            {key: "APLCN_METHOD_NAME", label: "적용 방안", width:100, align:"center"},
            {key: "IS_ATTACH_FILES", label: "첨부 파일 여부", width:120, align:"center"},
            {key: "USE_YN", label: "사용 여부", width:80, align:"center"},
            {key: "SORT_NO", label: "정렬 순서", width:80, align:"center"}
        ]

    });

     $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')
}

