package com.likes.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.likes.service.LikesService;

@Controller
@RequestMapping("/board")
public class LikesController {
    @Autowired
    private LikesService likesService;

    private long parseLong(String value) {
        return Long.parseLong(value);
    }

    // 좋아요 추가 또는 제거
    @RequestMapping(value = "/like", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> toggleLike(@RequestParam("seq_board") String seqBoard,
                                           @RequestParam("seq_member") String seqMember) {
        Map<String, Object> result = new HashMap<>();
        long boardId = parseLong(seqBoard);
        long memberId = parseLong(seqMember);
        
        boolean isLiked = likesService.isLikedByMember(boardId, memberId);        
        try {
            if (isLiked) {
                // 이미 좋아요를 눌렀다면 제거
                likesService.removeLike(boardId, memberId);

                result.put("status", "success");
                result.put("message", "좋아요가 취소되었습니다.");
                result.put("liked", false);
            } else {
                // 좋아요를 추가
                likesService.addLike(boardId, memberId);
                result.put("status", "success");
                result.put("message", "좋아요가 추가되었습니다.");
                result.put("liked", true);
            }

            // 해당 게시물의 좋아요 수 업데이트

            int likeCount = likesService.countLikesByBoard(boardId);
            result.put("likeCount", likeCount);

        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "좋아요 처리 중 오류가 발생했습니다.");
            e.printStackTrace();
        }

        return result;

    }  

    // 페이지 로드 시 좋아요 수와 좋아요 여부를 불러오는 메서드
    @RequestMapping(value = "/loadLikes", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadLikes(@RequestParam("seq_board") String seqBoard,
                                          @RequestParam("seq_member") String seqMember) {
        Map<String, Object> result = new HashMap<>();
        long boardId = parseLong(seqBoard);
        long memberId = parseLong(seqMember);
        
        try {
            boolean isLiked = likesService.isLikedByMember(boardId, memberId);
            int likeCount = likesService.countLikesByBoard(boardId); // seq_board로 수정


            result.put("status", "success");
            result.put("liked", isLiked);
            result.put("likeCount", likeCount);
        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "좋아요 정보를 불러오는 중 오류가 발생했습니다.");
            e.printStackTrace();
        }

        return result;
    }

    // 특정 게시물의 좋아요 수 조회
    @RequestMapping(value = "/getLikeCount", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getLikeCount(@RequestParam("seq_board") String seqBoard) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            int likeCount = likesService.countLikesByBoard(parseLong(seqBoard));

            result.put("status", "success");
            result.put("likeCount", likeCount);
        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "좋아요 수 조회 중 오류가 발생했습니다.");
            e.printStackTrace();
        }

        return result;
    }

}
