import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import text from '../../constants/texts';

import { Button } from '../Elements';

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;

  .Dropdown-root {
    margin-right: 20px;
  }

  .Dropdown-root:last-child {
    margin-right: 0;
  } 
`;

const ShopButton = styled(Button)`
  margin-top: 20px;
`;

function generateRangeArray(start, end) {
  var list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }

  return list;
}

// const FormContainer = styled.div``;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    width: 400px;
    height: 400px;
    margin-top: 100px;
  }

  ${FormContainer} {
    margin-top: 50px;
  }
`;

const BusinessValuesList = styled.div`

`;

const BusinessValue = styled.div`

`;


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
    <HomeLayout>
      <img src='images/demon.png' />

      <FormContainer>
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
          <ShopButton onClick={handleNext}>SHOP NOW</ShopButton>
        }
      </FormContainer>

      <Button onClick={handleNext}>SHOP NOW</Button>
    </HomeLayout>
  )
}
