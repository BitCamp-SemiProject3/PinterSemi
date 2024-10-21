$(document).ready(function() {
	let currentPage = 1;
	let loading = false;
	let keyword = new URLSearchParams(window.location.search).get('keyword'); // URL에서 키워드 가져오기
	
	loadMoreData(currentPage, keyword);

	// 스크롤 이벤트 감지
	$(window).scroll(function() {
		// 스크롤이 페이지 끝에 도달했을 때 추가 데이터 요청
		if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && !loading) {
			loading = true;
			loadMoreData(currentPage, keyword);
		}
	});

	function loadMoreData(page, keyword) {
		$.ajax({
			url: '/Inbeomstagram/board/searchingPage/loadpage',
			type: 'GET',
			data: { page: page, keyword: keyword },  // 페이지 번호와 키워드 전달
			dataType: 'json',
			success: function(data) {
				if (data.length > 0) {
					renderData(data);
					currentPage++;  // 데이터 로드 후 다음 페이지를 준비
					loading = false;
				}
			},
			error: function() {
				console.log("데이터를 불러오는 중 오류가 발생했습니다.");
			}
		});
	}

	function renderData(data) {
		const $gallery = $('.gallery');

		data.forEach(function(boardDTO) {
			const seqBoard = boardDTO.seq_board;
			const image = boardDTO.image;
			const imageSubject = boardDTO.imageSubject;
			const hit = boardDTO.hit;

			const newItem = `
		            <div class="grid-item">
		                <a href="${contextPath}/board/boardView?seq_board=${seqBoard}">
		                    <img src="${contextPath}/storage/${image}" alt="${imageSubject}" />
		                    <span class="hit">${hit}</span>
		                </a>
		            </div>`;

			$gallery.append(newItem);
		});

		resizeGridItems();
	}

	function resizeGridItems() {
		$('.grid-item').each(function() {
			var $gridItem = $(this);
			imagesLoaded(this, function() {
				var $grid = $('.gallery');
				var rowHeight = parseInt($grid.css('grid-auto-rows')) || 0;
				var rowGap = parseInt($grid.css('grid-gap'));
				var rowSpan = Math.floor(($gridItem.find('img').outerHeight() + rowGap) / (rowHeight + rowGap));
				console.log(rowHeight+" "+rowGap+" "+rowSpan)
				$gridItem.css('grid-row-end', 'span ' + rowSpan);
			});	
		});

		var $gallery = $('.gallery');
		imagesLoaded($gallery[0], function() {
			$('.grid-item').css('visibility', 'visible');
		});
	}

	$(window).on('load', resizeGridItems);
	$(window).on('resize', resizeGridItems);

});




