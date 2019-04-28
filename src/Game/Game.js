import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components'

import Home from './components/Home';
import Shop from './components/Shop';
import Fate from './components/Fate';

import articles from 'constants/articles';
import Colors from 'constants/colors';

const GlobalStyle = createGlobalStyle`
  h1 {
    font-family: 'Leckerli One', cursive;
    font-size: 40px;
    text-align: center;
  }

  html, body {
    font-family: 'Laila', serif;
  }
`

class Game extends React.Component {
  static HOME = 1;
  static SHOP = 2;
  static FATE = 3;

  state = {
    gameState: Game.HOME,
    articles,
    basket: [],
    playerInfo: {}
  }

  handleAddArticleToBasket = (articleId) => () => {
    if (this.state.basket.includes(articleId)) {
      return;
    }

    this.setState({
      basket: [ ...this.state.basket, articleId ]
    });
  }

  handleRemoveArticleFromBasket = (articleId) => () => {
    this.setState({
      basket: this.state.basket.filter(id => id !== articleId)
    });
  }

  handleStateChange = (gameState) => () => this.setState({ gameState });
  
  handleSubmit = (data) => this.setState({
    ...this.state,
    playerInfo: {
      ...this.state.playerInfo,
      ...data 
    }
  });

  render() {
    return (
      <>
        <GlobalStyle />

        {this.state.gameState === Game.HOME && 
          <Home
            handleNext={this.handleStateChange(Game.SHOP)}
            playerInfo={this.state.playerInfo}
            onChange={this.handleSubmit}
          />
        }

        {this.state.gameState === Game.SHOP &&
          <Shop 
            articles={this.state.articles}
            basket={this.state.basket}
            onAddArticleToBasket={this.handleAddArticleToBasket}
            onRemoveArticleFromBasket={this.handleRemoveArticleFromBasket}
            handleNext={this.handleStateChange(Game.FATE)} 
          />
        }

        {this.state.gameState === Game.FATE && 
          <Fate basket={this.state.basket} articles={this.state.articles} />
        }
  
      </>
    )
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Game />, rootElement);

if (process.env.NODE_ENV !== 'production') {
  // Enables hot module reloading
  if(module.hot) {
    module.hot.accept();
  }
}

