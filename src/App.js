import React, { useState } from 'react';
import { createGlobalStyle, styled } from 'styled-components';
import TodoTemplate from './components/Todo/TodoTemplate';
import TodoHead from './components/Todo/TodoHead';
import TodoList from './components/Todo/TodoList';
import TodoCreate from './components/Todo/TodoCreate';
import { TodoProvider } from './TodoContext';
import Calender from './components/Calender/Calender'


const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const TabWrapper = styled.div`
  width: 100%;
  max-width: 515px;
  flex: flex;
  align-items: center;
`

const Tab = styled.div`
  display: inline-block;
  text-align: center;
  width: 50%;
  max-width: 257px;
  padding: 20px 0;
  background-color: #f8f9fa;
  font-size: 21px;
  font-weight: 600;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  
  &:first-child {
    border-right: 1px solid #eee8ff;
    border-top-right-radius: 0px;
  }

  &:last-child {
    border-top-left-radius: 0px;
  }
  
  ${props =>
    props.isSelected &&
    `
    border-bottom: 3px solid #8758ff;
  `}
`

function App() {
  const [selectedTab, setSelectedTab] = useState('tab1');

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };
  
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TabWrapper>
          <Tab
            isSelected={selectedTab === 'tab1'} 
            onClick={() => handleTabChange('tab1')}
          >To do list</Tab>
          <Tab 
            isSelected={selectedTab === 'tab2'}
            onClick={() => handleTabChange('tab2')}
          >Calender</Tab>
        </TabWrapper>
        
        {selectedTab === 'tab1' && (
          <>
            <TodoHead />
            <TodoList />
            <TodoCreate />
          </>
        )}
        
        {selectedTab === 'tab2' && (
          <>
            <Calender />
          </>
        )}
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;