$(document).ready(function() {
  
  /* === 1. 광고판 이미지 자동 슬라이더 기능 === */
  let currentSlide = 0;
  const slides = $('.slide');
  const totalSlides = slides.length;
  let slideInterval;

  // 다음 슬라이드로 넘어가는 함수
  function showNextSlide() {
    slides.removeClass('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides.eq(currentSlide).addClass('active');
  }

  // 이전 슬라이드로 돌아가는 함수
  function showPrevSlide() {
    slides.removeClass('active');
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides.eq(currentSlide).addClass('active');
  }

  // 4초(4000ms)마다 자동으로 다음 사진으로 넘기기
  function startSlider() {
    slideInterval = setInterval(showNextSlide, 4000);
  }
  
  startSlider(); // 사이트 열리면 자동 슬라이드 시작

  // 오른쪽 화살표 클릭 시 동작
  $('.next-btn').click(function(e) {
    e.stopPropagation(); // 모달 클릭과 겹쳐서 열리는 현상 방지
    clearInterval(slideInterval); // 누르면 자동 넘김 잠시 멈춤
    showNextSlide();
    startSlider(); // 다시 4초 카운트 시작
  });

  // 왼쪽 화살표 클릭 시 동작
  $('.prev-btn').click(function(e) {
    e.stopPropagation();
    clearInterval(slideInterval);
    showPrevSlide();
    startSlider();
  });


  /* === 2. 모달 팝업(상세보기) 창 기능 === */
  // 슬라이드 이미지를 클릭했을 때 모달 열기
  $('.slide').click(function() {
    // HTML에 미리 적어둔 글자(제목, 설명, 링크)를 가져오기
    const title = $(this).attr('data-title');
    const desc = $(this).attr('data-desc');
    const link = $(this).attr('data-link');

    // 모달창 뼈대 안에 가져온 글자들을 채워 넣기
    $('#modal-title').text(title);
    $('#modal-desc').text(desc);
    $('#modal-link').attr('href', link);

    // 모달창 부드럽게 띄우기 (제이쿼리 fadeIn 사용)
    $('#info-modal').fadeIn(300).css('display', 'flex');
    clearInterval(slideInterval); // 모달 창이 열리면 사진이 넘어가지 않게 슬라이드 멈춤
  });

  // X 버튼이나 바깥의 어두운 배경을 누르면 모달 닫기
  $('.close-btn, .modal-overlay').click(function(e) {
    // 사용자가 누른 곳이 모달 하얀 박스가 아니라 바깥쪽일 때만 닫기
    if (e.target === this) {
      $('#info-modal').fadeOut(300);
      startSlider(); // 창이 닫히면 다시 광고판 자동 슬라이드 시작
    }
  });
  
  // 모달 안의 '이동하기' 버튼을 눌렀을 때 모달 닫기
  $('#modal-link').click(function() {
    $('#info-modal').fadeOut(300);
    startSlider();
  });

});