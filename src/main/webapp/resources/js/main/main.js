//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gGlovalVariable = 0;                              // 파일 리스트 번호

var firstGrid;

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

    	var paramData = new Object();

    	paramData.process_name = $("#upperCode").val();

    	paramData.process_name = $("#priv_req_status").val();

        gfnTransation("/MyBot/Search",paramData,"POST",fnSearchCallback)

    }
}

/**
 * 조회 콜백
 */
function fnSearchCallback(data) {

    //firstGrid.setData([]);

    var process = data.resData.search;

    $(".processCard").remove();

    for(var i = 0; i < process.length;i++){

        var str = "<li class='processCard'>"
       if(process[i].PRIV_REQ_STATUS == 'A') 	  str += "<div class='botCard green'>"
       else if(process[i].PRIV_REQ_STATUS == 'R') str += "<div class='botCard red'>"
       else										  str += "<div class='botCard'>"
            str += "  <p class='name'>";

        if(process[i].CODE_NAME != "")
            str +="   <span class='badge' style='background : "+process[i].PROCESS_TYPE_COLOR+"' >"+process[i].CODE_NAME+"</span>";


        str += process[i].PROCESS_NAME+"</p>" +
                        "<p class='description'>"+process[i].DESCRIPTION+"</p>"+
                        "<p class='date'>등록일: "+process[i].CREATIONTIME+"</p>"+
                        "<p class='processId' style='display:none'>"+process[i].PROCESS_ID+"</p>"+
                        "<p class='serverId' style='display:none'>"+process[i].SERVER_ID+"</p>"+
                    "</div>"+
            "</li>"

        $("#processList").append(str);
    }

     $("#processList .botCard").click(function(){

        var index = $("#processList .botCard").index(this);

        $("#processList .botCard:eq("+index+")").addClass("active")

        $("#processList .botCard:not(:eq("+index+")):not("+index+")").removeClass("active")

        var data = new Object();

        data.process_id = $("#processList .botCard:eq("+index+") .processId")[0].outerText;

        data.server_id = $("#processList .botCard:eq("+index+") .serverId")[0].outerText;

        gfnTransation("/MyBot/SearchDetail",data, "POST", fnSearchDetailCallback);
    });
}

/**
 * 디테일 조회 콜백
 */
function fnSearchDetailCallback(data) {


    var processDetail = data.resData.resultMap;


	$("#processName").val(processDetail.PROCESS_NAME)
	$("#processDescription").val(processDetail.DESCRIPTION)
	$("#processRejectReason").val(processDetail.PRIV_RPLY_CMMNT)
	if(processDetail.PDD != null && processDetail.PDD != '')
        $("#processPdd").val(processDetail.PDD.split("\\")[processDetail.PDD.split("\\").length-1])
    else
        $("#processPdd").val('');

	$("#processCreateDate").val(processDetail.RELEASE_DATE)
	$("#procseeUserName").val(processDetail.USER_NAME)
	$("#hiddenProcessId").val(processDetail.PROCESS_ID)
	$("#hiddenServerId").val(processDetail.SERVER_ID)
}

/**
 * 업데이트 처리
 */
function fnUpdateCallback(data) {

	if(data.success == 'Y'){
		$("#layPop01").css("display","none");

		 $("#hiddenUpperCode").val('');

		 secondGrid.setData([]);

   	     fnSearch();
	}else{
		gfnPopMsg.alert(data.resData.message);
	}
}

function fnUpdateCallback2(data) {

	if(data.success == 'Y'){
		$("#layPop02").css("display","none");

		  var paramData = new Object();

		  paramData.upprCode = $("#hiddenUpperCode").val();

   	     gfnTransation("/Code/SearchCode",paramData,"POST",fnSearchDetailCallback)
	}else{
		gfnPopMsg.alert(data.resData.message);
	}
}

function fnDigitalKhnpMoveCallBack(data) {

	window.open('http://10.135.1.35:8405/dport/slogin?callback=/proposal&GWid='+data.resData.ssoUserId,'_blank')
	//window.location='http://10.135.1.35:8405/dport/slogin?callback=/proposal&GWid='+data.resData.ssoUserId;
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
	if (fnPreUpdate())
        gfnUpdate();
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

function fnUserJobInfo(data) {
    var resultData = data.resData.resultMap;

    $("#jobState1").text(resultData.JOB_STATE_1);
    $("#jobState0").text(resultData.JOB_STATE_0);
    $("#jobState5").text(resultData.JOB_STATE_5);
    $("#jobState4").text(resultData.JOB_STATE_4);
    $("#procStateA").text(resultData.PROC_STATE_A);
    $("#procStateS").text(resultData.PROC_STATE_S);

}

function fnProcPerform(data) {
    var resultData = data.resData.resultMap;

    $("#procCnt").text(numberWithCommas(resultData.PROC_CNT));
    $("#automationTime").text(numberWithCommas(Math.round(resultData.AUTOMATION_TIME/60)));
}

function fnBBSNotice(data) {
    var resultData = data.resData.resultMap;

    var str = "<ul>"

    for(var i = 0; i < resultData.length;i++){
    	str+="<li><a href='javascript:void(0)' onclick='menuHref2(\"/Notice/\",\"CM0010\","+resultData[i].ID+")'><span>"+resultData[i].WRITE_YMD+"</span><strong>"+resultData[i].TITLE+"</strong></a></li>"
    }

    str += "</ul>"

    $("#main_board_box1").append(str);
}

function fnBBSEdu(data) {
    var resultData = data.resData.resultMap;

    var str = "<ul>"

    for(var i = 0; i < resultData.length;i++){
    	str+="<li><a href='javascript:void(0)' onclick='menuHref2(\"/Edu/\",\"CM0020\","+resultData[i].ID+")'><span>"+resultData[i].WRITE_YMD+"</span><strong>"+resultData[i].TITLE+"</strong></a></li>"
    }

    str += "</ul>"

    $("#main_board_box2").append(str);
}

function fnBBSPromotion(data) {
    var resultData = data.resData.resultMap;

    var str = "<ul>"

    for(var i = 0; i < resultData.length;i++){
    	str+="<li><a href='javascript:void(0)' onclick='menuHref2(\"/Promotion/\",\"CM0030\","+resultData[i].ID+")'><span>"+resultData[i].WRITE_YMD+"</span><strong>"+resultData[i].TITLE+"</strong></a></li>"
    }

    str += "</ul>"

    $("#main_board_box3").append(str);
}

function fnBBSQna(data) {
    var resultData = data.resData.resultMap;

    var str = "<ul>"

    for(var i = 0; i < resultData.length;i++){
    	str+="<li><a href='javascript:void(0)' onclick='menuHref2(\"/Qna/\",\"CM0040\","+resultData[i].ID+")'><span>"+resultData[i].WRITE_YMD+"</span><strong>"+resultData[i].TITLE+"</strong></a></li>"
    }

    str += "</ul>"

    $("#main_board_box4").append(str);
}

function fnBBSFaq(data) {
    var resultData = data.resData.resultMap;

    var str = "<ul>"

    for(var i = 0; i < resultData.length;i++){
    	str+="<li><a href='javascript:void(0)' onclick='menuHref2(\"/Faq/\",\"CM0050\","+resultData[i].FAQ_ID+")'><span>"+resultData[i].WRITE_YMD+"</span><strong>"+resultData[i].QUESTION+"</strong></a></li>"
    }

    str += "</ul>"

    $("#main_board_box5").append(str);
}

function fnBBSErrorReport(data) {
    var resultData = data.resData.resultMap;

    var str = "<ul>"

    for(var i = 0; i < resultData.length;i++){
    	str+="<li><a href='javascript:void(0)' onclick='menuHref2(\"/ErrorReport/\",\"CM0060\","+resultData[i].ID+")'><span>"+resultData[i].WRITE_YMD+"</span><strong>"+resultData[i].TITLE+"</strong></a></li>"
    }

    str += "</ul>"

    $("#main_board_box6").append(str);
}

function fnBanner(data) {
    var resultData = data.resData.resultMap;

    var linkPath = '';
    var linkData = '';

    $("#bannerView div").remove();

    var str  = '<div class="swiper-container">'
        str += '	<ul class="swiper-wrapper" >'



    for(var i = 0; i < resultData.length;i++){

    	if(resultData[i].BBS_TYPE == 'A'){
    		//linkPath = "/Notice/?menuId=CM0010&id="+resultData[i].ID
    		linkPath = "'/Notice/'"
    		linkData = "'CM0010'";
    	}else if(resultData[i].BBS_TYPE == 'B'){
    		//linkPath = "/Edu/?menuId=CM0020&id="+resultData[i].ID
    		linkPath = "'/Edu/'"
    		linkData = "'CM0020'";
    	}else{
    		//linkPath = "/Promotion/?menuId=CM0030&id="+resultData[i].ID
    		linkPath = "'/Promotion/'"
    		linkData = "'CM0030'";
    	}




    	str +=  '<li class="swiper-slide">'
    	str +=  '	<a href="javascript:void(0)" onclick="menuHref2('+linkPath+','+linkData+','+resultData[i].ID+')">'

    	if(resultData[i].BANNER_IMG_YN == 'Y'){
    		str +=  '		<div class="item" style="background-color:#e8e8e8"> '
    		str +=	'			<img src="'+resultData[i].BANNER_IMG_PATH+'" alt="배경이미지" />'
    		str +=	'		</div>'
    	}
    	else{
    		if(resultData[i].BBS_TYPE == 'A'){
    			str +=  '<div class="item">'
    			str +=	'	<img src="../../resources/img/banner/'+resultData[i].BANNER_DEFAULT_IMG+'.jpg" alt="배경이미지" />'
    			str +=	'	<p>'+resultData[i].TITLE+'</p>'
    			str +=	'</div>'
    		}else if (resultData[i].BBS_TYPE == 'B'){
    			str +=  '<div class="item" style="background-color:#63e6e5">'
    			str +=	'	<img src="../../resources/img/banner/'+resultData[i].BANNER_DEFAULT_IMG+'.jpg" alt="배경이미지" />'
    			str +=	'	<p>'+resultData[i].TITLE+'</p>'
    			str +=	'</div>'
    		}else if (resultData[i].BBS_TYPE == 'C'){
    			str +=  '<div class="item" style="background-color:#00a040">'
    			str +=	'	<img src="../../resources/img/banner/'+resultData[i].BANNER_DEFAULT_IMG+'.jpg" alt="배경이미지" />'
    			str +=	'	<p>'+resultData[i].TITLE+'</p>'
    			str +=	'</div>'
    		}
    	}
    	str +=	'	</a>'
    	str +=	'</li>'
    }

    str += "		</ul>"
    str += '	<div class="swiper-pagination"></div>'
    str += '</div>'



    $("#bannerView").append(str);

    var mySwiper = new Swiper('.mainBanner .swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
            el: '.mainBanner .swiper-pagination',
            clickable: true,
        },
        allowTouchMove: false
    });

    var mySwiper = new Swiper('.timeChart .swiper-container', {
        loop: false,
        autoplay: {
            delay: 5000,
            //disableOnInteraction: false,
        },
        pagination: {
            el: '.timeChart .swiper-pagination',
            clickable: true,
        },
        on : {
        	slideChange : function (){
        		if($(".title_st01").eq(1).text() == '사업소별 자동화시간'){
        			$(".title_st01").eq(1).text('과제별 자동화시간')
        		}else if($(".title_st01").eq(1).text() == '과제별 자동화시간'){
        			$(".title_st01").eq(1).text('사업소별 자동화시간')
        		}
        	}
        }
    });
}

function fnBotStoreSummary(data) {
    var resultData = data.resData.resultMap;

    $("#categoryA").text(resultData.CATEGORY_A+'개')
    $("#categoryB").text(resultData.CATEGORY_B+'개')
    $("#categoryC").text(resultData.CATEGORY_C+'개')
    $("#categoryD").text(resultData.CATEGORY_D+'개')
    $("#categoryE").text(resultData.CATEGORY_E+'개')
    $("#categoryZ").text(resultData.CATEGORY_Z+'개')
    $("#categorySum").text(resultData.CATEGORY_SUM+'개')

}


//-------------------------------------------------------------------------------
// JQuery
//-------------------------------------------------------------------------------
$(function(){

	//컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
	fnInit();

	//초기 조회
	//fnSearch();

	//backControl(callbackFunction);
});

/**
 * 초기화
 * - 컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
 */
function fnInit() {
	//각종 컴포넌트 데이터 초기화 및 이벤트 추가
	//fnInitComp();

	//fnInitSetting();
}

/**
 * 컴포넌트 데이터 초기화, 이벤트 핸들러 설정
 */
function fnInitComp() {

	//공통 버튼 이벤트 핸들러 추가
	$("#searchBtn").click(function(e){ fnSearch();  e.preventDefault();});

	$("#insertBtn").click(function(){ fnInsert(); });

	$("#updateBtn").click(function(){ fnUpdate(); });

	$("#deleteBtn").click(function(){ fnDelete(); });

	Chart.Tooltip.positioners.custom = function(elements, position){
		if(!elements.length){
			return false;
		}

		var offset = 0;

		if(elements[0]._chart.width /2 > position.x){
			offset = 20;
		} else{
			offset = -20;
		}

		return {
			x : position.x + offset,
			y : position.y
		}

	}

}


function fnInitSetting(){

    gfnTransation("/Main/SearchUserJobInfo",null,"POST",fnUserJobInfo)

    gfnTransation("/Main/SearchProcPerform",null,"POST",fnProcPerform)

    gfnTransation("/Main/SearchBBSNotice",null,"POST",fnBBSNotice)

    gfnTransation("/Main/SearchBBSEdu",null,"POST",fnBBSEdu)

    gfnTransation("/Main/SearchBBSPromotion",null,"POST",fnBBSPromotion)

    gfnTransation("/Main/SearchBBSQna",null,"POST",fnBBSQna)

    gfnTransation("/Main/SearchBBSFaq",null,"POST",fnBBSFaq)

    gfnTransation("/Main/SearchBBSErrorReport",null,"POST",fnBBSErrorReport)

    gfnTransation("/Main/SearchYearBizAutomationTime",null,"POST",fnChartSetting)

    gfnTransation("/Main/SearchYearProcAutomationTime",null,"POST",fnChartSetting2)

    gfnTransation("/Main/SearchBanner",null,"POST",fnBanner)

    gfnTransation("/Main/SearchBotStoreSummary",null,"POST",fnBotStoreSummary)
}

function fnChartSetting(data){

	var chartData = data.resData.resultMap;

	var labels = [];
	var datas = [];
	var offset = 0;

	for(var i=0;i<chartData.length;i++){
		labels.push(chartData[i].DEPT_NAME)
		var dataPush = Math.round(Number(chartData[i].AUTOMATION_TIME)/60)

		if(offset < dataPush) offset = dataPush;

		datas.push(dataPush);

	}

	offset = (Math.round(offset/500) * 500) +500


	var ctx = document.getElementById('myChart').getContext('2d');
	var chart = new Chart(ctx,{
		type : 'bar',
		data : {
			labels : labels,
			datasets : [{
				label: '',
				data : datas,
				borderColor : [
							"#003988",
							"#00a040",
							"#25acc3",
							"#d3771d",
							"#8e8e8e",
							"#4c7fc3",
							"#7328b8",
							"#ee5858",
							"#006660"
				],
				backgroundColor : [
							"#003988",
							"#00a040",
							"#25acc3",
							"#d3771d",
							"#8e8e8e",
							"#4c7fc3",
							"#7328b8",
							"#ee5858",
							"#006660"
				],
				fill : false
			}]
		},
		options: {
			responsive : true,
			title : {
				display : false,
				text : '막대 차트 테스트'
			},
			tooltipe : {
				enabled: false
			},
			hover: {
				animationDuration : 0
			},
			legend :{
				display : false
			},
			animation : {
				duration : 1,
				onComplete : function(){
					var chartInstance = this.chart,
						ctx = chartInstance.ctx;
					ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
					ctx.fillStyle = 'black';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';

					this.data.datasets.forEach(function(dataset, i){
						var meta =chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index){
						var data = numberWithCommas(dataset.data[index]);
						ctx.fillText(data, bar._model.x, bar._model.y-2);
						})
					})
				}
			},
			scales :{
				xAxes : [{
					gridLines : {
						display : false
					}
				}],
				yAxes : [{
					gridLines : {
						display : false
					},
					ticks : {
						min : 0,
						beginAtZero : true,
						suggestedMax : offset,
						userCallback : function(value, index, values){
							value = value.toString();
							value = value.split(/(?=(?:...)*$)/);
							value = value.join(',');
							return value;
						}
					}
				}]
			}

		}
	})

}

function fnChartSetting2(data){

	var chartData = data.resData.resultMap;

	var labels = [];
	var datas = [];
	var offset = 0;

	for(var i=0;i<chartData.length;i++){
		labels.push(chartData[i].PROCESS_NAME)
		var dataPush = Math.round(Number(chartData[i].AUTOMATION_TIME)/60)
		if(offset < dataPush) offset = dataPush;
		datas.push(dataPush)

	}

	offset = (Math.round(offset/500) * 500) +500

	var ctx = document.getElementById('myChart2').getContext('2d');
	var chart = new Chart(ctx,{
		type : 'horizontalBar',
		data : {
			labels : labels,
			datasets : [{
				label: '',
				data : datas,
				borderColor : [
							"#003988",
							"#00a040",
							"#25acc3",
							"#d3771d",
							"#8e8e8e",
							"#4c7fc3",
							"#7328b8",
							"#ee5858",
							"#006660"
				],
				backgroundColor : [
							"#003988",
							"#00a040",
							"#25acc3",
							"#d3771d",
							"#8e8e8e",
							"#4c7fc3",
							"#7328b8",
							"#ee5858",
							"#006660"
				],
				fill : false
			}]
		},
		options: {
			responsive : true,
			title : {
				display : false,
				text : '막대 차트 테스트'
			},
			tooltipe : {
				enabled: false
			},
			hover: {
				animationDuration : 0
			},
			legend :{
				display : false
			},
			animation : {
				duration : 1,
				onComplete : function(){
					var chartInstance = this.chart,
						ctx = chartInstance.ctx;
					ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
					ctx.fillStyle = 'black';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';

					this.data.datasets.forEach(function(dataset, i){
						var meta =chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index){
						var data = numberWithCommas(dataset.data[index]);
						ctx.fillText(data, bar._model.x+15, bar._model.y+5);
						})
					})
				}
			},
			scales :{
				xAxes : [{
					gridLines : {
						display : false
					},
					ticks : {
						beginAtZero : true,
						suggestedMax : offset,
						userCallback : function(value, index, values){
							value = value.toString();
							value = value.split(/(?=(?:...)*$)/);
							value = value.join(',');
							return value;
						}
					}
				}],
				yAxes : [{
					gridLines : {
						display : false
					},
					ticks : {
						min : 0
					}
				}]
			}

		},
		plugins : [{
			beforeInit : function(chart){
				chart.data.labels.forEach(function(e,i,a){

					if(e.length > 20){
						var splitTemp = []
						splitTemp[0] = e.substring(0,20);
						splitTemp[1] = e.substring(20);

						a[i] = splitTemp;
					}
				})
			}
		}]
	})

}

function fnDigitalKhnpMove(){

	gfnTransation("/Main/DisitalKhnp",null,"POST",fnDigitalKhnpMoveCallBack)
}

