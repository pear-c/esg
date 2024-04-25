
/* include */
$(function () {
    var includes1 = $('[data-include1="header"]');
    var includes2 = $('[data-include2="aside"]');
    var includes3 = $('[data-include3="footer"]');
    jQuery.each(includes1, function () {
        $(this).load('include/header.html');
    });
    jQuery.each(includes2, function () {
        $(this).load('include/aside.html');
    });
    jQuery.each(includes3, function () {
        $(this).load('include/footer.html');
    });
});

$(document).ready(function () {

    /* header > top_nav */
    $(document).on('mouseover','.top_nav > ul > li', function() {
        $(this).addClass('active');
        $('.top_nav > li').not(this).removeClass('active');
    });
    $(document).on('mouseleave','.top_nav > ul > li.active', function() {
        $(this).removeClass('active');
    });

    /* header > btn_mode_changer */
    $(document).on('click', '#header .btn_mode_changer', function () {
        if($('#app').hasClass('dark_mode')) {
            $('#app').removeClass('dark_mode');
        } else {
            $('#app').addClass('dark_mode');
        }
    });
    
    /* header > allmenu */
	$(document).on('click', '.btn_allmenu', function() {
		$('#app').addClass('fixed');
        $('#header > .allmenu_layout').show();
	});
	$(document).on('click', '.allmenu > .btn_modal_close', function() {
		$('#app').removeClass('fixed');
        $('#header > .allmenu_layout').hide();
	});

    /* aside > width_changer */
    $(document).on('click', '#aside > .width_changer', function () {
        if($('#aside').hasClass('closed')) {
            $('#aside').removeClass('closed');
        } else {
            $('#aside').addClass('closed');
        }
    });

    /* aside > side_nav(only PC) */
    if($(window).width() >= 901) {
        $(document).on('click','.side_nav > ul > li > a', function() {
            if($(this).parent('li').hasClass('active')) {
                $('#app').removeClass('fixed');
                $('.side_nav > ul > li').removeClass('active');
                $(this).next('ul').slideUp(100);
            } else {
                $('#app').addClass('fixed');
                $('.side_nav > ul > li').removeClass('active');
                $('.side_nav > ul > li > ul').slideUp(100);
                $(this).parent('li').addClass('active');
                $(this).next('ul').slideDown(100);
            }
        });
    };

    /* 확장검색 */
    $(document).on('click', '.searcher_btns > .btn_more', function () {
        if($('.search_form').hasClass('active')) {
            $('.search_form').removeClass('active');
        } else {
            $('.search_form').addClass('active');
        }
    });
    $(document).on('click', '.search_form > .btn_close', function () {
        $('.search_form').removeClass('active');
    });
    
    /* 테스크아이템과 모달 */
    $(document).on('click', '.task_item', function () {
        $('.task_item').removeClass('active');
        $(this).addClass('active');
        $('.rightModal').addClass('open');
    });   
    
    $(document).on('click', '.btn_modal_close, .task_item.active', function () {
        $('.task_item').removeClass('active');
        $(this).parents('.rightModal').removeClass('open');
    });

    $(document).on('click', '.task_item.active', function () {
        $('.task_item').removeClass('active');
        $('.rightModal').removeClass('open');
    });

    /* 결재선아이템과 모달 */
    $(document).on('click', '.ul_sign_line > li > .item > .title_box', function () {
        $('.ul_sign_line > li > .item').removeClass('active');
        $(this).parents('.item ').addClass('active');
        $('#app').addClass('fixed');
        $('.page_wrapper').addClass('with_modal');
        $('.rightModal').addClass('open');
    });
    
    $(document).on('click', '.btn_modal_close', function () {
        $('.ul_sign_line > li > .item').removeClass('active');
        $('#app').removeClass('fixed');
        $('.page_wrapper').removeClass('with_modal');
        $(this).parents('.rightModal').removeClass('open');
    });

    /* 중앙모달 */
    $(document).on('click', '.centerModal .btn_modal_close', function () {
        $(this).parents('.centerModal').css('display', 'none');
    });

    /* 중앙모달(결재라인) > 부서트리 */
    $(document).on('click', '.tree_toggle', function () {
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next('ul').removeClass('active');
        } else {
            $(this).addClass('open');
            $(this).next('ul').addClass('active');
        }
    });

    /* 중앙모달(결재라인) > 결재순번 */
    $(document).on('click', '.ul_row > li > p', function () {
        $('.ul_row > li').removeClass('select');
        $(this).parent('li').addClass('select');
    });

    /* 간트 좌측 테이블 토글 */
    $(document).on('click', '.btn_toggle', function () {
        if($('.robot_table').hasClass('closed')) {
            $('.robot_table').removeClass('closed');
        } else {
            $('.robot_table').addClass('closed');
        }
    });

    /* 간트 하단 수행예정과제 토글 */
    $(document).on('click', '.wating_head', function () {
        if($(this).parents('.wating_wrap').hasClass('closed')) {
            $('.gantt_wrap').removeClass('extend');
            $('.wating_wrap').removeClass('closed');
        } else {
            $('.gantt_wrap').addClass('extend');
            $('.wating_wrap').addClass('closed');
        }
    });

});

