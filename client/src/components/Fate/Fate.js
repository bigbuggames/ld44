import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

import { getRandomInt } from "utils";
import { Colors } from "GlobalStyle";
import { useArticles } from "context/articles";
import { useBasket } from "context/basket";
import { useProfile } from "context/profile";

import Obituary from "./Obituary";

function getFateReport(articles, basket = []) {
  const basketItems = basket.map(id => articles.byId[id]);
  const fateList = basketItems.map(item => item.fate);

  // If we only select one article we return the solo fate
  if (fateList.length === 1) {
    return [fateList[0].solo];
  }

  // Reorder dog/cat fate to the end
  const lastFateWhitelist = [0, 1];

  // Get normal fates excluding the ones that need to be last
  const normalFatesWithLastExcluded = basketItems
    .filter(item => !lastFateWhitelist.includes(item.id))
    .map(item => item.fate.normal);

  // Get last fates
  const lastFates = basketItems
    .filter(item => lastFateWhitelist.includes(item.id))
    .map(item => item.fate.normal);

  // Get ending fate
  const endingFates = fateList.filter(item => item.end);
  let ending;
  if (endingFates.length > 0) {
    ending = endingFates[0].end;
  }

  return [...normalFatesWithLastExcluded, ending, ...lastFates];
}

const Container = styled.div`
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  z-index: 1;

  display: flex;
  justify-content: center;

  color: ${Colors.white};
  background-color: ${Colors.black};
`;

const fadeIn = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
  }
`;

const CenterPanel = styled.div`
  max-width: 800px;
  padding: 100px 0;
  animation: ${fadeIn} 2s ease-in;
`;

const FateList = styled.ul`
  list-style: none;
  padding-right: 20px;
`;

const FateItem = styled.li`
  padding-top: 20px;
`;

export default function Fate() {
  const { articles } = useArticles();
  const { basket, getTotalPrice } = useBasket();
  const { profile } = useProfile();

  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <Container>
      <CenterPanel>
        <Obituary totalPrice={getTotalPrice(articles)} birthDate={profile} />
        <FateList>
          {getFateReport(articles, basket).map((fate, index) => {
            return <FateItem key={index}>{fate}</FateItem>;
          })}
        </FateList>
      </CenterPanel>
    </Container>
  );
}
