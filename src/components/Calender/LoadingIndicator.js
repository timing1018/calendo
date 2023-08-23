import React from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const LoadingText = styled.p`
  margin-left: 10px;
  font-size: 18px;
  color: #ced4da;
`;

const LoadingIndicator = ({ text }) => {
  return (
    <LoadingContainer>
      <FaSpinner className="spinner" size={48} color='#ced4da' />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingIndicator;
