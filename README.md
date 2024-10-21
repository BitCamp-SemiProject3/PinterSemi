# 핀터레스트 클론코딩 Refactoring

## 소개
핀터레스트 UI/UX를 본떠서 클론코딩을 진행했습니다. 이전 프로젝트에서는 Java 기반으로 진행하였다면, 이번 프로젝트를 Spring framework를 이용하여 백엔드 개발을 진행하였습니다. 그리고 이전 프로젝트는 로컬 환경에서 프로젝트를 진행했지만, 이번엔 클라우드 서버를 통해 외부 사용자들이 접근 가능하게 하였습니다.

## 주요 기능
- **사용자 관리**
  - 회원가입, 로그인, 회원 정보 수정, 회원 탈퇴, 로그아웃 기능
  - 카카오 소셜 로그인
- **메인 페이지**
  - 로그인 전 사용자에게 제공되는 메인 페이지
- **탐색 페이지**
  - 로그인 후 전체 게시판을 최신 등록순으로 조회할 수 있는 탐색 페이지
- **검색 기능**
  - 게시글 제목을 기반으로 한 검색 기능
- **마이 페이지**
  - 사용자가 올린 게시글을 확인할 수 있는 마이 페이지
- **게시판**
  - 게시판 생성, 특정 게시판 조회, 수정, 삭제 기능, 좋아요 기능, 조회수 기능, 게시판 카카오톡 공유 기능
- **댓글 관리**
  - 댓글 생성, 조회, 수정, 삭제 기능, 대댓글 기능
- **페이징 처리**
  - 스크롤 기반으로 페이징 처리 기능

## 역할 분담
- **오영수**
  - 게시판 CRUD, 댓글 CRUD, 게시판 검색 리팩토링
  - 탐색 페이지, 검색 페이지 페이징 처리
  - 게시판 조회 페이지에서 연관된 게시판을 찾아주는 '더 찾아보기' 기능 추가
  - 게시판 좋아요, 카카오톡 공유, 게시판 작성자와 댓글 유저 프로필 사진 기능 추가
  - 대댓글 기능 추가

- **박상욱**
  - 사용자 프로필 변경 기능 구현, 사용자 프로필 사진 추가
  - 게시판 스크랩 기능 추가
  - 마이 페이지 사용자가 저장한 핀과 사용자가 작성한 핀 기능 추가
  - 메인 페이지 반응형 리팩토링

- **홍재헌**
  - 초기 프로젝트 세팅
  - 기존 회원 가입 기능 리팩토링 및 소셜로그인 기능 구현(카카오)
  - 회원 가입 시 이메일 인증 기능 추가
  - CI/CD (ncp, docker, jenkins 이용)

## ERD
![image](https://github.com/user-attachments/assets/15feb9bb-a757-4981-ae35-0b8d027661af)
- 한 member는 여러 개의 게시판을 작성할 수 있다. ( 1: N )
- 한 게시판에는 여러 개의 댓글을 달 수 있다. ( 1: N )
- 한 게시판에는 여러 개의 좋아요를 받을 수 있다 (1 : N)
- 스크랩은 N : N 관계를 처리하기 위한 중간 테이블이다.
    - 한 명의 회원은 여러 게시물을 스크랩할 수 있고, 하나의 게시물은 여러 회원에 의해 스크랩될 수       있다.
- 댓글 테이블은 대댓글을 위한 자기참조 관계(Self-referencing)를 이루고 있다.
  - 테이블 내부에서 1 : N 관계를 형성을 한다.
  - 하나의 부모 댓글은 여러 개의 대댓글을 가질 수 있다.

## 기술 스택
- **프론트엔드**: HTML, CSS, JavaScript (jQuery), Bootstrap
- **백엔드**: Java, Spring Framework, MyBatis
- **DB**: Oracle
- **CI/CD** : NCP(MySQL, Object Storage), Docker, Jenkins
- **기타**: Git, JSP

## 기능 화면

- **로그인 전 메인 페이지**
- **로그인 & 회원 가입 창 & 로그아웃**
- **로그인 후 탐색 페이지**
- **마이 페이지 & 프로필 수정**
