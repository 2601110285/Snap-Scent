$(document).ready(function() {
  
  /* === 1. 광고판 이미지 자동 슬라이더 & 하단 점 기능 === */
  let currentSlide = 0;
  const slides = $('.slide');
  const dots = $('.dot');
  const totalSlides = slides.length;
  let slideInterval;

  // 점(Dot) 색상 업데이트 함수
  function updateDots() {
    dots.removeClass('active');
    dots.eq(currentSlide).addClass('active');
  }

  // 다음 슬라이드로 넘어가는 함수
  function showNextSlide() {
    slides.removeClass('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides.eq(currentSlide).addClass('active');
    updateDots(); 
  }

  // 이전 슬라이드로 돌아가는 함수
  function showPrevSlide() {
    slides.removeClass('active');
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides.eq(currentSlide).addClass('active');
    updateDots();
  }

  // 4초(4000ms)마다 자동으로 다음 사진으로 넘기기
  function startSlider() {
    slideInterval = setInterval(showNextSlide, 4000);
  }
  
  startSlider(); // 자동 슬라이드 작동 시동

  // 오른쪽 화살표 클릭
  $('.next-btn').click(function(e) {
    e.stopPropagation(); 
    clearInterval(slideInterval); 
    showNextSlide();
    startSlider(); 
  });

  // 왼쪽 화살표 클릭
  $('.prev-btn').click(function(e) {
    e.stopPropagation();
    clearInterval(slideInterval);
    showPrevSlide();
    startSlider();
  });

  // 하단 점(Dot) 클릭 제어
  dots.click(function(e) {
    e.stopPropagation();
    clearInterval(slideInterval);
    slides.removeClass('active');
    currentSlide = $(this).data('index');
    slides.eq(currentSlide).addClass('active');
    updateDots();
    startSlider();
  });


  /* === 2. 모달 팝업(상세보기) 창 기능 === */
  $('.slide').click(function() {
    const title = $(this).attr('data-title');
    const desc = $(this).attr('data-desc');
    const link = $(this).attr('data-link');

    $('#modal-title').text(title);
    $('#modal-desc').text(desc);
    $('#modal-link').attr('href', link);

    $('#info-modal').fadeIn(300).css('display', 'flex');
    clearInterval(slideInterval); 
  });

  // X 버튼(상세조회용)을 누르면 모달 닫기
  $('.close-btn').click(function() {
    $('#info-modal').fadeOut(300);
    startSlider();
  });


  /* === 3. 로그인 모달 활성화 및 모바일 메뉴 연동 기능 === */
  // 로그인 상단 버튼 클릭 이벤트
  $('#login-menu-btn').click(function(e) {
    e.preventDefault();
    
    // 모바일 버전 세 줄 체크박스가 열려있다면 자동으로 닫기 처리
    $('#nav-toggle').prop('checked', false);
    
    // 로그인 창 부드럽게 출력 및 슬라이더 타이머 정지
    $('#login-modal').fadeIn(300).css('display', 'flex');
    clearInterval(slideInterval);
  });

  // 로그인 모달 내부 X 버튼 클릭 이벤트
  $('.close-login-btn').click(function() {
    $('#login-modal').fadeOut(300);
    startSlider();
  });


  /* === 4. 모달창 통합 배경 공통 닫기 제어 === */
  // 검은색 투명 배경 레이어 스페이스를 클릭 시 일괄 종료
  $('.modal-overlay').click(function(e) {
    if (e.target === this) {
      $('#info-modal').fadeOut(300);
      $('#login-modal').fadeOut(300);
      startSlider(); 
    }
  });
  
  $('#modal-link').click(function() {
    $('#info-modal').fadeOut(300);
    startSlider();
  });

});