CREATE TABLE CommentTable (
    seq_comment INT AUTO_INCREMENT PRIMARY KEY,  -- 댓글 ID
    seq_board INT NOT NULL,  -- 연관된 게시물 ID (외래키)
    name VARCHAR(50) NOT NULL,  -- 댓글 작성자
    commentContent VARCHAR(1000) NOT NULL,  -- 댓글 내용
    logtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 댓글 작성 시간
    parentCommentSeq INT DEFAULT NULL,  -- 부모 댓글 ID (대댓글일 경우 해당 값)
    CONSTRAINT fk_comment_board
        FOREIGN KEY (seq_board)
        REFERENCES board(seq_board)
        ON DELETE CASCADE,  -- 게시물 삭제 시 댓글도 삭제
    CONSTRAINT fk_parent_comment
        FOREIGN KEY (parentCommentSeq)
        REFERENCES CommentTable(seq_comment)  -- 부모 댓글이 삭제되면 대댓글도 삭제
        ON DELETE CASCADE
);
