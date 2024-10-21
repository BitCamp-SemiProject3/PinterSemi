// 아이디와 비밀번호 검증 정규식
var idRegex = /^(?:(?:[a-zA-Z\d]{1,50})|(?:[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}))$/;
var pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,100}$/; // 비밀번호는 8자 이상
// 아이디 중복 체크
$('#joinid').focusout(function() {
    $('#idDiv').empty();
    var idValue = $('#joinid').val();
    
    if (idValue == '') {
        $('#idDiv').html('먼저 아이디 입력');
    } else if (!idRegex.test(idValue)) {
        $('#idDiv').html('아이디는 영문, 숫자 조합으로 50자 이내로 입력하세요.');
        return;
    } else {
        $.ajax({
            type: 'post',
            url: '/Inbeomstagram/member/checkId',
            data: 'id=' + idValue,
            dataType: 'text',
            success: function(data) {
                if (data.trim() == 'exist') {
                    $('#idDiv').html('이미 사용중인 아이디입니다.').css('color', 'red');
                } else {
                    $('#idDiv').html('사용 가능한 아이디입니다.').css('color', 'blue');
                    $('#check').val(idValue);
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
    }
});

function sendEmail() {
    var email1 = $('#email1').val();
    var email2 = $('#email2').val();
    var email = email1 + '@' + email2;

    if (email1 === '' || email2 === '') {
        alert("이메일을 정확하게 입력해주세요.");
        return;
    } else {
        $.ajax({
            type: 'post',
            url: '/Inbeomstagram/member/mailSend',
            data: { mail: email },
            success: function(response) {
                if (response.success) {
                    // 인증 버튼 숨기고 입력 필드와 확인 버튼 보여주기
                    $('#emailCheck').hide();
                    $('#emailDiv').html(`
                        <input type="text" id="userNumber" placeholder="인증번호 입력">
                        <input type="button" value="확인하기" class="btn btn-primary" id="verifyEmail">
                    `);
                    $('#emailCheckDiv').val(response.number); // 응답으로 받은 인증번호 저장
                } else {
                    alert("이메일 전송 실패: " + response.error);
                }
            },
            error: function(e) {
                console.log(e);
                alert("이메일 전송 중 오류가 발생했습니다.");
            }
        });
    }
}

// 이메일 입력값이 바뀔 때마다 인증 UI 초기화
$('#email1, #email2, #email3').on('input', function() {
    // 이메일 입력 필드 초기화
    $('#emailCheck').show();
    $('#emailDiv').html('');
    $('#emailCheckDiv').val('');
});

//이메일 인증 상태 변수
var isEmailVerified = false;

// 이메일 인증 확인 함수
$(document).on('click', '#verifyEmail', function() {
    let userNumber = $('#userNumber').val();

    $.ajax({
        type: 'get',
        url: '/Inbeomstagram/member/mailCheck',
        data: { userNumber: userNumber},
        success: function(isMatch) {
            if (isMatch) {
                alert("인증번호가 일치합니다.");
                $('#email1, #email2, #email3').prop('readonly', true);
                $('#emailCheck').hide();
                $('#emailDiv').html('확인되었습니다');
                $('#emailDiv').css('color', 'blue');
                isEmailVerified = true;
            } else {
                alert("인증번호가 일치하지 않습니다.");
                $('#userNumber').val('');
                return;
            }
        },
        error: function(e) {
            console.log(e);
            alert("인증 확인 중 오류가 발생했습니다.");
        }
    });
});

// 버튼 클릭 시 이메일 전송
$('#emailCheck').on('click', sendEmail);

//다시 입력 클릭 시 다시 인증
$('#reset').on('click', function(){
	$("#nameDiv, #idDiv, #pwdDiv, #emailDiv, #telDiv, #addrDiv").empty(); // 모든 오류 메시지 초기화
	$('#email1, #email2, #email3').prop('readonly', false);
	$('#emailCheck').show();
    $('#emailCheckDiv').val('');
});

// 비밀번호 검증
$('#password').focusout(function() {
    var pwdValue = $('#password').val(); // 비밀번호 입력 필드의 ID를 확인
    $('#pwdDiv').empty(); // 오류 메시지를 초기화

    if (!pwdRegex.test(pwdValue)) {
        $('#pwdDiv').html('비밀번호는 영문, 숫자, 특수문자 포함 8자 이상, 100자 이내로 입력하세요.').css('color', 'red');
    } else {
        $('#pwdDiv').html('사용 가능한 비밀번호입니다.').css('color', 'blue');
    }
});

//이메일
$('#email3').on('input', function() {
	let selectedValue = $(this).val(); // 선택된 값 가져오기
	if (selectedValue !== '직접입력') { // '직접입력'이 아닌 경우에만 동작
	    $('#email2').val(selectedValue); // email2 필드에 값 입력
	    $('#email2').prop('readonly', true); // email2 필드를 읽기 전용으로 설정
	} else {
	    $('#email2').val(''); // email2 필드를 비우기
	    $('#email2').prop('readonly', false); // email2 필드의 읽기 전용 해제
	}
});

$('#email3').on('click', function() {
	$('#email3').val('');
});

// 회원가입
function checkJoin() {
    $("#nameDiv, #idDiv, #pwdDiv, #emailDiv, #telDiv, #addrDiv").empty(); // 모든 오류 메시지 초기화
	
    var name = $("#joinname").val();
    var idValue = $("#joinid").val();
    var pwdValue = $("#joinpassword").val();
    var repwdValue = $("#repwd").val();
    var email1 = $("#email1").val();
    var email2 = $("#email2").val();
    var tel2 = $("input[name='tel2']").val();
    var tel3 = $("input[name='tel3']").val();
    var zipcode = $("#zipcode").val();
    var addr1 = $("#addr1").val();
    var addr2 = $("#addr2").val();
    // 이름 확인
    if (!name) {
        $("#nameDiv").text("이름을 입력하세요.").focus();
        $("#joinname").focus(); 
        return;
    }

    // 아이디 확인
    if (!idValue) {
        $("#idDiv").text("아이디를 입력하세요.");
        $("#id").focus(); 
        return;
    } else if (!idRegex.test(idValue)) {
        $("#idDiv").text("아이디는 영문, 숫자 조합으로 50자 이내로 입력하세요.");
        $("#id").focus(); 
        return;
    }

    // 비밀번호 확인
    if (!pwdValue) {
        $("#pwdDiv").text("비밀번호를 입력하세요.");
        $("#joinpassword").focus(); 
        return;
    } else if (!pwdRegex.test(pwdValue)) {
        $("#pwdDiv").text("비밀번호는 영문, 숫자, 특수문자 포함 8자 이상, 100자 이내로 입력하세요.");
        $("#joinpassword").focus(); 
        return;
    }

    // 비밀번호 재확인
    if (pwdValue !== repwdValue) {
        $("#pwdDiv").text("비밀번호가 맞지 않습니다.");
        return;
    }

    // 아이디 중복 체크 여부 확인
    if (idValue !== $("#check").val()) {
        $("#idDiv").text("중복체크를 하세요.");
        $("#joinid").focus(); 
        return;
    }

    // 이메일 확인
    if (!email1 || !email2) {
        $("#emailDiv").text("이메일을 입력하세요.");
        $("input[name='email1']").focus(); 
        return;
    }

    // 이메일 인증 여부 확인
    if (!isEmailVerified) {
        $("#emailDiv").text("이메일 인증을 완료해주세요.");
        return;
    }

    // 전화번호 확인
    if (!tel2 || !tel3) {
        $("#telDiv").text("휴대전화 번호를 정확히 입력하세요.");
        $("input[name='tel2']").focus(); 
        return;
    }

    // 주소 확인
    if (!zipcode || !addr1 || !addr2) {
        $("#addrDiv").text("주소를 모두 입력하세요.");
        $("#zipcode").focus(); 
        return;
    }

    // 모든 조건이 통과하면 서버로 데이터 전송
    $.ajax({
        type: 'post',
        url: '/Inbeomstagram/member/join',
        data: $('#joinForm').serialize(),
        success: function() {
            alert('회원가입을 축하합니다.');
            location.href = '/Inbeomstagram/';
        },
        error: function(e) {
            console.log(e);
        }
    });
}

//우편번호 - Daum API
function checkPost() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('zipcode').value = data.zonecode;
            document.getElementById("addr1").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("addr2").focus();
        }
    }).open();
}

// 카톡 회원가입 정보는 header.js에 있음

