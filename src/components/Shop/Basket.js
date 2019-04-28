import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { Button, SmallButton, TinyButton, Header } from '../Elements';
import Colors from 'constants/colors';

const BasketList = styled.ul`
  padding-left: 0;
`;

const ExpandingContainer = styled.div`
  overflow: hidden;
  margin-left: 20px;
  background-color: ${Colors.white};
  top: 0;
  bottom: 0;
  right: 0;

  ${props => props.open 
    ? css`
      width: 300px;
      padding: 20px;
      border-left: 2px solid  ${Colors.black};
    ` 
    : css`
      width: 0;
    `
  }

  transition: width 200ms ease-in;
`;

const FixedContainer = styled.div`
  position: fixed;
  width: 280px;
`;

const ConfirmationContainer = styled.div``;
const DecisionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
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

const ItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-left: 5px solid ${Colors.danger};
  width: 100%;

  img {
    height: 25px;
    width: 25px;
  }
`;

const ItemInfo = styled.div`
  padding-left: 20px; 
`;

const Price = styled.div`
  font-size: 12px;
  color: ${Colors.grey400};
`;

function BasketItem({
  article, 
  onRemoveArticleFromBasket
}) {
  return (
    <ItemContainer>
      <ItemInfo>
        <div>{article.name}</div>
        <Price>Price: -{article.price.percentage}% lifespan, -{article.price.years} years</Price>
      </ItemInfo>
      <img src='images/pentagram.png' onClick={onRemoveArticleFromBasket(article.id)} />
    </ItemContainer>
  );
}

const BasketPrice = styled.div`
  margin: 40px 0 20px 0;
  font-weight: bold;
  font-size: 1em;
`;

const Cost = styled.div`
  color: ${Colors.grey400};
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Value = styled.span`
  font-size: 1.4em;
  color: ${Colors.black};
`;

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
          {basket.map((id, index) => (
            <BasketItem 
              key={`basket_item_${index}`}
              article={articles.byId[id]} 
              onRemoveArticleFromBasket={onRemoveArticleFromBasket} 
            />
          ))}
        </BasketList>

        <BasketPrice>
          <div>TOTAL</div>
          <Cost>Lifespan reduction: <Value>{price.percentage}%</Value></Cost>
          <Cost>Time lost: <Value>{price.years} years</Value></Cost>
        </BasketPrice>

        {openConfirmation && !confirmed && 
          <ConfirmationContainer>
            <div>Are you sure?</div>
            <DecisionContainer>
              <SmallButton 
                color={Colors.danger} 
                hoverColor={Colors.dangerHover}
                onClick={handleNegativeCheckout}
              >
                No
              </SmallButton>
              <SmallButton color={Colors.success} onClick={handleNext}>Yes</SmallButton>
            </DecisionContainer>
          </ConfirmationContainer>
        }

        {!openConfirmation && <Button onClick={handleFalseCheckout}>Checkout</Button>}

      </FixedContainer>
    </ExpandingContainer>
  )
}
