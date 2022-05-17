import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../components/Title";
import styled from "styled-components";
import BookList from "../components/BookList";
import Button from "../components/Button";

function DrawMain({ history }) {
  const baseUrl = "http://54.180.26.235:8000";

  useEffect(() => {
    getBooks();
  }, []); //빈 배열 줌으로서 시작시 한번만 실행하게 함

  //async, await: 비동기 호출(데이터 받을 때까지 기다림)을 가능케 함
  async function getBooks() {
    //const ret = [];
    await axios
      .get(baseUrl + "/books")
      .then((response) => {
        console.log(response.data.RESULT);
        setBooks(response.data.RESULT);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //뷰에 보일 book 구성할 state 변수
  const [books, setBooks] = useState(
    []
    //JSON.parse(localStorage.getItem("books") || "[]")
  );

  const gotoCreate = () => {
    history.push("/createbook");
  };
  return (
    <DrawMainWrap>
      <div className="container">
        <Title className="title" />
        <BookListContainer>
          {books &&
            books.map((book, index) => <BookList book={book} key={index} />)}
        </BookListContainer>
        <Button
          onClick={gotoCreate}
          className="btn-create"
          size="large"
          color="brwn"
        >
          책 추가
        </Button>
      </div>
    </DrawMainWrap>
  );
}

export default DrawMain;

const BookListContainer = styled.div`
  margin-top: 30px;
  margin-left: 56px;
  height: 421px;
  width: 598px;
  overflow-y: scroll;
`;

const DrawMainWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    margin-top: 94px;
    margin-left: 66px;
  }
  .container {
    width: 710px;
    height: 777px;
    background: #fdf0bc;
    box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.15);
    border-radius: 70px;
  }
  form {
    margin-top: 17px;
    margin-left: 56px;
    width: 585px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    input {
      border: none;
      outline: none;
      margin-left: 13px;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      width: 549px;
      border-radius: 10px;
    }
  }
  .btn-create {
    margin-left: 500px;
    margin-top: 40px;
  }
`;
