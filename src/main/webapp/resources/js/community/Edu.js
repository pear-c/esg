//-------------------------------------------------------------------------------
//전역변수 영역("g" prefix 활용)
//-------------------------------------------------------------------------------
var gVideoFlag = 0
var gTempFlag = 0

var gParam;

var gClickId;

var gDeleteId;

var gList;
var gElement;

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

/*********************************************
 * 조회 처리
 *********************************************/
function fnSearch() {

    if (fnPreSearch())
    {
		var data = new Object();

	    data.step = '1';

	    gfnTransation("/Edu/Search",data,"POST",fnSearchCallback)

    }

}

/*********************************************
 * 조회 콜백
 *********************************************/
function fnSearchCallback(data) {

	var resultMap = data.resData.resultMap;

	$("#faqData li").remove();

    var str = ""

    if(resultMap.length > 0){
	    for(var i=0; i <resultMap.length;i++){
	    	str  = '<li>'
	    	str += '	<a class="faq_tit" data-id="'+resultMap[i].ID+'" href="javascript:void(0)">'+resultMap[i].TITLE+'</a>'
	    	str += '	<div class="faq_cont" style="padding: 40px 10px 40px 10px;">'
	    	str += '		<div class="tableType popUpForm">'
			str += '			<div class="boardList">'
			str += '				<table>'
			str += '					<caption></caption>'
			str += '					<thread>'
			str += '						<tr style="text-align : center;">'
			str += '							<th scope="col" class="edu">제목</th>'
			str += '							<th scope="col" class="title">내용</th>'
			str += '						<tr>'
			str += '					<thread>'
			str += '					<tbody class="eduData2">'
			str += '					</tbody>'
			str += '				</table>'
			str += '			</div>'
			str += '		</div>'
			if(deleteRole == '1'){
			str += ' 	<a href="javascript:void(0)" onclick="fnEduDelete('+resultMap[i].ID+')" style="float: right;" class="btn_m02 btn_color02">삭제</a>'
			}
			if(createRole == '1'){
			str += ' 	<a href="javascript:void(0)" data-id="'+resultMap[i].ID+'" style="float: right;" class="eduWrite2 btn_m02 btn_color01">추가</a>'
	    	}
			str += '		</div>'
	    	str += ' 	</div>'
	    	str += '</li>'

	    	$("#faqData").append(str);
	    }

		$(".faqList ul li .faq_tit").on("click", function() {


			gList = $(this).next().children(".tableType").children(".boardList").children("table").children(".eduData2");
			gElement = $(this);

			var data = new Object();

			data.upId = $(this).attr("data-id");
			data.step = 2;

			gfnTransation("/Edu/Search",data,"POST",fnSearchCallback2)
		});

		$(".eduWrite2").click(function(){
			$("#layPop03").show()
			$("#popParamTitle2").val('');
			$("#popParamContents2").val('');
			$("#videoUpload").val('');
			$("#videoNm").val('');
			$("#tempUpload").val('');
			$("#tempNm").val('');

			gClickId = $(this).attr("data-id");
			gVideoFlag = 0;
			gTempFlag = 0;
		});

		$(".eduWrite2").click(function(){

			 gClickId = $(this).attr("data-id");
		});

    }
}

function fnSearchCallback2(data) {

	var resultMap = data.resData.resultMap;
	console.log("2");
	//$("#eduData2 tr").remove();

	gList.children("tr").remove();

	if(resultMap.length > 0){
	    for(var i=0; i <resultMap.length;i++){
	    var str   = '<tr>';
	    	str  += 	'<td class="edu">'
	    	str  += 	resultMap[i].TITLE																				// 구분
	    	str  += 	'</td>'
	    	str  += 	'<td class="title" style="text-align: left;">'
	    	str  += 	'<a href="javascript:void(0)" onclick="fnEduView2('+resultMap[i].ID+')">'+ resultMap[i].CONTENTS+'</a>'																					// 작성자 이름
	    	str  += 	'</td>'
	    	str  += '</tr>'

	    	gList.append(str);
	    	}
	 }

	if(gElement.next(".faq_cont").css("display") == "none") {
		//$(".faqList ul li").removeClass('active');
		//$(".faqList ul li .faq_cont").slideUp(75);
		gElement.parent('li').addClass('active');
		gElement.next(".faqList ul li .faq_cont").slideDown(75);
	} else {
		//$(".faqList ul li").removeClass('active');
		//$(".faqList ul li .faq_cont").slideUp(75);
		gElement.parent('li').removeClass('active');
		gElement.next(".faqList ul li .faq_cont").slideUp(75);
	}

	/*if($(this).next(".faq_cont").css("display") == "none") {
				$(".faqList ul li").removeClass('active');
				$(".faqList ul li .faq_cont").slideUp(75);
				$(this).parent('li').addClass('active');
				$(this).next(".faqList ul li .faq_cont").slideDown(75);
			} else {
				$(".faqList ul li").removeClass('active');
				$(".faqList ul li .faq_cont").slideUp(75);
			}*/
}

function fnSearchCallback3(data) {
	console.log("3");
	var resultMap = data.resData.resultMap;

	$("#layPop04").show();

	if(resultMap.length > 0){

		$("#popParamId").val(resultMap[0].ID)
		$("#popParamTitle3").val(resultMap[0].TITLE)
		$("#popParamContents3").val(resultMap[0].CONTENTS)
		$("#popParamContentDetail2").val(resultMap[0].CONTENT_DETAIL)
		$("#popParamContentDetail2").val(resultMap[0].CONTENT_DETAIL)
		$("#tempFile").val(resultMap[0].TRAINING_FILE_URL)
		fnVideoSetting();
	}
}


function fnSaveCallback(data){

	if(data.success == 'Y'){

         $("#layPop01").hide();
         fnSearch();
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}

function fnSaveCallback2(data){

	if(data.success == 'Y'){

         $("#layPop03").hide();
         fnEduView(gClickId);
    }else{
        gfnPopMsg.alert(data.resData.message);
    }
}

function fnDeleteCallback(data){
	if(data.success == 'Y'){
		 gfnPopMsg.alert(gfnGetMessage('10007'));
		 $("#layPop04").hide();
         fnSearch();
    }else{
        gfnPopMsg.alert(gfnGetMessage('10015'));
    }
}

//-------------------------------------------------------------------------------
// JQuery
//-------------------------------------------------------------------------------
$(function(){

	//컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
	fnInit();

	//fnInitComp();

});

function fnInit(){

	fnSearch();

	$("#eduWrite").click(function(){
		$("#layPop01").show()
		$("#popParamTitle").val('');
		$("#popParamContents").val('');
	});



	$("#popParamSave").click(function(){

		var data = new Object();

	    data.title = $("#popParamTitle").val();
	    //data.contents = $("#popParamContents").val();
	    data.step = '1';

	    gfnTransation("/Edu/Save",data,"POST",fnSaveCallback)
	});

	$("#popParamSave2").click(function(e){


		gParam = new Object();

		fnFileSave()
	})

	$("#videoClear").click(function(){
		gVideoFlag = 0;
    	$("#videoUpload").val('')
    	$("#videoNm").val('')
    })

    $("#tempClear").click(function(){
		gTempFlag = 0;
    	$("#tempNm").val('')
    	$("#tempUpload").val('')
    })

	$("#tempFile").click(function(){

		var id = $("#popParamId").val();

		window.location='/Edu/FileDown?id='+id;
	});

	$("#popParamDelete").click(function(){
		gDeleteId = $("#popParamId").val();

	    var msgId = '10002';      //삭제 하시겠습니까?

	    gfnPopMsg.confirm(gfnGetMessage(msgId), fnDelete);
	})

	if(createRole == '0'){
		$("#eduWrite").hide();
	}

	if(deleteRole == '0'){
		$("#popParamDelete").hide();
	}

}

function fnFileSave(){
	if(gVideoFlag==1){
		fileUpload("/Edu/FileUpload",gClickId,$("#videoUpload"),'videoUrl');
	}else if(gTempFlag == 1){
		fileUpload("/Edu/FileUpload",gClickId,$("#tempUpload"),'trainingFileUrl');
	}else{

		gParam.title = $("#popParamTitle2").val();
	    gParam.contents = $("#popParamContents2").val();
		gParam.contentDetail = $("#popParamContentDetail").val();
	    gParam.step = '2';
		gParam.upId = gClickId;

	    gfnTransation("/Edu/Save",gParam,"POST",fnSaveCallback2)
	}
}

function fnEduView(id){

	gClickId = id;

	var data = new Object();

	data.upId = id;
	data.step = 2;

	gfnTransation("/Edu/Search",data,"POST",fnSearchCallback2)

}

function fnEduView2(id){

	var data = new Object();

	data.id = id;
	data.step = 2;

	gfnTransation("/Edu/Search",data,"POST",fnSearchCallback3)

}

function fnVideoChange() {

	if($("#videoUpload").val() == '') return;

	var ext = $("#videoUpload").val().split('.')[$("#videoUpload").val().split('.').length-1].toLowerCase()

	if($.inArray(ext, ['mp4','mp3','avi']) == -1){
	    gfnPopMsg.alert(gfnGetMessage(10079))
	    return;
	}

    var cur = $("#videoUpload").val().split("\\");
    $("#videoNm").val(cur[cur.length - 1]);
	gVideoFlag = 1;
}

function fnTempChange() {

	if($("#tempUpload").val() == '') return;

	var ext = $("#tempUpload").val().split('.')[$("#tempUpload").val().split('.').length-1].toLowerCase()

	if($.inArray(ext, ['zip']) == -1){
	    gfnPopMsg.alert(gfnGetMessage(10080))
	    return;
	}

    var cur = $("#tempUpload").val().split("\\");
    $("#tempNm").val(cur[cur.length - 1]);
	gTempFlag = 1;
}

/**
 * 파일 업로드
 */
function fileUpload(url,id,data,type){
	 var sendUrl = url+"?Id="+id+"&type="+type;

	var inputFile = data;
    var files = inputFile[0].files
	var formData = new FormData();
	for(var i=0;i<files.length;i++){
        formData.append('uploadFiles',files[i]);
    }

    $.ajax({
        contentType : false,
        processData : false,
        async : true,
        url : sendUrl,
        data : formData,
        type : "POST",
        xhr: function(){
            let xhr = $.ajaxSettings.xhr();
            xhr.upload.onprogress = function(e){
                if(e.lengthComputable){
                	$("#processBarPop").show()

                	$("#processBarPop .PopMsg").text("FileUpload ("+numberWithCommas(e.total)+" byte)")

		            bar.width(Math.floor(e.loaded/e.total * 100)+'%')
		            percent.html(Math.floor(e.loaded/e.total * 100)+'%')

		             if(Math.floor(e.loaded/e.total * 100) == 100){

		             	setTimeout(function(){
		             		$("#processBarPop").hide()
		             	},300)

		             }
                }
            };
            return xhr;
        },
        success:function(data){
        	if(data.success == 'Y'){
	        	var filePath = data.resData.filesPath;

	        	gParam[type] = filePath;

				if(type=="videoUrl") gVideoFlag = 0;
				else if(type=="trainingFileUrl") gTempFlag = 0;

				fnFileSave();
	        }else{

	        	gfnPopMsg.alert(gfnGetMessage(data.resData.message))

	        }

        }
    })
}

function fnVideoSetting() {


    $("#videoPlayer").attr("src", '/Edu/FilePlay?id='+$("#popParamId").val());

    // 0.5초후 정지
    // 썸네일로 뻥치기
    setTimeout(function(){
        var video = $("#videoPlayer").get(0);

        video.pause()
    }, 1000)

}

function fnEduDelete(id){
	gDeleteId = id;

    var msgId = '10002';      //삭제 하시겠습니까?

    gfnPopMsg.confirm(gfnGetMessage(msgId), fnDelete);
}

function fnDelete(){
	var param = new Object();
	param.id = gDeleteId;

	gfnTransation("/Edu/Delete",param,"POST",fnDeleteCallback)
}
