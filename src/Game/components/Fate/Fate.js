import React from 'react';

import texts from '../../constants/texts';
import { getRandomInt } from 'utils/random';

function getFateReport(articles, basket) {
  const fate = basket.map(id => articles.byId[id].fate);

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
    if (index === arr.length - 1) {
      return item.end;
    } else {
      return item.normal;
    }
  });
}

export default function Fate({
  articles,
  basket
}) {

  // Returning win condition
  if (basket.length === 0) {
    return (
      <div><h1>{texts.win}</h1></div>
    )
  }

  return (
    <div>
      <h1>FATE</h1>

      <ul>
        {getFateReport(articles, basket).map((fate, index) => {
          return <li key={index}>{fate}</li>
        })}
      </ul>
    </div>
  )
}
