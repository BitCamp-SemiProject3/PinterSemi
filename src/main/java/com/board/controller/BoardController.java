package com.board.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.board.bean.BoardDTO;
import com.board.service.BoardService;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Autowired
	private BoardService boardService;

	@RequestMapping(value = "/write", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> boardWrite(@ModelAttribute BoardDTO boardDTO,
			@RequestParam("image") MultipartFile image) {
		Map<String, String> result = new HashMap<>();
		try {
			boardService.boardWrite(boardDTO, image);
			result.put("status", "success");
			result.put("message", "이미지 등록 완료");
		} catch (Exception e) {
			result.put("status", "error");
			result.put("message", "이미지 등록 실패");
			e.printStackTrace();
		}
		return result;
	}

	@RequestMapping("/writeForm")
	public String boardWriteForm() {
		return "/board/boardWriteForm";
	}

	@RequestMapping(value = "/updateForm", method = RequestMethod.POST)
	public ModelAndView updateForm(BoardDTO boardDTO) {
		ModelAndView mav = new ModelAndView("/board/boardUpdateForm");
		mav.addObject("boardDTO", boardDTO);

		return mav;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> update(@ModelAttribute BoardDTO boardDTO, @RequestParam("image") MultipartFile image) {		
		Map<String, String> result = new HashMap<>();
		try {
			boardService.boardUpdate(boardDTO, image);
			result.put("status", "success");
			result.put("message", "이미지 등록 완료");
		} catch (Exception e) {
			result.put("status", "error");
			result.put("message", "이미지 등록 실패");
			e.printStackTrace();
		}
		return result;

	}

	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,String> delete(@RequestParam("seq_board") String seq_board) {
		Map<String, String> result = new HashMap<>();
		try {
			boardService.boardDelete(seq_board);
			result.put("status", "success");
			result.put("message", "이미지 삭제 완료");
		} catch (Exception e) {
			result.put("status", "error");
			result.put("message", "이미지 삭제 실패");
			e.printStackTrace();
		}
		return result;
	}

	@RequestMapping("/boardView")
	public ModelAndView getBoardView(@RequestParam("seq_board") String seq_board) {
		BoardDTO boardDTO = boardService.getBoard(seq_board);
		ModelAndView mav = new ModelAndView("/board/boardView");
		mav.addObject("boardDTO", boardDTO);
		return mav;
	}

	// 얘는 그냥 탐색 페이지
	@RequestMapping("/searchPage")
	public ModelAndView getBoardPagingList() {
		List<BoardDTO> list = boardService.getBoardPagingList("0");
		ModelAndView mav = new ModelAndView("/searchPage/searchPage");
		mav.addObject("list", list);
		return mav;
	}
	
	@RequestMapping("/searchPage/loadpage")
	@ResponseBody  // 이 어노테이션을 추가하여 JSON 형식으로 응답
	public List<BoardDTO> getBoardPagingList(@RequestParam(value = "page", required = false) String page) {
	    List<BoardDTO> list = boardService.getBoardPagingList(page);
	    return list; 
	}

	@RequestMapping("/memberPage")
	public Model getMemberBoardList(@RequestParam("seq_member") String seq_member, Model model) {
		List<BoardDTO> list = boardService.getMyBoardList(seq_member);
		model.addAttribute(list);
		return model;
	}

	// 얘는 검색해서 나온 페이지ㅣ
	@RequestMapping("/searchingPage")
	public Model getsearchBoardPagingList(@RequestParam("keyword") String keyword,
			@RequestParam(value = "page", required = false) String page, Model model) {
		List<BoardDTO> list = boardService.searchBoardPagingList(keyword, page);
		model.addAttribute(list);
		return model;
	}

}
