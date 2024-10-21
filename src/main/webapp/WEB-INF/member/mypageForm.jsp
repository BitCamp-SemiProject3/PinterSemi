<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>InbeomStarGram</title>
<link rel="stylesheet" href="../css/mypage.css">
</head>
<body onload="onLoadmypage()">
<jsp:include page="../component/header.jsp" />
<form id="mypage">
	<div class="mypage">
		<div class="profile">
			<c:choose>
				<c:when test="${memDTO.userProfile != null}">
					<a href="/Inbeomstagram/member/updateForm" >
						<img src="https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/${memDTO.userProfile}"
					    	 alt="유저 프로필 이미지">
					</a>
				</c:when>
				<c:otherwise>
					<a href="/Inbeomstagram/member/updateForm" >
						<img src="${memDTO.kakaoProfile}" alt="유저 프로필 이미지">
					</a>
				</c:otherwise>
			</c:choose>
		</div>
		<div class="username">
			${memDTO.name }
		</div>
		<div class="userid">
			<div class="icondiv">
				<img src="../img/icon.jpg">
			</div>
			<div class="iddiv">
				${memDTO.id }
			</div>
		</div>
		<div class="update">
			<a href="/Inbeomstagram/member/updateForm"><input type="button" value="프로필 수정"/></a>
		</div>
		<div id="saveBtn">
			<div id="save" class="save">저장됨</div>
			<div id="saved" class="saved">생성됨</div>
		</div>
		<!-- 이미지 출력 -->
		<div id="boardbody">
        	<div id="board-list">
        		
        	</div>
        </div>
        <div id="cre-scrBtn"></div>
     </div>
</form>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    let seq_member = '${memDTO.seq_member}';
    let createPinButton = $("<button type='button'>").text("핀 만들기").addClass("create-pin-button");
    let scrapPinButton = $("<button type='button'>").text("핀 저장하기").addClass("scrap-pin-button");
    let buttons = $('#cre-scrBtn');
    // 초기 로딩 시 저장된 핀 가져오기
    loadSavedPins();

    // 저장됨 버튼 클릭 시
    $("#save").on("click", function() {
        loadSavedPins();
    });

    // 생성됨 버튼 클릭 시
    $("#saved").on("click", function() {
        loadCreatedPins();
    });

    function loadSavedPins() {
    	$('#saved').css('background-color','#ffffff');
    	$('#save').css('background-color','#dcdcdc');
        $.ajax({
            type: 'post',
            url: '/Inbeomstagram/boardScrap/getBoardScrap',
            data: { 'seq_member': seq_member },
            dataType: 'json',
            success: function(data) {
                let boardList = $("#board-list");
                let boardbody = $("#boardbody");
                boardList.empty();

                if (data.mypagelist && data.mypagelist.length > 0) {
                    data.mypagelist.forEach(function(item) {
                        let imageUrl = "https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/" + item.image;
                        let postUrl = "/Inbeomstagram/board/boardView?seq_board=" + item.seq_board;

                        let imgElement = $("<img>").attr("src", imageUrl).addClass("mypage-image");
                        let linkElement = $("<a>").attr("href", postUrl).append(imgElement);

                        boardList.append(linkElement);
                        createPinButton.remove();
                        buttons.append(scrapPinButton);
                        
                        scrapPinButton.on("click", function() {
                            window.location.href = "/Inbeomstagram/board/searchPage";
                        });
                    });
                } else {
                    boardList.append("<p class='no-data-message'>아직 저장된 핀이 없네요! 저장하고 싶은 핀들을 저장하세요!</p>");

                    createPinButton.remove();
                    scrapPinButton.on("click", function() {
                        window.location.href = "/Inbeomstagram/board/searchPage";
                    });

                    buttons.append(scrapPinButton);
                }
            },
            error: function(e) {
                console.log('실패 ', e);
            }
        });
    }

    function loadCreatedPins() {
    	$('#save').css('background-color','#ffffff');
    	$('#saved').css('background-color','#dcdcdc');
        $.ajax({
            type: 'post',
            url: '/Inbeomstagram/boardScrap/getMyBoard',
            data: { 'seq_member': seq_member },
            dataType: 'json',
            success: function(data) {
                let boardList = $("#board-list");
                let boardbody = $("#boardbody");
                boardList.empty();

                if (data.mypagelist && data.mypagelist.length > 0) {
                    data.mypagelist.forEach(function(item) {
                        let imageUrl = "https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/" + item.image;
                        let postUrl = "/Inbeomstagram/board/boardView?seq_board=" + item.seq_board;

                        let imgElement = $("<img>").attr("src", imageUrl).addClass("mypage-image");
                        let linkElement = $("<a>").attr("href", postUrl).append(imgElement);

                        boardList.append(linkElement);
                        scrapPinButton.remove();
                        buttons.append(createPinButton);
                        
                        createPinButton.on("click", function() {
                            window.location.href = "/Inbeomstagram/board/writeForm";
                        });
                    });
                } else {
                    boardList.append("<p class='no-data-message'>아직 만든 핀이 없네요! 저장하고 싶은 핀들을 만드세요!</p>");

                    scrapPinButton.remove();
                    createPinButton.on("click", function() {
                        window.location.href = "/Inbeomstagram/board/writeForm";
                    });

                    buttons.append(createPinButton);
                }
            },
            error: function(e) {
                console.log('실패 ', e);
            }
        });
    }
});
</script>
</body>
</html>