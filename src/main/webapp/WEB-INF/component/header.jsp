<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" href="/Inbeomstagram/css/header.css">
</head>
<header>
	<div class="logo">
		 <c:if test="${memDTO == null}">
			<a href="${pageContext.request.contextPath}/"> <!-- 홈으로 이동할 수 있는 로고 -->
		</c:if>
		<c:if test="${memDTO != null}">
			<a href="${pageContext.request.contextPath}/board/searchPage"> <!-- 홈으로 이동할 수 있는 로고 -->
		</c:if>
				<img alt="home으로 이동" src="/Inbeomstagram/img/logo.png" width="120"
				height="30">
			</a>
	</div>

	<!-- 검색할 수 있는 영역 (로그인 시 노출) -->
	<div class="search-area">
		<c:if test="${not empty sessionScope.memDTO}">
			<nav class="navigation">
				<ul>
					<li><a href="/Inbeomstagram/board/writeForm">핀 생성</a></li>
				</ul>
			</nav>
                <div class="search-box">
                    <img src="/Inbeomstagram/img/search.jpg" alt="serch">
                    <input type="text" name="searchKeyword" id="searchKeyword" placeholder="검색에 필요한 제목을 기입해주세요">
                </div>
		</c:if>
	</div>
	
	<!-- kakao 정보 -->
   	<input type="hidden" id="check" value="${ check }">
   	<input type="hidden" id="userInfoId" value="${ userInfo.id }">
   	<input type="hidden" id="userInfoNick" value="${ userInfo.nickname }">
   	<input type="hidden" id="userInfoEmail" value="${ userInfo.email }">
   	<input type="hidden" id="userInfoImg" value="${ userInfo.profile_image }">

	<div class="auth-buttons">
		<c:if test="${empty sessionScope.memDTO}">
			<a href="#" class="login" data-toggle="modal" data-target="#loginModal">로그인</a>
			<a href="#" class="signup" data-toggle="modal" data-target="#joinModal">가입하기</a>
		</c:if>
		<c:if test="${not empty sessionScope.memDTO}">
			<a
				href="/Inbeomstagram/member/mypageForm"
				class="info">내가 쓴 게시글</a>
			<a href="/Inbeomstagram/member/updateForm"
				class="info">${memDTO.name }님</a>
			<button onclick="logout()" class="logout">로그아웃</button>
			<img src="../img/avatardefault_92824.png" onclick="location.href='/Inbeomstagram/member/mypageForm'"/>
		</c:if>
	</div>	
</header>
<jsp:include page="../member/loginForm.jsp" />
<jsp:include page="../member/joinForm.jsp" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/member/login.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/member/logout.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/member/join.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/header/header.js"></script>
<script type="text/javascript">
	var seq_member = ${memDTO.seq_member};
</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/board/getBoardScrap.js"></script>