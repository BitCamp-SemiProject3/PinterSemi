<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>이미지 게시글 폼</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/boardView.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/subjectSearchPage.css">
</head>
<body onload="onLoadpage()">
	<jsp:include page="../component/header.jsp" />
	<div id="data" data-seq-board="${boardDTO.seq_board}"
		data-name="${sessionScope.memDTO.name}"
		data-board-name="${boardDTO.imageSubject}"
		data-image="${boardDTO.imageFileName }"></div>
	<div id="headerEnd" style="width: 100%; height: 91px;"></div>
	<div class="back" onclick="closePage()">
		<button type="button" id="backBtn">
			<img src="${pageContext.request.contextPath}/img/backBtn.png"
				alt="뒤로가기 버튼">
		</button>
	</div>
	<div id="main-content">
		<form id="container" method="POST"
			action="${pageContext.request.contextPath}/board/updateForm">
			<input type="hidden" id="name" name="name" value="${memDTO.name}">
			<input type="hidden" id="seq_board" name="seq_board"
				value="${boardDTO.seq_board }"> <input type="hidden"
				id="image" name="imageFileName" value="${boardDTO.imageFileName}"> <input
				type="hidden" id="imageSubject" name="imageSubject"
				value="${boardDTO.imageSubject}"> <input type="hidden"
				id="imageContent" name="imageContent"
				value="${boardDTO.imageContent}"> <input type="hidden"
				id="password" name="password" value="${memDTO.password}">
			<div id="image">
				<img
					src="https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/${boardDTO.imageFileName}" />
			</div>
			<div id="des">
				<!-- 제목 -->
				<div id="info">
					<svg xmlns="http://www.w3.org/2000/svg" id="likeIcon"
						viewBox="0 0 512 512">
					<path
							d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
					
					<p style="margin: 0;">${boardDTO.hit}</p>
					<!-- 나중에 수정해야 함 -->
					<span id="hitRate"> <svg xmlns="http://www.w3.org/2000/svg"
							id="hitIcon" viewBox="0 0 448 512">
						<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
					</span>
					<p style="margin: 0;">${boardDTO.hit}</p>
					<span id="share"> <input type="file" id="input-file"
						accept="image/*" style="display: none;"> <span id="share">
							<button type="button" id="shareBtn">
								<img src="${pageContext.request.contextPath}/img/share.png"
									alt="공유 버튼">
							</button>
					</span>
					</span>
					<div id="pin-buttons">
						<c:if test="${not empty memDTO.seq_member }">
							<c:if test="${memDTO.seq_member != boardDTO.seq_member }">
								<input type="button" id="scarpBtn" value="저장" />
							</c:if>
						</c:if>
						<c:if test="${memDTO.seq_member == boardDTO.seq_member}">
							<input type="submit" id="updateBtn" value="수정" />
							<input type="button" id="deleteBtn" value="삭제" />
						</c:if>
					</div>
				</div>
				<!-- 작성자 -->
				<div id="userName">
					<!-- 나중에 수정해야 함 -->
					<img src="${pageContext.request.contextPath}/img/imoji.png"
						alt="유저 프로필 이미지">
					<h4>작성자 : ${boardDTO.name }</h4>
				</div>
				<!-- 제목  -->
				<div id="subject">
					<h4>제목 : ${boardDTO.imageSubject }</h4>
				</div>
				<!-- 내용 -->
				<div id="content">
					<h5>내용</h5>
					<hr>
					<p>${boardDTO.imageContent }</p>
				</div>

				<!-- 댓글 영역 -->
				<div id="comment-box">
					<!-- 댓글 수 -->
					<div id="comment-num">댓글 2개</div>


					<!-- 댓글 내용 -->
					<div id="comment-list">
						<c:forEach var="comment" items="${commentList}">
							<input type="text" value="${memDTO.name }" />
							<div class="comment-content">

								<strong>${comment.name}</strong> : ${comment.commentContent}
								(${comment.logtime})
								<!-- 로그인한 사용자와 댓글 작성자가 같을 때만 버튼을 표시 -->
								<button class="options-btn" data-seq="${comment.seq_comment}">⋯</button>
							</div>
						</c:forEach>
					</div>


					<!-- 댓글 작성 -->
					<div id="comment-input" style="display: flex; align-items: center;">
						<div id="memberProfileImage">
							<img src="${pageContext.request.contextPath}/img/imoji.png"
								alt="유저 프로필 이미지">
						</div>
						<input type="text" id="commentContent" name="commentContent"
							style="padding-left: 10px;">

						<!-- 이모지 버튼 -->
						<button type="button" id="emoji_btn"
							style="background: none; border: none; padding: 0; cursor: pointer; order: 0;">
							<img src="${pageContext.request.contextPath}/img/imoji.png"
								alt="Emoji" style="height: 20px; width: 20px;">
						</button>

						<!-- 작성 버튼 -->
						<button type="button" id="commentBtn"
							style="background: none; border: none; padding: 0; cursor: pointer; display: none;">
							<img src="${pageContext.request.contextPath}/img/send.png"
								alt="Send" style="width: 20px; height: 20px;">
						</button>
					</div>

				</div>
			</div>
		</form>		
	</div>
	<div id="searchMore">
			<h4 style="text-align: center; margin-top:30px; color:black">더 찾아보기</h4>
			<section class="gallery" style="padding:2em 0;">
				<c:forEach var="boardDTO" items="${list}">
					<div class="grid-item">
						<a href="${pageContext.request.contextPath}/board/boardView?seq_board=${boardDTO.seq_board}">
							<img
							src="https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/${boardDTO.imageFileName}"
							alt="${boardDTO.imageSubject}" /> <span class="hit">${boardDTO.hit}</span>
						</a>
					</div>
				</c:forEach>				
			</section>
		</div>
	<script
		src="https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@3.0.3/dist/index.min.js"></script>
	<script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
		integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
		crossorigin="anonymous"></script>
	<script>
		// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해야 합니다.
		Kakao.init('{JavasriptAppKey}');
		// SDK 초기화 여부를 판단합니다.
		console.log(Kakao.isInitialized());		
	</script>	
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/board/boardView.js"></script>
	<script>
		function closePage() {
			window.history.back(); // 이전 페이지로 돌아가기
		}
	</script>
	<script>
		const contextPath = '${pageContext.request.contextPath}';
	</script>
	<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/searchPage/boardSearchPage.js"></script>
	<script src="${pageContext.request.contextPath}/js/board/boardScrap.js"></script>
</body>
</html>