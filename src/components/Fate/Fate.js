import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import Texts from 'constants/texts';
import Colors from 'constants/colors';
import { getRandomInt } from 'utils/random';

function getFateReport(articles, basket = []) {
  const fate = basket.map(id => articles.byId[id].fate);

  // If we only select one article we return the solo fate
  if (fate.length === 1) {
    return [ fate[0].solo ];
  }

  function getRandomEndFateIndex(possibleEndings) {
    return getRandomInt(0, possibleEndings.length - 1);
  }

  const selectedIndex = getRandomEndFateIndex(fate.filter(item => item.end));

  // Arranging fates
  const orderedFate = [
    ...fate.slice(0, selectedIndex),
    ...fate.slice(selectedIndex + 1, fate.length),
    fate[selectedIndex]
  ];
  
  // Returning array of the strings that need to be rendered
  return orderedFate.map((item, index, arr) => {
    if (index === arr.length - 1 && item.end) {
      return item.end;
    } else {
      return item.normal;
    }
  });
}

const Container = styled.div`
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  z-index : 1;

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

export default function Fate({
  articles,
  basket
}) {
  useEffect(() => {
    window.scroll(0, 0);
  })

  return (
    <Container>
      <CenterPanel>
        <h1>R.I.P</h1>
        <FateList>
          {getFateReport(articles, basket).map((fate, index) => {
            return <FateItem key={index}>{fate}</FateItem>
          })}
        </FateList>
      </CenterPanel>
    </Container>
  )
}
