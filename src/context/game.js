import React from 'react';

// TODO: We should get this values from the server
import Articles from 'constants/articles';

const GameContext = React.createContext({});

// TODO: Use useState hook por global state
// TODO: Use action form to modify state
// TODO: Separate different actions into separate files (tbd)

export class GameProvider extends React.Component {
  state = {
    articles: Articles,
    basket: [],
    playerInfo: {}
  }

  addArticleToBasket = (articleId) => {
    if (this.state.basket.includes(articleId)) { return; }

    this.setState({
      ...this.state,
      basket: [
        ...this.state.basket,
        articleId
      ]
    });
  }

  removeArticleFromBasket = (articleId) => {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(id => id !== articleId)
    });
  }

  actions = {
    addArticleToBasket: this.addArticleToBasket,
    removeArticleFromBasket: this.removeArticleFromBasket
  }

  render() {
    return (
      <GameContext.Provider value={{
        ...this.state, 
        ...this.actions
      }}>
        {this.props.children}
      </GameContext.Provider>
    )
  }
};

export default GameContext;
