<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>InbeomStarGram</title>
</head>
<body>
    <jsp:include page="component/header.jsp" />
    <c:choose>
        <c:when test="${memDTO == null}">
            <jsp:include page="mainPage/mainPage.jsp" />
        </c:when>
    </c:choose>
    
</body>
</html>