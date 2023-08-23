import React from 'react';
import styled from 'styled-components';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const CalenderControl = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 36px;
  color: #343a40;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const PrevBtn = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;

const NextBtn = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;


const CalendarHeader = ({ today, handlePrevMon, handleNextMon }) => {
  return (
    <CalenderControl>

      <PrevBtn onClick={handlePrevMon}>
        <MdOutlineNavigateBefore />
      </PrevBtn>

      <div>
        {today.format('YYYY 년 MM 월')}
      </div>

      <NextBtn onClick={handleNextMon}>
        <MdOutlineNavigateNext />
      </NextBtn>
      
    </CalenderControl>
  );
};

export default CalendarHeader;
