import React from 'react';
import { Button } from '../Elements';

export default function Home({
  handleNext
}) {
  return (
    <div>
      <h1>HOME</h1>
      <Button onClick={handleNext}>Go to FORM</Button>
    </div>
  )
}
