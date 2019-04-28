import styled, { css } from 'styled-components';

import Colors from 'constants/colors'

export const Button = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${props => props.disable ? Colors.grey : Colors.pink};
`;

export const TinyButton = styled.div`
  height: 15px;
  padding: 2px;
  border: 2px solid red;
  border-radius: 5px;
  color: red;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DecisionButton = styled.div`
  height: 50px;
  width: 50px;
  border: 2px solid ${props => props.color};
  border-radius: 5px;
  color: ${props => props.color};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SmallButton = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${props => props.disable
    ? css`
      border: 2px solid grey;
      color: grey;
      cursor: not-allowed;
      &:hover {
        background-color: #F2F2F2;
      }
    `
    : css`
      border: 2px solid forestgreen;
      color: forestgreen;
      &:hover {
        background-color: #E0F8E0;
      }
    `
  }
`;

export const Header = styled.div`
  font-family: 'Leckerli One', cursive;
  ${props => props.size === 'lg'
    ? css`
      font-size: 30px;
    `
    : css`
      font-size: 20px;
    `
  };
`;
