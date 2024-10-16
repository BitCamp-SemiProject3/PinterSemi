<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="../css/boardUpdateForm.css">
</head>
<body>
	<jsp:include page="../component/header.jsp" />
	<div id="headerEnd" style="width: 100%; height: 91px;"></div>
	<div class="container">
		<div class="card">
			<!-- 헤더 -->
			<div class="card-header">
				<h2>핀 수정 </h2>
				<span class="closeBtn">&times;</span>
			</div>
			<!-- 폼 시작 -->
			<form id="boardWriteForm" enctype="multipart/form-data">
				<input type="hidden" id="seq_board" name ="seq_board" value="${boardDTO.seq_board }">
				<div class="card-content">
					<!-- 이미지 업로드 -->
					<div id="imageDiv">
						<img src="https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/${boardDTO.imageFileName}" 
						style="width: 300px; height: 410px; border-radius: 8px; cursor: pointer;" 
						id="selectedImage" alt="이미지"/>
						<input type="hidden" id="imageFileName" name ="imageFileName" value="${boardDTO.imageFileName}">
					</div>
					<!-- 실제 파일 업로드 input을 숨겨두기 -->
					<input type="file" name="image" id="image" style="display:none;"/>

					<div class="form">
						<div class="form-group">
							<label>제목</label> 
							<input type="text" id="imageSubject" name="imageSubject" value="${boardDTO.imageSubject}"/>
							<div id="imageSubjectDiv"></div>
						</div>
						<div class="form-group">
							<label>내용</label>
							<textarea id="imageContent" name="imageContent">${boardDTO.imageContent}</textarea>
							<div id="imageContentDiv"></div>
						</div>
						<button type="submit" class="boardUpdateBtn">핀 수정</button>
					</div>
				</div>
			</form>
			<!-- 폼 끝 -->
		</div>
	</div>
	
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="../js/board/boardUpdate.js"></script>
</body>
</html>