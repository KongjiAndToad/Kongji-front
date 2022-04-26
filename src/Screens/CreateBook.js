import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import styled from "styled-components";
import axios from "axios";

function CreateBook({ history, match }) {
  const baseUrl = "http://54.180.26.235:8000";
  //로컬스토리지 배열 내부 객체 하나
  const [book, setBook] = useState({
    title: "",
    text: "",
  });
  //타이틀을 배열변수에
  const titleChangeHandler = (event) => {
    event.preventDefault();
    setBook({ ...book, title: event.target.value });
  };

  //내용을 배열변수에
  const contentChangeHandler = (event) => {
    event.preventDefault();
    setBook({ ...book, text: event.target.value });
  };

  //submit할 때 실행
  const BookSubmit = () => {
    axios.post(baseUrl + "/books", book);
    history.push("/");
  };

  //back 버튼 :누르면 메인으로 돌아감
  const back = () => {
    history.push("/");
  };

  return (
    <CreateBookWrap>
      <div className="container">
        <Title />
        <Button onClick={back} className="btn-back" color="gray" size="small">
          돌아가기
        </Button>
        <div className="title-form">
          <input
            className="title-form--input"
            type="text"
            value={book.title}
            onChange={titleChangeHandler}
            placeholder="제목을 입력하세요"
            maxLength="20"
          ></input>
        </div>
        <div className="content-form">
          <textarea
            className="content-form--input"
            type="text"
            value={book.text}
            onChange={contentChangeHandler}
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
        <div className="btn-bottom">
          <Button
            onClick={BookSubmit}
            className="btn-done"
            color="gray"
            size="large"
          >
            작성완료
          </Button>
        </div>
      </div>
    </CreateBookWrap>
  );
}

export default CreateBook;

const CreateBookWrap = styled.div`
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
  .btn-back {
    margin-top: 33px;
    margin-left: 56px;
  }
  .btn-bottom {
    width: 710px;
    display: flex;
    margin-top: 39px;
  }
  .btn-done {
    margin-left: 529px;
  }
  .title-form {
    width: 591px;
    height: 51px;
    background: #ffffff;
    border-radius: 20px;
    margin-top: 33px;
    margin-left: 56px;
    &--input {
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
    height: 254px;
    background: #ffffff;
    border-radius: 20px;
    margin-top: 15px;
    margin-left: 56px;
    &--input {
      font-family: Noticia Text;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0.03em;
      padding-left: 15px;
      padding-top: 20px;
      border: none;
      outline: none;
      width: 598px;
      height: 254px;
      background: #ffffff;
      color: #2d2d2d;
      border-radius: 20px;
      resize: none;
    }
  }
`;
