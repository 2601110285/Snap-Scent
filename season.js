$(document).ready(function() {

  /* === 계절 큐레이션 한 창 탭 전환 제어 === */
  $('.season-tab-menu li').click(function() {
    
    // 1) 이미 활성화된 탭을 중복 클릭한 경우 작동 방지
    if($(this).hasClass('active')) return;

    // 2) 클릭한 탭 메뉴 버튼 활성화 상태 전환
    $('.season-tab-menu li').removeClass('active');
    $(this).addClass('active');

    // 3) 기존 화면에 보이는 향수 콘텐츠 레이어 숨기기
    $('.season-pane').removeClass('active').hide();

    // 4) 클릭한 탭의 data-season 값 매칭 및 부드럽게 등장시키기
    const targetSeason = $(this).attr('data-season');
    $('#season-' + targetSeason).show().addClass('active');
  });

});