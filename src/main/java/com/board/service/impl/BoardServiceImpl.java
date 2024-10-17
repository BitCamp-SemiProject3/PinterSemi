package com.board.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.board.bean.BoardDTO;
import com.board.dao.BoardDAO;
import com.board.service.BoardService;
import com.member.ncp.service.ObjectStorageService;

@Service
public class BoardServiceImpl implements BoardService {	
	@Autowired
	private BoardDAO boardDAO;
	@Autowired
	private ObjectStorageService objectStorageService;
	private final int page_size = 20;
	private final String bucketName="bitcamp-9th-pinter";
	private String imageFileName;
	private String imageOriginalFile;
	
	@Override
	public void boardWrite(BoardDTO boardDTO, MultipartFile image) {
		imageFileName = objectStorageService.uploadFile(bucketName, "storage/", image);
		System.out.println("imageFileName : "+imageFileName);
		imageOriginalFile = image.getOriginalFilename();
		
		BoardDTO dto = new BoardDTO();
		dto.setSeq_member(boardDTO.getSeq_member());
		dto.setImageContent(boardDTO.getImageContent());
		dto.setImageFileName(imageFileName);
		dto.setImageOriginalFileName(imageOriginalFile);
		dto.setName(boardDTO.getName());
		dto.setImageSubject(boardDTO.getImageSubject());
		dto.setImageContent(boardDTO.getImageContent());
		
		boardDAO.boardWrite(dto);
	}

	@Override
	public List<BoardDTO> getBoardPagingList(String start) {
	    int page = (start != null) ? Integer.parseInt(start) : 1; // 기본값 1
	    int startRow = (page - 1) * page_size; // 0부터 시작
	    System.out.println("startRow : "+startRow+"/ pageSize : "+page_size);
	    Map<String, Object> map = new HashMap<>();
	    map.put("startRow", startRow);
	    map.put("pageSize", page_size); // page_size 추가

	    return boardDAO.getBoardPagingList(map); // 매퍼로 Map 전달
	}

	@Override
	public BoardDTO getBoard(String seq_board) {
		return boardDAO.getBoard(Long.parseLong(seq_board));
	}

	@Override
	public void boardUpdate(BoardDTO boardDTO, MultipartFile image) {
		objectStorageService.deleteFile(bucketName, "storage/", boardDTO.getImageFileName());
		imageFileName = objectStorageService.uploadFile(bucketName, "storage/", image);
		imageOriginalFile = image.getOriginalFilename();
		BoardDTO dto = new BoardDTO();
		dto.setSeq_board(boardDTO.getSeq_board());
		dto.setSeq_member(boardDTO.getSeq_member());
		dto.setImageFileName(imageFileName);		
		dto.setImageOriginalFileName(imageOriginalFile);
		dto.setName(boardDTO.getName());
		dto.setImageSubject(boardDTO.getImageSubject());
		dto.setImageContent(boardDTO.getImageContent());
		boardDAO.boardUpdate(dto);

	}

	@Override
	public void boardDelete(String seq_board) {
		BoardDTO boardDTO = boardDAO.getBoard(Long.parseLong(seq_board));
		objectStorageService.deleteFile(bucketName, "storage/", boardDTO.getImageFileName());
		boardDAO.boardDelete(Long.parseLong(seq_board));
	}

	@Override
	public List<BoardDTO> getMyBoardList(String seq_member) {
		return boardDAO.getMyBoardList(Long.parseLong(seq_member));
	}

	@Override
	public List<BoardDTO> searchBoardPagingList(String keyword, String page) {
	    int start = (page != null) ? Integer.parseInt(page) : 1; // page가 null인 경우 기본값 1
	    int startRow = (start - 1) * page_size; // 0부터 시작
	    Map<String, Object> map = new HashMap<>();
	    map.put("startRow", startRow);
	    map.put("pageSize", page_size); // 페이지당 가져올 데이터 수
	    map.put("keyword", keyword);

	    return boardDAO.searchBoardPagingList(map);
	}

}
