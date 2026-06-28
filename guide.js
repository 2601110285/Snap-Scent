$(document).ready(function() {

  /* === 1. 아코디언 메뉴 (향수 노트 설명) === */
  $('.accordion-header').click(function() {
    // 1) 내가 클릭한 것의 본문(body) 부분 찾기
    const body = $(this).next('.accordion-body');
    
    // 2) 만약 이미 열려있다면 닫기
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      body.css('max-height', '0');
    } 
    // 3) 닫혀있다면 열기 (나머지 열려있는 건 닫아줌)
    else {
      $('.accordion-header').removeClass('active');
      $('.accordion-body').css('max-height', '0');
      
      $(this).addClass('active');
      // 글자 내용의 실제 높이만큼 펼쳐지게 함
      body.css('max-height', body.prop('scrollHeight') + 'px');
    }
  });

  /* === 2. 탭 메뉴 (부향률 설명) === */
  $('.tab-menu li').click(function() {
    // 1) 클릭한 탭 버튼 활성화 (색상 변경)
    $('.tab-menu li').removeClass('active');
    $(this).addClass('active');

    // 2) 기존에 열려있던 내용 숨기기
    $('.tab-content').removeClass('active');

    // 3) 클릭한 탭의 data-tab 값과 일치하는 내용 보여주기
    const activeTab = $(this).attr('data-tab');
    $('#' + activeTab).addClass('active');
  });

});