import React from 'react';
import styled from 'styled-components';

import { Button, Header } from '../Elements';
import Colors from 'constants/colors';

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
  padding: 20px;
  background-color: ${Colors.white};
  min-width: 200px;

  img {
    position: fixed;
    width: 200px;
    height: 200px;
  }

  nav {
    position: fixed;
    top: 220px;
  }
`;

export default function Shop({
  handleNext,
  articles,
  basket,
  onAddArticleToBasket,
  onRemoveArticleFromBasket
}) {
  return (
    <ShopContainer>

      <SubContainer>

        <Menu>
          <img src='https://dummyimage.com/200/ccb3cc/000000.png&text=Logo' />
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
          <ArticleList 
            articles={articles} 
            basket={basket}
            onAddArticleToBasket={onAddArticleToBasket}
          />
        </div>

      </SubContainer>

      <Basket 
        basket={basket} 
        articles={articles} 
        onRemoveArticleFromBasket={onRemoveArticleFromBasket}
        handleNext={handleNext}
      />
    </ShopContainer>
  )
}
