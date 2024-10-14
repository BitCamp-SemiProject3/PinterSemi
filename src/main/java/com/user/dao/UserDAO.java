package com.user.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.user.bean.UserDTO;

@Mapper
public interface UserDAO {
	public UserDTO findId(String id);
	public void write(UserDTO userDTO);
	public List<UserDTO> list();
}
