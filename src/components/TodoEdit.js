import React from 'react';
import { useTodoState } from '../TodoContext';

function TodoEdit() {
  const todos = useTodoState(); // TodoContext에서 todo 리스트를 가져옴

  const onEditToggle = (id, text) => {
    setEditingId(id);
    setValue(text);
  };

  return (
    <>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEditToggle={onEditToggle} // 수정하기 아이콘 클릭 시 호출될 함수 전달
        />
      ))}
    </>
  );
}

export default React.memo(TodoEdit);