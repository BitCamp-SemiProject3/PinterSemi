package com.member.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.member.bean.MemberDTO;

@Mapper
public interface MemberDAO {
	public MemberDTO isExistId(String id);
	public void join(MemberDTO memberDTO);
	public MemberDTO login(Map<String, String> map);
	public MemberDTO getMember(String id);
	public MemberDTO getMemberBySeq(String seq_member);
	public void update(MemberDTO memberDTO);
	public void delete(MemberDTO memberDTO);
}
