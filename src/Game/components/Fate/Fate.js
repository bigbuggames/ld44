import React from 'react';

import texts from '../../constants/texts';
import { getRandomInt } from 'utils/random';

function getFateReport(articles, basket) {
  const fate = basket.map(id => articles.byId[id].fate);

  // Recursive function to get random ending
  function getRandomEndIndex(counter = 0) {
    if (counter === fate.length - 1) { return; }

    const index = getRandomInt(0, fate.length - 1);
    if (typeof fate[index].end !== 'undefined') {
      return index
    }

    selectEndIndex(counter + 1);
  }

  const selectedIndex = getRandomEndIndex();

  // Arranging fates
  const orderedFate = [
    ...fate.slice(0, selectedIndex),
    ...fate.slice(selectedIndex + 1, fate.length),
    fate[selectedIndex]
  ]

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
