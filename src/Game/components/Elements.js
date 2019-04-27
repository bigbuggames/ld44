import styled from 'styled-components';

export const Button = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${props => props.disable ? 'grey' : 'pink'};
`;
