package com.boardscrap.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.board.bean.BoardDTO;
import com.board.dao.BoardDAO;
import com.boardscrap.dao.BoardScrapDAO;
import com.boardscrap.service.BoardScrapService;

@Service
public class BoardScrapServiceImpl implements BoardScrapService {
	
	@Autowired
	private BoardScrapDAO boardScrapDAO;
	@Autowired
	private BoardDAO boardDAO;
	
	@Override
	public void scrap(String seq_board, String seq_member) {
		BoardDTO boardDTO = boardDAO.getBoard(Long.parseLong(seq_board));
		boardDTO.setSeq_member(Long.parseLong(seq_member));
		boardScrapDAO.scrap(boardDTO);
	}

	@Override
	public List<BoardDTO> getScrapBoard(String seq_member) {
		List<Long> seq_board = boardScrapDAO.getScrapBoard(seq_member);
		ArrayList<BoardDTO> list = new ArrayList<>();
		for(long dto : seq_board) {
			BoardDTO boardDTO = boardDAO.getBoard(dto);
			list.add(boardDTO);
		}
		return list;
	}
	

}
