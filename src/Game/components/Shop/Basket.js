import React from 'react';

import { Button } from '../Elements';
import { Article } from './Article';

export default function Basket({
  articles,
  basket,
  onRemoveArticleFromBasket
}) {

  function getTotalPrice(basket, articles) {
    return basket.reduce((acc, id) => {
      const { price } = articles.byId[id];
      return {
        percentage: acc.percentage + price.percentage,
        years:  acc.years + price.years
      }
    }, {
      percentage: 0,
      years: 0
    })
  }

  const price = getTotalPrice(basket, articles);

  return (
    <div>
      <h2>Basket</h2>

      <ul>
        {basket.map(id => {
          const article = articles.byId[id]
          return (
            <Article key={article.id}>
              <span>{article.name}</span>
              <Button onClick={onRemoveArticleFromBasket(article.id)}>Remove</Button>
            </Article>
          )
        })}
      </ul>

      <div>
        <div>TOTAL</div>
        <div>percentage: {price.percentage}</div>
        <div>years: {price.years}</div>
      </div>

  </div>
  )
}
