package com.boardscrap.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.board.bean.BoardDTO;
import com.board.service.BoardService;
import com.boardscrap.service.BoardScrapService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/boardScrap")
public class BoardScrapController {
	@Autowired
	private BoardScrapService boardScrapService;
	@Autowired
	private BoardService boardService;
	
	//이미지 스크랩
	@RequestMapping("/scrap")
	@ResponseBody
	public void scrap(@RequestParam("seq_board") String seq_board,
						@RequestParam("seq_member") String seq_member) {
		boardScrapService.scrap(seq_board, seq_member);
	}
	
	@RequestMapping(value="/getBoardScrap", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getScrapBoard(@RequestParam("seq_member") String seq_member, ModelAndView mav) {
		List<BoardDTO> list = boardScrapService.getScrapBoard(seq_member);
		mav.addObject("list", list);
		mav.setViewName("/member/mypageSup");
		System.out.println(list);
		return mav;
	}

	@RequestMapping("/getMyBoard")
	@ResponseBody
	public ModelAndView getMyBoard(@RequestParam("seq_member") String seq_member, ModelAndView mav) {
		List<BoardDTO> list = boardService.getMyBoardList(seq_member);
		mav.addObject("list", list);
		mav.setViewName("/member/mypageSup");
		return mav;
	}
}
