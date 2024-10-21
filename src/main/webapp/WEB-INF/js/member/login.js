function handleLogin(event) {
    event.preventDefault(); // 기본 폼 제출 이벤트 방지
    $('#loginIdDiv').empty();
    $('#loginPwdDiv').empty();

    if($('#loginId').val() == ''){
		$('#loginIdDiv').html('아이디 입력');
		document.getElementById("id").focus();
	}        
    else if($('#loginPassword').val() == ''){
		$('#loginPwdDiv').html('비밀번호 입력');
		document.getElementById("loginPwdDiv").focus();	
	}
    else
        $.ajax({
            type: 'post',
            url: '/Inbeomstagram/member/login',  // URL은 pageContext가 없으므로 절대 경로로 변경
            data: {
                'id': $('#loginId').val(),
                'password': $('#loginPassword').val()
            },
            dataType: 'text',
            success: function(data){
                if(data.trim() == 'fail'){
                    $('#loginResult').html('아이디 또는 비밀번호가 틀렸습니다.');
                    $('#loginResult').css('font-size', '12pt');
                    $('#loginResult').css('padding', '10px');
                } else {
                    location.href = '/Inbeomstagram/board/searchPage';
                }
            },
            error: function(e){
                console.log(e);
            }
        });
}
