package com.member.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.board.bean.BoardDTO;
import com.mail.service.MailService;
import com.member.bean.MemberDTO;
import com.member.service.MemberService;
import com.member.service.kakao.KakaoService;

@Controller
@RequestMapping(value = "/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private KakaoService kakaoService;
	@Autowired
	private MailService mailService;
	private int number; // 이메일 인증 숫자를 저장하는 변수

	@RequestMapping(value = "/checkId")
	@ResponseBody
	public String checkId(String id) {
		String check = "exist";
		if (!memberService.checkId(id))
			check = "non_exist";
		return check;
	}

	@RequestMapping(value = "/join")
	@ResponseBody
	public void join(@ModelAttribute MemberDTO memberDTO, 
			@RequestParam("joinid") String id, @RequestParam("joinpassword") String passwd, @RequestParam("joinname") String name,
			@RequestParam("email1") String email1, @RequestParam("email2") String email2, 
			@RequestParam("tel1") String tel1, @RequestParam("tel2") String tel2, @RequestParam("tel3") String tel3, 
			@RequestParam("addr1") String addr1, @RequestParam("addr2") String addr2) {
		System.out.println(memberDTO.getKakaoCheck());
		System.out.println(memberDTO.getKakaoProfile());
		String email = email1 + "@" + email2;
		String phoneNumber = tel1 + "-" + tel2 + "-" + tel3;
		String address = addr1 + "," + addr2;
		memberDTO.setId(id);
		memberDTO.setPassword(passwd);
		memberDTO.setName(name);
		memberDTO.setEmail(email);
		memberDTO.setPhoneNumber(phoneNumber);
		memberDTO.setAddress(address);
		memberService.join(memberDTO);
	}

	@RequestMapping(value = "/login")
	@ResponseBody
	public String login(@RequestParam String id, @RequestParam String password, HttpSession session) {
		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		map.put("password", password);
		MemberDTO memberDTO = memberService.login(map);
		String check = "fail";
		if (memberDTO != null) {
			session.setAttribute("memDTO", memberDTO);
			check = "success";
		}
		return check;
	}

	@RequestMapping(value = "/logout")
	@ResponseBody
	public void logout(HttpSession session) {
		session.removeAttribute("memDTO");
	}

	@RequestMapping(value = "/mypageForm")
	public String mypageForm() {
		return "/member/mypageForm";
	}

	@RequestMapping(value = "/mypageSup")
	@ResponseBody
	public List<BoardDTO> mypageSup(@RequestParam("seq_member") String seq) {
		List<BoardDTO> list = memberService.getMypageSup(seq);
		return list;
	}

	@RequestMapping(value = "/updateForm")
	public String updateForm() {
		return "/member/updateForm";
	}

	@RequestMapping(value = "/kakao/login")
	public String getCI(@RequestParam("code") String code, HttpSession session, Model model,
			RedirectAttributes redirectAttributes) throws IOException {
		System.out.println("code = " + code);
		String access_token = kakaoService.getToken(code);
		System.out.println("access_token : " + access_token);
		Map<String, Object> userInfo = kakaoService.getUserInfo(access_token);
		System.out.println("id : " + userInfo.get("id"));
		System.out.println("nickname : " + userInfo.get("nickname"));
		System.out.println("email : " + userInfo.get("email"));
		System.out.println("profile_image : " + userInfo.get("profile_image"));

		// 아이디 검색
		boolean check = memberService.checkId(userInfo.get("email") + "");
		System.out.println("체크 " + check);
		if (!check) {
			redirectAttributes.addFlashAttribute("code", code);
			redirectAttributes.addFlashAttribute("check", check);
			redirectAttributes.addFlashAttribute("kakaoCheck", "T");
			redirectAttributes.addFlashAttribute("access_token", access_token);
			redirectAttributes.addFlashAttribute("userInfo", userInfo);
			return "redirect:/";
		} else {
			MemberDTO memberDTO = memberService.getMember(userInfo.get("email") + "");

			session.setAttribute("memDTO", memberDTO);
			model.addAttribute("userInfo", userInfo);
			model.addAttribute("access_token", access_token);
			return "redirect:/board/searchPage";
		}

	}

	@RequestMapping(value = "/update")
	@ResponseBody
	public void update(@ModelAttribute MemberDTO memberDTO,
			@RequestParam("userProfileImg") MultipartFile userProfileImg, @RequestParam("addr1") String addr1,
			@RequestParam("addr2") String addr2, @RequestParam("email1") String email1,
			@RequestParam("email2") String email2, @RequestParam("tetel1") String tel1,
			@RequestParam("tetel2") String tel2, @RequestParam("tetel3") String tel3, HttpSession session) {

		memberDTO.setAddress(addr1 + "," + addr2);
		memberDTO.setEmail(email1 + "@" + email2);
		memberDTO.setPhoneNumber(tel1 + "-" + tel2 + "-" + tel3);

		if (userProfileImg != null)
			memberDTO.setKakaoCheck("F"); // 카카오 사용자가 변경할 사진을 넣었을땐 F

		memberService.update(memberDTO, userProfileImg);
		session.removeAttribute("memDTO");
		session.setAttribute("memDTO", memberDTO);
	}

	@RequestMapping(value = "/delete")
	@ResponseBody
	public void delete(HttpSession session) {
		MemberDTO memberDTO = (MemberDTO) session.getAttribute("memDTO");
		memberService.delete(memberDTO);
		session.removeAttribute("memDTO");
	}

	// 인증 이메일 전송
	@PostMapping("/mailSend")
	@ResponseBody
	public HashMap<String, Object> mailSend(String mail) {
		HashMap<String, Object> map = new HashMap<>();
		try {
			number = mailService.sendMail(mail);
			String num = String.valueOf(number);
			map.put("success", Boolean.TRUE);
			map.put("number", num);
		} catch (Exception e) {
			map.put("success", Boolean.FALSE);
			map.put("error", e.getMessage());
		}
		return map;
	}

	// 인증번호 일치여부 확인
	@GetMapping("/mailCheck")
	public ResponseEntity<?> mailCheck(@RequestParam String userNumber) {
		boolean isMatch = userNumber.equals(String.valueOf(number));
		return ResponseEntity.ok(isMatch);
	}

}
