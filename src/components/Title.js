import React from "react";
import styled from "styled-components";

function Title() {
  require("typeface-pompiere");
  return (
    <TitleWrap>
      <div className="title">코소롱</div>
    </TitleWrap>
  );
}

export default Title;

const TitleWrap = styled.div`
  .title {
    font-family: Pompiere;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    letter-spacing: 0.03em;
    color: #000000;
    margin-bottom: 15px;
  }
`;
