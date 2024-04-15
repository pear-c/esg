//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호

var firstGrid;
var resultMap
var ck;
var lstWork;
var rowIndex;
var lstCnt = [];

var upprCode;
var code;

var selectColor;

var enterCheck = 0;
var spaceCheck = 0;

let bar = $('.bar');
let percent = $('.percent');

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
    	var paramData = gfnGetInputParam();
        gfnTransation("/Config/Search",paramData,"POST",fnSearchCallback)
}

/**
 * 조회 콜백
 */
/*function fnSearchCallback(data) {
    resultMap = data.resData.resultMap;

    firstGrid.setData(resultMap);

    // resultMap[1].VAL2

    for(var i = 0; i < resultMap.length; i++)
    {


        if("PROCESS_CATEGORY" == resultMap[i].UPPR_CODE)
        {
            $("td[data-ax5grid-panel-name='body-scroll'][data-ax5grid-data-index='"+i+"'][data-ax5grid-column-row='0'][data-ax5grid-column-col='5'] span button").html("&nbsp&nbsp&nbsp&nbsp&nbsp");
            $("td[data-ax5grid-panel-name='body-scroll'][data-ax5grid-data-index='"+i+"'][data-ax5grid-column-row='0'][data-ax5grid-column-col='5'] span button").css("background",resultMap[i].VAL2);
        }
        else if("ENCRYPTION" == resultMap[i].UPPR_CODE || "KAKAOTALK_USEYN" == resultMap[i].UPPR_CODE || "DRM_USEYN" == resultMap[i].UPPR_CODE)
        {
            $("td[data-ax5grid-panel-name='body-scroll'][data-ax5grid-data-index='"+i+"'][data-ax5grid-column-row='0'][data-ax5grid-column-col='5'] span button").html(resultMap[i].YN_NAME);
        }
        else if("UMS_SEND_TEL_NO" == resultMap[i].UPPR_CODE)
        {
            var temp = resultMap[i].VAL2.replaceAll("-","");
            var num = "";
            //date.substring(0, 4) + "-" + date.substring(4, 2) + "-" + date.substring(6);
            if("02" == temp.substring(0,2))
            {
                if(10 == temp.length)
                {
                    num = temp.substring(0,2) + "-" + temp.substring(2,6) + "-" + temp.substring(6);
                }
                else
                {
                    num = temp.substring(0,2) + "-" + temp.substring(2,5) + "-" + temp.substring(5);
                }
            }
            else if("01" == temp.substring(0,2))
            {
                num = temp.substring(0,3) + "-" + temp.substring(3,7) + "-" + temp.substring(7);
            }
            else
            {
                num = temp.substring(0,3) + "-" + temp.substring(3,6) + "-" + temp.substring(6);
            }

             $("td[data-ax5grid-panel-name='body-scroll'][data-ax5grid-data-index='"+i+"'][data-ax5grid-column-row='0'][data-ax5grid-column-col='5'] span button").html(num);
        }
        else
        {
            $("td[data-ax5grid-panel-name='body-scroll'][data-ax5grid-data-index='"+i+"'][data-ax5grid-column-row='0'][data-ax5grid-column-col='5'] span button").html(resultMap[i].VAL2);
        }

    }

     //.click(function(){//dblclick(function(){
    $("td[data-ax5grid-panel-name='body-scroll'][data-ax5grid-column-row='0'][data-ax5grid-column-col='5']").on('click',function(evt){

        var index = $("td[data-ax5grid-panel-name='body-scroll'][data-ax5grid-column-row='0'][data-ax5grid-column-col='5']").index(this);


        if("PROCESS_CATEGORY"==resultMap[index].UPPR_CODE)
        {
            fnGridDBClick(index);
        }
        else
        {
            fnGridDBClick2(index);
        }

    });


}*/



function fnSearchCallback(data) {
    resultMap = data.resData.resultMap;
    cntMap = data.resData.cntMap;

   var str = "";
   var num = 0;

  //데이터 바인딩

  if(resultMap.length > 0){

	$("#mainTable").css("display", "block");
    $("#noData").css("display", "none");
	
    if(cntMap.length > 0)
    {
        for(var i = 0; i < cntMap.length; i++)
        {
            str += '<tbody>';

            for(var j = 0; j < cntMap[i].CNT; j++)
            {
                str += '<tr>'
                str += '<td style="text-align: center;"><span>'+ resultMap[num].SEQ +'</span></td>'
                if(j==0)
                {
                    str += '<td rowspan='+ (cntMap[i].CNT) +' >' + resultMap[num].UPPR_CODE_NAME + '</td>' //class="txt_center rowspan_td"
                }
                str += '<td class="configCode" style="text-align: left;"><span>'+ resultMap[num].CODE_NAME +'</span></td>'


                if("PROCESS_CATEGORY" == resultMap[num].UPPR_CODE)
                {
                    str += '<td class="popup stop" style="text-align: center;"><span style="background:'+resultMap[num].VAL2+'">&nbsp&nbsp&nbsp&nbsp&nbsp</span></td>'
                }
                else if("ENCRYPTION" == resultMap[num].UPPR_CODE || "KAKAOTALK_USEYN" == resultMap[num].UPPR_CODE || "DRM_USEYN" == resultMap[num].UPPR_CODE || "LOGO_MANAGE" == resultMap[num].UPPR_CODE)
                {
					if("LOGO_MANAGE" == resultMap[num].UPPR_CODE && "B" == resultMap[num].CODE){
						str += '<td class="popup stop" style="text-align: center;"><span>'+ resultMap[num].VAL2.split("\\")[resultMap[num].VAL2.split("\\").length-1] +'</span></td>'
					}else{
                    	str += '<td class="popup stop" style="text-align: center;"><span>'+ resultMap[num].YN_NAME +'</span></td>'
					}
                }
                else if("UMS_SEND_TEL_NO" == resultMap[num].UPPR_CODE)
                {
                    var temp = resultMap[num].VAL2.replace(/-/gi,""); //.replaceAll("-","");
                    var num = "";

                    if("02" == temp.substring(0,2))
                    {
                        if(10 == temp.length)
                        {
                            num = temp.substring(0,2) + "-" + temp.substring(2,6) + "-" + temp.substring(6);
                        }
                        else
                        {
                            num = temp.substring(0,2) + "-" + temp.substring(2,5) + "-" + temp.substring(5);
                        }
                    }
                    else if("01" == temp.substring(0,2))
                    {
                        num = temp.substring(0,3) + "-" + temp.substring(3,7) + "-" + temp.substring(7);
                    }
                    else
                    {
                        num = temp.substring(0,3) + "-" + temp.substring(3,6) + "-" + temp.substring(6);
                    }

                     str += '<td class="popup stop" style="text-align: center;"><span>'+ num +'</span></td>'
                }
                else
                {
                    str += '<td class="popup stop" style="text-align: center;"><span>'+ resultMap[num].VAL2 +'</span></td>'
                }


                //str += '<td style="text-align: center;"><span>'+ resultMap[num].VAL2 +'</span></td>'
                str += '</tr>'
                num++;

            }
            str += '</tbody>';

        }

         $("#mainTable tbody").remove();
         $("#mainTable").append(str);
         //$("#inBodyData").append(str);

    }

  }
  else
  {
    $("#inBodyData").remove();
	$("#mainTable").css("display", "none");
    $("#noData").css("display", "block");
  }


    /*
   if(15 < $("#mainTable tr").length)
   {
        $("#lastCol").css("width","117px");
   }
   else
   {
        $("#lastCol").css("width","100px");
   }*/

   $(".popup").dblclick(function(){

        var index = $('td[class="popup stop"]').index(this);


        if("PROCESS_CATEGORY"==resultMap[index].UPPR_CODE)
        {
            fnGridDBClick(index);
        }
        else
        {
            fnGridDBClick2(index);
        }

    });

     $(".configCode").dblclick(function(){

        var index = $('td[class="configCode"]').index(this);


        if("PROCESS_CATEGORY"==resultMap[index].UPPR_CODE)
        {
            fnGridDBClick(index);
        }
        else
        {
            fnGridDBClick2(index);
        }

    });





     gfnSetProcessBar('off')
}



/**
 * 업데이트 처리
 */
function fnUpdateCallback(data) {

    if(data.success == 'Y'){
        $("#layPop01").css("display","none");
        $("#layPop02").css("display","none");
         gfnPopMsg.alert(gfnGetMessage(10005));

         fnSearch();

    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}

function fnDBConnCallBack(data){
	if(data.success == 'Y'){
		var dbSelect = data.resData.resultMap;

		$("#DBTable table").remove();

		var keys = Object.keys(dbSelect[0])

		var header = '<table id="mainTableDB" style="width: 100%" summary="">'
		    header += '<caption >작업 수행 결과</caption>'
			header += '<colgroup>'
			for(var i= 0; i< keys.length ; i++){
				header += '<col style="width: 100px">'
			}
			header += '</colgroup>'
			header += '<thead>'
			header += '<tr class="bottom_line">'
			for(var i= 0; i< keys.length ; i++){
				header += '<th scope="col" style="width: 200%">'+keys[i]+'</th>'
			}
			header += '</tr>'
			header += '</thead>'
			header += '<tbody id="mainTableValue" class="center">'
			header += '</tbody>'
			header += '</table>'

		$("#DBTable").append(header)

		var DBValue = "";
		for(var j=0; j< dbSelect.length;j++){
			DBValue += "<tr>"
			for(var i= 0; i< keys.length ; i++){
				DBValue += '<td style="text-align:center"><span>'+dbSelect[j][keys[i]] + '</span></td>';
				//console.log(keys[i] +" : "+ dbSelect[j][keys[i]])
			}
			DBValue += "</tr>"
		}


		$("#mainTableValue").append(DBValue)

		$("#layPop04").show()



	}else{
		gfnPopMsg.alert('조회된 데이터가 없거나 DB적용 완료');
	}
}

/**
 * 입력 처리전 사전 체크
 */
function fnPreInsert() {
    return true;
}

/**
 * 입력 처리
 */
function fnInsert() {
    if (fnPreInsert())
        gfnInsert();
}

/**
 * 수정 처리전 사전 체크
 */
function fnPreUpdate() {
    return true;
}

/**
 * 수정 처리
 */
function fnUpdate() {
    if (fnPreUpdate()){

    }

}

/**
 * 삭제 처리전 사전 체크
 */
function fnPreDelete() {
    return true;
}

/**
 * 삭제 처리
 */
function fnDelete() {
    if (fnPreDelete())
        gfnDelete();
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
 * 상위코드 그리드 DB Click 이벤트 핸들러
 ********************************/
function fnGridDBClick(rowIdx) {
    gFnAllClear();

    var rowData = resultMap[rowIdx];//firstGrid.getList()[rowIdx];

    var upprCodeName = rowData.UPPR_CODE_NAME;
    var codeName = rowData.CODE_NAME;

    $("#popColorTitle").html(upprCodeName+"("+codeName+") 설정");



    upprCode = rowData.UPPR_CODE;
    code = rowData.CODE;

    var val1 = rowData.VAL1;
    var val2 = rowData.VAL2;
    var colorSet;
    if ('COLOR' == val1) {
        $("#layPop01").css("display","block");
        colorSet = $(".color_cell");
        for (var i = 0; i < colorSet.length; i++) {
            colorSet.eq(i).removeClass('selected');
        }
        for (var i = 0; i < colorSet.length; i++) {
            if (val2 == colorSet[i].value) {
                colorSet.eq(i).addClass('selected');
                break;
            }
        }
    }

    tAction = "UPDATE";
}

function fnGridDBClick2(rowIdx){

     var rowData = resultMap[rowIdx];

    upprCode = rowData.UPPR_CODE;
    code = rowData.CODE;

    var upprCodeName = rowData.UPPR_CODE_NAME;
    var codeName = rowData.CODE_NAME;
    var val2 = rowData.VAL2;

    $("#popTitle").html(upprCodeName+"("+codeName+") 설정");

    if("SERVER_IP" == upprCode)
    {
        $("#popConfig").val(resultMap[rowIdx].VAL2);
        $("#configSet").show();
        $("#ynSet").hide();
		$("#pathSet").hide();
    }
    else if("ROBOT_WORK_TIME" == upprCode)
    {
        $("#popConfig").val(resultMap[rowIdx].VAL2);
        $("#configSet").show();
        $("#ynSet").hide();
		$("#pathSet").hide();
    }
    else if("ENCRYPTION" == upprCode || "KAKAOTALK_USEYN" == upprCode || "DRM_USEYN" == upprCode || "LOGO_MANAGE" == upprCode)
    {
		if("LOGO_MANAGE" == upprCode && "B" == code){
			$("#pathSet").show();

			$("#configSet").hide();

	        $("#popConfigYn").val(val2);
	        $("#ynSet").hide();
		}else{
	        $("#configSet").hide();
			$("#pathSet").hide();
	        $("#popConfigYn").val(val2);
	        $("#popConfigYn").change();
	        $("#ynSet").show();
		}
    }
    else if("UMS_SEND_TEL_NO" == upprCode)
    {
        $("#popConfig").val(resultMap[rowIdx].VAL2);
        $("#configSet").show();
        $("#ynSet").hide();
		$("#pathSet").hide();
    }
    else
    {
        $("#popConfig").val(resultMap[rowIdx].VAL2);
        $("#configSet").show();
        $("#ynSet").hide();
		$("#pathSet").hide();
    }


    $("#layPop02").css("display","block");


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

}

/**
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 */
function fnInitComp() {
	
    //콤보(Select box) 바인딩 설정
    var combo = [
        	{id: "popConfigYn", upprCode: "YN", isAll: false}
        ,	{id: "cmgrpCd", upprCode: "CMGRP_CD", isAll: false}
    ];
    gfnInitComboBind(combo);

    $('#startDt, #endDt').datepicker();
    $("input[name='startDt']").val(getDate(-30));
    $("input[name='endDt']").val(getDate(0));

    //$("#process_start_date").datepicker().datepicker("setDate",new Date());
    //$("#process_end_date").datepicker().datepicker("setDate",new Date());

    //공통 버튼 이벤트 핸들러 추가
    $("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});

    $("#insertBtn").click(function(){ fnInsert(); });

    $("#updateBtn").click(function(){ fnUpdate(); });

    $("#deleteBtn").click(function(){ fnDelete(); });

    $("#btnSelect").click(function(){
        var i = 0;

        if(ck != 1)
        {
            for(; i < resultMap.length; i++)
            {
                firstGrid.setValue(i,"CHK", 1);
            }
            ck = 1;
        }
        else
        {
            for(; i < resultMap.length; i++)
            {
                firstGrid.setValue(i,"CHK", 0);
            }
            ck = 0;
        }

    });

    $(".color_cell").click(function(){

        var val2 = this.value;
        var colorSet;
        colorSet = $(".color_cell");
        for (var i = 0; i < colorSet.length; i++) {
            colorSet.eq(i).removeClass('selected');
        }
        for (var i = 0; i < colorSet.length; i++) {
            if (val2 == colorSet[i].value) {
                colorSet.eq(i).addClass('selected');
                break;
            }

        }

        selectColor = val2;

        tAction = "UPDATE";

    });

   $("#popParamSave01").click(function(){

        var data = new Object();
        data.val2 = selectColor;
        data.code = code;
        data.upprCode = upprCode;

        gfnTransation("/Config/Save",data,"POST",fnUpdateCallback)


   });

   $("#popParamSave02").click(function(){

        var data = new Object();
        data.code = code;
        data.upprCode = upprCode;


        if("SERVER_IP"==upprCode)
        {
            var val2 = $("#popConfig").val();
            if(fnValidateIpAddress(val2))
            {
                data.val2 = val2;
                gfnTransation("/Config/Save",data,"POST",fnUpdateCallback)
            }
            else
            {
                return;
            }

        }
        else if("ROBOT_WORK_TIME"==upprCode)
        {
            var val2 = $("#popConfig").val();
            if(fnValidateTimeAddress(val2))
            {
                data.val2 = val2;
                gfnTransation("/Config/Save",data,"POST",fnUpdateCallback)
            }
            else
            {
                return;
            }
        }
        else if("ENCRYPTION"==upprCode || "KAKAOTALK_USEYN" ==upprCode || "DRM_USEYN" == upprCode || "LOGO_MANAGE" == upprCode)
        {
			if("LOGO_MANAGE" == upprCode && "B" == code){
				//data.val2 = $("#popConfig").val();
				fileUpload("/Config/FileUpload",$("#pathUpload"),data)

			}else{
            	data.val2 = $("#popConfigYn").val();
				gfnTransation("/Config/Save",data,"POST",fnUpdateCallback)
			}
        }
        else if("UMS_SEND_TEL_NO"==upprCode)
        {
            var val2 = $("#popConfig").val().replace(/-/gi,"")     //replaceAll("-","");
            if(fnValidateNumberAddress(val2))
            {
                if(val2.length > 10 && (val2.substring(0,2) != 02 && val2.substring(0,2) != 01))
                {
                    gfnPopMsg.alert(gfnGetMessage(10065));
                    $("#popAccessIp").focus();
                    return;
                }
                data.val2 = val2;
                gfnTransation("/Config/Save",data,"POST",fnUpdateCallback)
            }
            else
            {
                return;
            }
        }

   });


   $(document).keydown(function(e){

        if(e.keyCode == 27 || e.which == 27){
            $(".layPop").css("display","none");
        }

   });


    /*$("#popParamSave").click(function(){
        var paramData = new Object();

         paramData.user_id = $("#popParamUserId").val();;
         paramData.server_id = $("#popParamServerId").val();;
         paramData.process_id = $("#popParamProcessId").val()
         paramData.priv_req_status = $("#popParamPrivReqStatus").val()
         if($("#popParamPrivReqStatus").val() == 'R')
            paramData.priv_rply_cmmnt = $("#popParamPrivRplyCmmnt").val();

         gfnTransation("/JobPriv/Save",paramData,"POST",fnUpdateCallback)
    });*/

    $(document).keyup(function(e){
        if(e.keyCode == 13){
        	enterCheck++;

        	if(enterCheck == 3){
           		$("#dbConn").val('');
           		$("#layPop03").show();
           		enterCheck = 0;
           	}
        }else if(e.keyCode == 32){
        	spaceCheck++;

        	if(spaceCheck == 3){
        		$("#layPop05").show();
           		spaceCheck = 0;
           	}
        }else{
        	enterCheck = 0;
        	spaceCheck = 0;
        }
    })

    $("#popParamDbConn").click(function(){
    	var paramData = new Object();

        paramData.dbConn = $("#dbConn").val();

        gfnTransation("/Config/DBConn",paramData,"POST",fnDBConnCallBack)
    });
}

/**
 * 그리드 초기화
 */
function fnInitGrid(){

    ax5.ui.grid.formatter["date"] = function(){
                var date = this.value;
                if(date.length == 8)
                {
                    return date.substring(0, 4) + "-" + date.substring(4, 2) + "-" + date.substring(6);
                }else
                {
                    return date;
                }
    }

    firstGrid = new ax5.ui.grid();

    firstGrid.setConfig({
        target: $('[data-ax5grid="firstGrid"]'),
        showLineNumber: true,
        lineNumberColumnWidth: tLineNumberWidth,
        sortable: false,
        virtualScrollX: false,
        virtualScrollY: false,
        header:{
            align: "center",
            columnHeight: tHeaderColumnHeight

        }
        ,
        body:{
            columnHeight: tBodyColumnHeight,
            mergeCells:["UPPR_CODE_NAME"],
            /*onDBLClick: function(){
                gfnSelectFocus('first-grid', rowIndex, this.dindex);
                //rowIndex = this.dindex;
                fnGridDBClick(this.dindex);
            }*/
        }
        ,
        columns:[
            {key: "UPPR_CODE_NAME", label: "구분", width:430, align:"left"},
            {key: "UPPR_CODE", label: "구분", width:0, align:"center"},
            {key: "CODE_NAME", label: "항목", width:430, align:"left"},
            {key: "CODE", label: "구분", width:0, align:"center"},
            {key: "VAL1", label: "구분", width:0, align:"center"},
            {key: "VAL2", label: "설정값", width:438, align:"center", formatter: function(){
                var returnVal = '<button type="button" class="btnColor" id="btnC" data-custom-btn="'+ this.dindex+'"></button>';
                return returnVal;
            }}

            /*{key: "CHK", label:"선택", width: 60, align:"center", sortable: false, editor:{
                type: "button", config:{height: 17, trueValue: "1", falseValue: "0"},
            }}*/

           /* {key: "CHK", label:"선택", width: 60, align:"center", sortable: false, editor:{
                type: "checkbox", config:{height: 17, trueValue: "1", falseValue: "0"},
            }},
            {key: "SYNC_DATA_TYPE_NAME", label: "업무", width:160, align:"left"},
            {key: "UPDATE_DATE", label: "최근동기화 일시", width:309, align:"center", formatter:"date"},
            {key: "CNT", label: "동기화 건수", width: 648, align: "right"}
            {key: "BTN", label:"동기화", width: 219 ,align:"center", sortable: false, formatter: function(){
                var returnVal = '<button type="button" class="btnRe" id="btnC" data-custom-btn="'+ this.dindex+'">실행</button>';
                return returnVal;
            }}*/
        ]

    });

     $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')

}


function getDate(diffDay) {
    var date = new Date();
    date.setDate(date.getDate() + (diffDay));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (("" + month).length == 1) {
        month = "0" + month;
    }
    if (("" + day).length == 1) {
        day = "0" + day;
    }
    var today = year + "-" + month + "-" + day;
    return today
}


function datepickerSetting(){
    //datepicker 한국어로 사용하기 위한 언어설정
    $.datepicker.setDefaults($.datepicker.regional['ko']);

    // 시작일(startDt)은 종료일(endDt) 이후 날짜 선택 불가
    // 종료일(endDt)은 시작일(startDt) 이전 날짜 선택 불가

    //시작일
    $('#startDt').datepicker({
        showOn: "both", // 달력을 표시할 타이밍 (both: focus or button)
        buttonImage: "../../resources/img/icon_calendar.gif", // 버튼 이미지
        buttonImageOnly: true, // 버튼 이미지만 표시할지 여부
        buttonText: "날짜선택", // 버튼의 대체 텍스트
        dateFormat: "yy-mm-dd", // 날짜의 형식
        changeYear: true,
        changeMonth: true, // 월을 이동하기 위한 선택상자 표시여부
        //minDate: 0,                       // 선택할수있는 최소날짜, ( 0 : 오늘 이전 날짜 선택 불가)
        onClose: function(selectedDate) {
            // 시작일(startDt) datepicker가 닫힐때
            // 종료일(endDt)의 선택할수있는 최소 날짜(minDate)를 선택한 시작일로 지정
            $("#endDt").datepicker("option", "minDate", selectedDate);
        }
    });

    //종료일
    $('#endDt').datepicker({
        showOn: "both",
        buttonImage: "../../resources/img/icon_calendar.gif",
        buttonImageOnly: true,
        buttonText: "날짜선택",
        dateFormat: "yy-mm-dd",
        changeYear: true,
        changeMonth: true,
        //minDate: 0, // 오늘 이전 날짜 선택 불가
        onClose: function(selectedDate) {
            // 종료일(endDt) datepicker가 닫힐때
            // 시작일(startDt)의 선택할수있는 최대 날짜(maxDate)를 선택한 종료일로 지정
            $("#startDt").datepicker("option", "maxDate", selectedDate);
        }
    });
}



/********************************
 * IP 정규식 Check
 ********************************/
 function fnValidateIpAddress(data){
    var format = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?){1}([:][0-9][0-9][0-9][0-9][0-9]?)?$/;

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


/********************************
 * 시간 정규식 Check
 ********************************/
 function fnValidateTimeAddress(data){
    var format = /^([1][0-9]|2[0-4]|[1-9])$/;

    if(format.test(data))
    {
        return true;
    }
    else
    {
        //입력하신 값은 시간형식이 아닙니다.
        gfnPopMsg.alert(gfnGetMessage(10045));
        $("#popAccessIp").focus();
        return false;
    }
 }


/********************************
 * 전화번호 정규식 Check
 ********************************/
 function fnValidateNumberAddress(data){
    var format = /^\d{2,3}-?\d{3,4}-?\d{4}$/;

    if(format.test(data))
    {
        return true;
    }
    else
    {
        //입력하신 값은 전화번호 형식이 아닙니다.
        gfnPopMsg.alert(gfnGetMessage(10065));
        $("#popAccessIp").focus();
        return false;
    }
 }

 //

function pathChange() {

	if($("#pathUpload").val() == '') return;

	//var ext = $("#videoUpload").val().split('.').pop().toLowerCase();
	/*var ext = $("#pathUpload").val().split('.')[$("#videoUpload").val().split('.').length-1].toLowerCase()

	if($.inArray(ext, ['mp4','mp3','mov']) == -1){
	    gfnPopMsg.alert(gfnGetMessage(10079))
	    return;
	}*/

    var cur = $("#pathUpload").val().split("\\");
    $("#pathNm").val(cur[cur.length - 1]);
}

/**
 * 파일 업로드
 */
function fileUpload(url, data, inputParam){

	var formData = new FormData();
    var inputFile = data;
    var files = inputFile[0].files
    var sendUrl = url+"?upprCode="+inputParam.upprCode+"&code="+inputParam.code;

    formData.append('key1','values1');
    formData.append('key2','values2');
    for(var i=0;i<files.length;i++){
        formData.append('uploadFiles',files[i]);
    }

    //gfnSetProcessBar('on');

    var xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function(e){
        if(e.lengthComputable){
            $("#processBarPop").show()

             $("#processBarPop .PopMsg").text(files[0].name+"("+numberWithCommas(e.total)+" Byte)")

            bar.width(Math.floor(e.loaded/e.total * 100)+'%')
            percent.html(Math.floor(e.loaded/e.total * 100)+'%')

            if(Math.floor(e.loaded/e.total * 100) == 100){
                $("#processBarPop").hide()
            }
        }else{

        }
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var data = JSON.parse(xhr.responseText);

			fnUpdateCallback(data)
            /*if(data.success == 'Y'){
                fnSave();
            }else{
                alert(gfnGetMessage(data.resData.message))
            }*/
        }
    }

    xhr.open('POST',sendUrl,true)

    xhr.send(formData);
}