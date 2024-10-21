$(document).ready(function() {
    let currentPage = 1;  // 1페이지는 서버에서 로드됐으므로 2페이지부터 시작
    let loading = false;
    
    loadMoreData(0);

    // 스크롤 이벤트 감지
    $(window).scroll(function() {
        // 스크롤이 페이지 끝에 도달했을 때 추가 데이터 요청
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && !loading) {
            loading = true;
            loadMoreData(currentPage);  // 2페이지부터 데이터를 로드
        }
    });

    function loadMoreData(page) {
        $.ajax({
            url: '/Inbeomstagram/board/searchPage/loadpage',
            type: 'GET',
            data: { page: page },  // 페이지 번호 전달
            dataType: 'json',
            success: function(data) {
                if (data.length > 0) {
                    console.log(data);
                    renderData(data);
                    currentPage++;  // 데이터 로드 후 다음 페이지를 준비
                    loading = false;
                }else {
                    loading = false; // 데이터가 없으면 로딩 플래그 해제
                }
            },
            error: function() {
                console.log("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        });
    }

    function renderData(data) {
        const $gallery = $('.gallery');
        console.log("Rendering data:", data);

        data.forEach(function(boardDTO) {
            const seqBoard = boardDTO.seq_board;
            const image = boardDTO.imageFileName;
            const imageSubject = boardDTO.imageSubject;
            const hit = boardDTO.hit;

            const newItem = `
                <div class="grid-item">
                    <a href="/Inbeomstagram/board/boardView?seq_board=${seqBoard}">
                        <img src="https://kr.object.ncloudstorage.com/bitcamp-9th-pinter/storage/${image}" alt="${imageSubject}" />
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
                var rowHeight = parseInt($grid.css('grid-auto-rows'));
                var rowGap = parseInt($grid.css('grid-gap'));
                var rowSpan = Math.floor(($gridItem.find('img').outerHeight() + rowGap) / (rowHeight + rowGap));
                $gridItem.css('grid-row-end', 'span ' + rowSpan);
				console.log(rowHeight+" "+rowGap+" "+rowSpan)
            });
        });

        var $gallery = $('.gallery');
        imagesLoaded($gallery[0], function() {
            $('.grid-item').css('visibility', 'visible');
        });
    }

    // 초기 로드시 이미지 크기 조정
    $(window).on('load', resizeGridItems);
    $(window).on('resize', resizeGridItems);
});
