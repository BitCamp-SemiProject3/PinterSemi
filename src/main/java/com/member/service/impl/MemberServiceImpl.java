package com.member.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.board.bean.BoardDTO;
import com.board.dao.BoardDAO;
import com.member.bean.MemberDTO;
import com.member.dao.MemberDAO;
import com.member.ncp.service.ObjectStorageService;
import com.member.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private BoardDAO boardDAO;
	@Autowired
	private HttpSession session;
	@Autowired
	private ObjectStorageService objectStorageService;
	
	private String bucketName = "bitcamp-9th-pinter";
	
	@Override
	public boolean checkId(String id) {
		MemberDTO memberDTO = memberDAO.isExistId(id);
		if (memberDTO == null) return false;
		else return true;
	}
	
	@Override
	public void join(MemberDTO memberDTO) {
		memberDAO.join(memberDTO);
	}

	@Override
	public MemberDTO login(Map<String, String> map) {
		return memberDAO.login(map);
	}

	@Override
	public MemberDTO getMember(String id) {
		return memberDAO.getMember(id);
	}

	@Override
	public void update(MemberDTO memberDTO, MultipartFile userProfileImg) {
		String filePath = session.getServletContext().getRealPath("WEB-INF/storage");
		System.out.println("실제폴더 = " + filePath);

		MemberDTO dto = memberDAO.getMember(memberDTO.getId());

		String userOriginalProfile;
		String userProfile = dto.getUserProfile();
		File file;

		if(userProfileImg.getSize() != 0) {
			//NCP 이미지 삭제
			objectStorageService.deleteFile(bucketName, "storage/", userProfile);
			//NCP 이미지 올리기
			userProfile = objectStorageService.uploadFile(bucketName, "storage/", userProfileImg);
			userOriginalProfile = userProfileImg.getOriginalFilename();
			file = new File(filePath, userOriginalProfile);

			try {
				userProfileImg.transferTo(file);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else { // 업데이트폼에서 이미지를 수정하지 않았을 때
			userProfile = dto.getUserProfile();
			userOriginalProfile = dto.getUserOriginalProfile();
		}
		memberDTO.setUserProfile(userProfile);
		memberDTO.setUserOriginalProfile(userOriginalProfile);
		
		memberDAO.update(memberDTO);
	}

	@Override
	public void delete(MemberDTO memberDTO) {
		memberDAO.delete(memberDTO);
	}

	@Override
	public List<BoardDTO> getMypageSup(String seq) {
		if(seq != "") return boardDAO.getMyBoardList(Integer.parseInt(seq));
		else return null;
	}
}
