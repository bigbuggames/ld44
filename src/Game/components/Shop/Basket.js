import React, { useState } from 'react';

import { Button } from '../Elements';
import { Article } from './Article';

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

export default function Basket({
  articles,
  basket,
  onRemoveArticleFromBasket,
  handleNext
}) {
  const [confirmed, setConfirmation] = useState(false);
  const [open, setOpen] = useState(false);

  function handleFalseCheckout() {
    setOpen(true);
  }

  function handleNegativeCheckout() {
    setOpen(false);
    setConfirmation(false)
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

      {open && !confirmed && 
        <div>
          <div>Are you sure?</div>
          <Button onClick={handleNext}>Yes</Button>
          <Button onClick={handleNegativeCheckout}>No</Button>
        </div>
      }

      <Button onClick={handleFalseCheckout}>Checkout</Button>
  </div>
  )
}
