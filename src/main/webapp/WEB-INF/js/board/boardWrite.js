$(document).ready(function() {

   $('#image').on('change', function(event) {
      const file = event.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = function(e) {
            // 이미지 업로드 부분을 숨기고 선택한 이미지를 표시
            $('.image-upload').hide(); // "이미지 업로드" 부분 숨기기
            $('#imageDiv').html('<img src="' + e.target.result + '" alt="Selected Image" style="width: 300px; height: 410px; border-radius: 8px; cursor: pointer;"/>');

            // 클릭하면 파일 입력 필드를 다시 열기
            $('#imageDiv img').on('click', function() {
               $('#image').click(); // 파일 입력 필드 클릭
            });
         }
         reader.readAsDataURL(file); // 선택한 파일을 Data URL로 변환
      }
   });
});

// X 버튼시 인덱스로 이동
$('.closeBtn').click(function() {

    window.history.back(); // 이전 페이지로 이동
});

// 이미지 게시글 작성
$('.boardWriteBtn').click(function() {
   event.preventDefault();

   $('#imageSubjectDiv').empty();
   $('#imageContentDiv').empty();

   if ($('#imageSubject').val() == '') {
      $('#imageSubjectDiv').html('제목을 입력해주세요').css('color', 'red');
      $('#imageSubject').focus();
   } else if ($('#imageContent').val() == '') {
      $('#imageContentDiv').html('내용을 입력해주세요').css('color', 'red');
      $('#imageContent').focus();
   } else {
      let formData = new FormData($('#boardWriteForm')[0]);

      $.ajax({
         type: 'post',
         enctype: 'multipart/form-data',
         processData: false,
         contentType: false,
         url: '/Inbeomstagram/board/write',
         data: formData,
         success: function() {
            alert('이미지 등록 완료');
            location.href = '/Inbeomstagram/board/searchPage';
         },
         error: function(e) {
            console.log(e);
         }
      });
   }
});