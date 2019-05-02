import React, { useState } from 'react';

// TODO: We should get this values from the server
import Articles from 'constants/articles';

const GameContext = React.createContext({});

// TODO: Use action form to modify state
// TODO: Separate different actions into separate files (tbd)

export function GameProvider(props) {
  const [ state, setState ] = useState({
    articles: Articles,
    basket: [],
    playerInfo: {}
  });

  function addArticleToBasket(articleId) {
    if (state.basket.includes(articleId)) { return; }

    setState({
      ...state,
      basket: [
        ...state.basket,
        articleId
      ]
    });
  }

  function removeArticleFromBasket(articleId) {
    setState({
      ...state,
      basket: state.basket.filter(id => id !== articleId)
    });
  }

  function addPlayerInformation(data) {
    setState({
      ...state,
      playerInfo: {
        ...state.playerInfo,
        ...data 
      }
    });
  }

  function getTotalPrice() {
    return state.basket.reduce((acc, id) => {
      const { price } = state.articles.byId[id];
      return {
        percentage: acc.percentage + price.percentage,
        years:  acc.years + price.years
      }
    }, {
      percentage: 0,
      years: 0
    })
  }

  const actions = {
    addArticleToBasket,
    removeArticleFromBasket,
    addPlayerInformation,
    getTotalPrice
  }

  return (
    <GameContext.Provider value={{
      ...state, 
      ...actions
    }}>
      {props.children}
    </GameContext.Provider>
  );
}

export default GameContext;
