$(document).ready(function() {
  
  // 요소 선택
  const fileInput = $('#image-upload');
  const stepUpload = $('#step-upload');
  const stepScanning = $('#step-scanning');
  const stepResult = $('#step-result');
  const previewImage = $('#preview-image');
  const btnRetry = $('#btn-retry');

  // 1. 파일이 업로드 되었을 때 이벤트
  fileInput.on('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
      // FileReader를 사용해 업로드한 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImage.attr('src', e.target.result);
        
        // 1단계 숨기고 2단계(스캐닝) 보여주기
        stepUpload.removeClass('active').hide();
        stepScanning.addClass('active').fadeIn(400);

        // AI 분석 연출 (3.5초 뒤에 결과 화면으로 넘어가게 설정)
        setTimeout(function() {
          stepScanning.removeClass('active').hide();
          stepResult.addClass('active').fadeIn(500);
        }, 3500);
      };
      reader.readAsDataURL(file);
    }
  });

  // 2. 다시 하기 버튼 눌렀을 때 초기화
  btnRetry.click(function() {
    fileInput.val(''); // 입력된 파일 비우기
    stepResult.removeClass('active').hide();
    stepUpload.addClass('active').fadeIn(400);
  });

});