$(document).ready(function() {
    const picker = new EmojiButton({
        position: 'bottom-start'
    });

    // 이모지 버튼 클릭 시 토글
    $('#emoji_btn').on('click', function() {
        picker.togglePicker(this);
    });

    // 이모지 선택 시 댓글 입력란에 추가
    picker.on('emoji', function(emoji) {
        const $textBox = $('#commentContent');
        $textBox.val($textBox.val() + emoji);
        $textBox.focus(); // 입력란 포커스 유지
    });

    // 좋아요 버튼 클릭 시 토글
    $('#likeIcon').on('click', function() {
        $(this).toggleClass('active');
    });

    // 댓글 수 업데이트 함수
    function updateCommentCount(count) {
        $('#comment-num').text('댓글 ' + count + '개');
    }

    // 삭제 버튼 클릭 이벤트
 // 삭제 버튼 클릭 이벤트
    $('#deleteBtn').on('click', function() {
        const confirmation = confirm("정말 삭제하시겠습니까?");
        
        if (confirmation) {
            let seq_board = $('#seq_board').val();  // 게시글 번호 가져오기

            $.ajax({
                type: 'POST',
                url: '/Inbeomstagram/board/delete',  // 서버의 삭제 요청 URL
                data: { seq_board: seq_board },  // 게시글 번호 전송
                success: function(response) {
                    if (response.status === 'success') {
                        alert(response.message);  // 성공 메시지 표시
                        location.href = '/Inbeomstagram/';  // 삭제 후 메인 페이지로 이동
                    } else {
                        alert('삭제 실패: ' + response.message);  // 오류 메시지 표시
                    }
                },
                error: function(error) {
                    console.log('Error:', error);  // 오류 발생 시 콘솔 출력
                    alert('삭제 중 오류가 발생했습니다.');
                }
            });
        } else {
            console.log("삭제가 취소되었습니다.");  // 삭제 취소 시 로그 출력
        }
    });


    // 페이지 로드 시 실행되는 함수
    function onLoadpage() {
        const seqBoard = $('#data').data('seq-board');

        // 조회수 증가
        $.ajax({
            type: 'POST',
            url: '/Inbeomstagram/comment/hitUpdate',
            data: { 'seq_board': seqBoard },
            dataType: 'json',
            success: function(response) {
                console.log('조회수 증가 성공: ', response);
            },
            error: function(e) {
                console.log("조회수 증가 AJAX 실패: ", e);
            }
        });

        // 댓글 로드
        $.ajax({
            type: 'POST',
            url: '/Inbeomstagram/comment/commentList',
            data: { seq_board: seqBoard },  // seq_board를 실제 값으로 설정
            success: function(commentList) {
                var commentHtml = '';
                
                // 받은 댓글 데이터를 기반으로 HTML 생성
                commentList.forEach(function(comment) {
                    commentHtml += '<div class="comment-content">'
                                 + '<strong>' + comment.name + '</strong> : ' + comment.commentContent
                                 + ' (' + comment.logtime + ')'
                                 + '<button class="options-btn" data-seq="' + comment.seq_comment + '">⋯</button>'
                                 + '</div>';
                });
                
                // 동적으로 comment-list에 삽입
                $('#comment-list').html(commentHtml);
            },
            error: function() {
                alert('댓글을 불러오는 데 실패했습니다.');
            }
        });
    }

    // 페이지 닫기 함수
    function closePage() {
        window.history.back(); // 이전 페이지로 돌아가기
    }
	
	// 카카오톡 공유 버튼 클릭 이벤트
	function uploadImage(imageUrl) {
	    // 카카오톡 API URL
	    var apiUrl = "https://kapi.kakao.com/v2/api/talk/message/image/upload";

	    // 카카오톡 액세스 토큰
	    var accessToken = "YOUR_ACCESS_TOKEN";

	    // 이미지 URL을 Blob으로 변환하는 함수
	    fetch(imageUrl)
	        .then(response => response.blob())
	        .then(blob => {
	            var formData = new FormData();
	            formData.append('file', blob, 'image.jpg'); // 이미지 파일명은 'image.jpg'로 설정

	            // AJAX 요청으로 카카오톡 API에 업로드
	            $.ajax({
	                url: apiUrl,
	                type: 'POST',
	                headers: {
	                    Authorization: 'Bearer ' + accessToken
	                },
	                data: formData,
	                processData: false, // FormData를 처리하지 않음
	                contentType: false, // 기본 설정
	                success: function(response) {
	                    console.log('Image uploaded successfully:', response);
	                },
	                error: function(jqXHR, textStatus, errorThrown) {
	                    console.error('Error uploading image:', textStatus, errorThrown);
	                }
	            });
	        })
	        .catch(error => {
	            console.error('Error converting image to Blob:', error);
	        });
	}

	// 버튼 클릭 시 이미지 업로드
	$('#shareBtn').on("click", function() {
	    var imageUrl = $('#data').data('image'); // 이미지 URL을 가져옴
	    uploadImage(imageUrl); // 이미지를 업로드하는 함수 호출
	});
	
	
    // 댓글 작성 이벤트 처리
    const seqBoard = $('#data').data('seq-board');
    const name = $('#data').data('name');

    $('#commentContent').on('input', function() {
        if ($(this).val().trim() !== '') {
            $('#commentBtn').show();
        } else {
            $('#commentBtn').hide();
        }
    });

    $('#commentBtn').on('click', function(event) {
        event.preventDefault();
        if ($('#commentContent').val() === '') {
            $('#commentDiv').text('작성하실 댓글을 입력하세요').css('color', 'red');
        } else {
            $.ajax({
                type: 'POST',
                url: '/Inbeomstagram/comment/write',
                data: {
                    'commentContent': $('#commentContent').val(),
                    'name': name,
                    'seq_board': seqBoard
                },
                dataType: 'json',
                success: function(data) {
                	if (data.status === "success") {
                        alert("댓글 등록 완료");
                        $('#commentContent').val(''); // 입력 필드 초기화
                        updateCommentList(data.commentList); // 댓글 목록 업데이트
                        updateCommentCount(data.commentList.length); // 댓글 수 업데이트
                    } else {
                        alert(data.message); // 실패 메시지 표시
                    }
                },
                error: function(e) {
                    console.log("댓글 작성 실패: ", e);
                }
            });
        }
    });

    // 댓글 리스트 업데이트 함수
    function updateCommentList(commentList) {
        const name = $('#data').data('name');
        const $commentList = $('#comment-list');
        $commentList.empty();

        commentList.forEach(function(comment) {
            let commentHtml = '<div id="comment-content"><strong>' + comment.name + ' : </strong>' + comment.commentContent + '<br>(' + comment.logtime + ')';

            if (comment.name === name) {
                commentHtml += '<button class="options-btn" data-seq="' + comment.seq_comment + '">⋯</button>';
            }

            commentHtml += '</div>';
            $commentList.append(commentHtml);
        });

        updateCommentCount(commentList.length);

        if (commentList.length > 4) {
            $commentList.css('overflow-y', 'scroll');
        } else {
            $commentList.css('overflow-y', 'visible');
        }
    }

    // 수정/삭제 옵션 버튼 클릭 이벤트
    $(document).on('click', '.options-btn', function(event) {
        event.preventDefault();
        const $commentContent = $(this).parent();
        const seqComment = $(this).data('seq');
        const $editDeleteDiv = $commentContent.find('.edit-delete');

        if ($editDeleteDiv.length > 0) {
            $editDeleteDiv.slideToggle(200);
        } else {
            const editDeleteHtml = '<div class="edit-delete" style="margin-top: 5px; display: none;">' +
                '<input type="button" id="edit-btn" class="edit-btn" data-seq="' + seqComment + '" value="수정">' +
                '<input type="button" class="delete-btn" data-seq="' + seqComment + '" value="삭제">' +
                '</div>';

            $commentContent.append(editDeleteHtml);
            $commentContent.find('.edit-delete').slideDown(200);
        }
    });

    // 댓글 삭제 버튼 이벤트
    $(document).on('click', '.delete-btn', function(event) {
        event.preventDefault();
        const seqComment = $(this).data('seq');
        const seqBoard = $('#seq_board').val();
        const confirmation = confirm("댓글을 삭제할까요?");
        
        if (confirmation) {
            $.ajax({
                type: 'POST',
                url: '/Inbeomstagram/comment/commentDelete.do',
                data: {
                    'seq_comment': seqComment,
                    'seq_board': seqBoard
                },
                success: function() {
                    alert("댓글이 삭제되었습니다.");
                    onLoadpage();
                },
                error: function(error) {
                    console.log("댓글 삭제 실패: ", error);
                }
            });
        } else {
            console.log("삭제가 취소되었습니다.");
        }
    });

    // 댓글 수정 버튼 이벤트
    $(document).on('click', '#edit-btn', function(event) {
        event.preventDefault();

        const $commentContent = $(this).closest('#comment-content');
        const seqComment = $(this).data('seq');

        const currentComment = $commentContent.clone()
            .children().remove().end()
            .text().trim()
            .replace(/\s*\([^)]*\)\s*$/, '').trim();

        const editHtml = '<textarea id="edit-comment">' + currentComment + '</textarea>' +
            '<button id="save-edit-btn" data-seq="' + seqComment + '">저장</button>' +
            '<button id="cancel-edit-btn">취소</button>';

        $commentContent.html(editHtml);
    });

    // 댓글 수정 저장 버튼 이벤트
    $(document).on('click', '#save-edit-btn', function(event) {
        event.preventDefault();

        const seqComment = $(this).data('seq');
        const updatedComment = $('#edit-comment').val();
        const seqBoard = $('#seq_board').val();

        $.ajax({
            type: 'POST',
            url: '/Inbeomstagram/comment/commentUpdate.do',
            data: {
                'seq_comment': seqComment,
                'seq_board': seqBoard,
                'commentContent': updatedComment
            },
            success: function() {
                alert("댓글이 수정되었습니다.");
                onLoadpage();
            },
            error: function(error) {
                console.log("댓글 수정 실패: ", error);
            }
        });
    });

    // 수정 취소 버튼 이벤트
    $(document).on('click', '#cancel-edit-btn', function(event) {
        event.preventDefault();
        onLoadpage();
    });

    // 페이지 로드 시 실행
    onLoadpage();
});
