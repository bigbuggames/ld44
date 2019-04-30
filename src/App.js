import React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyle from './GlobalStyle';
import Home from './components/Home';
import Shop from './components/Shop';
import Fate from './components/Fate';
import Articles from './constants/articles';
import Colors from './constants/colors';

class App extends React.Component {
  static HOME = 1;
  static SHOP = 2;
  static FATE = 3;

  state = {
    gameState: App.HOME,
    articles: Articles,
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

        {this.state.gameState === App.HOME && 
          <Home
            handleNext={this.handleStateChange(App.SHOP)}
            playerInfo={this.state.playerInfo}
            onChange={this.handleSubmit}
          />
        }

        {this.state.gameState === App.SHOP &&
          <Shop 
            articles={this.state.articles}
            basket={this.state.basket}
            onAddArticleToBasket={this.handleAddArticleToBasket}
            onRemoveArticleFromBasket={this.handleRemoveArticleFromBasket}
            handleNext={this.handleStateChange(App.FATE)} 
          />
        }

        {this.state.gameState === App.FATE && 
          <Fate 
            basket={this.state.basket} 
            articles={this.state.articles}
            playerInfo={this.state.playerInfo} 
          />
        }
  
      </>
    )
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

if (process.env.NODE_ENV !== 'production') {
  // Enables hot module reloading
  if(module.hot) {
    module.hot.accept();
  }
}

