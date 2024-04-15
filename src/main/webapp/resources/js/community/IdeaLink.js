
//-------------------------------------------------------------------------------
// JQuery
//-------------------------------------------------------------------------------
$(function(){
	
	fnInit();	
	
	 backControl() 
});

/*********************************************
 * 초기화
 * - 컴포넌트 데이터 초기화, 이벤트 핸들러 설정 및 그리드 초기화
 *********************************************/
function fnInit() {
	
	gfnTransation("/Idea/SearchDeptCnt",null,"POST",fnSearchCallback)
}

function fnSearchCallback(result){

	var data = result.resData.resultMap;
	
	if(data.length > 0){
	
		for(var i=0; i< data.length ; i++){
		
			if($("#"+data[i].DEPT_CODE).length > 0){
				$("#"+data[i].DEPT_CODE).text('('+data[i].CNT+'건)');
			}
		}
	}
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