import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import text from '../../constants/texts';

import { Button } from '../Elements';

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;

  .Dropdown-control {
    margin: 20px;
  }
`;

function generateRangeArray(start, end) {
  var list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }

  return list;
}

export default function Home({
  handleNext,
  onChange,
  playerInfo
}) {
  function onSelect(key) {
    return function(value) {
      onChange({
        [key]: value
      });
    }
  }

  return (
    <div>
      <h1>HOME</h1>

      <DropdownContainer>

        <Dropdown
          options={generateRangeArray(1, 31)} 
          onChange={onSelect('day')} 
          placeholder="Day"
          value={playerInfo.day}
        />

        <Dropdown 
          options={text.months} 
          onChange={onSelect('month')} 
          placeholder="Month" 
          value={playerInfo.month}
        />

        <Dropdown 
          options={generateRangeArray(1950, 2014)} 
          onChange={onSelect('year')}
          placeholder="Year" 
          value={playerInfo.year}
        />

      </DropdownContainer>

      {playerInfo.day && playerInfo.month && playerInfo.year &&
        <Button onClick={handleNext}>Go to SHOP</Button>
      }

      <Button onClick={handleNext}>Go to SHOP</Button>
    </div>
  )
}
