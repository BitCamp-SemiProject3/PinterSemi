package com.board.service;

import java.util.List;
import java.util.Map;


import org.springframework.web.multipart.MultipartFile;

import com.board.bean.BoardDTO;

public interface BoardService {
	public void boardWrite(BoardDTO boardDTO, MultipartFile image);
	public List<BoardDTO>getBoardPagingList(String start);
	public BoardDTO getBoard(String seq_board);
	public void boardUpdate(BoardDTO boardDTO, MultipartFile image);
	public void boardDelete(String seq_board);
	public List<BoardDTO> getMyBoardList(String seq_member);
	public List<BoardDTO> searchBoardPagingList(String keyword, String page);
	public String getBoardMemberProfile(String seq_member);
}
