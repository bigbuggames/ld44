import React from 'react';

export default function Fate({
  basket
}) {
  return (
    <div>
      <h1>FATE</h1>

      <ul>
        {basket.map(id => <li key={id}>{id}</li>)}
      </ul>
    </div>
  )
}
