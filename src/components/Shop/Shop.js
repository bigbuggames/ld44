import React from 'react';
import styled from 'styled-components';

import { Colors } from 'GlobalStyle';
import { Button, Header } from '../Elements';

import Basket from './Basket';
import ArticleList from './Article';

const ShopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubContainer = styled.div`
  display: flex;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 50px;
  border-right: 2px solid ${Colors.pink};
  padding: 30px 20px 20px 20px;
  background-color: ${Colors.white};
  min-width: 300px;

  img {
    position: fixed;
    width: 250px;
    height: 270px;
    padding-left: 20px;
  }

  nav {
    position: fixed;
    top: 300px;
  }
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Shop({
  handleNext
}) {
  return (
    <ShopContainer>

      <SubContainer>

        <Menu>
          <img src='images/demon_face.png' />
          <nav>
            <ul>
              <li>About us</li>
              <li>FAQ</li>
              <li>Shipping costs</li> 
              <li>Refund policy</li>
            </ul>
          </nav>
        </Menu>
    
        <div>
          <h1>Articles</h1>
          <ArticleList />
        </div>

      </SubContainer>

      <Basket handleNext={handleNext} />
    </ShopContainer>
  )
}
