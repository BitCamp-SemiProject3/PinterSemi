package com.comment.bean;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private long seq_comment;
    private long seq_board; // 보드 시퀀스
    private String name; // 작성자 이름
    private String commentContent;
    private Date logtime;
    private Long parentCommentSeq; // 부모 댓글 시퀀스 (null일 경우 일반 댓글, 값이 있을 경우 대댓글)
}
