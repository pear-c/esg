
//-------------------------------------------------------------------------------
// JQuery
//-------------------------------------------------------------------------------

//-------------------------
// 변수 선언 영역
// : 변수 선언 방식은 앞에 't' + 변수 형식으로 선언
//-------------------------
// 공통 팝업용 그리드 ID
var tPopUpGrid;

//개별 화면에서 사용하는 트랜잭션 구분용 변수
// => 입력('INSERT'), 수정('UPDATE'), 삭제('DELETE')
var tAction;

// 사용자 정보 플래그 용도
// init가 한번만 동작하기 위한 기능
var tUserInit = 0;

//그리드 제목 및 데이터 컬럼 높이 설정
var tHeaderColumnHeight = 40;
var tBodyColumnHeight = 35;
var tLineNumberWidth = 60;

var namoEditor;

var namoEditorFilePath = "https://rpa.khnp.se.hn/websource/jsp/ImageUpload.jsp"


$(function(){

	if(navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') == -1){
    	backControl()
    }

    if(loginUserRole == 'RDEV'){

	    setInterval(function(){
	        gfnTransation("/SessionAlive",null,"POST",sessionCallback)
	    }, 600000)

    }

	window.history.forward(); function noBack(){
	  window.history.forward();
	}

});

function sessionCallback(data){

}

/**
* 이벤트 초기세팅
*/
function gfnInit(){

    /**
    * IE 전용
    * backspace 로 인하여 뒤로가기 방지용
    */
    $(document).keydown(function(e){

       // if(e.keyCode == 27 || e.which == 27){
       //     $(".layPop").css("display","none");
       // }

        if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){
            if(e.keyCode == 8){
                return false;
            }
        }

        if(e.target.readOnly){
            if(e.keyCode == 8){
                return false;
            }

        }

    });

    $(".upperData").on('keyup',function(e){
        $(this).val($(this).val().toUpperCase())
    })

    $(".lowData").on('keyup',function(e){
        $(this).val($(this).val().toLowerCase())
    })

    $(".numberFormat").on('keyup',function(e){
        $(this).val($(this).val().replace(/[^0-9]/g,""))
    })


    /**
    * 입력 박스에 포커스 색상 표시
    */
    $("input[type=text]").not("input[readonly]").focus(function(){
        $(this).css("background","#D2FFD2")
    })

    $("textarea").not("textarea[readonly]").focus(function(){
        $(this).css("background","#D2FFD2")
    })

    $("textarea").not("textarea[readonly]").focusout(function(){
        $(this).css("background","")
    })

    /**
    * 입력 박스에 포커스 벗어날시 색상 표시 제거
    */
    $("input[type=text]").not("input[readonly]").focusout(function(){
        $(this).css("background","")
    })

    $("input").attr("autocomplete","off");

    /**
    * 사용자 정의(data-length)를 이용하여 입력 길이 제한
    */
    $("input[data-length]").keyup(function(){
        if($(this).val().length > $(this).attr('data-length')){
            alert('길이 제한은 '+$(this).attr('data-length')+' 자 까지 입니다.')
            $(this).val($(this).val().substr(0,$(this).attr('data-length')))
        }
    })

    /**
    * 사용자 정의(data-length)를 이용하여 입력 길이 제한
    */
    $("input[data-search]").keyup(function(e){
        if(e.keyCode == 13){
            $("#"+$(this).attr('data-search')).click();
        }
    })

    /**
    * 사용자 정보의 팝업을 실행하는 이벤트
    * 사용자 팝업을 사용하는 JS에 fnUserPopCallback(data) 를 선언하여 데이터를 리턴
    */
    $(".popUserInfoGrid").click(function(){

        $("#tPopUserInfo").css("display","block");

        if(tUserInit == 0){
            gfnPopGridInit();
            tUserInit = 1;
        }else{
            tPopUpGrid.setData([])
        }

    })

    $('.demo').each( function() {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            format: $(this).attr('data-format') || 'hex',
            keywords: $(this).attr('data-keywords') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom',
            swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
            change: function(hex, opacity) {
                var log;
                try {
                        log = hex ? hex : 'transparent';
                        if( opacity ) log += ', ' + opacity;
                            console.log(log);
                } catch(e) {}
            },
            theme: 'default'
        });
   });


}

/**
* 입력박스 및 셀렉트 박스를 초기화
*/
function gfnInputClear(){
    $("textarea.clearFormat").val('');
    $("input[type=text].clearFormat").val('');
    $("input[type=file].clearFormat").val('');
    $("input[type=hidden].clearFormat").val('');
    $("select.clearFormat").find('option:first').prop("selected", true).trigger('change');
    if($(".che_ch:checked").length > 0){
        for(var i=0;i < $(".che_ch").length; i++){
            if($(".che_ch").eq(i).prop('checked') == true) {
                $("label[for="+$(".che_ch").eq(i).attr('id')+"]").click()
            }
        }
    }
}

/**
* 필수 입력값의 outline을 초기화
*/
function gfnAllClear(){
    $("input.checkFormat").css("outline","")
    $("textarea.checkFormat").css("outline","")
    $("select.checkFormat").css("outline","")
    $("input[type=checkbox]").prop("checked",false)
}

/**
* 셀렉트 박스 초기화
*/
function gfnSelectIsNull(){

    if($("select.selectIsNull").length > 0){
        for(var i=0;i<$("select.selectIsNull").length;i++){
            if($("select.selectIsNull:eq("+i+")").val() == null) $("select.selectIsNull:eq("+i+")").find('option:first').prop("selected", true);
        }
    }
}

/**
* 필수 입력값을 체크
*/
function gfnInputCheck(){

    $("input.checkFormat").css("outline","")
    $("textarea.checkFormat").css("outline","")
    $("select.checkFormat").css("outline","")

    var result = true;

    var checkId = new Array();

    if($("div[class=tableType]:not(div[class=popUpForm]) input.checkFormat").length > 0){
        for(var i=0; i< $("div[class=tableType]:not(div[class=popUpForm]) input.checkFormat").length;i++){
            if($("div[class=tableType]:not(div[class=popUpForm]) input.checkFormat:eq("+i+")").val().length < 1) checkId.push($("div[class=tableType]:not(div[class=popUpForm]) input.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if($("div[class=tableType]:not(div[class=popUpForm]) textarea.checkFormat").length > 0){
        for(var i=0; i< $("div[class=tableType]:not(div[class=popUpForm]) textarea.checkFormat").length;i++){
            if($("div[class=tableType]:not(div[class=popUpForm]) textarea.checkFormat:eq("+i+")").val().length < 1) checkId.push($("div[class=tableType]:not(div[class=popUpForm]) textarea.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if($("div[class=tableType]:not(div[class=popUpForm]) select.checkFormat").length > 0){
        for(var i=0; i< $("div[class=tableType]:not(div[class=popUpForm]) select.checkFormat").length;i++){
            if($("div[class=tableType]:not(div[class=popUpForm]) select.checkFormat:eq("+i+")").val() == null){
                checkId.push($("div[class=tableType]:not(div[class=popUpForm]) select.checkFormat:eq("+i+")").attr('id'));
            }else if($("div[class=tableType]:not(div[class=popUpForm]) select.checkFormat:eq("+i+")").val().length < 1)
                checkId.push($("div[class=tableType]:not(div[class=popUpForm]) select.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if($("div[class=layPop]").length > 0){
        for(var i=0;i<$("div[class=layPop]").length;i++){
            if($("div[class=layPop]").eq(i).css('display') == 'block'){
                for(var j=0;j < $("div[class=layPop]:eq("+i+") input.checkFormat").length;j++){
                    if($("div[class=layPop]:eq("+i+") input.checkFormat:eq("+j+")").val().length < 1) checkId.push($("div[class=layPop]:eq("+i+") input.checkFormat:eq("+j+")").attr('id'));
                }

                for(var j=0;j < $("div[class=layPop]:eq("+i+") textarea.checkFormat").length;j++){
                    if($("div[class=layPop]:eq("+i+") textarea.checkFormat:eq("+j+")").val().length < 1) checkId.push($("div[class=layPop]:eq("+i+") textarea.checkFormat:eq("+j+")").attr('id'));
                }

                for(var j=0; j< $("div[class=layPop]:eq("+i+") select.checkFormat").length;i++){
                    if($("div[class=layPop]:eq("+i+") select.checkFormat:eq("+j+")").val() == null){
                        checkId.push($("div[class=layPop]:eq("+i+") select.checkFormat:eq("+j+")").attr('id'));
                    }else if($("div[class=layPop]:eq("+i+") select.checkFormat:eq("+j+")").val().length < 1)
                        checkId.push($("div[class=layPop]:eq("+i+") select.checkFormat:eq("+j+")").attr('id'));
                }
            }
        }

    }

    if(checkId.length > 0){
        result = false;

        for(var i=0;i<checkId.length;i++){
            $("#"+checkId[i]).css("outline","red solid 1px")
        }

        //필수 입력값을 입력해 주십시오.
        gfnPopMsg.alert(gfnGetMessage(10046))
    }

    return result;
}

/**
* 필수 입력값을 체크
*/
function gfnBBSInputCheck(){

    $("input.checkFormat").css("outline","")
    $("textarea.checkFormat").css("outline","")
    $("select.checkFormat").css("outline","")
    $("#pe_asg_editor1").css("outline","")

    var result = true;

    var checkId = new Array();
    var namo = false;

    if($("input.checkFormat").length > 0){
        for(var i=0; i< $("input.checkFormat").length;i++){
            if($("input.checkFormat:eq("+i+")").val().length < 1) checkId.push($("input.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if($("textarea.checkFormat").length > 0){
        for(var i=0; i< $("textarea.checkFormat").length;i++){
            if($("textarea.checkFormat:eq("+i+")").val().length < 1) checkId.push($("textarea.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if($("select.checkFormat").length > 0){
        for(var i=0; i< $("select.checkFormat").length;i++){
            if($("select.checkFormat:eq("+i+")").val() == null){
                checkId.push($("select.checkFormat:eq("+i+")").attr('id'));
            }else if($("select.checkFormat:eq("+i+")").val().length < 1)
                checkId.push($("select.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if(namoEditor != null){
        if(namoEditor.editorTarget.GetBodyValue()=="<p><br></p>"){
            namo = true;
        }
    }
    if(checkId.length > 0){
        result = false;

        for(var i=0;i<checkId.length;i++){
            $("#"+checkId[i]).css("outline","red solid 1px")
        }

        //필수 입력값을 입력해 주십시오.
        gfnPopMsg.alert(gfnGetMessage(10046))
    }else{
        if(namo == true){
            result = false;

            //게시글을 입력해 주십시오.
            gfnPopMsg.alert(gfnGetMessage(10058))
        }
    }

    return result;
}


/**
* 필수 입력값을 체크
*/
function gfnInputCheckOneBon(){

    $("input.checkFormat").css("outline","")
    $("textarea.checkFormat").css("outline","")
    $("select.checkFormat").css("outline","")

    var result = true;

    var checkId = new Array();

    if($("div[class=tableType]").children("input.checkFormat").length > 0){
        for(var i=0; i< $("div[class=tableType]").children("input.checkFormat").length;i++){
            if($("div[class=tableType]").children("input.checkFormat:eq("+i+")").val().length < 1) checkId.push($("div[class=tableType]").children("input.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if($("div[class=tableType]").children("textarea.checkFormat").length > 0){
        for(var i=0; i< $("div[class=tableType]").children("textarea.checkFormat").length;i++){
            if($("div[class=tableType]").children("textarea.checkFormat:eq("+i+")").val().length < 1) checkId.push($("div[class=tableType]").children("textarea.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if($("div[class=tableType]").children("select.checkFormat").length > 0){
        for(var i=0; i< $("div[class=tableType]").children("select.checkFormat").length;i++){
            if($("div[class=tableType]").children("select.checkFormat:eq("+i+")").val() == null){
                checkId.push($("div[class=tableType]").children("select.checkFormat:eq("+i+")").attr('id'));
            }else if($("div[class=tableType]").children("select.checkFormat:eq("+i+")").val().length < 1)
                checkId.push($("div[class=tableType]").children("select.checkFormat:eq("+i+")").attr('id'));
        }
    }

    if($("div[class=layPop]").length > 0){
        for(var i=0;i<$("div[class=layPop]").length;i++){
            if($("div[class=layPop]").eq("+i+").css('display') == 'block'){
                for(var j=0;j < $("div[class=layPop]").children("input.checkFormat").eq("+i+").length;j++){
                    if($("div[class=layPop]").children("input.checkFormat:eq("+i+")").val().length < 1) checkId.push($("div[class=layPop]").children("input.checkFormat:eq("+i+")").attr('id'));
                }

                for(var j=0;j < $("div[class=layPop]").children("textarea.checkFormat").eq("+i+").length;j++){
                    if($("div[class=layPop]").children("textarea.checkFormat:eq("+i+")").val().length < 1) checkId.push($("div[class=layPop]").children("textarea.checkFormat:eq("+i+")").attr('id'));
                }

                for(var i=0; i< $("div[class=layPop]").children("select.checkFormat").length;i++){
                    if($("div[class=layPop]").children("select.checkFormat:eq("+i+")").val() == null){
                        checkId.push($("div[class=layPop]").children("select.checkFormat:eq("+i+")").attr('id'));
                    }else if($("div[class=layPop]").children("select.checkFormat:eq("+i+")").val().length < 1)
                        checkId.push($("div[class=layPop]").children("select.checkFormat:eq("+i+")").attr('id'));
                }
            }
        }

    }

    if(checkId.length > 0){
        result = false;

        for(var i=0;i<checkId.length;i++){
            $("#"+checkId[i]).css("outline","red solid 1px")
        }

        //필수 입력값을 입력해 주십시오.
        gfnPopMsg.alert(gfnGetMessage(10046))
    }

    return result;
}

/**
* 메뉴 이동 함수
*/
function menuHref(menuUrl,menuId){

    var form = document.createElement('form');
    var objs = document.createElement('input');

    objs.setAttribute('type','hidden');
    objs.setAttribute('name','menuId');
    objs.setAttribute('value',menuId);
    
    form.appendChild(objs);

    form.setAttribute('method','post');

    form.setAttribute('action',menuUrl);

    document.body.appendChild(form);

    form.submit();
}

/**
* 메뉴 이동 함수2
*/
function menuHref2(menuUrl,menuId, searchId){

    var form = document.createElement('form');

    var objs = document.createElement('input');

    objs.setAttribute('type','hidden');

    objs.setAttribute('name','menuId');

    objs.setAttribute('value',menuId);

    var objs2 = document.createElement('input');

    objs2.setAttribute('type','hidden');

    objs2.setAttribute('name','searchId');

    objs2.setAttribute('value',searchId);

    form.appendChild(objs);
    form.appendChild(objs2);

    form.setAttribute('method','post');

    form.setAttribute('action',menuUrl);

    document.body.appendChild(form);

    form.submit();
}

/**
 * CRUD 공통 Transaction Ajax(비동기)
 */

function gfnTransation(url, data, type,callback){

    $.ajax({
        url : url,
        type : type,
        data : data,
        dataType : "json",
        async : true,
        cache : false,
        success: function(data){
            if(callback != null)
                callback(data)
        },
        error : function(xhr, status, err){
            //if(xhr.status == "503"){
                gfnPopMsg.alert2(gfnGetMessage("10060"),gfnSessionOut);
            //}
            gfnSetProcessBar('off')
        }
    })
}

function gfnTransationArray(url, data, type,callback){

    $.ajax({
        url : url,
        type : type,
        data : data,
        dataType : "json",
        async : true,
        cache : false,
        traditional : true,
        success: function(data){
            if(callback != null)
                callback(data)
        },
        error : function(xhr, status, err){
            //if(xhr.status == "503"){
                gfnPopMsg.alert2(gfnGetMessage("10060"),gfnSessionOut);
            //}
            gfnSetProcessBar('off')
        }
    })
}


function gfnSessionOut(){
	if(ssoLoginYn == 'Y'){
		top.window.open('about:blank','_self').close()
	}else{
    	location.href = "/"
    }
}

/**
 * CRUD 공통 Transaction Ajax(동기)
 */
function gfnTransationSync(url, data, type,callback ){

    $.ajax({
        url : url,
        type : type,
        data : data,
        dataType : "json",
        async : false,
        cache : false,
        success: function(data){
            if(callback != null)
                callback(data)
        },
        error : function(request, status, error){
            gfnSetProcessBar('off')
        }
    })
}

function gfnax5gridSelect(){

	if($(".selectBox").length > 0){

		for(var i=0; i< $(".selectBox").length; i++){

			gfnGetOption($(".selectBox:eq("+i+")").attr('data-codeType'), $("#"+$(".selectBox:eq("+i+")").attr('id'))[0])
		}
	}
}

/**
 *	select 동적으로 값 넣기
 */
function gfnGetOption(upprCode, selectOption){

	$.ajax({
        url : "/optionSetting",
        type : 'POST',
        data : {
        			"upprCode" : upprCode
        		},
        dataType : "json",
        success: function(result){

        	var data = result.resData.code;
        	var selectLength = selectOption.length

			for(var i =0; i < data.length; i++){
				selectOption.options[selectLength+i] = new Option(data[i].CODE_NAME,data[i].CODE);
			}
        },
        error : function(request, status, error){
            gfnSetProcessBar('off')
        }
    })
}

function gfnPopGridInit(){

    tPopUpGrid = new ax5.ui.grid();

    tPopUpGrid.setConfig({
        target: $('[data-ax5grid="popUp-grid"]'),
        showLineNumber: true,
        lineNumberColumnWidth: 80,
        sortable: true,
        header:{
            align: "center",
            columnHeight: 40
        },
        body:{
            columnHeight: 40,
            onDBLClick: function(){
                var tPopUpData = new Object();

                tPopUpData.userId = tPopUpGrid.getList()[this.dindex]['USER_ID'].trim()
                tPopUpData.userName = tPopUpGrid.getList()[this.dindex]['USER_NAME'].trim()
                tPopUpData.deptCode = tPopUpGrid.getList()[this.dindex]['DEPT_CODE'].trim()
                tPopUpData.deptName = tPopUpGrid.getList()[this.dindex]['DEPT_NAME'].trim()
                tPopUpData.jikwi = tPopUpGrid.getList()[this.dindex]['JIKWI'].trim()

                fnUserPopCallback(tPopUpData);

                $("#tPopUserInfo").css("display","none");
            }
        },
        columns:[
            {key: "USER_ID", label: "사번", width:100},
            {key: "USER_NAME", label: "사용자명", width:100, align:"center"},
            {key: "DEPT_CODE", label: "부서코드", width:100, align:"center"},
            {key: "DEPT_NAME", label: "부서명", width:100, align:"center"},
            {key: "JIKWI", label: "직위", width:100, align:"center"}
        ]
    });

    $("div[data-ax5grid-panel='aside-header'] span[data-ax5grid-cellholder]").text('No')

    $("#pop_search").click(function(){

        if($("#popUserName").val().length == 0 && $("#popUserDeptName").val().length == 0){
           //이름 또는 부서를 입력해 주십시오.
            gfnPopMsg.alert(gfnGetMessage(10047))
            return;
        }
        var paramData = new Object();

        paramData.userName = $("#popUserName").val();
        paramData.deptName = $("#popUserDeptName").val();

        $.ajax({
        url : "/userInfoSetting",
        type : "POST",
        data : paramData,
        dataType : "json",
        async : true,
        cache : false,
        success: function(data){
            tPopUpGrid.setData(data.resData.result);
        }
    })

    });

}


function gfnGetLPad(gridWidth) {
    //10 크기는 '데이터가 없습니다' 의 길이 에 대한 것을 감안한 수치
    //((그리드 넚일 - NO 고정길이(60)) / 2) - (('메세지 길이'/2) * 폰트사이즈)
    var msg = '데이터가 없습니다';
    return pad = ((gridWidth - 60) / 2) - ((msg.length/2)*20);
}

function gfnGetTPad(gridHeight) {
    //((그리드높이 - 제목 높이) / 3)
    return pad = ((gridHeight - 40) / 3);
}

/**
* 자바의 replaceAll 구현
*/
function replaceAll(str, searchStr, replaceStr){
    return str.split(searchStr).join(replaceStr)
}

/**
* 세자리마다 콤마 찍기
*/
function numberWithCommas(x){
    if(x == null || x == undefined) return "";

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 조회시 백엔드 넘김 인자 자동 설정용 함수
 */
function gfnGetInputParam(){

    var result = new Object();

    if($("input[type=text]").length > 0){

        for(var i=0;i<$("input[type=text]").length;i++){

            if($("input[type=text]").eq(i).val() != null && $("input[type=text]").eq(i).val().length > 0)
                result[$("input[type=text]").eq(i).attr('id')] = $("input[type=text]").eq(i).val();
        }
    }

    if($("input[type=search]").length > 0){

        for(var i=0;i<$("input[type=search]").length;i++){

            if($("input[type=search]").eq(i).val() != null && $("input[type=search]").eq(i).val().length > 0)
                result[$("input[type=search]").eq(i).attr('id')] = $("input[type=search]").eq(i).val();
        }
    }

    if($("select").length > 0){

        for(var i=0;i<$("select").length;i++){

            if($("select").eq(i).val() != null && $("select").eq(i).val().length > 0)
                result[$("select").eq(i).attr('id')] = $("select").eq(i).val();
        }
    }

    if($("textarea").length > 0){

        for(var i=0;i<$("textarea").length;i++){

            if($("textarea").eq(i).val() != null && $("textarea").eq(i).val().length > 0)
                result[$("textarea").eq(i).attr('id')] = $("textarea").eq(i).val();
        }
    }

    result['action'] = tAction;


    return result;
}

/**
 * 저장시 백엔드 넘김 자동 설정 함수
 */
function gfnGetSaveParam(paramComp) {
    var result = new Object();

    for (var i = 0; i < paramComp.length; i++) {
        result[paramComp[i]] = $("#" + paramComp[i] + "").val();
    }

    return result;
}

/**
 * 날짜 설정용 함수
 */
function gfnGetDate(diffDay) {
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

/**
 * 그리드 내 데이터 없음 메세지 표시
 * 그리드 div 속성으로 id 추가 하고 그 id를 인자로 받음
 * 메세지 표시 크기를 위해서 style="font-size:20px;" 추가할것
 */
function gfnSetNoDataMsg(gridId) {
    var lPad = gfnGetLPad($("#" + gridId).width()) + 'px';
    var tPad = gfnGetTPad($("#" + gridId).height()) + 'px';

    $('#' + gridId + ' [data-ax5grid-panel="body"]').append('<div data-ax5grid-panel-scroll="body" style=" padding-left: '+ lPad +'; padding-right: 0px; top: '+ tPad +';">데이터가 없습니다.</div>');
}

/**
 * 필수 입력 Input Type 클래스 자동 추가
 * numberFormat 클래스 : 숫자 Only
 * data-length 속성 : 길이 제한
 * checkFormat 클래스 : 필수 입력
 */
function gfnSetMandatory(array){
    if(array != null && array.length > 0){
        for(var i=0; i< array.length; i++){
            $("#"+array[i]).addClass('checkFormat')
            $("#"+array[i]).parents('td').prev('th').append('<strong class="required">*</strong>')
        }
    }
}

/**
 * 필수 입력 Input Type 클래스 자동 추가
 * numberFormat 클래스 : 숫자 Only
 * data-length 속성 : 길이 제한
 * checkFormat 클래스 : 필수 입력
 */
function gfnSetInitComp(arrObj){
    if (arrObj != null && arrObj.length > 0) {
        for (var i = 0; i < arrObj.length; i++) {
            var id = arrObj[i].id;
            var checkFormat = arrObj[i].checkFormat;
            var dataLength = arrObj[i].dataLength;
            var numberFormat = arrObj[i].numberFormat;
            var isUpper = arrObj[i].isUpper;

            if (checkFormat) {
                $("#"+id).addClass('checkFormat');

                if($("#"+id).parents('td').prev('th').children('.required').length == 0){
                	$("#"+id).parents('td').prev('th').append('<strong class="required">*</strong>')
                }
            }
            if (dataLength > 0) {
                $("#"+id).attr('data-length', dataLength);
            }
            if (numberFormat) {
                $("#"+id).addClass('numberFormat');
            }
            if (isUpper) {
                $("#"+id).addClass('upperData');
            }
        }
    }

    // 동적으로 class 부여 및 사용자 정의 부여에 의한 이벤트 등록
    gfnInit();
}

/**
 * 메시지 저장 변수 호출
 */
function gfnGetMessage(id){
    if(id != null && id != ""){
        return "["+id+"] "+tMessage.get(id);
    }else{
        return "["+id+"]";
    }
}


HashMap = function(){
    this.map = new Array();
}

HashMap.prototype = {
    put : function(key, value){
        this.map[key] = value;
    },
    get : function(key){
        return this.map[key];
    },
    getAll : function(){
        return this.map
    },
    containsKey : function(key){
        return key in this.map;
    },
    containsValue : function(value){
        for(var prop in this.map){
            if(this.map[prop].name == value.name) return true;
        }
        return false;
    },
    isEmpty : function(key){
        return (this.size() == 0);
    },
    clear : function(){
        this.map = new Array();
    },
    remove : function(key){
        delete this.map[key]
    },
    getKeys : function(){
        var keys = new Array();
        for(i in this.map){
            keys.push(i)
        }
        return keys;
    },
    getValues : function(){
        var values = new Array();
            for(var prop in this.map){
                values.push(this.map[prop]);
            }
        return values;
    },
    size : function(){
        var count = 0;
        for(var prop in this.map){
            count++;
        }
        return count;
    },
    toString : function(){
        var s =[];
        for(var prop in this.map){
            s.push(prop+","+this.map[prop]);
        }
        return s.join(",");
    }
}



/**
 * focus 이동시 해당 row select
 */
function gfnSelectFocus(gridId, beforeIndex, afterIndex)
{
    if("undefined" != beforeIndex)
    {
      $("#"+gridId+' [data-ax5grid-panel="body"] tbody tr[data-ax5grid-tr-data-index="'+beforeIndex+'"] td[data-ax5grid-column-col]').css("background","#fff");
    }
    $("#"+gridId+' [data-ax5grid-panel="body"] tbody tr[data-ax5grid-tr-data-index="'+afterIndex+'"] td[data-ax5grid-column-col]').css("background","#eee");


}

/**
 * focus out
 */
function gfnOutFocus(gridId, index)
{

    $("#"+gridId+' [data-ax5grid-panel="body"] tbody tr[data-ax5grid-tr-data-index="'+index+'"] td[data-ax5grid-column-col]').css("background","#fff");
}

/**
 * 콤보(Select Box) 바인딩용 데이터 조회 및 바인딩
 */
function gfnInitComboBind(arrObj) {
    /*
     * 파라미터 샘플
    var arrObj =
     [
        //id: id , upprCode : 상위코드, isAll : 전체삽입여부
        {id: "popParamCodeUseYn", upprCode: "YN", isAll: false}
     ,  {id: "popParamCodeUseYn2", upprCode: "YN", isAll: false}
     ]
    */

    if (undefined == arrObj || 0 == arrObj.length)
        return;

    var paramData = new Object();
    paramData.upprCodeList = JSON.stringify(arrObj);
    gfnTransationSync("/searchCodeData", paramData,"POST",gfnInitComboBindCallback)
}

/**
 * 콤보(Select Box) 바인딩용 데이터 조회 및 바인딩 콜백
 */
function gfnInitComboBindCallback(data) {
    var codeList = data.resData.resultMap;

    for (var i = 0; i < codeList.length; i++) {
        var id = codeList[i].id;
        var isAll = codeList[i].isAll;
        var selectedIdx = codeList[i].selectedIdx;
        var codeData = codeList[i].codeData;
        var optionData = "";

        //초기화
        $("#" + id + " option").remove();

        if (isAll) {
            optionData += "<option value=''>전체</option>";
        }

        for (var j = 0; j < codeData.length; j++) {
            optionData += "<option value=" + codeData[j].CODE + ">" + codeData[j].CODE_NAME + "</option>";
        }
        $("#" + id).append(optionData);
    }
}

/**
 * 확인용 메세지
 */
function gfnConfirm(msgId) {

    return confirm(gfnGetMessage(msgId));
}

// 현재시간
// yyyymmdd
function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1+date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

// 현재시간
// yyyymmdd
function getToday2(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1+date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year +'-'+ month +'-'+ day;
}


// 현재시간
// yyyymmddhhmmss
function getTodayDetail(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1+date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);

    return year + month + day + hours + minutes + seconds;
}

function replaceTime(data){

	if(data == null){
		return data;
    }else if(data.length == 6){
        var temp  =  data.substr(0,2) + ":" + data.substr(2, 2) + ":" + data.substr(4);

        return temp;
    }else if(data.length == 8){
        var temp  =  data.substr(0,4) + "-" + data.substr(4,2) + "-" + data.substr(6);

        return temp;
    }else{
        return data;
    }
}
/**
 *  alert, confirm 대용 팝업 메소드 정의 <br/>
 *  timer : 애니메이션 동작 속도 <br/>
 *  alert : 경고창 <br/>
 *  confirm : 확인창 <br/>
 *  open : 팝업 열기 <br/>
 *  close : 팝업 닫기 <br/>
 */
var gfnPopMsg = {
    timer : 500,
    confirm : function(txt, arg1, arg2){
    	if(arguments.length == 2){
	        if(txt == null || txt.trim() == ""){
	            return;
	        }else if(arg1 == null || typeof arg1 != 'function'){
	            return;
	        }else{
	            $("#confirmPop .btn_ok").on("click", function(){
	                $(this).unbind("click");
	                arg1(true);
	            });
	            this.open("confirmPop", txt);
	        }
        }else if(arguments.length == 3){
			if(txt == null || txt.trim() == ""){
	            return;
	        }else if(arg2 == null || typeof arg2 != 'function'){
	            return;
	        }else{
	            $("#confirmPop2 .btn_ok").on("click", function(){
	                $(this).unbind("click");
	                arg2(true);
	            });
	            this.open("confirmPop2", txt, arg1);
	        }
        }
    },
    alert : function(txt){
        if(txt == null || txt.trim() == ""){
            return;
        }else{
            this.open("alertPop", txt);
        }
    },
    alert2 : function(txt, callback){
        if(txt == null || txt.trim() == ""){
            return;
        }else if(callback == null || typeof callback != 'function'){
            return;
        }else{
            $("#alertPop .btn_ok").on("click", function(){
                $(this).unbind("click");
                callback(true);
            });
            this.open("alertPop", txt);
        }
    },
    open : function(type, txt){
        var popup = $("#"+type);
        popup.find(".PopMsg").text(txt);
        popup.fadeIn(this.timer);
    }
}


/**
 * 트랜잭션(CUD) 처리된 데이터의 위치(인덱스)를 그리드에서 검색 하여 리턴
 */
function gfnGetTrsDataRowPos(gridObj, trsData) {
    var grid = gridObj.getList();
    var findData = "";
    var rowData = "";
    var findRowIdx = 0;

    if (0 == grid.length)
        return 0;

    if (Object.keys(trsData).length <= 0)
        return 0;

    for (var key in trsData) {
        findData += trsData[key];
    }

    for (var i = 0; i < grid.length; i++) {
        for (var key in trsData) {
            rowData += grid[i][key];
        }
        if (findData == rowData) {
            findRowIdx = i;
            break;
        }
        rowData = "";
    }

    return findRowIdx;

}

function decodeUnicode(unicode){
    var r = /\\u([\d\w]{4})/gi;
    unicode = unicode.replace(r,function(match,grp){
        return String.fromCharCode(parseInt(grp,16)); } );
    return unescape(unicode);
}

function gfnSetProcessBar(data) {

    if('ON' == data.toUpperCase()){
        //화면의 높이와 너비를 구한다.
        var maskHeight = $(document).height();
        //  var maskWidth = $(document).width();
        var maskWidth = window.document.body.clientWidth;

        var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
        var loadingImg = '';

        loadingImg += "<div id='loadingImg' style='position:absolute; left:50%; top:40%; display:none; z-index:10000;'>";
        loadingImg += " <img src='../resources/img/viewLoading.gif' style='width : 30px'/>";
        loadingImg += "</div>";

        //화면에 레이어 추가
        $('body')
            .append(mask)
            .append(loadingImg)

        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
        $('#mask').css({
                'width' : maskWidth
                , 'height': maskHeight
                , 'opacity' : '0.3'
        });

        //마스크 표시
        $('#mask').show();

        //로딩중 이미지 표시
        $('#loadingImg').show();
    }else{
        setTimeout(function(){
            $('#mask, #loadingImg').hide();
            $('#mask, #loadingImg').remove();
        },300)
    }
}

function gfnPopSetPre()
{
    $("#PopMsg").css("white-space","pre");
}

function gfnPopSetNormal()
{
    $("#PopMsg").css("white-space","normal");
    $("#alertPop").css("display","none");
}

/*
 * Convert SnakeCase To CamelCase
 * arrData => ['AAA_BBB', aaa_bbb_ccc']
 */
function gfnSnakeToCamelCase(arrData) {
    if (undefined == arrData)
        return arrData;

    for (var i = 0; i < arrData.length; i++) {
        arrData[i] = arrData[i].toLowerCase();
        arrData[i] = arrData[i].replace(/_([a-zA-Z])/g, function(g) {
            return g[1].toUpperCase();});
    }

    return arrData;
}

function handleImgFileSelect(e){
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);

    filesArr.forEach(function(f){
       var reader = new FileReader();
       reader.onload = function(e){
            $("#imagePath").attr('src', e.target.result);
       }
       reader.readAsDataURL(f);
    });
}



function gfnIsNull(str, str2){
    if(str == null || str == undefined){
        return str2;
    }

    return str;
}

/*
 * 테스트 DatePicker
 */

//--------------DatePicker Binding---------------------------------------------------------------------------------
function gfnSetDatePickerData(fnyear, fnmonth){

    //datePickerDay

    //<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2021">
    //<a class="ui-state-default " href="#">1</a>

    /*var date = new Date();
    var y = date.getFullYear();
     var m = Tday.getMonth() + 1;
    var lastDay = new Date(y, m, 0).getDate()
    lastDay*/

    $("#datePickerDay *").remove();

        //var Tday = new Date();

        //

        //var year = Tday.getFullYear();

        var year = fnyear;

        var nowMonth = fnmonth-1;
        //var nowMonth = Tday.getMonth();

        var day = new Date(year,nowMonth,1).getDay();
        //var day = new Date([year, nowMonth, 1].join("-")).getDay();

        var lastDay = new Date(year, nowMonth, 0).getDate();

        var maxDay = Math.ceil((+day + lastDay) / 7) * 7;

        var html = '';

        html += '<tr>'

        var cnt = 0;





        for(var i = 1; i<= maxDay; i++)
        {


            var d;
            var cls;
            if(i> day && lastDay >= i-day)
            {
                d= i-day;

            }
            else
            {
                d = '';
            }

            if(!d)
            {
               cls = 'background'
            }
            else
            {
                cls = ''
            }

            if(cnt == 7)
            {
                html+='</tr><tr>';
                cnt = 0;
            }



            if(d != '')
            {
                html += '<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month='+(nowMonth+1)+' data-year='+year+'><a class="ui-state-default" href="#">'+d+'</a></td>';
            }
            else
            {
                html += '<td>&nbsp</td>';
            }


            cnt++;
        }

        html += '</tr>';
       // document.querySelector('.dateSel').innerHTML = html;
        $("#datePickerDay").append(html);

        //$("#layPop01").css("display","block");

}

//
function gfnSetDatePicker(id){

    //날짜 set
    var Tday = new Date();

    var year = Tday.getFullYear();

    var month = Tday.getMonth();




    //위치 조정
    var top = $(id).offset().top;
    var left = $(id).offset().left;
    var height = parseInt($(id).css('height').replace("px",""));
    top += height;

    $('#datePickerPop2').css("top", top);
    $('#datePickerPop2').css("left", left);


   //년월 설정
    var idDate = $('#startDt').val().split('-');
    var idYear = idDate[0];
    var idMonth = idDate[1];

    if(10 > parseInt(idMonth))
    {
        idMonth = idMonth.replace("0","");
    }


   gfnSetDateColor();
   /* var date = new Date();

    var days = $('#datePickerDay td[data-handler="selectDay"]').length;

    //기존 선택날짜 파란색
    if(year == idYear && month == idMonth)
    {
        for(var i= 0; i < 31; i++)
        {
            var day = $('#datePickerDay a:eq('+i+')').html();
            if(parseInt(day) == date.getDate())
            {
                $('#datePickerDay a:eq('+i+')').css("border","1px solid #003eff").css("background","#007fff").css("color","#ffffff").css("font-weight","normal");
            }
        }
    }

    // 오늘날짜 노란색
    for(var i = 0; i < days; i++)
    {
        var day = $('#datePickerDay a:eq('+i+')').html();
        if(parseInt(day) == date.getDate())
        {
            $('#datePickerDay a:eq('+i+')').css("border","1px solid #dad55e").css("background","#fffa90").css("color","#777620");
        }
        //$('#datePickerDay td[data-handler="selectDay"]:eq('+i+')')

    }





    //ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today
    */






    //클릭 이벤트
    /*$(document).on('click','ui-datepicker-prev',function(){

    });*/


    //입력 길이 제한
    $(id).attr('maxlength','10');

    //입력 포멧

    $(id).attr('onKeyup','this.value=this.value.replace(/[^-0-9]/g,"");');


    $(document).on('keydown',id,function(e){
        if(e.which !=37 && e.which !=38 && e.which !=39 && e.which !=40 && e.which !=8 && e.which !=46)
        {

            var dateNumText = $.trim($(this).val()).replace(/[^0-9]/g,"");
            var textLength = dateNumText.length;

            if(textLength < 4){
                if(e.keyCode >= 0 || e.keyCode <= 9 )
                {
                    $(this).val(dateNumText.replace(/[^-0-9]/g,''));
                }

            }
            else
            {
                if(textLength >=4 && textLength < 6){
                    if(e.keyCode >= 0 || e.keyCode <= 9 )
                    {
                        $(this).val((dateNumText.substr(0,4) + "-" + dateNumText.substr(4,dateNumText.length)).replace(/[^-0-9]/g,''));
                    }

                }
                else if(textLength >= 6)
                {

                    if(e.keyCode >= 0 || e.keyCode <= 9 )
                    {
                        $(this).val((dateNumText.substr(0,4) + "-" + dateNumText.substr(4,2) + "-" + dateNumText.substr(6,2)).replace(/[^-0-9]/g,''));
                    }
                }
            }
        }


    });




    // 대상 클릭시 datePicker show
    $(document).on('click',id, function(){



        var format = /^([0-9][0-9][0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))$/;
        var data = $(id).val();

        if(format.test(data))
        {
            gfnSetDatePickerDate(idYear,idMonth);
            gfnSetDatePickerData(idYear, idMonth);
        }
        else
        {
            gfnSetDatePickerDate(year,month);
            gfnSetDatePickerData(year, month);
        }


        //DatePicker Show
        $("#datePickerPop2").css("display","block");
    });


    //서브 pop show
   /* $(document).on('click','.ui-datepicker-title', function(){
        $('#datePickerPop').css("display","block");
    });*/

    //다른영역 클릭시 datePicker hide
    $(document).mouseup(function(e){
        var lay = $("#datePickerPop2");

        if(lay.has(e.target).length === 0)
        {
            $('#datePickerPop2').fadeOut(600); //css("display","none");
        }
   });




   //POP Show
   //$('#datePickerPop2').css("display","block");
 }

 //년도 설정
function gfnSetDatePickerDate(year, month){

    $('#datepickerTitleYear').html(year);
    $('#datepickerTitleMonth').html(month+"월");

}

//DatePickerColor Set
function gfnSetDateColor(){
    //실제 일자 데이터
    var Tday = new Date();

    var year = Tday.getFullYear();

    var month = Tday.getMonth();

   //입력된 일자 데이터
    var idDate = $('#startDt').val().split('-');
    var idYear = idDate[0];
    var idMonth = idDate[1];
    var idDay = idDate[2];

    if(10 > parseInt(idMonth))
    {
        idMonth = idMonth.replace("0","");
    }


    //DatePicker 일자 데이터
    var dpYear = $('#datepickerTitleYear').html();
    var dpMonth = $('#datepickerTitleMonth').html().replace("월","");


    //현제 달의 일수
    var days = $('#datePickerDay td[data-handler="selectDay"]').length;




    //기존 선택날짜 파란색
    // 오늘날짜 노란색



    for(var i = 0; i < days; i++)
    {
        var day = $('#datePickerDay a:eq('+i+')').html();


        //선택날짜
        if(idYear == dpYear && idMonth == parseInt(("0"+dpMonth)))
        {
            $('#datePickerDay a:eq('+i+')').css("border","1px solid #dad55e").css("background","#fffa90").css("color","#777620");
        }


        //오늘날짜
        if(year == idYear && month == idMonth)
        {
            if(parseInt(day) == Tday.getDate())
            {
                $('#datePickerDay a:eq('+i+')').css("border","1px solid #003eff").css("background","#007fff").css("color","#ffffff").css("font-weight","normal");
            }
        }

    }

}


var backControl = function(){
	window.innerDoc = false;

	window.addEventListener('mouseover',function(event){
		window.innerDoc = true;

	});

	window.addEventListener('mouseout', function(event){
		window.innerDoc = false;
	});

	history.pushState({page:"first"}, document.title, location.pathname);

	if(gMenuId != '')
		document.cookie = "menuId="+gMenuId

	window.addEventListener('popstate', function(event){
		history.pushState({page:"historyChanged"}, document.title, location.pathname + "?menuId="+gMenuId);

		if(!window.innerDoc){
			callbackFunction();
		}
	});
}

var callbackFunction = function(){
	location.href = location.pathname + "?menuId="+gMenuId
}

function expression(data){
	if(data == null) return 0
	else return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
}

function selectLocalImage() {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    console.log("input.type " + fileInput.type);

    fileInput.click();

    fileInput.addEventListener("change", function () {  // change 이벤트로 input 값이 바뀌면 실행
        const formData = new FormData();
        const file = fileInput.files[0];
        formData.append('uploadFiles', file);

        $.ajax({
            type: 'post',
            enctype: 'multipart/form-data',
            url: '/QuillFileUpload',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function (data) {
                const range = quill.getSelection(); // 사용자가 선택한 에디터 범위
                // uploadPath에 역슬래시(\) 때문에 경로가 제대로 인식되지 않는 것을 슬래시(/)로 변환
                data.resData.filesPath[0] = data.resData.filesPath[0].replace(/\\/g, '/');

                quill.insertEmbed(range.index, 'image', "/display?fileName=" + data.resData.filesPath[0]);

            },
            error: function (err) {
                console.log(err);
            }
        });

    });
}

function gfnLicenseState(state){

	var result = "";

	switch(state){
		case 0 : result = "신청중"
		break;
		case 1 : result = "사용중"
		break;
		case 2 : result = "만료"
		break;
		case 3 : result = "반려"
		break;
		case 4 : result = "반납"
		break;
		default : result = "에러발생"
		break;
	}

	return result;
}

function gfnRobotType(type){

	var result = "";

	switch(type){
		case 0 : result = "NonProduction"
		break;
		case 1 : result = "Attended"
		break;
		case 2 : result = "Unattended"
		break;
		case 3 : result = "Development"
		break;
		case 4 : result = "StudioX"
		break;
		default : result = "알수없음"
		break;
	}

	return result;
}

