import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import text from 'constants/texts';
import BusinessValueList from 'constants/businessValues';

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
    margin-top: 20px;
  }

  ${FormContainer} {
    margin-top: 50px;
  }
`;

const ValueName = styled.div`
  margin-bottom: 5px;
  font-size: 1.2em;
  color: ${Colors.danger};
`;

const ValueDescription = styled.div`

`;

const ValueLayout = styled.div`
  display: flex;
  align-items: center;

  max-width: 500px;
  padding: 20px;

  img {
    margin-right: 20px;
    height: 100px;
    width: 100px;
  }
`;

function BusinessValue({ data }) {
  return (
    <ValueLayout>
      <img src={data.image} alt={data.title} />
      <div>
        <ValueName>{data.title}</ValueName>
        <ValueDescription>{data.description}</ValueDescription>
      </div> 
    </ValueLayout>
  )
}

const ValuesList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  max-width: 800px;

  @media(max-width: 500px) {
    flex-direction: column;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const InvertedRow = styled.div`
  ${ValueLayout} {
    flex-direction: row-reverse;

    img {
      margin: 0 0 0 20px;
    }
  }
`;

function BusinessValuesGrid({
  values
}) {
  return (
    <ValuesList>
      <Row>
        <BusinessValue data={values[0]} />
        <BusinessValue data={values[1]} />
      </Row>

      <InvertedRow>
        <BusinessValue data={values[2]} />
        <BusinessValue data={values[3]} />
      </InvertedRow>
    </ValuesList>
  )
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
    <HomeLayout>
      <img src='images/demon.png' />

      <BusinessValuesGrid values={BusinessValueList} />

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

      {/* <Button onClick={handleNext}>SHOP NOW</Button> */}
    </HomeLayout>
  )
}
