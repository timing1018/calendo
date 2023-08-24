import React from 'react';
import styled from 'styled-components';

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


const CalendarEventForm = ({
  showAddModal,
  setShowAddModal,
  newEventDate,
  newEventTitle,
  setNewEventDate,
  setNewEventTitle,
  editingEvent,
  setEditingEvent,
  handleUpdateEvent,
  handleSaveEvent,
  handleCancelAddEvent,
}) => {
  return (
    showAddModal && (
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
                <CalenderBtn onClick={() => { setEditingEvent(null); setShowAddModal(false); }}>Cancel</CalenderBtn>
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
    )
  );
};

export default CalendarEventForm;
