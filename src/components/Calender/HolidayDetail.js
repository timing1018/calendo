import React from 'react';
import styled from 'styled-components';

const HolidayDetailContainer = styled.div`
  text-align: center;
  color: #495057;
`;

const Title = styled.h3`
  font-size: 21px;
  font-weight: 600;
  padding-bottom: 15px;
`;

const Name = styled.div`
  font-size: 18px;
`;

const HolidayDetail = ({ holiday }) => {
  console.log("Holiday object:", holiday); // holiday 객체 확인
  return (
    <HolidayDetailContainer>
      {/* <Title>{holiday?.locdate}</Title> */}
      <Name>{holiday?.dateName}</Name>
    </HolidayDetailContainer>
  );
};

export default HolidayDetail;
