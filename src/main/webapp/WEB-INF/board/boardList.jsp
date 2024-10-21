<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table border="1" frame="hsides" rules="rows">
		<tr align="center">
			<th width="150">번호</th>
			<th width="300">이미지</th>
		</tr>

		<c:if test="${requestScope.list != null }">
			<c:forEach var="boardDTO" items="${list }">
				<tr>
					<td align="center">${boardDTO.seq_board }</td>
					<td align="center"><a href="/Inbeomstagram/board/boardView.do?seq_board=${boardDTO.seq_board }" >
					<img src="https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/${ boardDTO.image }"
						width="300" height="300"/></a>
						<h2>${boardDTO.imageSubject }</h2>
						<p>${boardDTO.imageContent }</p>
				</tr>
			</c:forEach>
		</c:if>
	</table>
</body>
</html>