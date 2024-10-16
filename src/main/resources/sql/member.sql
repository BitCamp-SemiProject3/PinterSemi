-- 회원 생성 쿼리문
CREATE TABLE Member (
    seq_member INT AUTO_INCREMENT PRIMARY KEY,        -- 회원 고유 번호 (PK)
    name VARCHAR(100) NOT NULL,   -- 이름
    id VARCHAR(50) UNIQUE NOT NULL, -- 아이디 (고유 값)
    password VARCHAR(100) NOT NULL, -- 비밀번호
    gender VARCHAR(10),           -- 성별
    email VARCHAR(200),           -- 이메일 (email1 + email2)
    phonenumber VARCHAR(20),     -- 전화번호 (tel1 + tel2 + tel3)
    zipcode VARCHAR(10),          -- 우편번호
    address VARCHAR(300),         -- 주소 (add1 + add2)
    logtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- 회원 가입 시간
);
--회원 프로필사진
ALTER TABLE Member ADD userProfile VARCHAR(4000);