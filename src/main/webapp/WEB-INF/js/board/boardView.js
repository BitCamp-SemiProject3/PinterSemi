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

    // 댓글 수 업데이트 함수
    function updateCommentCount(count) {
        $('#comment-num').text('댓글 ' + count + '개');
    }
    
    $('#likeIcon').on('click', function() {
        const seqBoard = $('#data').data('seq-board');
        const seqMember = $('#seq_member').val(); // seq_member 가져오기
        const isActive = $(this).hasClass('active');    
        
        
        $.ajax({
            type: 'POST',
            url: '/Inbeomstagram/board/like',
            data: { seq_board: seqBoard, seq_member: seqMember }, 
            success: function(data) {
                if (data.status === 'success') {
                	if(data.liked) {
                		$('#likeIcon').toggleClass('active'); // 좋아요 상태 토글
                	}
                	else {
                		$('#likeIcon').removeClass('active'); // 좋아요 비활성화 시 active 클래스 제거
                	}
                    $('#likeCount').text(data.likeCount); // 좋아요 수 업데이트
                } else {
                    alert(data.message); // 실패 메시지 표시
                } 
            }.bind(this)
            ,

            error: function() {
                alert('좋아요 처리 중 오류가 발생했습니다.');
            }
        });
    });

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
                        location.href = '/Inbeomstagram/board/searchPage';  // 삭제 후 메인 페이지로 이동
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

    // 페이지 닫기 함수
    function closePage() {
        window.history.back(); // 이전 페이지로 돌아가기
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
            // 부모 댓글인 경우
            if (comment.parentCommentSeq === null) {
                let commentHtml = '<div class="comment-content" data-seq="' + comment.seq_comment + '">'
                    + '<strong>' + comment.name + ' : </strong>' + comment.commentContent + '<br>(' + comment.logtime + ')';

                if (comment.name === name) {
                    commentHtml += '<button class="options-btn" data-seq="' + comment.seq_comment + '">⋯</button>';
                }
                commentHtml += '<button class="reply-btn" data-seq="' + comment.seq_comment + '">답글 달기</button>'; // 대댓글 버튼 추가
                commentHtml += '</div>'; // 부모 댓글 div 닫기

                // 대댓글이 있는 경우
                if (comment.replies && comment.replies.length > 0) {
                    commentHtml += '<div class="reply-list">'; // 대댓글 목록을 위한 div
                    comment.replies.forEach(function(reply) {
                        commentHtml += '<div class="comment-content reply" data-seq="' + reply.seq_comment + '">'
                            + '<strong>' + reply.name + ' : </strong>' + reply.commentContent + '<br>(' + reply.logtime + ')';
                        if (reply.name === name) {
                            commentHtml += '<button class="options-btn" data-seq="' + reply.seq_comment + '">⋯</button>';
                        }
                        commentHtml += '</div>'; // 대댓글 div 닫기
                    });
                    commentHtml += '</div>'; // 대댓글 목록 div 닫기
                }

                $commentList.append(commentHtml); // 부모 댓글을 리스트에 추가
            }
        });

        updateCommentCount(commentList.length);
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
                url: '/Inbeomstagram/comment/delete',
                data: {
                    'seq_comment': seqComment
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
    
    // 댓글 수정 버튼
    $(document).on('click', '#edit-btn', function(event) {
        event.preventDefault();
        
        // 클릭된 댓글 영역
        var $commentContent = $(this).closest('.comment-content');  
        
        // seq_comment 가져오기
        var seqComment = $(this).data('seq');
        
        console.log("seq :", seqComment);
        
        // <span> 태그 안의 댓글 내용만 가져오기
        var currentComment = $commentContent.find('.comment_Content').text().trim();
        
        console.log("currentComment :", currentComment);
        
        var editHtml = 
        '<textarea id="edit-comment">' + currentComment + '</textarea>' +
        '<button id="save-edit-btn" data-seq="' + seqComment + '">저장</button>' +
        '<button id="cancel-edit-btn">취소</button>';
                
        // 기존 댓글 내용을 수정 창으로 교체
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
            url: '/Inbeomstagram/comment/update',
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
    
    
    // 댓글 클릭 시 대댓글 작성 영역 표시
    $(document).on('click', '.reply-btn', function(event) {
        event.preventDefault();
        const seqComment = $(this).data('seq');
        const $commentContent = $(this).closest('.comment-content'); // 클릭된 댓글 영역
        // 대댓글 입력 필드 추가
        const replyHtml = 
            '<div class="reply-content">' +
                '<input type="text" class="reply-input" placeholder="답글을 입력하세요">' +
                '<button class="reply-submit-btn" data-seq="' + seqComment + '">등록</button>' +
                '<input type="hidden" class="reply-name" value="' + name + '">' + // 작성자 이름 hidden input 추가
                '<button class="cancel-reply-btn">취소</button>' +
            '</div>';
        $(this).prop('disabled', true); 
        $(this).text('답글 작성 중...'); // 버튼 텍스트 변경        
        $(this).closest('.comment-content').append(replyHtml); // 해당 댓글 아래에 대댓글 입력란 추가
    });
    
    // 대댓글 등록 버튼 클릭 이벤트
    $(document).on('click', '.reply-submit-btn', function(event) {
        event.preventDefault();
        const parentSeqComment = $(this).data('seq');
        const replyContent = $(this).siblings('.reply-input').val().trim();
        const seqBoard = $('#data').data('seq-board');
        if (replyContent === '') {
            alert("답글 내용을 입력하세요.");
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/Inbeomstagram/comment/write',
            data: {
            	'seq_board': seqBoard,
                'commentContent': replyContent,
                'parentCommentSeq': parentSeqComment, // 부모 댓글 시퀀스 전송
                'name': name // 작성자 이름 추가
            },
            success: function(data) {
                if (data.status === "success") {
                    alert("답글 등록 완료");
                    onLoadpage(); // 댓글 목록 새로고침
                } else {
                    alert(data.message);
                }
            },
            error: function(e) {
                console.log("답글 작성 실패: ", e);
            }
        });
    });
     // 취소 버튼 클릭 이벤트
    $(document).on('click', '.cancel-reply-btn', function(event) {
        event.preventDefault();
        const $commentContent = $(this).closest('.comment-content');

        // 대댓글 입력 필드 제거
        $commentContent.find('.reply-content').remove();

        // 대댓글 버튼 다시 활성화
        const replyBtn = $commentContent.find('.reply-btn');
        replyBtn.prop('disabled', false);
        replyBtn.text('답글 달기'); // 버튼 텍스트 초기화
    });

    // 페이지 로드 시 실행
    onLoadpage();
});
function onLoadpage() {
    const seqBoard = $('#data').data('seq-board');
    const seqBoardAuthor = $('#data').data('board-author'); 
    const memberName = $('#data').data('name');
    const seqMember = $('#seq_member').val();
    
    // 작성자 프로필 가져오기
    $.ajax({
        type: 'POST',
        url: '/Inbeomstagram/board/getBoardMemberProfile',
        data: { 'seq_member': seqBoardAuthor },
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                // 이미지 src 속성을 응답 받은 profile로 설정
                $('#userName img').attr('src', response.profile);
            } else {
                console.log('프로필 이미지를 불러오는 데 실패했습니다.');
            }
        },
        error: function(e) {
            console.error('에러 발생:', e);
        }
    });
    
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
    
 // 댓글 트리를 생성하는 재귀 함수
    function buildCommentTree(comments, parentSeq = null) {
        const result = [];
        comments.forEach(function(comment) {
            if (comment.parentCommentSeq === parentSeq) {
                // 부모 댓글을 먼저 추가하고 그 아래에 대댓글을 추가
                const newComment = Object.assign({}, comment, {
                    replies: buildCommentTree(comments, comment.seq_comment) // 재귀적으로 대댓글 처리
                });
                result.push(newComment);
            }
        });
        return result;
    }
    
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString(); // 사용자의 로케일에 맞는 형식으로 변환
    } 
    // 댓글 로드
    $.ajax({
        type: 'POST',
        url: '/Inbeomstagram/comment/commentList',
        data: { seq_board: seqBoard },  // seq_board를 실제 값으로 설정
        success: function(commentList) {
            // 트리 구조로 댓글 재구성
            const commentTree = buildCommentTree(commentList);
            
               
            // 댓글 HTML 생성
            function renderComments(comments) {
                let commentHtml = '';
                comments.forEach(function(comment) {
                    commentHtml += '<div class="comment-content" data-seq="' + comment.seq_comment + '">'
                        + '<strong>' + comment.name + '</strong> : ' + comment.commentContent
                        + ' (' + formatDate(comment.logtime) + ')';
                    
                    if (memberName === comment.name) {
                        commentHtml += '<button class="options-btn" data-seq="' + comment.seq_comment + '">⋯</button>';
                    }

                    // 답글 달기 버튼 추가
                    commentHtml += '<button class="reply-btn" data-seq="' + comment.seq_comment + '">답글 달기</button>';
                    commentHtml += '</div>'; // 부모 댓글 div 닫기

                    // 대댓글이 있는 경우
                    if (comment.replies.length > 0) {
                        commentHtml += '<div class="reply-list" style="margin-left: 30px;">'; // 대댓글 들여쓰기
                        commentHtml += renderComments(comment.replies); // 재귀적으로 대댓글 추가
                        commentHtml += '</div>'; // 대댓글 목록 div 닫기
                    }
                });
                return commentHtml;
            }

            // 동적으로 comment-list에 삽입
            const commentHtml = renderComments(commentTree);
            $('#comment-list').html(commentHtml);
            $('#comment-num').text('댓글 ' + commentList.length + '개');
        },
        error: function() {
            alert('댓글을 불러오는 데 실패했습니다.');
        }
    });

    
    $.ajax({
        type: 'POST',
        url: '/Inbeomstagram/board/loadLikes',
        data: { seq_board: seqBoard, seq_member: seqMember },
        success: function(data) {
        	console.log('loadLikes'+data);
            if (data.status === "success") {
            	if(data.liked) {
            		$('#likeIcon').toggleClass('active'); // 좋아요 상태에 따라 토글
            	}else {
            		$('#likeIcon').remove('active'); // 좋아요 상태에 따라 토글
            	}                

                $('#likeCount').text(data.likeCount); // 좋아요 수 업데이트
            } else {
                alert(data.message);
            }
        }.bind(this),

        error: function() {
            alert('좋아요 정보를 불러오는 데 실패했습니다.');
        }
    });
}

