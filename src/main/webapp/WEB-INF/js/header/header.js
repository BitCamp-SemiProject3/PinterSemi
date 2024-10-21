$('#searchKeyword').on('keydown', function(event) {
    if (event.key === 'Enter') {  // Enter 키가 눌렸을 때
        event.preventDefault();  // 기본 동작 방지 (Enter로 인한 폼 제출 방지)
        let keyword = $('#searchKeyword').val();

        // URL에 keyword를 쿼리 파라미터로 추가하여 페이지 이동
        location.href = '/Inbeomstagram/board/searchPage/subjectPage?keyword=' + encodeURIComponent(keyword);
    }
});

//카톡 아이디 여부로 join form 열기
$(document).ready(function() {
    const check = $('#check').val(); // 서버에서 아이디 존재 여부를 JSP에서 변수로 가져옴
    const userId = $('#userInfoId').val(); // 서버에서 id를 JSP에서 변수로 가져옴
    const userNickname = $('#userInfoNick').val(); // 서버에서 nickname을 JSP에서 변수로 가져옴
    const userEmail = $('#userInfoEmail').val(); // 서버에서 email을 JSP에서 변수로 가져옴
	
    // 아이디가 없고, check가 false일 경우에만 자동 입력 및 모달 열기
    if (check === 'false') { // check가 false일 경우에만 실행
    	$('#joinid').val(userEmail);
        $('#joinname').val(userNickname); // 닉네임으로 아이디 자동 입력
        $('#email1').val(userEmail.split('@')[0]); // 이메일의 @ 앞부분 자동 입력
        $('#email2').val(userEmail.split('@')[1]); // 이메일의 @ 뒷부분 자동 입력
		
		$('#joinid, #email1, #email2').prop('readonly', true);
		$('#check').val(userEmail);
		
        // 모달 열기
        $('#joinModal').modal('show'); // Bootstrap 모달 열기
    }
});