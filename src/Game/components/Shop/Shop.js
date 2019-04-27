import React from 'react';
import styled from 'styled-components';

import { Button } from '../Elements';
import Basket from './Basket';
import { Article } from './Article';

export default function Shop({
  handleNext,
  articles,
  basket,
  onAddArticleToBasket,
  onRemoveArticleFromBasket
}) {
  return (
    <div>
      <h1>SHOP</h1>

      <h2>Articles</h2>
      <ul>
        {articles.allIds.map(id => {
          const article = articles.byId[id];
          const inBasket = basket.includes(id);

          return (
            <Article key={article.id}>
              <span>{article.name}</span>
              <Button onClick={onAddArticleToBasket(article.id)} disable={inBasket}>Buy</Button>
            </Article>
          )
        })}
      </ul>

      <Basket 
        basket={basket} 
        articles={articles} 
        onRemoveArticleFromBasket={onRemoveArticleFromBasket}
        handleNext={handleNext}
      />
    </div>
  )
}
