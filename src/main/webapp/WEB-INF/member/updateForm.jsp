<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../css/update.css">
</head>
<body>
<jsp:include page="../component/header.jsp" />
<form name="updateForm" id="updateForm">
	<input type="hidden" name="seq_member" value="${sessionScope.memDTO.seq_member }" />
	<div class="updatepage">
		<div class="updatepagebody">
			<div class="upadtecontainer">
				<div class="coment">
					<h1>
						프로필 수정
					</h1>
					<p>개인 정보는 비공개로 유지하세요. 여기에 추가한 정보는<br>
					회원님의 프로필을 볼 수 있는 모든 사람에게 표시됩니다.</p>
				</div>
				
				<div class="userprofilecoment">
					<a>사진</a>
				</div>
				<div class="userprofiledomain">
					<div class="userprofile" id="userprofile">	
						<c:choose>
		                  <c:when test="${memDTO.userProfile != null}">
		                     <img
		                        src="https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/${memDTO.userProfile}"
		                        alt="유저 프로필 이미지">
		                  </c:when>
		                  <c:otherwise>
		                     <img src="${memDTO.kakaoProfile}" alt="유저 카카오 프로필 이미지">
		                  </c:otherwise>
		               </c:choose>
					</div>
					<div class="profilebutton">
						<input type="button" id="change" value="변경" />
						<input type="file" name="img" id="profileUpdateBtn" style="display:none;"/>
						<input type="file" name="userProfileImg" id="userProfileImg" style="display:none;"/>
					</div>
				</div>
				
				<div class="namecomentdomain">
					<a>이름</a>
				</div>
				<div class="name">
				<input type="text" name="name" id="updatename" value="${sessionScope.memDTO.name}">
				</div>
				<div id="updatenameDiv" class="updatenameDiv"></div>
				
				<div class="idcomentdomain">
					<a>아이디</a>
				</div>
				<div class="id">
				<input type="text" name="id" id="updateid" size="30" value="${sessionScope.memDTO.id}" readonly>
				</div>
				
				<div class="pwdcomentdomain">
					<a>비밀번호</a>
				</div>
				<div class="pwd">
				<input type="password" name="password" id="updatepwd" size="40" placeholder="비밀번호 입력">
				</div>
				<div id="updatepwdDiv"></div>
				
				<div class="repwdcomentdomain">
					<a>재확인</a>
				</div>
				<div class="repwd">
				<input type="password" name="repwd" id="updaterepwd" size="40" placeholder="비밀번호 입력">
				</div>
				
				<div class="gendercomentdomain">
					<a>성별</a>
				</div>
				<div class="updategender">
				    <label>
				        <input type="radio" name="gender" value="0" />남자
				    </label>
				    <label>
				        <input type="radio" name="gender" value="1" />여자
				    </label>
				</div>
		
				<div class="emailcomentdomain">
				    <a>이메일</a>
				</div>
				<div class="updateemail">
				    <div class="input-container">
				        <input type="text" name="email1" id="updateemail1"value="${fn:split(sessionScope.memDTO.email, '@')[0]}">
				    </div>
				    @
				    <div class="input-container">
				        <input type="text" name="email2" id="updateemail2" value="${fn:split(sessionScope.memDTO.email, '@')[1]}">
				    </div>
				    <div class="input-container">
				        <input type="email" name="email3" id="updateemail3" list="email3_list" >        
				        <datalist id="email3_list">
				            <option value="직접입력"></option>
				            <option value="naver.com"/>
				            <option value="gmail.com"/>
				            <option value="daum.net"/>
				        </datalist>
				    </div>
				</div>
				<div id="updateemailDiv"></div>
				
				<div class="phonedomain">
					<a>휴대폰</a>
				</div>
				<div class="updatephone">
				    <div class="input-container">
				        <select name="tetel1" id="updatetel1">
				            <optgroup label="hp">
				                <option value="010">010</option>
				                <option value="011">011</option>
				                <option value="019">019</option>
				            </optgroup>
				        </select>
				    </div>
				    -
				    <div class="input-container">
				        <input type="text" name="tetel2" id="updatetel2" size="4" maxlength="4" value="${fn:split(sessionScope.memDTO.phoneNumber, '-')[1]}">
				    </div>
				    -
				    <div class="input-container">
				        <input type="text" name="tetel3" id="updatetel3" size="4" maxlength="4" value="${fn:split(sessionScope.memDTO.phoneNumber, '-')[2]}">
				    </div>
				</div>
				<div id="updatetelDiv"></div>
				
				<div class="addressdomain">
				    <a>주소</a>
				</div>
				<div class="updateaddress">
				    <div class="input-container">
				        <input type="text" name="zipcode" id="updatezipcode" readonly value="${sessionScope.memDTO.zipcode}">
				        <button type="button" onclick="checkPost(); return false;">우편번호 검색</button>
				    </div>
				    <br/>
				    <div class="input-container">
				        <input type="text" name="addr1" id="updateaddr1" readonly value="${fn:split(sessionScope.memDTO.address, ',')[0]}">
				    </div>
				    <br/>
				    <div class="input-container">
				        <input type="text" name="addr2" id="updateaddr2" value="${fn:split(sessionScope.memDTO.address, ',')[1]}">
				    </div>
				</div>
				<div id="updateaddrDiv"></div>
				
				<div class="commit">
					<div class="commit-container">
						<input type="button" value="회원정보수정" name="updatebutton" id="updatebutton" />
					</div>
					<div class="commit-container">
					<input type="reset" value="다시작성" onclick="location.reload()" />
					</div>
					<div class="commit-container">
						<input type="button" value="회원탈퇴" id="memberDelete" />
					</div>
				</div>
				<div class="bottom">
				</div>
			</div>
		</div>
	</div>	
</form>

<script type="text/javascript" src="http://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="../js/member/update.js"></script>
<script src="../js/member/delete.js"></script>
<script type="text/javascript">
window.onload = function(){
	document.updateForm.gender['${sessionScope.memDTO.gender}'].checked = true;
	document.updateForm.updatetel1.value = '${fn:split(sessionScope.memDTO.phoneNumber, '-')[0]}';
}
</script>
</body>
</html>
