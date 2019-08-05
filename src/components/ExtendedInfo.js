import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";

const ExtendedInfoPanel = styled.div`
  background: rgba(255, 255, 255, 0.95);
  position: absolute;
  z-index: 2000;
  width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const ExitWrapper = styled.div`
  text-align: right;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const InfoWrapper = styled.div`
  padding: 0 30px;
  & p {
    margin: 0;
    font-size: 12px;
  }
`;

const XCircle = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: grey;
  cursor: pointer;
  margin-top: -20px;
  color: white;
  text-align: center;

  & p {
    margin: -2px 0 0 0;
    font-size: 24px;
    font-weight: 800;
  }
`;

const ImageWrapper = styled.div`
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 150px;
  height: 150px;
  margin: 5px;
`;

const Images = styled.div`
  display: flex;
  padding: 10px 30px;
  justify-content: space-around;
`;

const ExtendedInfo = props => {
  const item = props.item;
  return (
    <ExtendedInfoPanel>
      <ExitWrapper>
        <XCircle onClick={props.toggleExtendedInfo}>
          <p>x</p>
        </XCircle>
      </ExitWrapper>
      <h2>{item.name}</h2>
      <InfoWrapper>
        {item.address}
        {parse(item.hours)}
      </InfoWrapper>
      {item.images[0] && item.images[0].url && (
        <Images>
          {item.images.map(image => (
            <ImageWrapper image={image.url} key={image.url}/>
          ))}
        </Images>
      )}
    </ExtendedInfoPanel>
  );
};

export default ExtendedInfo;
