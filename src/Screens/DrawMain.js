import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../components/Title";
import styled from "styled-components";
import BookList from "../components/BookList";
import Button from "../components/Button";
import {Link} from "react-router-dom";

function DrawMain({ history }) {
  baseUrl = "http://localhost:8000"

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
        //ret = response.data.RESULT;
      })
      .catch((error) => {
        console.error(error);
      });
    //return { ret };
  }
  //search 인풋 받을 state 변수
  const [searchBook, setSearchBook] = useState();
  //뷰에 보일 book 구성할 state 변수
  const [books, setBooks] = useState(
    []
    //JSON.parse(localStorage.getItem("books") || "[]")
  );

  //뷰에 보일 book를 구성하기 위한 로컬스토리지 값
  const localBooks = JSON.parse(localStorage.getItem("books"));

  //search Input태그의 onchange값 제어
  const changeHandler = (event) => {
    setSearchBook(event.target.value); //input값 조정하기 위해서 필요
    //filter를 통해 로컬스토리지배열 객체 내부 title 값에 event.target.balue값이 들어가는 경우 그 객체 저장
    const filterBooks = localBooks.filter((element) =>
      element.title.match(event.target.value)
    );
    //인풋값이 있으면 filterbooks 보여줌
    if (event.target.value) {
      setBooks(filterBooks);
    } else {
      //인풋값이 없으면 그냥 로컬스토리지 모든 책 보여줌
      setBooks(JSON.parse(localStorage.getItem("books")));
    }
  };

  const gotoCreate = () => {
    history.push("/createbook");
  };
  return (
    <DrawMainWrap>
      <div className="container">
        <Title className="title" />
        <form>
          {/*<img src={searchIcon} className="searchIcon" />*/}
          <input
            className="searchInput"
            type="text"
            value={searchBook}
            onChange={changeHandler}
            placeholder="검색어를 입력하세요"
          ></input>
        </form>
        <BookListContainer>
          {books &&
            books.map((book, index) => <BookList book={book} key={index} />)}
        </BookListContainer>
        <Button
          onClick={gotoCreate}
          className="btn-create"
          size="large"
          color="gray"
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
  height: 381px;
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
  form {
    margin-top: 17px;
    margin-left: 56px;
    width: 585px;
    height: 40px;
    background: #e7e7e7;
    border-radius: 10px;
    display: flex;
    input {
      border: none;
      outline: none;
      background: #e7e7e7;
      margin-left: 13px;
      font-family: Noto Sans Tai Viet;
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
