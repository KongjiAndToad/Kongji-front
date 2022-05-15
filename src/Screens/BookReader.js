import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
import styled from "styled-components";

function BookReader({ history, match }) {
  const baseUrl = "http://54.180.26.235:8000";
  const { id } = match.params;

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    await axios
      .get(baseUrl + "/books/" + id)
      .then((response) => {
        setBook(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
  };

  //back 버튼, 누르면 메인으로 돌아감
  const back = () => {
    history.push("/");
  };

  //책 삭제 함수, 현재 수정중인 book 객체의 create는 book.create이므로 이것과 다른 값들만 저장해서 새롭게 로컬스토리지에 세팅한다.
  async function removeBook() {
    //const ret = [];
    await axios
      .delete(baseUrl + "/books/" + id)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <BookReaderWrap>
      <div className="container">
        <div>
          <div className="title-form">
            <p className="title">{book?.title}</p>
          </div>
          <div className="btns-top">
            <Button
              onClick={() => playAudio()}
              className="btn-play"
              color="brwn"
              size="small"
            >
              ▶︎
            </Button>
            <Button
              onClick={() => pauseAudio()}
              className="btn-pause"
              color="brwn"
              size="small"
            >
              ❚❚
            </Button>
          </div>
        </div>
        <div className="content-form">
          <p className="content">{book?.content}</p>
        </div>
        <div className="btns-bottom">
          <Button onClick={back} className="btn-back" color="brwn" size="small">
            돌아가기
          </Button>
          <Button
            onClick={() => removeBook()}
            className="btn-remove"
            color="brwn"
            size="small"
          >
            책 삭제
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

  .btns-top {
    float: right;
    width: 400px;
    display: flex;
    margin-top: -50px;
  }
  .title-form {
    width: 450px;
    height: 60px;
    background: #feffcd;
    border-radius: 20px;
    margin-top: 46px;
    margin-left: 56px;
  }
  .title {
    padding-top: 0px;
    padding-left: 24px;
    font-size: 45px;
  }
  .content-form {
    width: 600px;
    height: 550px;
    background: #feffcd;
    border-radius: 20px;
    margin-top: -15px;
    margin-left: 56px;
  }
  .content {
    padding-top: 5px;
    padding-left: 24px;
    padding-right: 20px;
    font-size: 36px;
  }
  .container {
    width: 710px;
    height: 777px;
    background: #fdf0bc;
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
  .btns-bottom {
    width: 710px;
    display: flex;
    margin-top: 20px;
  }
  .btn-back {
    margin-left: 56px;
  }
  .btn-remove {
    margin-left: 398px;
  }
`;
