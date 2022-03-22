import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import styled from "styled-components";

function CreateBook({ history, match }) {
  //moment JS 사용 준비
  const moment = require("moment");
  //createtime 이 페이지를 열자마자 시간을 timestamp에 저장
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  //로컬스토리지 배열 내부 객체 하나
  const [book, setBook] = useState({
    title: "",
    body: "",
    create: timestamp,
    update: "업데이트",
    edit: "",
  });

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

  //타이틀을 배열변수에
  const titleChangeHandler = (event) => {
    event.preventDefault();
    setBook({ ...book, title: event.target.value });
  };

  //내용을 배열변수에
  const contentChangeHandler = (event) => {
    event.preventDefault();
    setBook({ ...book, body: event.target.value });
  };

  //완성된 책객체 하나를 로컬스토리지 배열에 저장
  const saveBooks = (newBook) => {
    setBook(newBook);
    let newBooks;
    if (reBookId) {
      newBooks = localBook.map((element) =>
        element.create === book.create ? newBook : element
      );
    } else {
      newBooks = [...localBook, newBook];
    }
    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  //submit할 때 실행
  const BookSubmit = () => {
    const updateTimeStamp = moment().format("YYYY- MM-DD HH:mm:ss");
    //submit하는 시간과 현재 시간 차이를 저장
    const diffTime = moment(updateTimeStamp, "YYYY- MM-DD HH:mm:ss").fromNow();
    //book 하나 객체에 위 값들 저장
    const newBook = { ...book, update: diffTime, edit: updateTimeStamp };

    localBook.map(
      (e) => (e.update = moment(e.edit, "YYYY- MM-DD HH:mm:ss").fromNow())
    );
    saveBooks(newBook);
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
            value={book.body}
            onChange={contentChangeHandler}
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
        <div className="btn-bottom">
          <Button
            onClick={() => bookRemove(localBook)}
            className="btn-remove"
            color="pink"
            size="large"
          >
            책 삭제하기
          </Button>
          <Button
            onClick={BookSubmit}
            className="btn-done"
            color="grey"
            size="small"
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
  .btn-remove {
    margin-left: 56px;
  }
  .btn-done {
    margin-left: 379px;
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
    width: 598px;
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
