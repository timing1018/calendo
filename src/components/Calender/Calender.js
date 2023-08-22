import React from 'react';
import {useState, useEffect} from 'react';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 로케일을 불러옵니다
import styled, {css} from 'styled-components';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext, MdAdd } from 'react-icons/md';
import axios from "axios";
import HolidayDetail from './HolidayDetail'; 

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

const WeekdaysHeader = styled.tr`
  color: #868e96;
`;

const WeekdayCell = styled.th`
  padding: 10px;
  width: 25px;
  height: 25px;
`;

const TableTd = styled.td`
  padding: 10px;
  width: 25px;
  height: 25px;
  position: relative;
`;

const EventMarkWrapper = styled.div`
  position: relative;
  padding: 0;
  width: 25px;

  cursor: pointer;
`;

const EventMark = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #b497ff;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
`;

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

const EventEditButton = styled.button`
  background: none;
  border: none;
  color: #495057;
  cursor: pointer;
`;

const EventEditIcon = styled.span`
  margin-right: 5px;
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
  padding-top: 40px;
  padding-right: 32px;
  padding-bottom: 30px;

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
  margin-top: 27px;
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

const HolidayMark = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: red;
  margin: 0 auto;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
`;

const LoadingIndicator = () => {
  return <div>Loading...</div>;
};

const Calender =()=>{
  const [getMoment, setMoment]=useState(moment());
  const [holiday, setHoliday] = useState([]); // Initialize with an empty array
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const weekdays = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열

  // 일정 데이터 상태 초기화
  const [events, setEvents] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false); // 일정 추가 모달 표시 여부
  const [newEventDate, setNewEventDate] = useState(''); // 새로운 일정의 날짜
  const [newEventTitle, setNewEventTitle] = useState(''); // 새로운 일정의 제목

  const [editingEvent, setEditingEvent] = useState(null); // 수정 중인 일정 정보

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

              const isToday = days.isSame(moment(), 'day'); // 오늘 날짜인지 확인
              const isSunday = days.day() === 0;
              const locdateString = days.format('YYYYMMDD');
              const isHoliday = holiday.some(holidayDate => holidayDate.locdate.toString() === days.format('YYYYMMDD'));

              const isCurrentMonth = days.month() === today.month(); // 이번 달의 날짜인지 확인
              const tdStyle = {
                color: isSunday ? 'red' : isToday ? '#c5aeff' : isCurrentMonth ? (isHoliday ? 'red' : '#343a40') : '#acacac',
                fontWeight: isToday ? '600' : 'normal', // 오늘 날짜는 더 강조된 글꼴 두께,
                backgroundColor: isToday ? '#8758ff' : '',
                borderRadius: isToday ? '50%' : '',
              };
                
              console.log("isHoliday:", isHoliday);

              // 모든 날짜에 대해 cellContent 생성
              const cellContent = (
                <TableTd key={index} style={tdStyle}>
                  <span onClick={() => handleCellClick(days.format('YYYY-MM-DD'))}>{days.format('D')}</span>
                  {event && (<EventMarkWrapper><EventMark /></EventMarkWrapper>)}
                  {/* {isHoliday && <HolidayMark />} */}
                  {isHoliday && (
                    <HolidayMark
                      onClick={() => {
                        console.log('Checking isHoliday:', days.format('YYYYMMDD'), isHoliday);
                        console.log('Holiday Array:', holiday);
                  
                        const clickedHoliday = holiday.find(
                          (holiday) => holiday.locdate === parseInt(days.format('YYYYMMDD'))
                        );
                        console.log('Clicked Holiday:', clickedHoliday);
                        setSelectedHoliday(clickedHoliday);
                      }}
                    />
                  )}
                </TableTd>
              );

              return cellContent;
            })}
          </tr>
        );
      }
      return result;
    }

    useEffect(() => {
      const fetchHolidayData = async () => {
        setLoading(true);
  
        try {
          const serviceKey = decodeURIComponent(process.env.REACT_APP_SERVICE_KEY);
          const response = await axios.get(
            `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo`,
            {
              params: {
                ServiceKey: serviceKey,
                solYear: getMoment.year(),
                solMonth: (getMoment.month() + 1).toString().padStart(2, '0'),
              },
            }
          );
  
          if (response.data && response.data.response && response.data.response.body) {
            let holidayData = response.data.response.body.items.item;
            if (!Array.isArray(holidayData)) {
              holidayData = [holidayData];
            }
            setHoliday(holidayData);
          } else {
            console.error('Invalid API response format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching holiday data:', error);
        }
  
        setLoading(false);
      };
  
      fetchHolidayData();
    }, [getMoment]);

    const handleAddEvent = () => {
      setShowAddModal(true);
      const currentDate = today.format('YYYY-MM-DD'); // 현재 날짜
      setNewEventDate(currentDate); // 현재 날짜로 초기화
      setSelectedDate(currentDate); // 새로운 일정을 추가한 날짜로 선택된 날짜 업데이트
      setNewEventTitle('');
      setSelectedHoliday(null); // 공휴일 정보 초기화
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
      setSelectedDate(date);
      const clickedHoliday = holiday.find(
        (holiday) => holiday.locdate === parseInt(moment(date).format('YYYYMMDD'))
      );

      console.log('Clicked Holiday:', clickedHoliday); // 추가
      setSelectedHoliday(clickedHoliday);
      setNewEventDate(date); // 클릭한 날짜로 newEventDate 업데이트
    };

      
    const handleEditEvent = (event) => {
      setEditingEvent(event); // 수정 중인 일정 정보 설정
      setShowAddModal(true); // 모달 표시
      setNewEventDate(event.date); // 수정 중인 일정의 날짜 설정
      setNewEventTitle(event.title); // 수정 중인 일정의 제목 설정
    };
  
    const handleUpdateEvent = () => {
      const updatedEvent = { ...editingEvent, date: newEventDate, title: newEventTitle };
      const updatedEvents = events.map(event =>
        event === editingEvent ? updatedEvent : event
      );
      setEvents(updatedEvents);
      setEditingEvent(null); // 수정 중인 일정 정보 초기화
      setShowAddModal(false); // 모달 닫기
    };

    const handleDeleteEvent = (event) => {
      const updatedEvents = events.filter(existingEvent => existingEvent !== event);
      setEvents(updatedEvents);
    };

  return (
    <CalenderContainer>
      {/* 로딩 중이면 로딩 상태를 표시, 아니면 캘린더 컴포넌트를 표시 */}
      {loading ? (
        <LoadingIndicator />
      ) : (
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
            <thead>
              <WeekdaysHeader>
                {weekdays.map((weekday, index) => (
                  <WeekdayCell key={index}>{weekday}</WeekdayCell>
                ))}
              </WeekdaysHeader>
            </thead>
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
                  {editingEvent ? (
                    <>
                      <CalenderBtn onClick={handleUpdateEvent}>Update Event</CalenderBtn>
                      <CalenderBtn onClick={() => setEditingEvent(null)}>Cancel</CalenderBtn>
                    </>
                  ) : (
                    <>
                      <CalenderBtn onClick={handleSaveEvent}>Add Event</CalenderBtn>
                      <CalenderBtn onClick={handleCancelAddEvent}>Cancel</CalenderBtn>
                    </>
                  )}
                </BtnWrap>
              </InputWrap>
            </InputPositioner>
          )}

        
      </CalenderWrapper>
      )}
      
      {((eventList.length > 0 && selectedDate) || (selectedHoliday && selectedHoliday.locdate)) && (
        <EventList>
          <EventListWrap>
            {selectedHoliday && (
              <>
                <EventDate>{moment(selectedHoliday.locdate.toString()).format('YYYY년 MM월 DD일 dddd')}</EventDate>
                <EventTitle>{selectedHoliday.dateName}</EventTitle>
              </>
            )}
            
            {!selectedHoliday && eventList.length > 0 && (
              <>
                <EventDate>{moment(selectedDate).format('YYYY년 MM월 DD일 dddd')}</EventDate>
                {eventList.map((event, index) => (
                  <EventItem key={index} data-istoday={moment().format('YYYY-MM-DD') === event.date}>
                    <EventTitle>
                      {event.title}
                      <EventEditButton onClick={() => handleEditEvent(event)}>
                        <EventEditIcon>✎</EventEditIcon>Edit
                      </EventEditButton>
                      <EventEditButton onClick={() => handleDeleteEvent(event)}>
                        <EventEditIcon>🗑</EventEditIcon>Delete
                      </EventEditButton>
                    </EventTitle>
                  </EventItem>
                ))}
              </>
            )}

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