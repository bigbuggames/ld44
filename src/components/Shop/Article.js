import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import GameContext from 'context/game';

import { SmallButton, TinyButton } from '../Elements';
import Colors from 'constants/colors';

const Container = styled.div`
  display: flex;

  max-width: 1000px;
  padding: 20px;
  margin-top: 20px;

  border-left: 10px solid ${Colors.danger};
  border-right: 10px solid ${Colors.danger};
  border-bottom: 1px solid ${Colors.danger};
  border-radius: 10px;
  background-color: ${Colors.white};

  img {
    margin-right: 50px;
    min-height: 200px;
    min-width: 200px;
    align-self: center;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
`;

const OutOfOrder = styled(TinyButton)`
  width: 120px;
  height: 30px;
  border-radius: 10px;
  font-size: 0.6em;
  margin-left: 20px;
  cursor: default;
`;

const Description = styled.div`
  margin-top: 20px;
`;

const Price = styled.div`
  color: ${Colors.grey400};
  padding-bottom: 5px;
  font-size: 18px;
`;

const Value = styled.div`
  margin-left: 15px;
  margin-top: 5px;
`;

const HorizontalRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  ${SmallButton} {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

function Article({ 
  data, 
  onAddArticleToBasket, 
  disable 
}) {
  return (
    <Container>
      <img src={data.image} />

      <Info>
        <div>
          <Name>
            {data.name}
            {data.outOfOrder && <OutOfOrder>OUT OF STOCK</OutOfOrder>}
          </Name>
          <Description>{data.description}</Description>
        </div>

        <HorizontalRow>
          <Price>Price: -{data.price.percentage}% lifespan, -{data.price.years} years</Price>

          {data.outOfOrder === undefined &&
            <SmallButton 
              onClick={onAddArticleToBasket} 
              disable={disable}
            >
              BUY
            </SmallButton>
          }
        </HorizontalRow>
      </Info>
    </Container>
  );
}

const ListContainer = styled.div`
  list-style: none;

  & > div:last-child {
    margin-bottom: 20px;
  }
`;

export default function ArticleList() {
  const { articles, basket, addArticleToBasket } = useContext(GameContext);

  return (
    <ListContainer>
      {articles.allIds.map(id => {
        const inBasket = basket.includes(id);
        return (
          <Article 
            key={id}
            data={articles.byId[id]} 
            onAddArticleToBasket={() => addArticleToBasket(id)}
            disable={inBasket}
          />
        );
      })}
    </ListContainer>
  );
}
