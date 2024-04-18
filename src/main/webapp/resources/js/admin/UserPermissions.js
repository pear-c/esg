//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호

var firstGrid;

var rowIndex = 0;
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

var updateFlag = 0;

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

        //사용자별 권한 조회
        gfnTransation("/UserPermissions/Search",data,"POST",fnSearchCallback)

    }
}

/********************************
 * 조회3(사용자별 권한) 조회 콜백
 ********************************/
function fnSearchCallback(data) {

    resultMap = data.resData.searchUserPriv;

    fnInitGrid();
    firstGrid.setData(resultMap);

    if (resultMap.length <= 0) {
        gfnSetNoDataMsg('first');
    }
    else {
        rowIndex = gfnGetTrsDataRowPos(firstGrid, trsData);
        trsData = {};
        gfnSelectFocus('first', rowIndex-1, rowIndex);
        firstGrid.focus(rowIndex);
    }

    /*
    gfnSelectFocus('first',index, index);
    firstGrid.focus(index);

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
          gfnSelectFocus('first',rowIndex, rowIndex);
          firstGrid.focus(rowIndex);
    }
    */
}

/********************************
 * 업데이트 처리
 ********************************/
function fnUpdateCallback(data) {

    if(data.success == 'Y'){

        $("#layPop01").css("display","none");
        $("#popUserPwd").val('');
        $("#popUserPwdConfirm").val('');

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
    }else if("[10009] 기존에 동일 자료가 있습니다." == data.resData.message){

        gfnSelectFocus('first',rowIndex, rowIndex);
        firstGrid.focus(index);
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
    var data = new Object();

    data.roleId = $("#popRoleId").val();
    tAction = "DELETE"
    data.action = tAction;

    gfnTransation("/Role/DeleteRole",data,"POST",fnRoleDeleteCallback)

}

function fnRoleDeleteCallback(data) {

    if(data.success == 'Y'){

        $("#layPop01").css("display","none");

         fnSearch();



        if(rowIndex == (resultMap.length -1))
        {
            rowIndex-=1;
            gfnSelectFocus('first',rowIndex, rowIndex);
            firstGrid.focus(rowIndex);
        }
        else
        {
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
    {
        $("#popAccessIp").focus();
        return false;
    }

    if($("#popUserPwd").val() != '' && $("#popUserPwd").val() != $("#popUserPwdConfirm").val()){
    	//비밀번호를 확인해 주십시오.
    	alert(gfnGetMessage(10074));
    	return false;
    }


    var roleId = $("#popRole").val();
    var ip = $("#popAccessIp").val();


    //asd
    // 임시예외처리
    /*if ("R999" == roleId) {

        if(fnValidateIpAddress(ip))
        {
            return true;
        }
        else
        {

            return false;
        }
    }
    else
    {
        if('' != ip)
        {
            if(fnValidateIpAddress(ip))
            {
                return true;
            }
            else
            {

                return false;
            }
        }
    }*/



    return true;
}

/********************************
 * 사용자별 권한 저장
 ********************************/
function fnUserPopSave(){
    if(fnPreUserPopSave())
    {
        trsData = {}
        trsData.USER_ID = $("#popUserId").val();


        var data = new Object();
		
        data.userId = $("#popUserId").val();
        data.userName = $("#popUserNameRole").val();
        data.role = $("#popRole").val();
        data.accessIp = $("#popAccessIp").val();
        data.deptCode = $("#deptCode").val();
        data.deptName = $("#deptName").val();
        if(updateFlag == 0){
	        if($('#popUserPwd').val() != '') data.userPwd = $('#popUserPwd').val();
	        else data.userPwd = $("#popUserId").val();
	    }else{
	    	if($('#popUserPwd').val() != '') data.userPwd = $('#popUserPwd').val();
	    }

        data.action = tAction;

        gfnTransation("/UserPermissions/SaveUserRole",data,"POST",fnUpdateCallback)
    }
}

/********************************
 * 삭제 처리전 사전 체크
 ********************************/
function fnPreUserPopDelete() {
    //삭제 하시겠습니까?
    gfnPopMsg.confirm(gfnGetMessage(10002), fnUserPopDelete);
}
/********************************
 * 삭제 처리
 ********************************/
function fnUserPopDelete(){
    var data = new Object();


    data.userId = $("#popUserId").val();
    data.userName = $("#popUserNameRole").val();
    tAction = "DELETE"
    data.action = tAction;

    gfnTransation("/UserPermissions/DeleteUserRole",data,"POST",fnRoleDeleteCallback)
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
    gfnTransationSync("/UserPermissions/SearchRole",{},"POST",fnSearchRoleComboCallback)

    $("#popUserId").val("");
    $("#popUserNameRole").val("");
    $("#popRole").val("R010");
    $("#popRole").change(0);
    $("#popAccessIp").removeClass('checkFormat');
    //$("#popAccessIp").parents('td').prev('th').prev('strong').remove();
    $("#popAccessIp").parents('td').prev('th').empty('.required');
    $("#popAccessIp").parents('td').prev('th').html('접근IP');
    $("#popAccessIp").val("");
    $("#popUserName").val("");

	$("#popUserSave").show()
    //$("#insertUserPopTitle").html("사용자 추가");
    $("#popUserDelete").css("display", "none");

    $("#layPop01").css("display","block");
    $("#popUserId").removeAttr('readonly');
    $("#popUserNameRole").removeAttr('readonly');

    $("#popUserId").click(function(){

        $("#tPopUserInfo").css("z-index",300);
        $("#tPopUserInfo").css("display","block");

        gfnPopGridInit()
    });

    $("#popUserNameRole").click(function(){

        $("#tPopUserInfo").css("z-index",300);
        $("#tPopUserInfo").css("display","block");

        gfnPopGridInit()
    });
    tAction = "INSERT";
    updateFlag = 0;
}

/********************************
 * 사요자별 권한 팝업 롤 콤보 데이터 조회 콜백
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
    gfnTransationSync("/UserPermissions/SearchRole",{},"POST",fnSearchRoleComboCallback)

     $("#popUserId").click(function(){


        $("#tPopUserInfo").css("display","none");

    });

    $("#popUserNameRole").click(function(){


        $("#tPopUserInfo").css("display","none");

    });



    $("#popUserId").val(firstGrid.getList()[index]['USER_ID']);
    $("#popUserNameRole").val(firstGrid.getList()[index]['USER_NAME']);
    $("#popRole").val(firstGrid.getList()[index]['ROLE_ID']);
     $("#popRole").change();
    $("#popAccessIp").val(firstGrid.getList()[index]['ACCESS_IP']);

   $("#popUserId").attr('readonly','readonly');
   $("#popUserNameRole").attr('readonly','readonly');

	if(updateRole == '0'){
	$("#popUserSave").hide();
	}
	if(deleteRole == '1'){
    $("#popUserDelete").css("display","inline-block");
	}
    $("#layPop01").css("display","block");

    $("#popRole option[value='RDEV']").prop('hidden',true)
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
    $("#popRoleSave").html('저장');
	$("#popUserSave").show();
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
    $("#popRoleSave").html('수정');
	if(updateRole == '0'){
	$("#popUserSave").hide();
	}
	if(deleteRole == '1'){
    $("#popUserDelete").css("display","inline-block");
	}
    //$("#insertRolePopTitle").html("롤 수정");

    $("#roleAddPop").css("display","block");
    tAction = "UPDATE";
}
/********************************
 * 조회 처리
 ********************************/
function fnSelectCheck(index){
    checkList[index] = secondGrid.getList()[index];

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

    }
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
    initSetting();

    //그리드 초기화
    fnInitGrid();

}

/********************************
 * 조회 처리
 ********************************/
/**
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 */
function fnInitComp() {

	if(createRole == '0'){
		$("#insertBtn").hide()
	}

	if(updateRole == '0'){
		$("#popUserSave").hide()
	}

	if(deleteRole == '0'){
		$("#popUserDelete").hide()
	}

    //조회
    $("#searchBtn").click(function(e){
        e.preventDefault();
        fnSearch();
    });


    //그리드(롤) keydown
    $("#first").keydown(function(e){
        fnGrid1KeyDown(e);
    });

    //사용자별 권한 추가 버튼
    $("#insertBtn").click(function(){
        popUserInsert();
    });

    //사용자별 권한 팝업 닫기 버튼
    $("#closeBtn").click(function(){
        $("#layPop01").css("display","none");
    });

    //사용자별 권한 사용자 저장
    $("#popUserSave").click(function(){
    	if(updateFlag == 1 || $('#popUserPwd').val() != ''){
    		fnUserPopSave();
    	}else{
    		gfnPopMsg.confirm(gfnGetMessage('10075'), fnUserPopSave);
    	}
    });

     //사용자별 권한 사용자 삭제 버튼
    $("#popUserDelete").click(function(){
        fnPreUserPopDelete();
    });


   $("#popRole").change(function(e){
        //R999

        var selectValue = $("#popRole").val();

        $("#popAccessIp").removeClass('checkFormat');
        //$("#popAccessIp").parents('td').prev('th').prev('strong').remove();
        $("#popAccessIp").parents('td').prev('th').empty('.required');
        $("#popAccessIp").parents('td').prev('th').html('접근IP');

        //asd
        // 예외처리
        //if(selectValue == 'R999'){
        //     var arrObj = [
       //         {id : 'popAccessIp', numberFormat: false, dataLength: 15, checkFormat: true, isUpper: false}
       //     ];
       //     gfnSetInitComp(arrObj);
       // }else{
            $("#popAccessIp").removeClass('checkFormat');
            //$("#popAccessIp").parents('td').prev('th').prev('strong').remove();
            $("#popAccessIp").parents('td').prev('th').empty('.required');
            $("#popAccessIp").parents('td').prev('th').html('접근IP');
            //$("#popAccessIp").parents('td').prev('th').replaceAll('접근IP');
       // }
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
        {id : 'popUserId', numberFormat: true, dataLength: 30, checkFormat: true, isUpper: false},
        {id : 'popUserNameRole', numberFormat: false, dataLength: 10, checkFormat: true, isUpper: true},
        {id : 'popRole', numberFormat: false, dataLength: 10, checkFormat: true, isUpper: true},
        {id : 'popAccessIp', numberFormat: false, dataLength: 15, checkFormat: false, isUpper: false},
        {id : 'popUserId', numberFormat: true, dataLength: 8, checkFormat: false, isUpper: false}

    ];
    gfnSetInitComp(arrObj);




}

/********************************
 * 조회 처리
 ********************************/
/**
 * 그리드 초기화
 */

/********************************
 * 조회 처리
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
                gfnSelectFocus('first', rowIndex, this.dindex);
                rowIndex = this.dindex;
            },
            onDBLClick: function(){
            	updateFlag = 1;

                rowIndex = this.dindex;
                popUserUpdate(this.dindex);
            }
        }
        ,
        columns:[

            {key: "USER_ID", label: "사번", width:215, align:"center"},
            {key: "USER_NAME", label: "직원명", width:215, align:"center"},
            {key: "ROLE_ID", label: "Role ID", width:215, align:"center"},
            {key: "ROLE_NM", label: "Role 명", width:215, align:"left"},
            {key: "ACCESS_IP", label: "접근IP", width:438, align:"center"}
        ]

    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')


    firstGridWidth = $("#first").width();
    firstGridHeight = $("#first").height();

    fisrtLPad = gfnGetLPad(firstGridWidth) + "px";

    fisrtTPad = gfnGetTPad(firstGridHeight) + "px";
}

/********************************
 * 조회 처리
 ********************************/
function gfnFocus()
{
    //alert("1213");
    //$('#sud [data-ax5grid-panel="body"] tbody tr[data-ax5grid-tr-data-index="'+rowIndex+'"] td[data-ax5grid-column-col="0"]').attr("tabIndex",0).focus();
    firstGrid.focus(rowIndex);
    firstGrid.repaint();
    gfnSelectFocus('first', rowIndex, rowIndex);
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

    }
}


/********************************
 * IP 정규식 Check
 ********************************/
 function fnValidateIpAddress(data){
    var format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if(format.test(data))
    {
        return true;
    }
    else
    {
        //입력하신 값은 IP형식이 아닙니다.
        gfnPopMsg.alert(gfnGetMessage(10038));
        $("#popAccessIp").focus();
        return false;
    }
 }


