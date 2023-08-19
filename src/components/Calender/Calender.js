// import '../Calender/Main.css';
import {useState} from 'react';
import moment from 'moment';
import { styled } from 'styled-components';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const CalenderWrapper = styled.div`
  text-align: center;
  margin-top: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

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
`

const NextBtn = styled.div`
  margin-left: 20px;
`

const Calendertable = styled.table`
  margin: 0 auto;
  font-size: 16px;
`

const TableTd = styled.td`
  padding: 10px;
  width: 25px;
  height: 25px;
`;

const TdToday = styled.td`
  border-radius: 50%;
  color: #c5aeff;
  background-color: #8758ff;
  font-weight: 600;
`;

const TdAnotherMonth = styled.td`
  color: #acacac;
`


const Calender =()=>{

  const [getMoment, setMoment]=useState(moment());

  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

    const calendarArr=()=>{

      let result = [];
      let week = firstWeek;
      for ( week; week <= lastWeek; week++) {
        result = result.concat(
          <tr key={week}>
            {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성

                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return(
                      <TdToday key={index}>
                        <span>{days.format('D')}</span>
                      </TdToday>
                  );
                }else if(days.format('MM') !== today.format('MM')){
                  return(
                      <TdAnotherMonth key={index} >
                        <span>{days.format('D')}</span>
                      </TdAnotherMonth>
                  );
                }else{
                  return(
                      <TableTd key={index}  >
                        <span>{days.format('D')}</span>
                      </TableTd>
                  );
                }
              })
            }
          </tr>
        );
      }
      return result;
    }

  return (
    <CalenderWrapper>

        <CalenderControl>
          <PrevBtn onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }} >
            <MdOutlineNavigateBefore />
          </PrevBtn>
          <div>{today.format('YYYY 년 MM 월')}</div>
          <NextBtn onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }} >
           <MdOutlineNavigateNext /> 
          </NextBtn>
        </CalenderControl>
        <Calendertable>
          <tbody>
            {calendarArr()}
          </tbody>
        </Calendertable>
    </CalenderWrapper>
  );
}
export default Calender;