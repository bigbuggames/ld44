import styled, { css } from "styled-components";

import { Colors } from "GlobalStyle";

const CommonTheme = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};
  font-weight: bold;
`;

export const GenericButton = styled.div`
  ${CommonTheme}

  ${props =>
    props.disable
      ? css`
          border: 2px solid ${props => props.colors.disable};
          color: ${props => props.colors.disable};
          cursor: not-allowed;
          &:hover {
            background-color: ${props => props.colors.disableHover};
          }
        `
      : css`
          cursor: pointer;
          border: 2px solid ${props => props.colors.success};
          color: ${props => props.colors.success};
          &:hover {
            background-color: ${props => props.colors.successHover};
          }
        `}
`;

GenericButton.defaultProps = {
  disable: false,
  colors: {
    disable: Colors.grey400,
    disableHover: Colors.grey200,
    success: Colors.success,
    successHover: Colors.successHover
  }
};

export const Button = styled(GenericButton)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
`;

export const SmallButton = styled(GenericButton)`
  width: 80px;
  height: 40px;
  border-radius: 10px;

  border: 2px solid ${props => props.color};
  color: ${props => props.color};

  &:hover {
    background-color: ${props => props.hoverColor};
  }
`;

export const TinyButton = styled(GenericButton)`
  height: 15px;
  padding: 2px;
  border-radius: 5px;

  border: 2px solid ${Colors.danger};
  color: ${Colors.danger};

  &:hover {
    background-color: ${Colors.white};
  }
`;
