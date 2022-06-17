console.clear();
$(function(){
    /**********************/
    /****** 네비 고정******/
    /*********************/
    $(window).scroll(function(){
        if($(document).scrollTop() >= 1){
            $('#nav').addClass('fix');
            $('#slide').addClass('fix');
        }
        else{
            $('#nav').removeClass('fix');
            $('#slide').removeClass('fix');
        }
    })//scroll

    /* 어두운 뒷 배경 */
    $('.back').hover(
        function(){
        $('.depth2').fadeOut(50);
        $('.back').fadeOut(50);
        },
        function(){
        $('.depth2').fadeIn();
        $('.back').fadeIn();
    })//hover


    /**********************/
    /****** 네비 버튼******/
    /*********************/
    var sta = 0;
    $('.nav_btn').click(function(){
        if(sta == 0){
            $(this).addClass('on');
            //$('.box').fadeIn();                 //A.
            //$('.box').animate({left:0});        //B.
            $('.map').addClass('on');           //C.
            $('.modal').addClass('on');
            sta = 1;
        }
        else{
            $(this).removeClass('on');
            //$('.box').fadeOut();                //A.
            //$('.box').animate({left:'-100%'});  //B.
            $('.map').removeClass('on');        //C.
            $('.modal').removeClass('on');
            sta = 0;
        }
    })//click

    /* 모바일 메뉴 바 */
    var menu = 0;
    $('.dp1 > li').click(function(){
        if (menu == 0) {
            $(this).children('.dp2').slideDown();
            menu = 1;
        }
        else {
            $(this).children('.dp2').slideUp();
            menu = 0;
        }
    });//click


    /*********************/
    /****** 퀵 버튼 ******/
    /********************/
    var quick = 0;
    $('.quick_btn .open').click(function(){
      if(quick == 0){
        $(this).addClass('close');
        $('.quick_btn p.btn1').addClass('on');
        $('.quick_btn p.btn2').addClass('on');
        $('.quick_btn p.btn3').addClass('on');
        quick = 1;
      }
      else{
        $(this).removeClass('close');
        $('.quick_btn p.btn1').removeClass('on');
        $('.quick_btn p.btn2').removeClass('on');
        $('.quick_btn p.btn3').removeClass('on');
        quick = 0;
      }
    })//click


    /***************************/
    /****** 메인 슬라이드 ******/
    /**************************/
    $('.lazy').slick({
    dots : true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover : false
    });

    var btn = 0;
    $('.stop').each(function(){
        var img = $(this).find('img')
        var src_off = img.attr('src');
        var src_on = src_off.replace('_off','_on')
        $(this).click(function(){
            
            if (btn == 0) {
                $('.lazy').slick('slickPause');
                img.attr('src',src_on);
                btn = 1;
            }
            else {
                $('.lazy').slick('slickPlay');
                // alert(src_off);
                img.attr('src',src_off);
                btn = 0;
            }
        });
    })


    //새로고침 되었을 때 화면의 크기에 맞게
    if( $(window).width() < 761 ){
        $('#slide .ms1 img').attr('src','image/MBMS1.jpg');
        $('#slide .ms2 img').attr('src','image/MBMS2.jpg');
    }
    else {
        $('#slide .ms1 img').attr('src','image/PCMS1.png');
        $('#slide .ms2 img').attr('src','image/PCMS2.png');
    }
    //윈도우 창 크기 조정함에 따른 화면의 크기에 맞게
    $(window).resize(function(){
        if( $(window).width() < 761 ){
            $('#slide .ms1 img').attr('src','image/MBMS1.jpg');
            $('#slide .ms2 img').attr('src','image/MBMS2.jpg');
        }
        else {
            $('#slide .ms1 img').attr('src','image/PCMS1.png');
            $('#slide .ms2 img').attr('src','image/PCMS2.png');
        }
    })//resize


    /****************/
    /****** 탭 ******/
    /****************/
    /*
    tabSet을 각각 처리
    1. html구조 : ul > 탭 네비
                    div > 패널(콘텐츠) 세트
    2. 탭 네비 a 클릭 >> .panel을 모두 닫음 .on 제거
                        >> 클릭한 a에 .on 추가
                        >> 클릭한 a에서 href 값을 찾음
    3. 2의 href와 같은 id의 panel을 열기
    */
    $('.tabSet').each(function(){
        var anchor = $(this).find('.tabs a');		//a) .tabs a 모두		//find는 하위 요소도 되고 손자도 되고
        var anchor_on = $(this).find('.tabs a.on');	//b) a 중 .on			//a 생략 가능
        var href_on = anchor_on.attr('href');		//c) b의 href ==> #panel1-1
        var panel = $(this).find('.panel');

        $('.tabSet a').click(function (event) {
        return false;
        }); // 탭에서 a작동 X

        $(href_on).show();
        anchor.each(function(){
            var href_this = $(this).attr('href');
            
            $(this).click(function(){
                panel.hide();
                anchor.removeClass('on');
                $(this).addClass('on');
                $(href_this).show();
            })//click
        })//each
    })//each


    /*************************/
    /****** 갯수 늘리기 ******/
    /************************/
    /* 
    li들의 전체 갯수를 구해서 클릭할때마다 4개씩 추가로 나타나게 함
    마지막 줄이 나타나면 더보기를 줄이기로 바꾸고 더이상 추가로 나타나지 않음
    줄이기 버튼 상태에서 클릭을 하면 모든 것을 초기 상태로 돌림
    (줄이기-->더보기, li는 처음 갯수만큼 보이기)

    1) css : li들이 보이지 않음
    2) li들을 4개만 보임  0~3 까지, 줄갯수1
    3) li 전체 갯수를 구해서 총 몇줄인지 구하기 
        li전체 / 한줄의 갯수 ==> 올림 수 (ex. 10 / 4 = 3)
    4) 클릭시 한줄씩 늘어남 ==> 클릭 횟수 * 한줄의 갯수
    5) 마지막줄일 경우 더보기를 줄이기로 바꿈 
    6) 5의 이후 경우 클릭은 처음으로 돌아감 
        모든li숨김, 줄이기--> 더보기, 줄갯수-->1 , 첫줄의 li들 보이기
    */

    /***** 첫 번째 탭 리스트 *****/
    var click_count1 = 1;//몇 줄인가
    var li_length1 = $('.thum_list1 li').length;//li 갯수 확인

    //큰 5줄에 작게 4줄씩
    for(var count1=0; count1 < click_count1 * 2; count1++){
        $('.thum_list1 li').eq(count1).show();//eq = 순서대로 늘어남
    }

    $('.more1').each(function(){
        var img = $(this).find('img')
        var src_plus = img.attr('src');
        var src_minus = src_plus.replace('_plus','_minus')
        $(this).click(function(){
            click_count1 = click_count1 + 1;

            //더보기 -> 줄이기
            if(Math.ceil(li_length1 / 2) > click_count1){//ceil : 올림(18 / 4 = 4.5이니 5로 취급)
                li_show1(click_count1);//사용자 함수 사용
            }
            else if(Math.ceil(li_length1 / 2) == click_count1){//마지막 줄인지 확인 후 마지막 줄 보여주면서 더보기를 줄이기로 교체
                li_show1(click_count1);
                img.attr('src',src_minus);
            }
            else{//줄이기를 클릭하는 경우 다시 처음으로
                $('.thum_list1 li').hide();
                click_count1 = 1;
                li_show1(click_count1);
                img.attr('src',src_plus);
            }
        })//click
    })//each

    /** 첫 번째 사용자 함수 **/
    function li_show1(click_count1){
        for(var count1=0; count1 < click_count1 * 2; count1++){
            $('.thum_list1 li').eq(count1).show();
        }
    }


    /***** 두 번째 탭 리스트 *****/
    var click_count2 = 1;
    var li_length2 = $('.thum_list2 li').length;

    for(var count2=0; count2 < click_count2 * 2; count2++){
        $('.thum_list2 li').eq(count2).show();
    }

    $('.more2').each(function(){
        var img = $(this).find('img')
        var src_plus = img.attr('src');
        var src_minus = src_plus.replace('_plus','_minus')
        $(this).click(function(){
            click_count2 = click_count2 + 1;

            if(Math.ceil(li_length2 / 2) > click_count2){
                li_show2(click_count2);
            }
            else if(Math.ceil(li_length2 / 2) == click_count2){
                li_show2(click_count2);
                img.attr('src',src_minus);
            }
            else{
                $('.thum_list2 li').hide();
                click_count2 = 1;
                li_show2(click_count2);
                img.attr('src',src_plus);
            }
        })//click
    })//each

    /** 두 번째 사용자 함수 **/
    function li_show2(click_count2){
        for(var count2=0; count2 < click_count2 * 2; count2++){
            $('.thum_list2 li').eq(count2).show();
        }
    }


    /***** 세 번째 탭 리스트 *****/
    var click_count3 = 1;
    var li_length3 = $('.thum_list3 li').length;

    for(var count3=0; count3 < click_count3 * 2; count3++){
        $('.thum_list3 li').eq(count3).show();
    }

    $('.more3').each(function(){
        var img = $(this).find('img')
        var src_plus = img.attr('src');
        var src_minus = src_plus.replace('_plus','_minus')
        $(this).click(function(){
            click_count3 = click_count3 + 1;

            if(Math.ceil(li_length3 / 2) > click_count3){
                li_show3(click_count3);
            }
            else if(Math.ceil(li_length3 / 2) == click_count3){
                li_show3(click_count3);
                img.attr('src',src_minus);
            }
            else{
                $('.thum_list3 li').hide();
                click_count3 = 1;
                li_show3(click_count3);
                img.attr('src',src_plus);
            }
        })//click
    })//each

    /** 세 번째 사용자 함수 **/
    function li_show3(click_count3){
        for(var count3=0; count3 < click_count3 * 2; count3++){
            $('.thum_list3 li').eq(count3).show();
        }
    }


    /*********************************/
    /****** 의료진 소개 슬라이드 ******/
    /*********************************/
    $(".regular").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 970, // 화면의 넓이가 970px 미만일 때
            settings: {
                slidesToShow: 2
            }}]
    });


    /******************/
    /****** 지도 ******/
    /******************/
    //새로고침 되었을 때 화면의 크기에 맞게
    if( $(window).width() < 761 ){
        $('#sec5 .map').attr('src','http://t1.daumcdn.net/roughmap/imgmap/ae29b7408ceee5b0b2f4a648447bb8f5420d317026c59a0f3bc46ef49571e0e3');
    }
    else {
        $('#sec5 .map').attr('src','http://t1.daumcdn.net/roughmap/imgmap/7f8afcfd82780a143a4c94b2522aaac5886f13f1e9e1d4d11c5d18e0053487c1');
    }
    //윈도우 창 크기 조정함에 따른 화면의 크기에 맞게
    $(window).resize(function(){
        if( $(window).width() < 761 ){
            $('#sec5 .map').attr('src','http://t1.daumcdn.net/roughmap/imgmap/ae29b7408ceee5b0b2f4a648447bb8f5420d317026c59a0f3bc46ef49571e0e3');
        }
        else {
            $('#sec5 .map').attr('src','http://t1.daumcdn.net/roughmap/imgmap/7f8afcfd82780a143a4c94b2522aaac5886f13f1e9e1d4d11c5d18e0053487c1');
        }
    })//resize

    
    //새로고침 되었을 때 화면의 크기에 맞게
    if( $(window).width() < 1201 ){
        $('#sec5 .map').attr('src','http://t1.daumcdn.net/roughmap/imgmap/7f8afcfd82780a143a4c94b2522aaac5886f13f1e9e1d4d11c5d18e0053487c1');
    }
    else {
        $('#sec5 .map').attr('src','http://t1.daumcdn.net/roughmap/imgmap/179d7c756197e73f7f6bc42ddcf653808dc9f2726b006b4137449ba5d2e152ae');
    }
    //윈도우 창 크기 조정함에 따른 화면의 크기에 맞게
    $(window).resize(function(){
        if( $(window).width() < 1201 ){
            $('#sec5 .map').attr('src','http://t1.daumcdn.net/roughmap/imgmap/7f8afcfd82780a143a4c94b2522aaac5886f13f1e9e1d4d11c5d18e0053487c1');
        }
        else {
            $('#sec5 .map').attr('src','http://t1.daumcdn.net/roughmap/imgmap/179d7c756197e73f7f6bc42ddcf653808dc9f2726b006b4137449ba5d2e152ae');
        }
    })//resize
})