import React from 'react';
import { Button } from '../Elements';

export default function Shop({
  handleNext,
  articles
}) {
  return (
    <div>
      <h1>SHOP</h1>

      <ul>
        {articles.map(article => {
          return <li key={article.id}>{article.title}</li>
        })}
      </ul>

      <Button onClick={handleNext}>Go to FATE</Button>
    </div>
  )
}
