
# 🐾 PETMAKING✨
👇로그인/ 회원가입 화면
<div>
<img src="https://user-images.githubusercontent.com/57528886/204869710-d7d737dd-680c-4c7c-a254-1204184699bc.png" width="350"/>
<img src="https://user-images.githubusercontent.com/57528886/204869838-6edb1187-c3a5-44e5-b04a-d09200ad0974.png" width="407"/>
</div>

👇메인 화면
<img width="763" alt="signUp_page" src="https://user-images.githubusercontent.com/57528886/204869407-9e82fa36-2545-41da-8928-cf62d0bf8df4.png">

## ☕ Description✨
강아지가 흔히 자신의 영역을 표시하는 용어를 '마킹'을 한다고 하죠.
영감을 두어 이 프로젝트의 이름은 펫 마킹입니다 :)

나의 반려동물과 함께 동반할 수 있는 장소를 찾아주고 저장해주는 웹 사이트 입니다.
키워드 검색을 통해서 'pet'에 관련된 장소를 찾을 수 있습니다. 

해당 장소를 저장해 두고 싶을 땐 북마크를 이용하세요!
로그아웃 후에도 내가 북마크한 장소를 손쉽게 찾을 수 있습니다. 

## 📝 사용기술 및 언어✨
- [FrontEnd]
  - Javascript
  - React
  [library]
  - recoil
  - react-router-dom
  - emotion style / styled-components
  - chakra Ui
  - hookform
  - fortawesome
  - swiper


- [Backend]
  - Express
  - Node.js
  - MongoDB


## ⏰ 개발 기간✨
2022.10.01 - 2022.12.01


## 🎄 페이지 구성✨
  > header
    >> nav
  > main
    >> map
    >> Bookmark List
    >> Store List

  > user
    >> userInfo
    >> Bookmark List


## 구현 기능✨
1. 로그인/ 로그아웃
2. 회원가입
3. 장소 검색
4. 장소 북마크

## 세부 기능 명세✨
### 🗣️ client
1. 로그인/ 로그아웃 / 회원가입
- 사용자 세션유지를 위해 로컬스토리 액세스토큰 저장
- 로그인 유지 기능: 액세스토큰의 수명을 365로 지정해줌


2. 장소 검색
- 카카오 map API를 이용하여 키워드를 통한 장소 검색
- 지도에 표시된 관련 업체들을 하단 리스트로 확인 가능
- map에 있는 marker를 누르면 해당 업체에 대한 상세 모달창이 열림

3. 장소 북마크
- 북마크가 된 정보는 메인화면에 북마크 리스트에 출력 됨
- 모달창에 있는 북마크 버튼을 누르면 Bookmark에 추가
- 북마크내에서 하트표시로 data 삭제

4. 그 외
- 외부 API 서비스 unsplash 사용
  - kakao 에서 제공하지 않는 업체 이미지를 넣기위해 랜덤 이미지를 unsplash에서 가져옴.
  - unsplash 이미지 검색시 관련 이미지만을 추출하기 위해 검색 조건 query를 사용('pet', 'food')

### 🌐 server
- AWS 
- EC2, S3 사용
- github을 이용한 서버 배포(수동 배포)
- pm2를 이용해서 express 서버 백그라운드 실행
- MongoDB ATLAS 이용
- JWT 토큰을 이용한 사용자 인증 처리
- bcrypt를 이용한 사용자 비밀번호 암호화 처리 및 비밀번호 인증 구현


## 📚 STACKS✨
#### [FRONTEND]
![HTML](https://img.shields.io/badge/html-ededed?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS](https://img.shields.io/badge/css-ededed?style=for-the-badge&logo=css3&logoColor=1572B6)
![JAVASCRIPT](https://img.shields.io/badge/javaScript-ededed?style=for-the-badge&logo=javaScript&logoColor=F7DF1E)
<br>
![REACT](https://img.shields.io/badge/react-ededed?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/ReactRouter-ededed?style=for-the-badge&logo=ReactRouter&logoColor=CA4245)
![RECOIL](https://img.shields.io/badge/recoil-ededed?style=for-the-badge&logo=recoil&logoColor=0075EB)
<br>
![npm](https://img.shields.io/badge/npm-ededed?style=for-the-badge&logo=npm&logoColor=2C8EBB)
![AXIOS](https://img.shields.io/badge/Axios-ededed?style=for-the-badge&logo=Axios&logoColor=5A29E4)


#### [BACKEND]
![Amazon AWS](https://img.shields.io/badge/AWS-ededed?style=for-the-badge&logo=AmazonAWS&logoColor=E34F26)
![MongoDB](https://img.shields.io/badge/MongoDB-ededed?style=for-the-badge&logo=MongoDB&logoColor=F7DF1E)
![Node.js](https://img.shields.io/badge/Node.js-ededed?style=for-the-badge&logo=Node.js3&logoColor=1572B6)
![Mongoose](https://img.shields.io/badge/Mongoose-ededed?style=for-the-badge&logo=Mongoose&logoColor=F7DF1E)

