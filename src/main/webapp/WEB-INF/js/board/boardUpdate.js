$(document).ready(function() {
	// 이미지를 클릭하면 파일 선택 창 열기
	$('#selectedImage').on('click', function() {
		$('#image').click();
	});

	// 파일 선택 시 미리보기 이미지 업데이트
	$('#image').on('change', function(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function(e) {
				// 선택된 이미지 미리보기로 교체
				$('#selectedImage').attr('src', e.target.result);
			}
			reader.readAsDataURL(file); // 파일을 Data URL로 변환
		}
	});
});
// X 버튼시 인덱스로 이동
$('.closeBtn').click(function() {
	window.history.back();
});


// 이미지 게시글 작성
$('.boardUpdateBtn').click(function() {
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
			url: '/Inbeomstagram/board/update',
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