import React from "react";
import styled from "styled-components";
//import "@fontsource/noticia-text";
import { useHistory } from "react-router-dom";

function BookList({ book }) {
  //history
  const history = useHistory();

  //BookList 순회하면서 출력하는 건 DrawMain에서
  const gotoPage = (id) => {
    //book.create의 param값을 아이디로 지정
    history.push(`/bookreader/${id}`);
  };

  return (
    <BookListWrap>
      <div onClick={() => gotoPage(book.book_id)} className="list-container">
        <div className="list-title">{book.title}</div>
      </div>
    </BookListWrap>
  );
}

export default BookList;

const BookListWrap = styled.div`
  margin-bottom: 24px;
  .list-container {
    width: 583px;
    height: 111px;
    background: #ffffff;
    border-radius: 20px;
  }
  .list-title {
    padding-top: 21px;
    padding-left: 22px;
    font-family: Noto Sans Tai Viet;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.03em;
    color: #0a0909;
  }
`;
