//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var firstGrid;
var secondGrid;
var rowIndex;
var rowIndex2;
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
        gfnTransation("/Menu/Search",paramData,"POST",fnSearchCallback)
    }
}

/********************************
 * 조회 콜백
 ********************************/
function fnSearchCallback(data) {
    var resultMap = data.resData.resultMap;

    fnInitGrid1();
    fnInitGrid2();
    firstGrid.setData(resultMap);
    if (resultMap.length <= 0) {
        gfnSetNoDataMsg('first-grid');
        gfnSetNoDataMsg('second-grid');
    }
    else {
        rowIndex = gfnGetTrsDataRowPos(firstGrid, trsData);
        trsData = {}

        gfnSelectFocus('first-grid', rowIndex-1, rowIndex);
        firstGrid.focus(rowIndex);
        fnSearch2(rowIndex);
    }
}

/********************************
 * 상세 조회 처리
 ********************************/
function fnSearch2(rowIdx) {
    $("#hiddenUpperMenu").val(firstGrid.getList()[rowIdx]['MENU_ID']);

    $("#hiddenUpperMenuName").val(firstGrid.getList()[rowIdx]['MENU_NM']);

    $("#popParamUpperMenuName2").val($("#hiddenUpperMenuName").val())

    var paramData = new Object();

    paramData.upprMenuId = firstGrid.getList()[rowIdx]['MENU_ID']

    gfnTransation("/Menu/Search",paramData,"POST",fnSearch2Callback)
}

/********************************
 * 상세조회 콜백
 ********************************/
function fnSearch2Callback(data) {
    var resultMap = data.resData.resultMap;
    fnInitGrid2();
    secondGrid.setData(resultMap);
    if (resultMap.length <= 0) {
        $('#second-grid [data-ax5grid-panel="body"]').append('<div data-ax5grid-panel-scroll="body" style="padding-left: ' + gfnGetLPad($("#second-grid").width()) + 'px' + '; padding-right: 0px; top: ' + gfnGetTPad($("#second-grid").height()) + 'px' + ';">데이터가 없습니다.</div>');
    }
    else {
        rowIndex2 = gfnGetTrsDataRowPos(secondGrid, trsData);
        trsData = {};
        gfnSelectFocus('second-grid', rowIndex2-1, rowIndex2);
        secondGrid.focus(rowIndex2);
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
    if (fnPreSave()) {
		if($("#popParamUpperMenuUseYn").val() == 'Y' && firstGrid.getList()[rowIndex]['USE_YN'] == 'N') {
			var useCnt = 0;
        	for(var i =0; i< firstGrid.getList().length;i++){

        		if(firstGrid.getList()[i]['USE_YN'] == 'Y'){
        			useCnt++;
        		}
        	}

        	if(useCnt > 5){
    	        gfnPopMsg.alert(gfnGetMessage(10107));
    	    } else {
				var paramData = new Object();

        		trsData = {};
        		trsData.MENU_ID = $("#popParamUpperMenuId").val()
				
        		paramData.menuId = $("#popParamUpperMenuId").val()
        		paramData.menuNm = $("#popParamUpperMenuName").val()
        		paramData.sortNo = $("#popParamUpperMenuSortNo").val()
        		paramData.useYn = $("#popParamUpperMenuUseYn").val()

        		gfnTransation("/Menu/Save",paramData,"POST",fnSaveCallback)
			}
		} else {
			var paramData = new Object();

        	trsData = {};
        	trsData.MENU_ID = $("#popParamUpperMenuId").val()
			
        	paramData.menuId = $("#popParamUpperMenuId").val()
        	paramData.menuNm = $("#popParamUpperMenuName").val()
        	paramData.sortNo = $("#popParamUpperMenuSortNo").val()
        	paramData.useYn = $("#popParamUpperMenuUseYn").val()

        	gfnTransation("/Menu/Save",paramData,"POST",fnSaveCallback)
		}
	
    }

}

/********************************
 * 상위 메뉴 저장 콜백
 ********************************/
function fnSaveCallback(data) {

	if(data.success == 'Y'){
		$("#layPop01").css("display","none");
		$("#hiddenUpperMenu").val('');
   	     fnSearch();
	}else{
		gfnPopMsg.alert(data.resData.message);
	}
}

/********************************
 * 하위 메뉴 수정 처리전 사전 체크
 ********************************/
function fnPreSaveDetail() {
    //필수 입력 체크
    if (!gfnInputCheck())
        return false;

    return true;
}

/********************************
 * 하위 메뉴 수정 처리
 ********************************/
function fnSaveDetail() {
    if (fnPreSaveDetail()) {
        var paramData = new Object();

        trsData = {}
        trsData.MENU_ID = $("#popParamMenuId").val()

        paramData.upprMenuId = $("#hiddenUpperMenu").val()
        paramData.menuId = $("#popParamMenuId").val()
        paramData.menuNm = $("#popParamMenuName").val()
        paramData.menuPath = $("#popParamMenuPath").val()
        paramData.menuUrl = $("#popParamMenuUrl").val()
        paramData.sortNo = $("#popParamMenuSortNo").val()
        paramData.useYn = $("#popParamMenuUseYn").val()

        gfnTransation("/Menu/Save",paramData,"POST",fnSave2Callback)
    }

}

/********************************
 * 하위 메뉴 조회 처리
 ********************************/
function fnSave2Callback(data) {

	if(data.success == 'Y'){
		$("#layPop02").css("display","none");
		 var paramData = new Object();
    	 paramData.upprMenuId = $("#hiddenUpperMenu").val();
         gfnTransation("/Menu/Search",paramData,"POST",fnSearch2Callback)
	}else{
		gfnPopMsg.alert(data.resData.message);
	}
}

/********************************
 * 상위 메뉴 삭제 처리전 사전 체크
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
 * 상위 메뉴 삭제 처리
 ********************************/
function fnDelete() {
   var paramData = new Object();

   paramData.upprMenuId = $("#popParamUpperMenuId").val()

   gfnTransation("/Menu/Delete",paramData,"POST",fnSaveCallback)
}

/********************************
 * 하위 메뉴 삭제 처리전 사전 체크
 ********************************/
function fnPreDelete2() {
    //삭제 하시겠습니까?
    gfnPopMsg.confirm(gfnGetMessage(10002), fnDelete2);
}

/********************************
 * 하위 메뉴 삭제 처리
 ********************************/
function fnDelete2() {
   var paramData = new Object();

   paramData.menuId = $("#popParamMenuId").val()

   gfnTransation("/Menu/DeleteDetail",paramData,"POST",fnSave2Callback)
}

//-------------------------------------------------------------------------------
// 사용자 정의 함수
// ::: 자유롭게 작성 하되 fn Prefix와 함께 Camel 케이스 표기법으로 작성
//-------------------------------------------------------------------------------
/********************************
 * 상위 메뉴 추가 팝업
 ********************************/
function fnUpperMenuAdd() {
    gfnAllClear();
	$("#popParamUpperMenuId").val('');
    $("#popParamUpperMenuName").val('');
    $("#popParamUpperMenuSortNo").val('');

    $("#popParamUpperMenuUseYn option:eq(0)").prop("selected", true);

    $("#popParamUpperMenuId").removeAttr('readonly');
	$("#popParamSave").html('저장');
	$("#popParamSave").show();

    $("#popParamDelete").css("display","none");
    $("#layPop01").css("display","block");
    tAction = "INSERT";
}

/********************************
 * 하위 메뉴 추가 팝업
 ********************************/
function fnMenuAdd() {
    if($("#hiddenUpperMenu").val() != ''){
        gfnAllClear();

        $("#popParamMenuId").val('');
        $("#popParamMenuName").val('');
        $("#popParamMenuPath").val('');
        $("#popParamMenuUrl").val('');
        $("#popParamMenuSortNo").val('');

        $("#popParamMenuUseYn option:eq(0)").prop("selected", true);

        $("#popParamMenuId").removeAttr('readonly');
		$("#popParamSave2").html('저장');
		$("#popParamSave2").show();

        $("#popParamDelete2").css("display","none");
        $("#layPop02").css("display","block");
        tAction = "INSERT";
    }
}


/********************************
 * 상위 메뉴 그리드 Double Click 이벤트 핸들러
 ********************************/
function fnGridDBClick(rowIdx) {
    gfnAllClear();
    $("#popParamUpperMenuId").val(firstGrid.getList()[rowIdx]['MENU_ID']);
    $("#popParamUpperMenuName").val(firstGrid.getList()[rowIdx]['MENU_NM']);
    $("#popParamUpperMenuSortNo").val(firstGrid.getList()[rowIdx]['SORT_NO']);
    $("#popParamUpperMenuUseYn").val(firstGrid.getList()[rowIdx]['USE_YN']);

	$("#popParamSave").html('수정');
	if(updateRole == '0'){
	$("#popParamSave").hide();
	}
	if(deleteRole == '1'){
    $("#popParamDelete").css("display","inline-block");
	}
    $("#popParamUpperMenuId").attr('readonly','readonly');

    $("#layPop01").css("display","block");
    tAction = "UPDATE";
}

/********************************
 * 하위 메뉴 그리드 Double Click 이벤트 핸들러
 ********************************/
function fnGrid2DBClick(rowIdx) {
    gfnAllClear();
    $("#popParamUpperMenuName2").val($("#hiddenUpperMenuName").val())
    $("#popParamMenuId").val(secondGrid.getList()[rowIdx]['MENU_ID']);
    $("#popParamMenuName").val(secondGrid.getList()[rowIdx]['MENU_NM']);
    $("#popParamMenuPath").val(secondGrid.getList()[rowIdx]['MENU_PATH']);
    $("#popParamMenuUrl").val(secondGrid.getList()[rowIdx]['MENU_URL']);
    $("#popParamMenuSortNo").val(secondGrid.getList()[rowIdx]['SORT_NO']);
    $("#popParamMenuUseYn").val(secondGrid.getList()[rowIdx]['USE_YN']);

	$("#popParamSave2").html('수정');
	if(updateRole == '0'){
	$("#popParamSave2").hide();
	}

	if(deleteRole == '1'){
    $("#popParamDelete2").css("display","inline-block");
	}
    $("#popParamMenuId").attr('readonly','readonly');

    $("#layPop02").css("display","block");
    tAction = "UPDATE";
}

/********************************
 * 그리드 keydown 이벤트 핸들러
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
/********************************
 * 그리드 Click 이벤트 핸들러
 ********************************/
function fnGridClick(rowIdx) {
    rowIndex = rowIdx;
    fnSearch2(rowIndex);
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
	fnInitGrid1();
	fnInitGrid2();
}

/********************************
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 ********************************/
function fnInitComp() {

	if(createRole == '0'){
		$("#upperMenuAdd").hide()
		$("#menuAdd").hide();
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
		{id: "popParamUpperMenuUseYn", upprCode: "YN", isAll: false}
     ,  {id: "popParamMenuUseYn", upprCode: "YN", isAll: false}
    ];
    gfnInitComboBind(combo);

	//공통 버튼 이벤트 핸들러 추가
	$("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});

	//상위 메뉴 추가 팝업
	$("#upperMenuAdd").click(function(){
		fnUpperMenuAdd();
	});

    //하위 메뉴 추가 팝업
	$("#menuAdd").click(function(){
		fnMenuAdd();
	});

	//상위 메뉴 저장
	$("#popParamSave").click(function(){
		fnSave();
	});

	$("#popParamSave2").click(function(){
		fnSaveDetail();
	});

	$("#popParamDelete").click(function(){
		fnPreDelete();
	});

	$("#popParamDelete2").click(function(){
		fnPreDelete2();
	});

	$("#first-grid").keydown(function(e){
        fnGridKeyDown(e);
    });
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
        {id : 'menuName', numberFormat: false, dataLength: 10, checkFormat: false, isUpper: false},
		
        {id : 'popParamUpperMenuId', numberFormat: false, dataLength: 6, checkFormat: true, isUpper: true},
        {id : 'popParamUpperMenuName', numberFormat: false, dataLength: 30, checkFormat: true, isUpper: false},
        {id : 'popParamUpperMenuUseYn', numberFormat: false, dataLength: 0, checkFormat: true, isUpper: false},
        {id : 'popParamUpperMenuSortNo', numberFormat: true, dataLength: 5, checkFormat: true, isUpper: false},

        {id : 'popParamMenuId', numberFormat: false, dataLength: 6, checkFormat: true, isUpper: true},
        {id : 'popParamMenuName', numberFormat: false, dataLength: 30, checkFormat: true, isUpper: false},
        {id : 'popParamMenuPath', numberFormat: false, dataLength: 100, checkFormat: true, isUpper: false},
        {id : 'popParamMenuUrl', numberFormat: false, dataLength: 100, checkFormat: false, isUpper: false},
        {id : 'popParamMenuSortNo', numberFormat: true, dataLength: 5, checkFormat: true, isUpper: false},
        {id : 'popParamMenuUseYn', numberFormat: false, dataLength: 0, checkFormat: true, isUpper: false}
    ];
    gfnSetInitComp(arrObj);
}

/********************************
 * 그리드1 초기화
 ********************************/
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
        	onClick: function(){
        	   gfnSelectFocus('first-grid', rowIndex, this.dindex);
               rowIndex = this.dindex;
        	   fnGridClick(this.dindex);
        	},
        	onDBLClick: function(){
        		fnGridDBClick(this.dindex);
        	}
        }
        ,
        columns:[
        	{key: "MENU_ID", label: "상위메뉴 ID", width:125, size :10, align:"center"},
            {key: "MENU_NM", label: "상위메뉴명", width:125, size :10},
            {key: "USE_YN", label: "사용", width:73, align:"center"},
            {key: "SORT_NO", label: "순번", width:70, size :10, align:"center"}
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')
}
/********************************
 * 그리드2 초기화
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
            {key: "MENU_ID", label: "메뉴ID", width:100, size :10, align:"center"},
            {key: "MENU_NM", label: "메뉴명", width:178, align:"left"},
            {key: "MENU_PATH", label: "메뉴경로", width:205, align:"left"},
            {key: "MENU_URL", label: "메뉴URL", width:180, align:"left"},
            {key: "SORT_NO", label: "순번", width:80, align:"center"},
            {key: "USE_YN", label: "사용", width:80, align:"center"}
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')
}
