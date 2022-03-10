import React from "react";
import styled from "styled-components";

function Container() {
  //폰트 타입 불러오기
  //require('typeface-pompiere')
  //require('typeface-podkova')
  return (
    <ContainerWrap>
      <div className="title">코소롱</div>
      {/*<div className="intro">사투리책 & 오디오북 생성기</div>*/}
    </ContainerWrap>
  );
}

export default Container;

const ContainerWrap = styled.div`
  position: relative
  width: 710px;
  height: 777px;
  left: 365px;
  top: 62px;
  
  background: #F5F5F5;
  box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.1);
  border-radius: 70px;
  .title{
    /* top: 166px; */
    position: absolute;
    font-family: Pompiere;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    letter-spacing: 0.03em;
    color: #000000;
    margin-left: 56px;
    margin-top: 104px;
  }
  
  `;
