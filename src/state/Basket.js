import React from 'react';

const BasketContext = React.createContext({});

export default class BasketProvider extends React.Component {
  state = {
    basket: []
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

  return (
    <BasketContext.Provider value={{
      basket: this.state.basket,
      handleAddArticleToBasket,
      handleRemoveArticleFromBasket
    }}>
      {this.props.children}
    </BasketContext.Provider>
  );
}

export function withBasket(Component) {
  return function WrapperComponent(props) {
    return (
      <BasketContext.Consumer>
        {value => <Component {...props} assets={value} />}
      </BasketContext.Consumer>
    );
  };
}
