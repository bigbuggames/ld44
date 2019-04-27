import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home';
import Form from './components/Form';
import Shop from './components/Shop';
import Fate from './components/Fate';

import articles from './constants/articles';

class Game extends React.Component {
  static HOME = 0;
  static FORM = 1;
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
    })
  }

  handleRemoveArticleFromBasket = (articleId) => () => {
    this.setState({
      basket: this.state.basket.filter(id => id !== articleId)
    })
  }

  handleStateChange = (gameState) => () => this.setState({ gameState });

  render() {
    return (
      <div>
        {this.state.gameState === Game.HOME && 
          <Home handleNext={this.handleStateChange(Game.FORM)} />
        }

        {this.state.gameState === Game.FORM && 
          <Form 
            handleNext={this.handleStateChange(Game.SHOP)}
            onSubmit={this.handleSubmit}
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
      </div>
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

