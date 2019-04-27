import React from 'react';
import { Button } from '../Elements';

export default function Form({
  handleNext
}) {
  return (
    <div>
      <h1>FORM</h1>
      <Button onClick={handleNext}>Go to SHOP</Button>
    </div>
  )
}
