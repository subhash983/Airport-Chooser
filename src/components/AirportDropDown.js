import React from "react";
import styled from "styled-components";

const ListItem = styled.li`
  cursor: pointer;
  height: 15px;
  border-bottom: 1px solid lightgray;
  padding: 7%;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  list-style: none;
  font-family: "Lato", sans-serif;
  font-size: 13px;
  font-weight: 400;
  padding: 0;
  margin: 0;
`;

const AirportDropDown = React.memo(({ airports, handleAirportItemClick }) => {
  return (
    <List>
      {airports &&
        airports.map((airport) => (
          <ListItem
            key={airport.code}
            airport={airport}
            onClick={handleAirportItemClick}
            data-airportcode={airport.code}
            data-airportcity={airport.city}
            data-airportname={airport.name}
          >
            <div> {`${airport.name || airport.city}(${airport.code})`}</div>
            <div> {`${airport.city}-${airport.country}`}</div>
          </ListItem>
        ))}
    </List>
  );
});

export default AirportDropDown;
