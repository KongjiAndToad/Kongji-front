# 소멸위기에 처한 사투리 보전을 위한 제주어 오디오북, 코소롱
![](https://user-images.githubusercontent.com/81242672/169936577-7bc4d24a-53e0-4615-a019-9ef060b8946f.png)
## Project Description
- 사용자로부터 표준어 텍스트를 입력 받고 이를 제주어 오디오북으로 변환하는 웹 서비스
- 언어학적으로 중요한 의미를 지니는 제주어를 보전할 필요성을 알리고 제주어에 대한 흥미를 고취

## Developers
|[김민주](https://github.com/MINJU-KIMmm)|[이채은](https://github.com/lcheun)|[정수진](https://github.com/offsujin)|[진정현](https://github.com/jh-jin)|
|---|---|---|---|
|![minju](https://github.com/MINJU-KIMmm.png)|![cheun](https://github.com/lcheun.png)|![sj](https://github.com/offsujin.png)|![jh](https://github.com/jh-jin.png)|
|BackEnd, TTS, 팀장|FrontEnd, 기계번역|BackEnd, TTS|FrontEnd|

## Repository
### 🗂 toad-server
`Django`를 사용한 API 서버 Repository
- 책 조회, 생성, 삭제 기능
  - Python의 requests 라이브러리를 이용하여 딥러닝 서버와 연결
- 로그인 & 회원가입 기능
- 유저별 서재
- 좋아요를 이용한 북마크 기능
### 🗂 tts-server
`Flask`를 사용한 딥러닝 서버 Repository
- 음성합성 모델(Glow-TTS)와 기계번역 모델(Seq2Seq)을 이용한 오디오북 생성 기능
  - send_file을 이용하여 API 서버로 생성된 책 전달
### 🗂 Kongji-front
`React`를 사용한 프론트엔드 Repository

- 제주도의 특산물을 연상시키는 배색
- 한국적인 폰트

<요구사항 명세>
1. 메인 서재 화면
    1. 책 목록: 현재까지 생성한 제주어 오디오북을 볼 수 있다.
        1. 코소롱 - 사용법
        2. 코소롱 - 팁
        3. 위 둘을 제주어 오디오북으로 미리 생성하여 서재 초기 화면으로 사용한다. 사용자는 이를 다른 제주어 오디오북과 마찬가지로 조회하고 삭제할 수 있다.
    2. 책 추가 버튼: 책 추가 화면으로 넘어간다.
2. 책 추가 화면
    1. 제목과 표준어로 된 내용을 입력한다.
    2. 돌아가기 버튼: 메인 서재 화면으로 돌아간다.
    3. 추가하기 버튼: 책을 생성하고 메인 서재 화면으로 돌아간다.
3. 책 읽기 화면
    1. 제목과 제주어로 번역된 책 텍스트를 조회할 수 있다.
    2. 재생, 정지 버튼으로 제주어 오디오를 들을 수 있다.
    3. 돌아가기 버튼: 메인 서재 화면으로 돌아간다.
    4. 책 삭제 버튼: 책을 삭제하고 메인 서재 화면으로 돌아간다.

### 🗂 kongji-translation
`Seq2Seq`와 `Attention`을 사용한 기계번역 Repository
- 표준어 텍스트 input -> 제주어 텍스트 output
- 15만개의 표준어-제주어 Dataset 사용
### 🗂 toad-glow-tts
`Glow-TTS`를 사용한 음성합성 Repository
- 텍스트를 제주 억양을 살려 발화하는 TTS
- 1만개의 제주어 단일 화자 오디오 Dataset 사용

## System Architecture
![sa](https://user-images.githubusercontent.com/81242672/169937276-3cf2821a-8fd7-44bc-8e0c-6083c7b18c86.png)
## Poster
![poster](https://user-images.githubusercontent.com/81242672/169936844-82d574c8-50ac-4b8e-aba4-35c99c1bdd33.png)


