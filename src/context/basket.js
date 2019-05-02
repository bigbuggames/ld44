import React, { useState, useContext, useMemo } from 'react';

const BasketContext = React.createContext({});

function BasketProvider(props) {
  const [ basket, setBasket ] = useState([]);

  const value = useMemo(() => {
    return { 
      basket, 
      setBasket
    }
  }, [ basket ]);

  return <BasketContext.Provider value={value} {...props} />;
}

function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider')
  }
  const { basket, setBasket } = context;

  function addToBasket(articleId) {
    if (basket.includes(articleId)) { return; }
    setBasket([
      ...basket,
      articleId
    ]);
  }
  
  function deleteFromBasket(articleId) {
    setBasket([
      ...basket,
      basket.filter(id => id !== articleId)
    ]);
  }

  function getTotalPrice(articles) {
    return basket.reduce((acc, id) => {
      const { price } = articles.byId[id];
      return {
        percentage: acc.percentage + price.percentage,
        years:  acc.years + price.years
      }
    }, {
      percentage: 0,
      years: 0
    })
  }

  return {
    basket,
    addToBasket,
    deleteFromBasket,
    getTotalPrice
  }
}

export {
  BasketProvider,
  useBasket
};
