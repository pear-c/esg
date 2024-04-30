//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var firstGrid;
var secondGrid;
var rowIndex = 0;
var rowIndex2 = 0;

var resultMap;

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

        gfnTransation("/EsgInspCriteriaApplyPlan/SearchEsgDagnssItm",paramData,"POST",fnSearchCallback)

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
        rowIndex = gfnGetTrsDataRowPos(firstGrid, trsData);
        trsData = {};
        gfnSelectFocus('first-grid', rowIndex-1, rowIndex);
        firstGrid.focus(rowIndex);
        fnSearch2(rowIndex);
    }
}



/********************************
 * 조회
 ********************************/
function fnSearch2(index) {

    $("#hiddenEsgClassificationNo").val(firstGrid.getList()[index]['ESG_CLASSIFICATION_NO']);

    var paramData = new Object();

    paramData.esgClassificationNo = firstGrid.getList()[index]['ESG_CLASSIFICATION_NO']

    gfnTransation("/EsgInspCriteriaApplyPlan/Search",paramData,"POST",fnSearch2Callback)
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
 * 저장 사전 체크
 ********************************/
function fnPreSave2() {
    //필수 입력 체크
    if (!gfnInputCheck())
        return false;

    return true;
}

/********************************
 * 저장 처리
 ********************************/
function fnSave2() {
    if (fnPreSave2()) {
        var paramData = new Object();

        trsData = {};
        trsData.STEP_CNT = $("#popStepCnt").val();
	
        paramData.esgClassificationNo =  $("#hiddenEsgClassificationNo").val();
        paramData.stepCnt = $("#popStepCnt").val()
        paramData.score = $("#popScore").val()
        paramData.action = tAction;
        gfnTransation("/EsgInspCriteriaApplyPlan/Save",paramData,"POST",fnSave2Callback)
    }
}

/********************************
 * 상세 코드 저장 콜백
 ********************************/
function fnSave2Callback(data) {

    $("#layPop02").css("display","none");
    if(data.success == 'Y'){

          var paramData = new Object();

          paramData.esgClassificationNo = $("#hiddenEsgClassificationNo").val();

         gfnTransation("/EsgInspCriteriaApplyPlan/Search",paramData,"POST",fnSearch2Callback)
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
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
    paramData.esgClassificationNo =  $("#hiddenEsgClassificationNo").val();
    paramData.stepCnt =  $("#popStepCnt").val();
    gfnTransation("/EsgInspCriteriaApplyPlan/Delete",paramData,"POST",fnDelete2Callback)
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
 * 상세코드 추가 버튼 이벤트 핸들러
 ********************************/
function fnAdd2() {

    if($("#hiddenEsgClassificationNo").val() != ''){
        gfnAllClear();

        $("#popStepCnt").val('')
        $("#popScore").val('');

        $("#popEsgClassificationNo").val($("#hiddenEsgClassificationNo").val());
        $("#popStepCnt").removeAttr('readonly');
		$("#popParamSave2").html('저장');
		$("#popParamSave2").show();

        $("#popParamDelete2").css("display","none");
        $("#layPop02").css("display","block");
        tAction = "INSERT";
    }
}


/********************************
 * 진단 항목 그리드 Click 이벤트 핸들러
 ********************************/
function fnGridClick(rowIdx) {
    fnSearch2(rowIdx);
}

/********************************
 * 상세코드 그리드 Doublic Click 이벤트 핸들러
 ********************************/
function fnGrid2DBClick(rowIdx) {
    gfnAllClear();
    var rowData = secondGrid.getList()[rowIdx];

    $("#hiddenEsgClassificationNo").val(firstGrid.getList()[rowIndex]['ESG_CLASSIFICATION_NO']);
    $("#popEsgClassificationNo").val(firstGrid.getList()[rowIndex]['ESG_CLASSIFICATION_NO']);
    $("#popStepCnt").val(rowData['STEP_CNT']);
    $("#popScore").val(rowData['SCORE']);

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
    ];
    gfnInitComboBind(combo);

    //공통 버튼 이벤트 핸들러 추가
    $("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});

    $("#codeAdd").click(function(){
        fnAdd2();
    });

    //저장
    $("#popParamSave2").click(function(){
        fnSave2();

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
        {id : 'popStepCnt', numberFormat: true, dataLength: 3, checkFormat: true, isUpper: false},
        {id : 'popScore', numberFormat: true, dataLength: 3, checkFormat: false, isUpper: false}
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
            }
        }
        ,
        columns:[
            {key: "ESG_CLASSIFICATION_NO", label: "분류 번호", width:120, align:"center", size :10},
            {key: "DAGNSS_ITM", label: "진단 항목", width:450, align:"left"}
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
            {key: "STEP_CNT", label: "단계및충족 건수", width:180, size :10, align:"center"},
            {key: "SCORE", label: "점수", width:80, align:"center"}
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')
}

