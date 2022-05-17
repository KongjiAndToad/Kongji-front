import React from "react";
import styled, { ThemeProvider, css } from "styled-components";

function Button({ children, size, color, ...rest }) {
  return (
    <ThemeProvider
      theme={{
        palette: {
          brwn: "rgb(195,175,140)",
          txtcolor: "rgb(254,255,205)",
        },
      }}
    >
      <StyledButton size={size} color={color} {...rest}>
        {children}
      </StyledButton>
    </ThemeProvider>
  );
}

export default Button;

const sizes = {
  large: {
    width: "139px",
    height: "45px",
  },
  small: {
    width: "100px",
    height: "45px",
  },
};

//sizeStyles, colorStyles 변수를 지정 후 공통 스타일에 삽입
const sizeStyles = css`
  ${({ size }) => css`
    width: ${sizes[size].width};
    height: ${sizes[size].height};
  `}
`;

const colorStyles = css`
  ${(props) => {
    const selected = props.theme.palette[props.color];
    return css`
      background: ${selected};
    `;
  }}
`;

const StyledButton = styled.button`
  /*공통 스타일*/
  outline: none;
  border: none;
  border-radius: 10px;
  color: txtcolor;
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  letter-spacing: 0.03em;
  color: #ffffff;
  ${sizeStyles}
  ${colorStyles}
`;
