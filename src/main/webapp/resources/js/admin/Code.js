//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호

var firstGrid;
var secondGrid;
var rowIndex = 0;
var rowIndex2 = 0;

var resultMap;

var firstGridWidth;
var firstGridHeight;
var secondGridWidth;
var secondGridHeight;

//그리드 데이터 조회 없을 경우 문자 표시 위치 설정용 변수
var firstLPad, secondLPad;
var firstTPad, secondTPad;

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

    if (fnPreSearch()){

        var paramData = gfnGetInputParam();

        gfnTransation("/Code/SearchUpperCode",paramData,"POST",fnSearchCallback)

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
        gfnSetNoDataMsg('first-grid');
        gfnSetNoDataMsg('second-grid');
    }
    else {
        //rowIndex = 0;
        rowIndex = gfnGetTrsDataRowPos(firstGrid, trsData);
        trsData = {};
        gfnSelectFocus('first-grid', rowIndex-1, rowIndex);
        firstGrid.focus(rowIndex);
        fnSearch2(rowIndex);
    }
}



/********************************
 * 디테일 조회
 ********************************/
function fnSearch2(index) {

    $("#hiddenUpperCode").val(firstGrid.getList()[index]['UPPR_CODE']);

    $("#hiddenUpperCodeName").val(firstGrid.getList()[index]['UPPR_CODE_NAME']);

    var paramData = new Object();

    paramData.upprCode = firstGrid.getList()[index]['UPPR_CODE']

    gfnTransation("/Code/SearchCode",paramData,"POST",fnSearch2Callback)
}

/********************************
 * 디테일 조회 콜백
 ********************************/
function fnSearch2Callback(data) {
    var resultMap = data.resData.resultMap;

    fnInitGrid2();
    secondGrid.setData(resultMap);
    if (resultMap.length <= 0) {
        gfnSetNoDataMsg('second-grid');
    }
    else {
        rowIndex2 = gfnGetTrsDataRowPos(secondGrid, trsData);
        gfnSelectFocus('second-grid', rowIndex2-1, rowIndex2);
        secondGrid.focus(rowIndex2);
    }

}

/********************************
 * 상위코드 저장 처리전 사전 체크
 ********************************/
function fnPreSave() {
    //필수 입력 체크
    if (!gFnInputCheck())
        return false;

    return true;
}

/********************************
 * 상위 코드 저장 처리
 ********************************/
function fnSave() {
    if (fnPreSave()) {
        var paramData = new Object();

        trsData = {};
        trsData.UPPR_CODE = $("#popParamUpperCode").val();

        paramData.upprCode = $("#popParamUpperCode").val()
        paramData.upprCodeName = $("#popParamUpperCodeName").val()
        paramData.configYn = $("#popParamConfigYn").val()
        paramData.inputYn = $("#popParamInputYn").val()
        paramData.useYn = $("#popParamCodeUseYn").val()
        paramData.action = tAction;
        gfnTransation("/Code/SaveUpperCode",paramData,"POST",fnSaveCallback)
    }
}

/********************************
 * 상위 코드 저장 콜백
 ********************************/
function fnSaveCallback(data) {

    $("#layPop01").css("display","none");
    if(data.success == 'Y'){

         $("#hiddenUpperCode").val('');

         secondGrid.setData([]);

         fnSearch();
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}


/********************************
 * 상세 코드 저장 처리
 ********************************/
function fnPreSave2() {
    //필수 입력 체크
    if (!gFnInputCheck())
        return false;

    return true;
}

/********************************
 * 상위 코드 저장 처리
 ********************************/
function fnSave2() {
    if (fnPreSave2()) {
        var paramData = new Object();

        trsData = {};
        trsData.CODE = $("#popParamCode").val();
	
		paramData.cmgrpCd = $("#popParamCmgrpCd").val();
        paramData.upprCode =  $("#hiddenUpperCode").val();
        paramData.code = $("#popParamCode").val()
        paramData.codeName = $("#popParamCodeName").val()
        paramData.val1 = $("#popParamVal1").val()
        paramData.val2 = $("#popParamVal2").val()
        paramData.sortNo = $("#popParamSortNo").val()
        paramData.useYn = $("#popParamCodeUseYn2").val()
        paramData.action = tAction;
        gfnTransation("/Code/SaveCode",paramData,"POST",fnSave2Callback)
    }
}

/********************************
 * 상세 코드 저장 콜백
 ********************************/
function fnSave2Callback(data) {

    $("#layPop02").css("display","none");
    if(data.success == 'Y'){

          var paramData = new Object();

          paramData.upprCode = $("#hiddenUpperCode").val();

         gfnTransation("/Code/SearchCode",paramData,"POST",fnSearch2Callback)
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}


/********************************
 * 상위코드 삭제 처리전 사전 체크
 ********************************/
function fnPreDelete() {
    var cnt = secondGrid.getList().length;
    var msgId = '10002';      //삭제 하시겠습니까?

    if (cnt > 0) {
        msgId = '10022';    //하위 데이터가 존재 합니다. \n그래도 삭제하시겠습니까?
    }

    gfnPopMsg.confirm(gfnGetMessage(msgId), fnDelete);
}

/********************************
 * 상위코드 삭제 처리
 ********************************/
function fnDelete() {
    var paramData = new Object();
    paramData.upprCode =  $("#popParamUpperCode").val();
    gfnTransation("/Code/DeleteUpperCode",paramData,"POST",fnDeleteCallback)
}

/********************************
 * 상위코드 삭제 처리 콜백
 ********************************/
function fnDeleteCallback(data) {
    fnSaveCallback(data);
}

/********************************
 * 상세 코드 삭제 처리전 사전 체크
 ********************************/
function fnPreDelete2() {
    gfnPopMsg.confirm(gfnGetMessage(10002), fnDelete2);
}

/********************************
 * 상세 코드 삭제 처리
 ********************************/
function fnDelete2() {
    var paramData = new Object();
    paramData.upprCode =  $("#hiddenUpperCode").val();
    paramData.code =  $("#popParamCode").val();
    gfnTransation("/Code/DeleteCode",paramData,"POST",fnDelete2Callback)
}

/********************************
 * 상세코드 삭제 처리 콜백
 ********************************/
function fnDelete2Callback(data) {
    fnSave2Callback(data);
}

//-------------------------------------------------------------------------------
// 사용자 정의 함수
// ::: 자유롭게 작성 하되 fn Prefix와 함께 Camel 케이스 표기법으로 작성
//-------------------------------------------------------------------------------


/********************************
 * 상위코드 추가 버튼 이벤트 핸들러
 ********************************/
function fnAdd() {
    gFnAllClear();

    $("#popParamUpperCode").val('');
    $("#popParamUpperCodeName").val('');

    $("#popParamConfigYn option:eq(1)").prop("selected", true);
    $("#popParamInputYn option:eq(1)").prop("selected", true);
    $("#popParamCodeUseYn option:eq(0)").prop("selected", true);

    $("#popParamUpperCode").removeAttr('readonly');
    $("#popParamSave").html('저장');
	$("#popParamSave").show();

    $("#popParamDelete").css("display","none");
    $("#layPop01").css("display","block");
    tAction = "INSERT";
}

/********************************
 * 상세코드 추가 버튼 이벤트 핸들러
 ********************************/
function fnAdd2() {

    if($("#hiddenUpperCode").val() != ''){
        gFnAllClear();

        $("#popParamCode").val('')
        $("#popParamCodeName").val('');
        $('#popParamCodeName').val('');
        $('#popParamSortNo').val('');
        $('#popParamVal1').val('');
        $('#popParamVal2').val('');

        $("#popParamUpperCode2").val($("#hiddenUpperCode").val());
        $("#popParamUpperCodeName2").val($("#hiddenUpperCodeName").val());
        $("#popParamCodeUseYn2 option:eq(0)").prop("selected", true);
        $("#popParamCode").removeAttr('readonly');
		$("#popParamSave2").html('저장');
		$("#popParamSave2").show();

        $("#popParamDelete2").css("display","none");
        $("#layPop02").css("display","block");
        tAction = "INSERT";
    }
}

/********************************
 * 상위코드 그리드 DB Click 이벤트 핸들러
 ********************************/
function fnGridDBClick(rowIdx) {
    gFnAllClear();
    var rowData = firstGrid.getList()[rowIdx];
	
	$("#popParamCmgrpCd").val(firstGrid.getList()[rowIdx]['CMGRP_CD'])
    $("#popParamUpperCode").val(rowData['UPPR_CODE']);
    $("#popParamUpperCodeName").val(rowData['UPPR_CODE_NAME']);
    $("#popParamConfigYn").val(rowData['CONFIG_YN']);
    $("#popParamInputYn").val(rowData['INPUT_YN']);
    $("#popParamCodeUseYn").val(rowData['USE_YN']);

	$("#popParamSave").html('수정');
	if(updateRole == '0'){
	$("#popParamSave").hide();
	}
	if(deleteRole == '1'){
    $("#popParamDelete").css("display","inline-block");
	}
    $("#popParamUpperCode").attr('readonly','readonly');

    $("#layPop01").css("display","block");
    tAction = "UPDATE";
}

/********************************
 * 상위코드 그리드 Click 이벤트 핸들러
 ********************************/
function fnGridClick(rowIdx) {
    fnSearch2(rowIdx);
}

/********************************
 * 상세코드 그리드 Doublic Click 이벤트 핸들러
 ********************************/
function fnGrid2DBClick(rowIdx) {
    gFnAllClear();
    var rowData = secondGrid.getList()[rowIdx];

    $("#hiddenUpperCode").val(firstGrid.getList()[rowIndex]['UPPR_CODE']);
    $("#popParamUpperCodeName2").val(firstGrid.getList()[rowIndex]['UPPR_CODE_NAME']);
    $("#popParamCode").val(rowData['CODE']);
    $("#popParamCodeName").val(rowData['CODE_NAME']);
    $("#popParamVal1").val(rowData['VAL1']);
    $("#popParamVal2").val(rowData['VAL2']);
    $("#popParamSortNo").val(rowData['SORT_NO']);
    $("#popParamCodeUseYn2").val(rowData['USE_YN']);

	$("#popParamSave2").html('수정');
	if(updateRole == '0'){
	$("#popParamSave2").hide();
	}

	if(deleteRole == '1'){
    $("#popParamDelete2").css("display","inline-block");
	}
    $("#popParamCode").attr('readonly','readonly');

    $("#layPop02").css("display","block");
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
        else {
            gfnSelectFocus('first-grid', rowIndex, rowIndex-=1);
        }
    }
    if(e.keyCode == 40)
    {
        if(rowIndex == firstGrid.getList().length-1)
            return;
        else {
            gfnSelectFocus('first-grid', rowIndex, rowIndex+=1);
        }
    }
}
/********************************
 * 그리드(롤) KeyUp 이벤트 핸들러
 ********************************/
function fnGridKeyUp(e) {
    if(e.keyCode == 38 || e.keyCode == 40) {
        gfnSelectFocus('first-grid', rowIndex, rowIndex);
        fnSearch2(rowIndex);
    }
}
/********************************
 * 그리드2(롤) KeyDown 이벤트 핸들러
 ********************************/
function fnGrid2KeyDown(e) {
    if(e.keyCode == 38)
    {
        if(rowIndex2 == 0)
            return;
        else
            gfnSelectFocus('second-grid', rowIndex2, rowIndex2-=1);
    }
    if(e.keyCode == 40)
    {
        if(rowIndex2 == secondGrid.getList().length-1)
            return;
        else
            gfnSelectFocus('second-grid', rowIndex2, rowIndex2+=1);
    }
}
/********************************
 * 그리드2(롤) KeyUp 이벤트 핸들러
 ********************************/
function fnGrid2KeyUp(e) {
    if(e.keyCode == 38 || e.keyCode == 40)
        gfnSelectFocus('second-grid', rowIndex2, rowIndex2);
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
		$("#upperCodeAdd").hide()
		$("#codeAdd").hide();
	}

	if(updateRole == '0'){
		$("#popParamSave").hide()
		$("#popParamSave2").hide()
	}

	if(deleteRole == '0'){
		$("#popParamDelete").hide()
		$("#popParamDelete2").hide();
	}

    //콤보(Select box) 바인딩 설정
    var combo = [
	 	{id: "cmgrpCd", upprCode: "CMGRP_CD", isAll: false}
	 ,	{id: "popParamCmgrpCd", upprCode: "CMGRP_CD", isAll: false}	
     ,  {id: "popParamCodeUseYn", upprCode: "YN", isAll: false}
     ,  {id: "popParamCodeUseYn2", upprCode: "YN", isAll: false}
     ,  {id: "popParamConfigYn", upprCode: "YN", isAll: false}
     ,  {id: "popParamInputYn", upprCode: "YN", isAll: false}
    ];
    gfnInitComboBind(combo);

    //공통 버튼 이벤트 핸들러 추가
    $("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});

    $("#upperCodeAdd").click(function(){
        fnAdd();
    });

    $("#codeAdd").click(function(){
        fnAdd2();
    });

    //상위코드 저장
    $("#popParamSave").click(function(){
        fnSave();
    });

    //상세 코드 저장
    $("#popParamSave2").click(function(){
        fnSave2();

    });

    $("#popParamDelete").click(function(){
        fnPreDelete();
    });

    $("#popParamDelete2").click(function(){
        fnPreDelete2();
    });

    //그리드(롤) keydown
    $("#first-grid").keydown(function(e){
        fnGridKeyDown(e);
    });

    //그리드(롤) keyup

    $("#first-grid").keyup(function(e){
        fnGridKeyUp(e);
    });

    //그리드(롤) keydown
    $("#second-grid").keydown(function(e){
        fnGrid2KeyDown(e);
    });

    //그리드(롤) keyup
    $("#second-grid").keyup(function(e){
        fnGrid2KeyUp(e);
    });

    //각 컴포넌트 초기 설정
    //* numberFormat 클래스 : 숫자 Only
    //* data-length 속성 : 길이 제한
    //* checkFormat 클래스 : 필수 입력
    // isUpper : 대문자만 허용
    var arrObj = [
        {id : 'upperCodeName', numberFormat: false, dataLength: 30, checkFormat: false, isUpper: false},
        {id : 'popParamCmgrpCd', numberFormat: false, dataLength: 0, checkFormat: true, isUpper: false},
        {id : 'popParamUpperCode', numberFormat: false, dataLength: 20, checkFormat: true, isUpper: true},
        {id : 'popParamUpperCodeName', numberFormat: false, dataLength: 30, checkFormat: true, isUpper: false},
        {id : 'popParamUpperCode2', numberFormat: false, dataLength: 0, checkFormat: true, isUpper: false},
        {id : 'popParamCode', numberFormat: false, dataLength: 20, checkFormat: true, isUpper: false},
        {id : 'popParamCodeName', numberFormat: false, dataLength: 30, checkFormat: true, isUpper: false},
        {id : 'popParamSortNo', numberFormat: true, dataLength: 3, checkFormat: false, isUpper: false}
    ];
    gfnSetInitComp(arrObj);
}

/********************************
 * 그리드 초기화
 ********************************/
function fnInitGrid(){
    fnInitGrid1();
    fnInitGrid2();
}

/********************************
 * 그리드 초기화
 ********************************/
/**
 * 첫번째 그리드 초기화
 */
function fnInitGrid1(){

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
            onClick: function() {
                gfnSelectFocus('first-grid', rowIndex, this.dindex);
                rowIndex = this.dindex;
                fnGridClick(this.dindex);
            },
            onDBLClick: function(){
                gfnSelectFocus('first-grid', rowIndex, this.dindex);
                rowIndex = this.dindex;
                fnGridDBClick(this.dindex);
            }
        }
        ,
        columns:[
            {key: "UPPR_CODE", label: "상위코드", width:178, align:"left", size :10},
            {key: "UPPR_CODE_NAME", label: "상위코드명", width:260, align:"left"},
            {key: "CONFIG_YN", label: "환경설정", width:80, align:"center"},
            {key: "INPUT_YN", label: "입력설정", width:80, align:"center"},
            {key: "USE_YN", label: "사용", width:80, align:"center"},
            {key: "CMGRP_CD", label: "CMGRP CD", width:0}

        ]

    });
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
        header:{
            align: "center",
            columnHeight: tHeaderColumnHeight,
        }
        ,
        body:{
            columnHeight: tBodyColumnHeight,
            onClick: function(){
                gfnSelectFocus('second-grid', rowIndex2, this.dindex);
                rowIndex2 = this.dindex;
            },
            onDBLClick: function(){
                gfnSelectFocus('second-grid', rowIndex2, this.dindex);
                rowIndex2 = this.dindex;
                fnGrid2DBClick(this.dindex);
            }
        }
        ,
        columns:[
            {key: "CODE", label: "코드", width:100, size :10, align:"left"},
            {key: "CODE_NAME", label: "코드명", width:160, align:"left"},
            {key: "VAL1", label: "VAL1", width:80, align:"center"},
            {key: "VAL2", label: "VAL2", width:118, align:"center"},
            {key: "USE_YN", label: "사용유무", width:80, align:"center"},
            {key: "SORT_NO", label: "순번", width:80, align:"center"}
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')
}

