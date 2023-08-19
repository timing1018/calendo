import {useState} from 'react';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 로케일을 불러옵니다
import styled, {css} from 'styled-components';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext, MdAdd } from 'react-icons/md';


const PlusButton = styled.button`
  background: #8758ff;
  &:hover {
    background: #b497ff;
  }
  &:active {
    background: #cfbcff;
  }

  z-index: 5;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 6%;
  /* border-radius: 50%; */
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.open &&
    css`
      display: none;
    `}
`;

const CalenderContainer = styled.div`

`;

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
  cursor: pointer;
`

const NextBtn = styled.div`
  margin-left: 20px;
  cursor: pointer;
`

const Calendertable = styled.table`
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
`

const TableTd = styled.td`
  padding: 10px;
  width: 25px;
  height: 25px;
`;

const TdToday = styled.td`
  border-radius: 50%;
  color: #c5aeff !important;
  background-color: #8758ff;
  font-weight: 600;
`;

const Star = styled.div`
  width: 17px;
  margin: 0 auto;
  border-bottom: 2px solid #b497ff;
`;

const TdAnotherMonth = styled.td`
  color: #acacac;
`

const EventList = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const EventListWrap = styled.div`
  align-items: center;
  padding: 20px 0;
  color: #495057;
`;

const EventItem = styled.div`
`;

const EventDate = styled.div`
  font-size: 21px;
  font-weight: 600;
  padding-bottom: 15px;
`;

const EventTitle = styled.li`
  font-size: 18px;
  margin-left: 60px;
  text-align: left;
  padding: 10px 0;
  color: #495057;
  list-style-type: circle;
  &::marker {
    color: #495057;
  }
`;

const InputPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InputWrap = styled.div`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 50px;
  padding-right: 32px;
  padding-bottom: 50px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  margin-bottom: 15px;
  cursor: pointer;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 44px;
`;

const CalenderBtn = styled.div`
  padding: 10px 15px;
  margin: 0 10px;
  color: #495057;
  background-color: #ced4da;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    color: #c5aeff;
    background: #8758ff;
  }
`;


const Calender =()=>{

  const [getMoment, setMoment]=useState(moment());

  // 일정 데이터 상태 초기화
  const [events, setEvents] = useState([
    // 예시: { date: '2023-08-19', title: 'Example Event' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false); // 일정 추가 모달 표시 여부
  const [newEventDate, setNewEventDate] = useState(''); // 새로운 일정의 날짜
  const [newEventTitle, setNewEventTitle] = useState(''); // 새로운 일정의 제목

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // 선택된 날짜 상태 추가

  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);

    const calendarArr=()=>{

      let result = [];
      let week = firstWeek;
      for ( week; week <= lastWeek; week++) {
        result = result.concat(
          <tr key={week}>
            {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성

                // 예정된 일정이 있는지 확인
                const event = events.find(event => event.date === days.format('YYYY-MM-DD'));

                // 일요일일 경우 레드 컬러로 표시
                const isSunday = days.day() === 0;
                const tdStyle = isSunday ? { color: 'red' } : {};

                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return(
                      <TdToday key={index} style={tdStyle}>
                        <span onClick={() => handleCellClick(days.format('YYYY-MM-DD'))}>{days.format('D')}</span>
                        {event && <Star></Star>}
                      </TdToday>
                  );
                }else if(days.format('MM') !== today.format('MM')){
                  return(
                      <TdAnotherMonth key={index} >
                        <span onClick={() => handleCellClick(days.format('YYYY-MM-DD'))}>{days.format('D')}</span>
                      </TdAnotherMonth>
                  );
                }else{
                  return(
                      <TableTd key={index} style={tdStyle}>
                        <span onClick={() => handleCellClick(days.format('YYYY-MM-DD'))}>{days.format('D')}</span>
                        {event && <Star></Star>}
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

    const handleAddEvent = () => {
      setShowAddModal(true);
      const currentDate = today.format('YYYY-MM-DD'); // 현재 날짜
      setNewEventDate(currentDate); // 현재 날짜로 초기화
      setSelectedDate(currentDate); // 새로운 일정을 추가한 날짜로 선택된 날짜 업데이트
      setNewEventTitle('');
    };
  
    const handleSaveEvent = () => {
      const newEvent = { date: newEventDate, title: newEventTitle };
      setEvents([...events, newEvent]);
      setShowAddModal(false);
    };

    const handleCancelAddEvent = () => {
      setShowAddModal(false);
    };

    const eventList = events
      .filter(event => event.date === selectedDate) // 선택한 날짜에 해당하는 일정만 필터링  

    const handleCellClick = (date) => {
      setSelectedDate(date); // 클릭한 날짜를 선택된 날짜로 설정
    };

  return (
    <CalenderContainer>
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
          {showAddModal && (
            <InputPositioner>
              <InputWrap>
                <Input 
                  autoFocus
                  type="date" 
                  value={newEventDate} 
                  onChange={(e) => setNewEventDate(e.target.value)} 
                />
                <Input 
                  autoFocus
                  type="text" 
                  value={newEventTitle} 
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="일정을 입력하세요"
                />
                <BtnWrap>
                  <CalenderBtn onClick={handleSaveEvent}>Add Event</CalenderBtn>
                  <CalenderBtn onClick={handleCancelAddEvent}>Cancel</CalenderBtn>
                </BtnWrap>
              </InputWrap>
            </InputPositioner>
          )}

        
      </CalenderWrapper>
      {selectedDate && eventList.length > 0 && ( // 오늘 일정이 있는 경우에만 EventList를 노출
        <EventList>
          <EventListWrap>
            <EventDate>{moment(selectedDate).format('YYYY년 MM월 DD일 dddd')}</EventDate>
            {eventList.map((event, index) => (
              <EventItem key={index} data-istoday={moment().format('YYYY-MM-DD') === event.date}>
                <EventTitle>{event.title}</EventTitle>
              </EventItem>
            ))}
          </EventListWrap>
        </EventList>
      )}

      <PlusButton onClick={() => { onToggle(); handleAddEvent(); }} open={showAddModal}>
        <MdAdd />
      </PlusButton>
    </CalenderContainer>
  );
}
export default Calender;