<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>InbeomStarGram</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/searchPage.css">
</head>
<body>
	<c:choose>
		<c:when test="${memDTO == null}">
			<c:redirect url="/" />
		</c:when>
		<c:otherwise>
			<jsp:include page="../component/header.jsp" />
			<section class="gallery">
				<c:forEach var="boardDTO" items="${list}">
					<div class="grid-item">
						<a href="/Inbeomstagram/board/boardView?seq_board=${boardDTO.seq_board}">
							<img
							src="https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/${boardDTO.imageFileName}"
							alt="${boardDTO.imageSubject}" /> <span class="hit">${boardDTO.hit}</span>
						</a>
					</div>
				</c:forEach>
			</section>
		</c:otherwise>
	</c:choose>
	<script type="text/javascript" src="http://code.jquery.com/jquery-3.7.1.min.js"></script>
	<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
	<script>
		const contextPath = '${pageContext.request.contextPath}';
	</script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/searchPage/searchPage.js"></script>
</body>
</html>
