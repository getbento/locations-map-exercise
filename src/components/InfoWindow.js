import React from "react";
import styled from "styled-components";

const InfoWindowWrapper = styled.div`
  & * {
    margin: 0;
  }
`;
const DetailsLink = styled.p`
  font-weight: 300;
  font-style: italic;
  cursor: pointer;
  color: blue;
`;

const InfoWindow = props => {
  const item = props.item;
  return (
    <InfoWindowWrapper>
      <h4>{item.name}</h4>
      <p>{item.address}</p>
      <DetailsLink onClick={() => props.toggleExtendedInfo(item)}>
        {"View Details"}
      </DetailsLink>
    </InfoWindowWrapper>
  );
};

export default InfoWindow;
