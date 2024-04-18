//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호

var firstGrid;
var rowIndex;

//-------------------------------------------------------------------------------
// 공통 함수영역
//-------------------------------------------------------------------------------
/*********************************************
 * 조회 처리전 사전 체크
 *********************************************/
function fnPreSearch() {
    if (replaceAll($("#startYmd").val(),'-','') > replaceAll($("#endYmd").val(),'-','')) {
        //시작일자는 종료일자 보다 이후 일수 없습니다.
        alert(gfnGetMessage('10020'));
        return false;
    }
    return true;
}

/********************************
 * 조회 처리
 ********************************/
function fnSearch() {
    
    if (fnPreSearch()){
        gfnSetProcessBar('on')
    	var paramData = gfnGetInputParam();
        
        gfnTransation("/UserActHst/Search",paramData,"POST",fnSearchCallback)
        
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
    }
    else {
        rowIndex = 0;
        gfnSelectFocus('first-grid', rowIndex-1, rowIndex);
        firstGrid.focus(rowIndex);
    }
    gfnSetProcessBar('off')
}

//-------------------------------------------------------------------------------
// 사용자 정의 함수
// ::: 자유롭게 작성 하되 fn Prefix와 함께 Camel 케이스 표기법으로 작성
//-------------------------------------------------------------------------------
/**
 * 사용자 정의 함수 입니다.
 */
function fnUserDefine() {
	
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
            gfnSelectFocus('first-grid', rowIndex, rowIndex-=1);
    }
    if(e.keyCode == 40)
    {   
        if(rowIndex == firstGrid.getList().length-1)
            return;
        else
            gfnSelectFocus('first-grid', rowIndex, rowIndex+=1);
    }
}
/********************************
 * 그리드(롤) KeyUp 이벤트 핸들러
 ********************************/
function fnGridKeyUp(e) {
    if(e.keyCode == 38 || e.keyCode == 40)
        gfnSelectFocus('first-grid', rowIndex, rowIndex);
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

/**
 * 초기화
 * - 컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
 */
function fnInit() {
	//각종 컴포넌트 데이터 초기화 및 이벤트 추가
	fnInitComp();
	
	//그리드 초기화
	fnInitGrid();
}

/**
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 */
function fnInitComp() {

	$("#startYmd").datepicker().datepicker("setDate",new Date());
	$("#endYmd").datepicker().datepicker("setDate",new Date());
	
	//공통 버튼 이벤트 핸들러 추가
	$("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});
	
	//그리드(롤) keydown
    $("#first-grid").keydown(function(e){
        fnGridKeyDown(e);
    });
    
    //그리드(롤) keyup
    $("#first-grid").keyup(function(e){
        fnGridKeyUp(e);
    });
    
    //콤보(Select box) 바인딩 설정
    var combo = [
    ];
    gfnInitComboBind(combo);
    
	//각 컴포넌트 초기 설정
    //* numberFormat 클래스 : 숫자 Only
    //* data-length 속성 : 길이 제한
    //* checkFormat 클래스 : 필수 입력
    // isUpper : 대문자만 허용
    var arrObj = [
        {id : 'userName', numberFormat: false, dataLength: 30, checkFormat: false, isUpper: false},
        {id : 'event', numberFormat: false, dataLength: 30, checkFormat: false, isUpper: false}
    ];
    gfnSetInitComp(arrObj);
    
    $("#excelDown").click(function(){    
    	firstGrid.exportExcel('UserActHst.xls')
    });
	
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
            onClick: function(){
                gfnSelectFocus('first-grid', rowIndex, this.dindex);
                rowIndex = this.dindex;
            }, 
            onDBLClick: function(){
                gfnSelectFocus('first-grid', rowIndex, this.dindex);
                rowIndex = this.dindex;
                
            },
            
        }
        ,
        columns:[
            {key: "ACT_DATE", label: "활동일시", width:200, align:"center"},
            {key: "USER_ID", label: "사원번호", width:150, size :10, align:"center"},
            {key: "USER_NAME", label: "사원명", width:150, align:"center"},
            {key: "USER_DEPT_NAME", label: "부서", width:150, align:"left"},
            {key: "EVENT", label: "이벤트", width:450, align:"left"},
            {key: "IP", label: "IP", width:198, align:"center"}
        ]
        
    });
    
    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')
    
}


