<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="modal fade" id="joinModal" tabindex="-1" role="dialog"
	aria-labelledby="joinModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="joinModalLabel">회원가입</h5>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="joinForm">
					<input type="hidden" id="kakaoProfile" name="kakaoProfile" value="${userInfo.profile_image}">
					<input type="hidden" id="kakaoCheck" name="kakaoCheck" value="${kakaoCheck}">
					<div class="form-group">
						<label for="joinname">이름</label> <input type="text"
							class="form-control" id="joinname" name="joinname" placeholder="이름 입력">
						<div id="nameDiv" style="color: red;"></div>
					</div>
					<div class="form-group">
						<label for="joinid">아이디</label> <input type="text"
							class="form-control" id="joinid" name="joinid" placeholder="아이디 입력">
						<input type="hidden" id="check" value="">
						<div id="idDiv" style="color: red;"></div>
					</div>
					<div class="form-group">
						<label for="joinpassword">비밀번호</label> <input type="password"
							class="form-control" id="joinpassword" name="joinpassword"
							placeholder="비밀번호 입력">
						<div id="pwdDiv" style="color: red;"></div>
					</div>
					<div class="form-group">
						<label for="repwd">비밀번호 확인</label> <input type="password"
							class="form-control" id="repwd" placeholder="비밀번호 입력">
					</div>
					<div class="form-group">
						<label for="gender">성별</label><br>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="gender"
								id="genderMale" value="0" checked="checked"> <label
								class="form-check-label" for="genderMale">남자</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="gender"
								id="genderFemale" value="1"> <label
								class="form-check-label" for="genderFemale">여자</label>
						</div>
					</div>
					<div class="form-group">
					    <label for="email">이메일</label><br> 
					    <input type="text" name="email1" id="email1"> @ <input type="text" name="email2" id="email2">
					    <input type="email" name="email3" id="email3" list="email3_list" >
					    <datalist id="email3_list">
					        <option value="직접입력">
					        <option value="naver.com">
					        <option value="gmail.com">
					        <option value="hanmail.com">
					    </datalist>
					    <div id="emailDiv"></div>
					    <input type="button" value="인증하기" class="btn btn-primary" id="emailCheck">
					    <input type="hidden" value="" id="emailCheckDiv">
					</div>
					<div class="form-group">
						<label for="phoneNumber">휴대전화</label> <select name="tel1">
							<optgroup label="hp">
								<option value="010">010</option>
								<option value="011">011</option>
								<option value="019">019</option>
							</optgroup>
						</select> - <input type="text" name="tel2" size="4" maxlength="4">
						- <input type="text" name="tel3" size="4" maxlength="4">
						<div id="telDiv"></div>
					</div>
					<div class="form-group">
						<label for="address">주소
						</label><br> <input type="text" name="zipcode" id="zipcode" size="6" readonly
							placeholder="우편번호">
						<button id="zipButton" type="button" onclick="checkPost(); return false;">우편번호
							검색</button>
						<br /> <input type="text" name="addr1" class="address-input1" id="addr1" size="60"
							readonly placeholder="주소"><br/> 
							<input type="text"
							name="addr2" id="addr2"  class="address-input2" size="60" placeholder="상세주소">
						<div id="addrDiv"></div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" onclick="checkJoin()">회원가입</button>
						<button type="reset" id="reset" class="btn btn-secondary">다시작성</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
