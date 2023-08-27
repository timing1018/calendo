import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../../TodoContext';

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
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #3e3e3e;
      &:hover {
        background: #919191;
      }
      &:active {
        background: #d3d3d3;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}

    @media (max-width: 514px) {
    /* width: 55px;
    height: 55px; */
    font-size: 0px;
    bottom: 0;
    background: #8758ff;
    border-radius: 50%;

    &:before {
      content: '+';
      font-size: 48px;
      color: white;
    }
  }
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

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
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value);
  const onSubmit = e => {
    e.preventDefault(); // 새로고침 방지
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false
      }
    });
    setValue(''); // value 초기화
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input 
              autoFocus 
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              onChange={onChange}
              value={value}
              done={false}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <PlusButton onClick={onToggle} open={open}>
        <MdAdd />
      </PlusButton>
    </>
  );
}

export default React.memo(TodoCreate);