import React, { useState, useContext, useMemo, useEffect } from "react";

// TODO: We should get this values from the server
import HardcodedArticles from "constants/articles";

const ArticlesContext = React.createContext({});

function ArticlesProvider(props) {
  const [articles, setArticles] = useState({});

  const value = useMemo(() => {
    return {
      articles,
      setArticles
    };
  }, [articles]);

  return <ArticlesContext.Provider value={value} {...props} />;
}

function useArticles() {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within a ArticlesProvider");
  }
  const { articles, setArticles } = context;

  // useEffect(() => {
  //   setArticles(Articles);
  // });

  return {
    articles: HardcodedArticles
  };
}

export { ArticlesProvider, useArticles };
