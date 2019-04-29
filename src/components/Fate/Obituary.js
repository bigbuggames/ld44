import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const MEAN_LIFE_EXPECTANCY = 100;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function shortenLifeExpectancy(birth, total) {
  const actualYearsLeft =
    MEAN_LIFE_EXPECTANCY - moment().diff(birth, 'years');
  const currentAge = moment().diff(birth, 'years');
  const yearsDiscounted = actualYearsLeft - total.years;
  const totalDiscounted =
    yearsDiscounted - yearsDiscounted * (total.percentage / 100);

  return moment(birth).add(currentAge + totalDiscounted, 'years');
}

export default function Obituary({ 
  birthDate, 
  totalPrice 
}) {
  const { day, month, year } = birthDate;

  /*
    TODO: Fix how we store the actual data
    day { value, label }
    month: 'March',
    year GOOD
  */

  const birth = moment().day(day).month(month).year(year);
  const death = shortenLifeExpectancy(birth, totalPrice);

  return (
    <Container>
      <h1>R.I.P</h1>
      {birth.format('dddd, MMMM YYYY')}
      {' - '}
      {death.format('dddd, MMMM YYYY')}
      <div>Died at the age of {death.diff(birth, 'years')}.</div>
    </Container>
  );
}
