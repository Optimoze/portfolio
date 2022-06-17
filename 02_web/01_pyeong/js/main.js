$(function(){
    $('.menu > li > a').each(function(){
        var img = $(this).find('img')
        var src_off = img.attr('src');
        var src_on = src_off.replace('_off','_on')

        $(this).hover(function(){
            img.attr('src',src_on);
        }, function(){
            img.attr('src',src_off);
        })//hover
    })//each
})//ready 바로가기 색 변경

$(function(){
    $(".lazy").slick({
        lazyLoad: 'ondemand',
        infinite: true,
        arrows: true,
        dots : true,
        autoplay : true,
        autoplaySpeed : 5000,
        pauseOnHover : true,
    });

    $(".regular").slick({
        dots: false,
        infinite: true,
        autoplay : true,
        autoplaySpeed : 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        pauseOnHover : true,
    });
})//ready 슬라이드 slick

$(function(){
    $(window).scroll(function(){
        if($(document).scrollTop() >= 39){
        $('#nav').addClass('fix');
        }
        else{
        $('#nav').removeClass('fix');
        }
    })//scroll
})//ready 스크롤 시 네비 픽스

$(function(){
    $('.up button').click(function(){
        $('.up').fadeOut();
    })
})//ready 지도 보기 클릭 시 페이드아웃

$(function(){
    //새로고침 되었을 때 화면의 크기에 맞게
    if( $(window).width() < 1441 ){
        $('#slide .img1 img').attr('src','image/slide1_1440.jpg');
        $('#slide .img2 img').attr('src','image/slide2_1440.jpg');
    }
    else {
        $('#slide .img1 img').attr('src','image/slide1.jpg');
        $('#slide .img2 img').attr('src','image/slide2.jpg');
    }
    //윈도우 창 크기 조정함에 따른 화면의 크기에 맞게
    $(window).resize(function(){
        if( $(window).width() < 1441 ){
            $('#slide .img1 img').attr('src','image/slide1_1440.jpg');
            $('#slide .img2 img').attr('src','image/slide2_1440.jpg');
        }
        else {
            $('#slide .img1 img').attr('src','image/slide1.jpg');
            $('#slide .img2 img').attr('src','image/slide2.jpg');
        }
    })//resize
})//ready 크기에 따른 슬라이드 이미지 변경

$(function(){
    var btn_on = 0;
    $('#btn1').click(function(){
        if (btn_on == 0) {
            $(this).addClass('on');
            $('#nav .depth1').slideDown();
            btn_on = 1;
        } 
        else {
            $(this).removeClass('on');
            $('#nav .depth1').slideUp();
            btn_on = 0;
        }
    })
})//readey 네비 버튼

$(function(){
    //새로고침 되었을 때 화면의 크기에 맞게
    if( $(window).width() < 1031 ){
        $('#nav .depth1').hide();
    }
    else {
        $('#nav .depth1').show();
    }
    //윈도우 창 크기 조정함에 따른 화면의 크기에 맞게
    $(window).resize(function(){
        if( $(window).width() < 1031 ){
            $('#nav .depth1').hide()
        }
        else {
            $('#nav .depth1').show();
        }
    })//resize
})//ready 크기에 따른 네비 등장 여부