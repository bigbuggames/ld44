import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { Button, Header } from '../Elements';
import Colors from 'constants/colors';

const TinyButton = styled.div`
  height: 15px;
  padding: 2px;
  border: 2px solid ${Colors.red};
  border-radius: 5px;
  color: red;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const DecisionButton = styled.div`
  height: 50px;
  width: 50px;
  border: 2px solid ${props => props.color};
  border-radius: 5px;
  color: ${props => props.color};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const BasketItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 200px;
`;

const BasketList = styled.ul`
  padding-left: 0;
`;

const BasketPrice = styled.div`
  margin-bottom: 20px;
`;

const ExpandingContainer = styled.div`
  overflow: hidden;
  margin-left: 20px;
  background-color: white;
  top: 0;
  bottom: 0;
  right: 0;

  ${props => props.open 
    ? css`
      width: 400px;
      padding: 20px;
      border-left: 2px solid  ${Colors.pink};
    ` 
    : css`
      width: 0;
    `
  }

  transition: width 200ms ease-in;
`;

const FixedContainer = styled.div`
  position: fixed;
`;

const ConfirmationContainer = styled.div``;

const DecisionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

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
  const [openBasket, setOpenBasket] = useState(false);
  const [confirmed, setConfirmation] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  function handleFalseCheckout() {
    setOpenConfirmation(true);
  }

  function handleNegativeCheckout() {
    setOpenConfirmation(false);
    setConfirmation(false)
  }

  const price = getTotalPrice(basket, articles);

  useEffect(() => {
    if (basket.length > 0) {
      setOpenBasket(true);
    } else {
      setOpenBasket(false);
    }
  });

  return (
    <ExpandingContainer open={openBasket}>
      <FixedContainer>
        <h1>Basket</h1>

        <BasketList>
          {basket.map(id => {
            const article = articles.byId[id]
            return (
              <BasketItem key={article.id}>
                <span>{article.name}</span>
                <TinyButton onClick={onRemoveArticleFromBasket(article.id)}>X</TinyButton>
              </BasketItem>
            )
          })}
        </BasketList>

        <BasketPrice>
          <div>TOTAL</div>
          <div>percentage: {price.percentage}</div>
          <div>years: {price.years}</div>
        </BasketPrice>

        {openConfirmation && !confirmed && 
          <ConfirmationContainer>
            <div>Are you sure?</div>
            <DecisionContainer>
              <DecisionButton color='green' onClick={handleNext}>Yes</DecisionButton>
              <DecisionButton color='red' onClick={handleNegativeCheckout}>No</DecisionButton>
            </DecisionContainer>
          </ConfirmationContainer>
        }

        {!openConfirmation && <Button onClick={handleFalseCheckout}>Checkout</Button>}

      </FixedContainer>
    </ExpandingContainer>
  )
}
