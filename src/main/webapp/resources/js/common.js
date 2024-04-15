/* menuOn */
function menuOn(depth1, depth2) {
    var topmenu = $(".topmenu" + depth1);
    topmenu.addClass("active");

    var totalmenuDepth1 = $(".topmenu" + depth1);
    totalmenuDepth1.addClass("active");

    var totalmenuDepth2 = $(".topmenu" + depth1 + "-" + depth2);
    totalmenuDepth2.addClass("active");
}

/* 상단 메뉴 */
function slowDownUpMenu(){
	if(cc == 1){
		$(".top_menu > ul > li > .top_submenu").slideDown(100);
		$(".gnbWrap > .bg").slideDown(100);
        $(".mask_totalmenu").show();
	} else {
		$(".top_menu > ul > li > .top_submenu").slideUp(150);
		$(".gnbWrap > .bg").slideUp(250);
        $(".mask_totalmenu").hide();
	}
}

$(document).ready(function () {

    /* 전체메뉴 비율 지정 */
	var menuLength = $(".top_menu > ul > li").length;
	var counter = 'counter' + menuLength;

	$(".top_menu > ul > li").addClass(counter);	

	/* 전체메뉴 높이 지정 */
	var heightArray = $(".top_menu > ul > li > .top_submenu").map( function() {
		return $(this).height();	
	}).get();

	var maxHeight = Math.max.apply(Math, heightArray);
	$(".gnbWrap > .bg, .top_menu > ul > li > .top_submenu").height(maxHeight);
	

	/* 상단 2차메뉴 */
	if(	navigator.userAgent.indexOf("Android")>0 || 
	    navigator.userAgent.indexOf("iPhone") > 0|| 
	    navigator.userAgent.indexOf("iPod") > 0|| 
	    navigator.userAgent.indexOf("BlackBerry") > 0) {
		$('.top_menu > ul > li > a').click(function(){
			event.preventDefault();
			setTimeout(slowDownUpMenu, 100);
			cc = 1;
			$('.top_menu > ul > li > a').removeClass('point');
			$(this).addClass('point');
		});
		$('.gnbWrap').mouseleave(function(){
			setTimeout(slowDownUpMenu, 400);
			cc = 0;
			$('.top_menu > ul > li > a').removeClass('point');
		});
	} else {
		$('.top_menu > ul > li > a').mouseover(function(){
			setTimeout(slowDownUpMenu, 100);
			cc = 1;
			$('.top_menu > ul > li > a').removeClass('point');
			$(this).addClass('point');
		});
		$('.gnbWrap').mouseleave(function(){
			if($(window).width() > 1199) {
				setTimeout(slowDownUpMenu, 400);
				cc = 0;
				$('.top_menu > ul > li > a').removeClass('point');
			}
		});
		$('.top_menu > ul > li > a').focus(function(){
			setTimeout(slowDownUpMenu, 100);
			cc = 1;
			$(this).addClass('point');
		});
		$('.top_menu > ul > li > .top_submenu > ul > li:last-child > a').blur(function(){
			setTimeout(slowDownUpMenu, 100);
			cc = 0;
			$('.top_menu > ul > li > a').removeClass('point');
		});
	}
    
    /* main tab board */
	$(".tabBoard_1 .main_board_menu > li > a").on("click", function() {
		var tempIdx = $(this).attr('id');
		var thisIdx = tempIdx.replace(/[^0-9]/g,"");

		$(".tabBoard_1 .main_board_menu > li > a").removeClass('active');
		$(".tabBoard_1 .main_board_box").removeClass('active');
		$(this).addClass('active');
		$("#main_board_box" + thisIdx).addClass('active');
	});
    
    $(".tabBoard_2 .main_board_menu > li > a").on("click", function() {
		var tempIdx = $(this).attr('id');
		var thisIdx = tempIdx.replace(/[^0-9]/g,"");

		$(".tabBoard_2 .main_board_menu > li > a").removeClass('active');
		$(".tabBoard_2 .main_board_box").removeClass('active');
		$(this).addClass('active');
		$("#main_board_box" + thisIdx).addClass('active');
	});
	
	/* faqList */
	$(".faqList ul li .faq_tit").on("click", function() {
		if($(this).next(".faq_cont").css("display") == "none") {
			$(".faqList ul li").removeClass('active');
			$(".faqList ul li .faq_cont").slideUp(75);
			$(this).parent('li').addClass('active');
			$(this).next(".faqList ul li .faq_cont").slideDown(75);
		} else {
			$(".faqList ul li").removeClass('active');
			$(".faqList ul li .faq_cont").slideUp(75);
		}
	});
    
    /* 셀렉트 포커스 강제 지움 */
    $('select').change(function() {
    	$(this).blur();
    });
    
    $("#btnLogout").click(function(){
    	location.href="/LogOut"
    })
    
    /* storeCard */
    $(document).on('click', '.storeCard > .more', function () {
    	event.stopPropagation(); // 이벤트 전파 중지 (클릭 이벤트 중첩 실행 방지)
    	if($(this).next('.description').css('display') == 'none') {
        	$(this).addClass('active');
        	$('.storeCard > .description').slideUp(75);
        	$(this).next('.description').slideDown(75);
    	} else {
        	$(this).removeClass('active');
        	$('.storeCard > .description').slideUp(75);
    	}
	});
    $(document).mouseup(function (e) {
        if (!$('.description').is(e.target) &&
            $('.description').has(e.target).length === 0) {
            $('.storeCard > .more').removeClass('active');
            $('.storeCard > .description').slideUp(75);
        }
    });
    
    $("#contentsPopview").dblclick(function(){$("#contentsPopview").hide()})
    
})



