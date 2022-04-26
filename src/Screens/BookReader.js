import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
import Title from "../components/Title";
import styled from "styled-components";

function BookReader({ history, match }) {
  const baseUrl = "http://54.180.26.235:8000";
  const {id} = match.params;

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    //const ret = [];
    await axios
      .get(baseUrl+"/books/"+id)
      .then((response) => {
        setBook(response.data);
        console.log(response.data);
        //ret = response.data.RESULT;
      })
      .catch((error) => {
        console.error(error);
      });
    //return { ret };
  }

  //뷰에 보일 book 구성할 state 변수
  const [book, setBook] = useState({});
  const audio = new Audio(book?.audio);

  const playAudio = (e) => {
    console.log(book?.audio);
    audio.loop = false; 
    audio.volume = 0.5;
    audio.play();
  };

  const pauseAudio = (e) => {
    audio.pause();
  }


  //moment JS 사용 준비
  const moment = require("moment");
  //createtime 이 페이지를 열자마자 시간을 timestamp에 저장
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  //로컬스토리지 배열 내부 객체 하나

  //reBookId가 있으면 책수정, 없으면 책생성
  const reBookId = match.params && match.params.id;
  //로컬스토리지에서 객체들의 배열 불러오고, 각 객체를 localBookObj에 저장
  const localBook = JSON.parse(localStorage.getItem("books") || "[]");
  const localBookObj = localBook.filter(
    (element) => element.create === reBookId
  );

  //렌더 한 번 더 될 때 reBookId값이 있으면 localBookObj에서 그 객체 가져와서 기본 book에 set
  useEffect(() => {
    console.log(localBook, reBookId);
    if (reBookId) {
      setBook(localBookObj[0]);
    }
  }, []);

  
  //submit할 때 실행
  const AudioPlay = () => {
    const audio = new Audio(book.audio);
    audio.play();
    const updateTimeStamp = moment().format("YYYY- MM-DD HH:mm:ss");
    //submit하는 시간과 현재 시간 차이를 저장
    const diffTime = moment(updateTimeStamp, "YYYY- MM-DD HH:mm:ss").fromNow();
    //book 하나 객체에 위 값들 저장
    const newBook = { ...book, update: diffTime, edit: updateTimeStamp };

    localBook.map(
      (e) => (e.update = moment(e.edit, "YYYY- MM-DD HH:mm:ss").fromNow())
    );
    history.push("/");
  };

  //back 버튼, 누르면 메인으로 돌아감
  const back = () => {
    history.push("/");
  };

  //책 삭제 함수, 현재 수정중인 book 객체의 create는 book.create이므로 이것과 다른 값들만 저장해서 새롭게 로컬스토리지에 세팅한다.
  const bookRemove = (localBook) => {
    const notNowBook = localBook.filter(
      (element) => element.create !== book.create
    );
    localStorage.setItem("books", JSON.stringify(notNowBook));
    history.push("/");
  };

  return (
    <BookReaderWrap>
      <div className="container">
        <div className="title-form">
          <h2>{book?.title}</h2>
        </div>
        <div className="content-form">
          <p>{book?.content}</p>
        </div>
        <div className="btn-bottom">
          <Button onClick={back} className="btn-back" color="gray" size="small">
            돌아가기
          </Button>
          <Button
            onClick={() => bookRemove(localBook)}
            className="btn-remove"
            color="gray"
            size="small"
          >
            책 삭제
          </Button>
          <Button
            onClick={() => playAudio()}
            className="btn-play"
            color="gray"
            size="small"
          >
            ▶︎
          </Button>
          <Button
            onClick={() => pauseAudio()}
            className="btn-pause"
            color="gray"
            size="small"
          >
           ❚❚
          </Button>
        </div>
      </div>
    </BookReaderWrap>
  );
}

export default BookReader;

const BookReaderWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    margin-top: 104px;
    margin-left: 56px;
  }
  .container {
    width: 710px;
    height: 777px;
    background: #f5f5f5;
    box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.15);
    border-radius: 70px;
  }
  .btn-play {
    margin-left: 229px;
  }
  .btn-pause {
    margin-left: 9px;
    margin-right: 56px;
  }
  .btn-bottom {
    width: 710px;
    display: flex;
    margin-top: 39px;
  }
  .btn-back {
    margin-left: 56px;
  }
  .btn-remove {
    margin-left: 9px;
  }

  .title-form {
    width: 591px;
    height: 51px;
    background: #ffffff;
    border-radius: 20px;
    margin-top: 33px;
    margin-left: 56px;
    &--t {
      font-family: Noticia Text;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0.03em;
      padding-left: 15px;
      border: none;
      outline: none;
      width: 591px;
      height: 51px;
      background: #ffffff;
      color: #2d2d2d;
      border-radius: 20px;
    }
  }
  .content-form {
    width: 589px;
    height: 554px;
    background: #ffffff;
    border-radius: 20px;
    margin-top: 15px;
    margin-left: 56px;
    &--p {
      font-family: Noticia Text;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0.03em;
      padding-left: 15px;
      padding-top: 20px;
      border: none;
      outline: none;
      width: 589px;
      height: 554px;
      background: #ffffff;
      color: #2d2d2d;
      border-radius: 20px;
      resize: none;
    }
  }
`;
