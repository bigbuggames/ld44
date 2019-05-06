import React from "react";
import moment from "moment";
import styled from "styled-components";

import { getRandomInt } from "utils";

const MEAN_LIFE_EXPECTANCY = 80;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5em;
`;

function shortenLifeExpectancy(birth, total) {
  const actualYearsLeft = MEAN_LIFE_EXPECTANCY - moment().diff(birth, "years");
  const currentAge = moment().diff(birth, "years");
  const yearsDiscounted = actualYearsLeft - total.years;
  const totalDiscounted =
    yearsDiscounted - yearsDiscounted * (total.percentage / 100);

  return moment(birth).add(currentAge + totalDiscounted, "years");
}

export default function Obituary({ birthDate, totalPrice }) {
  const day = birthDate.day.value;
  const month = birthDate.month.value;
  const year = birthDate.year.value;

  const birth = moment(`${day} ${month + 1} ${year}`, "DD MM YYYY");
  const death = shortenLifeExpectancy(birth, totalPrice)
    .day(getRandomInt(0, 29))
    .month(getRandomInt(0, 11));

  return (
    <Container>
      <h1>R.I.P</h1>
      {birth.format("dddd Do, MMMM YYYY")}
      {" - "}
      {death.format("dddd Do, MMMM YYYY")}
      <div>Died at the age of {death.diff(birth, "years")}.</div>
    </Container>
  );
}
