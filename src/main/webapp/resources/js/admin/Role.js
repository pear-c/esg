//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호

var firstGrid;
var secondGrid;
var sudGrid;
var rowIndex;
var resultMap;
var curRoleId;
var newData;

var secondResultMap;
var checkList = [];
var resultList = {};
var testList;


var firstGridWidth, secondGridWidth, sudGridWidth;
var firstGridHeight, secondGridHeigh, sudGridHeight;

//그리드 데이터 조회 없을 경우 문자 표시 위치 설정용 변수
var firstLPad, secondLPad, sudLPad;
var firstTPad, secondTPad, sudTPad;

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

    if (fnPreSearch())
    {
        var data = gfnGetInputParam();

        //롤 조회
        gfnTransation("/Role/SearchRole",data,"POST",fnSearchCallback)
    }
}

/********************************
 * 조회 처리
 ********************************/
function fnSecondSearch(index) {

    if (fnPreSearch())
    {
        if(undefined != index)
        {
            var data = gfnGetInputParam();

            data.roleId = firstGrid.getList()[index]["ROLE_ID"];

            gfnTransation("/Role/SearchRoleMenu",data,"POST", fnSecondSearchCallback)

        }


    }
}

/********************************
 * 조회 콜백
 ********************************/
function fnSearchCallback(data) {
    resultMap = data.resData.searchRole;

    fnInitGrid1();
    fnInitGrid2();
    firstGrid.setData(resultMap);
    if (0 == resultMap.length) {
        fnInitGrid2();
        gfnSetNoDataMsg('first');
        gfnSetNoDataMsg('second');
    }
    else {
        rowIndex = gfnGetTrsDataRowPos(firstGrid, trsData);
        trsData = {};
        gfnSelectFocus('first-grid', rowIndex-1, rowIndex);
        firstGrid.focus(rowIndex);
        fnSecondSearch(rowIndex);
    }


    /*
    if("INSERT" == tAction)
    {
        if(newData!=undefined)
        {
            var index;
            for(var i = 0; i < resultMap.length; i++)
            {
                if(newData.popRoleId == resultMap[i].ROLE_ID)
                {
                    index = i;
                    break;
                }
            }
            tAction = "";
            curRoleId = resultMap[index].ROLE_ID;
            rowIndex = index;
            fnSecondSearch(index);

            gfnSelectFocus('first',index, index);
            firstGrid.focus(index);
        }
    }
    else if("UPDATE" == tAction)
    {

    }
    else
    {
          if(undefined == rowIndex)
          {
            rowIndex = 0;
          }
          fnSecondSearch(rowIndex);
    }
    */

}
/********************************
 * 조회 처리
 ********************************/
function fnSecondSearchCallback(data) {
    secondResultMap = data.resData.searchRoleMenu;

    //const test = cloneObj(secondResultMap);

    fnInitGrid2();
    testList = fnGetCloneObj(secondResultMap);
    resultList = {};
    checkList = [];
    secondGrid.setData(secondResultMap);
    gfnSelectFocus('first',rowIndex,rowIndex );

}
/********************************
 * 조회3(사용자별 권한) 조회 콜백
 ********************************/
function fnSudSearchCallback(data) {

    var resultMap = data.resData.searchUserPriv;

    sudGrid.setData(resultMap);
}

/********************************
 * 업데이트 처리
 ********************************/
function fnUpdateCallback(data) {

    if(data.success == 'Y'){

        $("#layPop01").css("display","none");

         fnSearch();
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}

/********************************
 * 조회 처리
 ********************************/
function fnRoleInsetCallback(data) {

    if(data.success == 'Y'){

        $("#roleAddPop").css("display","none");

         fnSearch();
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}

/********************************
 * 조회 처리
 ********************************/
function fnRoleMenuSaveCallback(data) {

    if(data.success == 'Y'){
        fnSecondSearch(rowIndex);
        alert(gfnGetMessage('10024'));
        gfnRoleFocus();
    }else{
        gfnPopMsg.alert(data.resData.message);
    }

}

function fnRoleMenuSaveCallback2(data) {

    if(data.success == 'N'){
        gfnPopMsg.alert(data.resData.message);
    }

}

/********************************
 * 수정 처리전 사전 체크
 ********************************/
function fnPreUpdate() {
    //필수 입력 체크
    if (!gFnInputCheck())
        return false;

    return true;
}

/********************************
 * 수정 처리
 ********************************/
function fnUpdate() {
    if (fnPreUpdate())
    {
        var data = new Object();
		
        data.userId = $("#popUserId").val();
        data.userName = $("#popUserNameRole").val();
        data.role = $("#popRole").val();
        data.ip = $("#popAccessIp").val();

        gfnTransation("/Role/SearchUserPriv",data,"POST",fnSudSearchCallback)
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
	var roleId = firstGrid.getList()[rowIndex]['ROLE_ID'];
	if ('R999' == roleId) {
		//R999 ROLE은 관리자 권한으로 삭제 하실수 없습니다.
		gfnPopMsg.alert(gfnGetMessage(10056));
		return;
	}

	if ('RDEV' == roleId) {
		//R999 ROLE은 관리자 권한으로 삭제 하실수 없습니다.
		gfnPopMsg.alert(gfnGetMessage(10088));
		return;
	}


    var data = new Object();

    data.roleId = $("#popRoleId").val();
    tAction = "DELETE"
    data.action = tAction;

    gfnTransation("/Role/DeleteRole",data,"POST",fnRoleDeleteCallback)

}

function fnRoleDeleteCallback(data) {

    if(data.success == 'Y'){

        $("#roleAddPop").css("display","none");

         fnSearch();



        if(rowIndex == (resultMap.length -1))
        {
            fnSecondSearch(rowIndex-=1);
            gfnSelectFocus('first',rowIndex, rowIndex);
            firstGrid.focus(rowIndex);
        }
        else
        {   fnSecondSearch(rowIndex);
            gfnSelectFocus('first',rowIndex, rowIndex);
            firstGrid.focus(rowIndex);
        }


    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}

/********************************
 * 사용자별 권한 저장 처리전 사전 체크
 ********************************/
function fnPreUserPopSave(){
    //필수 입력 체크
    if (!gFnInputCheck())
        return false;

    var roleId = $("#popRole").val();
    var ip = $("#popAccessIp").val();

    if ("R999" == roleId || "RDEV" == roleId) {
        if ("" == ip) {
            //관리자는 접근 IP가 반드시 필요합니다.
            alert(gfnGetMessage(39));
            return false;
        }
    }
    return true;
}

/********************************
 * 사용자별 권한 저장
 ********************************/
function fnUserPopSave(){
    if(fnPreUserPopSave())
    {
        var data = new Object();

        data.userId = $("#popUserId").val();
        data.userName = $("#popUserNameRole").val();
        data.role = $("#popRole").val();
        data.accessIp = $("#popAccessIp").val();
        data.deptCode = $("#deptCode").val();
        data.deptName = $("#deptName").val();

        data.action = tAction;

        gfnTransation("/Role/SaveUserRole",data,"POST",fnUpdateCallback)
    }
}

/********************************
 * 조회 처리
 ********************************/
function fnUserPopDelete(){
     //삭제 하시겠습니까?
    if(gfnConfirm(10002) == true){
        var data = new Object();

        data.userId = $("#popUserId").val();
        data.userName = $("#popUserNameRole").val();
        data.action = "DELETE";

        gfnTransation("/Role/DeleteUserRole",data,"POST",fnUpdateCallback)


     }
}

/********************************
 * 조회 처리
 ********************************/
function fnPrePopRoleSave(){
    //필수 입력 체크
    if (!gFnInputCheck())
        return false;

    return true;
}

/********************************
 * 조회 처리
 ********************************/
function fnPopRoleSave(){
    if(fnPrePopRoleSave()){
        trsData = {};
        trsData.ROLE_ID = $("#popRoleId").val();

        var data = gfnGetInputParam();

        newData = data;
        data.action = tAction;

        gfnTransation("/Role/SaveRole",data,"POST",fnRoleInsetCallback)
    }
}



//-------------------------------------------------------------------------------
// 사용자 정의 함수
// ::: 자유롭게 작성 하되 fn Prefix와 함께 Camel 케이스 표기법으로 작성
//-------------------------------------------------------------------------------
/********************************
 * 조회 처리
 ********************************/
function popUserInsert(){
    gFnAllClear();

    //롤 Select 바이딩용 데이터 조회
    gfnTransationSync("/Role/SearchRole",{},"POST",fnSearchRoleComboCallback)

    $("#popUserId").val("");
    $("#popUserNameRole").val("");
    $("#popRole").val("R010");
    $("#popRole").change(0);
    $("#popAccessIp").val("");


    $("#insertUserPopTitle").html("사용자 추가");
    $("#popUserSave").html('저장');
    $("#layPop01").css("display","block");
    $("#popUserId").removeAttr('readonly');
    $("#popUserNameRole").removeAttr('readonly');
    $(".popUserInfoGrid").click(function(){

        $("#tPopUserInfo").css("z-index",300);
        $("#tPopUserInfo").css("display","block");

        gfnPopGridInit()
    });
    tAction = "INSERT";
}

/********************************
 * 사용자별 권한 팝업 롤 콤보 데이터 조회 콜백
 ********************************/
function fnSearchRoleComboCallback(data) {
    if(data.success == 'Y'){

        selectData = data.resData.searchRole;
        $("#popRole option").remove();

        var str="";

        for(var i=0;i<selectData.length;i++){
            str += "<option value="+selectData[i].ROLE_ID+">"+selectData[i].ROLE_NM+"</option>";
        }

        $("#popRole").append(str);
    }
}

/********************************
 * 조회 처리
 ********************************/
function popUserUpdate(index){
    gFnAllClear();

    //롤 Select 바이딩용 데이터 조회
    gfnTransationSync("/Role/SearchRole",{},"POST",fnSearchRoleComboCallback)

     $(".popUserInfoGrid").click(function(){
        $("#tPopUserInfo").css("display","none");
    })

    $("#popUserId").val(sudGrid.getList()[index]['USER_ID']);
    $("#popUserNameRole").val(sudGrid.getList()[index]['USER_NAME']);
    $("#popRole").val(sudGrid.getList()[index]['ROLE_ID']);
     $("#popRole").change();
    $("#popAccessIp").val(sudGrid.getList()[index]['ACCESS_IP']);

   $("#popUserId").attr('readonly','readonly');
   $("#popUserNameRole").attr('readonly','readonly');

   $("#insertUserPopTitle").html("사용자 수정");
    $("#popUserDelete").css("display","inline-block");
    $("#layPop01").css("display","block");

    tAction = "UPDATE";
}
/********************************
 * 조회 처리
 ********************************/
function popRoleInsert(){
    gFnAllClear();
    $("#popRoleId").val("");
    $("#popRoleName").val("");
    $("#popRoleId").removeAttr('readonly');
    //$("#insertRolePopTitle").html("롤 추가");
    $("#popRoleDelete").css("display","none");
    $("#roleAddPop").css("display","block");
    tAction = "INSERT";
}
/********************************
 * 조회 처리
 ********************************/
function popRoleUpdate(index){
    gFnAllClear();
	
    $("#popRoleId").val(firstGrid.getList()[index]['ROLE_ID']);
    $("#popRoleId").attr('readonly','readonly');
    $("#popRoleName").val(firstGrid.getList()[index]['ROLE_NM']);
	$("#popLogin").val(firstGrid.getList()[index]['LOGIN_PAGE'])
    //$("#insertRolePopTitle").html("롤 수정");
    $("#popRoleDelete").css("display","inline-block");
    $("#roleAddPop").css("display","block");
    tAction = "UPDATE";
}
/********************************
 * 조회 처리
 ********************************/
function fnSelectCheck(index, key){
	var selectList = secondGrid.getList()[index];

	if(key != 'CHK'){
		if(selectList["CHK"] == '0'){
			alert(gfnGetMessage("10091"));
			return;
		}
	}

	var data = new Object();

	data.chk = selectList["CHK"];
	data.menuId = selectList["MENU_ID"];
	data.roleId = curRoleId;
	data.createRole = selectList["CREATE_ROLE"];
	data.updateRole = selectList["UPDATE_ROLE"];
	data.deleteRole = selectList["DELETE_ROLE"];

	gfnTransation("/Role/SaveRoleMenu2",data,"POST",fnRoleMenuSaveCallback2)

    /*checkList[index] = secondGrid.getList()[index];

    var aaa = testList[index]["CHK"];
    var bbb = checkList[index]["CHK"];

    //alert((JSON.stringify(aaa) === JSON.stringify(bbb)));
    if(!(aaa == bbb))
    {
        resultList[index] = index;
    }
    else
    {
        delete resultList[index];
    }
*/
}

/********************************
 * 그리드1(롤) KeyDown 이벤트 핸들러
 ********************************/
function fnGrid1KeyDown(e) {
    if(e.keyCode == 38)
    {
        if(rowIndex == 0)
        {
            return;
        }
         gfnSelectFocus('first', rowIndex, rowIndex-=1);
        //rowIndex-=1;
        //alert("UP :" + rowIndex);
        curRoleId = firstGrid.getList()[rowIndex]["ROLE_ID"];
        fnSecondSearch(rowIndex);
    }
    if(e.keyCode == 40)
    {
        if(rowIndex == resultMap.length-1)
        {
            return;
        }
        gfnSelectFocus('first', rowIndex, rowIndex+=1);
        //rowIndex+=1;
        //alert("DOWN :" + rowIndex);
        curRoleId = firstGrid.getList()[rowIndex]["ROLE_ID"];
        fnSecondSearch(rowIndex);

    }
}
function fnGetCloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
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
    initSetting()

    //그리드 초기화
    fnInitGrid1();
    fnInitGrid2();
    //fnInitGrid3();
}

/********************************
 * 조회 처리
 ********************************/
/**
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 */
function fnInitComp() {

    //조회
    $("#searchBtn").click(function(e){
        e.preventDefault();
        fnSearch();
    });


    //그리드(롤) keydown
    $("#first").keydown(function(e){
        fnGrid1KeyDown(e);
    });

    //롤 추가 버튼
    $("#insertRoleBtn").click(function(){

        popRoleInsert();
    });

    //롤 팝업 저장
    $("#popRoleSave").click(function(){
        fnPopRoleSave();
    });


    //롤 팝업 닫기
    $("#roleAddCloseBtn").click(function(){
        $("#roleAddPop").css("display","none");
    });

    //롤 저장 버튼
    $("#saveRoleBtn").click(function(){
       var checkCnt = 0;

       var data = new Object();
       var updateList = [];

	   /*for (key in secondResultMap) {
           var rowData = secondGrid.getList()[key];
           rowData.ROLE_ID = curRoleId;
           updateList.push(rowData);
       }*/


       for (key in resultList) {
           var rowData = secondGrid.getList()[key];
           rowData.ROLE_ID = curRoleId;
           updateList.push(rowData);
       }


       data.updateList = JSON.stringify(updateList);

       if(0 == updateList.length)
       {
           var checkCnt = 0;
           for(var i = 0; i < secondResultMap.length; i++)
           {
                if("1" == secondResultMap[i].CHK)
                {
                    checkCnt+=1;
                }
           }

           if(0 == checkCnt)
           {
                alert(gfnGetMessage("10025"));
                return;
           }

           gfnTransation("/Role/SaveRoleMenu",data,"POST",fnRoleMenuSaveCallback)
       }
       else
       {
           gfnTransation("/Role/SaveRoleMenu",data,"POST",fnRoleMenuSaveCallback)
       }

    });

    //롤 팝업 삭제
    $("#popRoleDelete").click(function(){
        fnPreDelete();
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
        {id : 'roleNm', numberFormat: false, dataLength: 30, checkFormat: false, isUpper: false},
        {id : 'popRoleId', numberFormat: false, dataLength: 4, checkFormat: true, isUpper: true},
        {id : 'popRoleName', numberFormat: false, dataLength: 30, checkFormat: true, isUpper: false}

    ];
    gfnSetInitComp(arrObj);

}

/********************************
 * 조회 처리
 ********************************/
/**
 * 그리드 초기화
 */
function fnInitGrid1(){

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
                gfnSelectFocus('first', rowIndex, this.dindex);
                rowIndex = this.dindex;
                curRoleId = firstGrid.getList()[this.dindex]["ROLE_ID"];
                fnSecondSearch(rowIndex);


            },
            onDBLClick: function(){
                gfnSelectFocus('first', rowIndex, this.dindex);
                rowIndex = this.dindex;
                popRoleUpdate(this.dindex);

            }
        }
        ,
        columns:[
            {key: "ROLE_ID", label: "롤 ID", width:180, align:"center"},
            {key: "ROLE_NM", label: "롤 명", width:258, align:"left"}
        ]

    });




    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')


    firstGridWidth = $("#first").width();
    firstGridHeight = $("#first").height();

    firstLPad = gfnGetLPad(firstGridWidth) + "px";

    firstTPad = gfnGetTPad(firstGridHeight) + "px";
}

/********************************
 * 조회 처리
 ********************************/
function fnInitGrid2(){
    secondGrid = new ax5.ui.grid();

      secondGrid.setConfig({
        target: $('[data-ax5grid="secondGrid"]'),
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
            onDataChanged: function(){
                fnSelectCheck(this.dindex, this.key);
            },
            mergeCells: ["UPPR_MENU_NM"]

        }
        ,
         columns:[

            {key: "UPPR_MENU_NM", label: "상위메뉴", width:125, align:"left"},
            {key: "MENU_NM", label: "메뉴", width:235, align:"left"},
            {key: "CHK", label:"접속권한", width: 100, align:"center", sortable: false, editor:{
                type: "checkbox", config:{height: 17, trueValue: "1", falseValue: "0"},
            }},
			{key: "CREATE_ROLE", label:"생성권한", width: 100, align:"center", sortable: false, editor:{
                type: "checkbox", config:{height: 17, trueValue: "1", falseValue: "0"},
            }},
			{key: "UPDATE_ROLE", label:"수정권한", width: 100, align:"center", sortable: false, editor:{
                type: "checkbox", config:{height: 17, trueValue: "1", falseValue: "0"},
            }},
			{key: "DELETE_ROLE", label:"삭제권한", width: 100, align:"center", sortable: false, editor:{
                type: "checkbox", config:{height: 17, trueValue: "1", falseValue: "0"},
            }},
            {key: "MENU_ID", label: "MENU ID", width:0, align:"center"},
            {key: "ROLE_ID", label: "ROLE ID", width:0, align:"center"}

        ]
    });
      $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')

    secondGridWidth = $("#second").width();
    secondGridHeight = $("#second").height();

    secondLPad = gfnGetLPad(secondGridWidth) + "px";

    secondTPad = gfnGetTPad(secondGridHeight) + "px";
}

/********************************
 * 조회 처리
 ********************************/
function fnInitGrid3(){

    sudGrid = new ax5.ui.grid();


    sudGrid.setConfig({
        target: $('[data-ax5grid="sudGrid"]'),
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
                rowIndex = this.dindex;
                popUserUpdate(this.dindex);
            }
        }
        ,
        columns:[

            {key: "USER_ID", label: "사번", width:270, align:"center"},
            {key: "USER_NAME", label: "직원명", width:270, align:"center"},
            {key: "ROLE_ID", label: "롤", width:0, align:"center"},
            {key: "ROLE_NM", label: "롤명", width:270, align:"left"},
            {key: "ACCESS_IP", label: "접근IP", width:488, align:"center"}
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')


    sudGridWidth = $("#sud").width();
    sudGridHeight = $("#sud").height();

    sudLPad = gfnGetLPad(sudGridWidth) + "px";

    sudTPad = gfnGetTPad(sudGridHeight) + "px";
}

/********************************
 * 조회 처리
 ********************************/
function gfnFocus()
{
    //alert("1213");
    //$('#sud [data-ax5grid-panel="body"] tbody tr[data-ax5grid-tr-data-index="'+rowIndex+'"] td[data-ax5grid-column-col="0"]').attr("tabIndex",0).focus();
    sudGrid.focus(rowIndex);
    sudGrid.repaint();

}

/********************************
 * 조회 처리
 ********************************/
function gfnRoleFocus()
{
    firstGrid.focus(rowIndex);
    firstGrid.repaint();
    gfnSelectFocus('first', rowIndex, rowIndex);
    //$('#first [data-ax5grid-panel="body"] tbody tr[data-ax5grid-tr-data-index="'+rowIndex+'"] td[data-ax5grid-column-col="0"]').css("background","red");

    //$('#first [data-ax5grid-panel="body"] tbody tr[data-ax5grid-tr-data-index="'+rowIndex+'"] td[data-ax5grid-column-col]').css("background","red");
    //#fff
}

function fnUserPopCallback(data){
    $("#popUserId").val(data.userId);
    $("#popUserNameRole").val(data.userName);
}



/********************************
 * Select Box 바인딩용 조회
 ********************************/
function initSetting(){
    var data = new Object();

    data.eventId = "FAILOVER"

    data.eventCode = "ROLE_REQ"
    data.eventSetting = "popRole";

    gfnTransation("/initSetting",data,"POST",fnSetting)


	gfnTransation("/Role/SearchLoginMenu",data,"POST",fnRoleLoginMenu)

}

/********************************
 * 초기 설정
 ********************************/
function fnSetting(data) {

    var select = data.resData.result;

    var eventId = data.resData.eventId;

    var tag = $("#"+data.resData.eventSetting);

    if(eventId == "FAILOVER"){

        for(var i = 0; i < select.length;i++){
            var option = "<option value='"+select[i].CODE.trim()+"'>"+select[i].CODE_NAME+"</option>"
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

function fnRoleLoginMenu(data){
	var select = data.resData.searchLoginMenu;

	for(var i = 0; i < select.length;i++){
        var option = "<option value='"+select[i].MENU_ID+"'>"+select[i].MENU_NM+"</option>"
        $("#popLogin").append(option)
    }
}


