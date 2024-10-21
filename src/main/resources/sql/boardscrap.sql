CREATE TABLE boardscrap (
    seq_board INT NOT NULL,  -- 게시물 ID
    seq_member INT NOT NULL,                   -- 멤버 ID
    imageFileName VARCHAR(500) NOT NULL,       -- UUID로 저장된 이미지 파일 이름
    imageOriginalFileName VARCHAR(500) NOT NULL,  -- 원본 이미지 파일 이름
    name VARCHAR(100) NOT NULL,                -- 게시물 작성자
    imageSubject VARCHAR(100) NOT NULL,        -- 제목
    logtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 스크랩한 시간
	CONSTRAINT fk_boardscrap_member FOREIGN KEY (seq_member) 
    REFERENCES member(seq_member)   
    ON DELETE CASCADE,
    CONSTRAINT fk_boardscrap_board FOREIGN KEY (seq_board)
    REFERENCES board(seq_board)
    ON DELETE CASCADE
);