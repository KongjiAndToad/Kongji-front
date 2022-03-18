import React from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { darken } from "polished";

function Button(children, size, color, ...rest) {
  return (
    <ThemeProvider
      theme={{
        palette: {
          pink: "rgb(232,207,207)",
          gray: "rgb(196,196,196)",
          white: "rgb(255,255,255)",
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
    width: "73px",
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
      &:hover {
        background: ${darken(0.2, selected)};
      }
    `;
  }}
`;

const StyledButton = styled.button`
/*공통 스타일*/
outline: none;
border: none;
border-radius: 10px;
color: white:
cursor: pointer;
padding-top: 5px;
padding-bottom: 5px;
text-align: center;
font-family: Noto Sans Tai Viet;
font-style: normal;
font-weight: normal;
font-size: 18px;
letter-spacing: 0.03em;
color: #FFFFFF;
${sizeStyles}
${colorStyles}
`;
