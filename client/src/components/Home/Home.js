import React from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import moment from "moment";
import get from "lodash/get";

import { Colors } from "GlobalStyle";
import BusinessValueList from "constants/businessValues";
import { useProfile } from "context/profile";
import { generateRangeArray } from "utils";

import { Button } from "../Elements";

const ValueName = styled.div`
  margin-bottom: 5px;
  font-size: 1.2em;
  color: ${Colors.danger};
`;

const ValueDescription = styled.div`
  text-align: justify;
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
  );
}

const ValuesList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  max-width: 800px;

  @media (max-width: 500px) {
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

  @media (max-width: 500px) {
    ${ValueLayout} {
      flex-direction: row;

      img {
        margin: 0 20px 0 0;
      }
    }
  }
`;

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: ${Colors.danger};
  }

  @media (max-width: 500px) {
    margin-bottom: 300px;
  }
`;

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    width: 200px;
    height: 200px;
    margin-top: 40px;
  }

  ${FormContainer} {
    margin-top: 10px;
  }
`;

const Title = styled.div`
  font-family: "Leckerli One", cursive;
  font-size: 50px;
  text-align: center;
  color: ${Colors.danger};
  margin-bottom: 20px;
`;

export default function Home({ handleNext }) {
  const { profile, addProfileData } = useProfile();

  function onSelect(key) {
    return function(value) {
      addProfileData({
        [key]: value
      });
    };
  }

  const monthOptions = [
    { value: 0, label: "January", days: 31 },
    { value: 1, label: "February", days: 28 },
    { value: 2, label: "March", days: 31 },
    { value: 3, label: "April", days: 30 },
    { value: 4, label: "May", days: 30 },
    { value: 5, label: "June", days: 31 },
    { value: 6, label: "July", days: 30 },
    { value: 7, label: "August", days: 31 },
    { value: 8, label: "September", days: 30 },
    { value: 9, label: "October", days: 31 },
    { value: 10, label: "November", days: 30 },
    { value: 11, label: "December", days: 31 }
  ];

  function generateDayArrayByMonth(month = {}) {
    return generateRangeArray(1, month.days || 31);
  }

  function isValidDay(day, month) {
    // return day <= dayCountByMonth[month];
  }

  return (
    <HomeLayout>
      <img src="images/demon_circle.png" />

      <Title>Luci's Little Trinkets</Title>

      <ValuesList>
        <Row>
          <BusinessValue data={BusinessValueList[0]} />
          <BusinessValue data={BusinessValueList[1]} />
        </Row>

        <InvertedRow>
          <BusinessValue data={BusinessValueList[2]} />
          <BusinessValue data={BusinessValueList[3]} />
        </InvertedRow>
      </ValuesList>

      <FormContainer>
        <p>Select your birthdate:</p>
        <DropdownContainer>
          <Dropdown
            options={generateDayArrayByMonth(profile.month)}
            onChange={onSelect("day")}
            placeholder="Day"
            value={profile.day}
          />

          <Dropdown
            options={monthOptions}
            onChange={onSelect("month")}
            placeholder="Month"
            value={profile.month}
          />

          <Dropdown
            options={generateRangeArray(1950, 2012).reverse()}
            onChange={onSelect("year")}
            placeholder="Year"
            value={profile.year}
          />
        </DropdownContainer>

        {profile.day && profile.month && profile.year && (
          <ShopButton onClick={handleNext}>SHOP NOW</ShopButton>
        )}
      </FormContainer>
    </HomeLayout>
  );
}
