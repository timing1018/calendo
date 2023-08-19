import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdEdit } from 'react-icons/md';
import { useTodoDispatch } from '../../TodoContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    color: #3e3e3e;
  }
  display: none;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #3e3e3e;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
    ${Edit} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  /* background-color: #ced4da; */
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #8758ff;
      background-color: #8758ff;
      /* color: #fff; */
      color: #c5aeff;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
      /* color: #c5aeff; */
      text-decoration: line-through;
    `}
`;

const Input = styled.input`
  flex: 1;
  font-size: 21px;
  color: #495057;
  border: none;
  outline: none;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const [editing, setEditing] = useState(false); // 수정 모드 여부 상태 추가
  const [editingValue, setEditingValue] = useState(text); // 수정 중인 글 상태 추가

  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  const onEditToggle = () => {
    setEditing(!editing);
    setEditingValue(text);
  };

  const onChange = e => setEditingValue(e.target.value);

  const onSubmit = () => {
    if (editingValue.trim() === '') return;
    
    dispatch({
      type: 'EDIT',
      id,
      text: editingValue,
    });

    setEditing(false);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      {editing ? (
        <Input
          autoFocus
          value={editingValue}
          onChange={onChange}
          onBlur={onSubmit}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
        />
      ) : (
        <Text done={done}>{text}</Text>
      )}
      <Edit onClick={onEditToggle}>
        <MdEdit />
      </Edit>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
// React.memo: 다른 항목이 업데이트 될 때, 불필요한 리렌더링을 방지(성능 최적화)