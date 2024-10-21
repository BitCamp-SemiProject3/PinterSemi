package com.board.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.board.bean.BoardDTO;


@Mapper
public interface BoardDAO {

	public void boardWrite(BoardDTO boardDTO);

	public List<BoardDTO> getBoardList();

	public List<BoardDTO> getBoardPagingList(Map<String, Object> map);
	
	public BoardDTO getBoard(long seq_board);

	public void boardUpdate(BoardDTO boardDTO);

	public void boardDelete(long seq_board);

	public void boardUpdateNotImage(BoardDTO boardDTO);

	public List<BoardDTO> getMyBoardList(long seq_member);

	public List<BoardDTO> searchBoardPagingList(Map<String, Object> map);
}