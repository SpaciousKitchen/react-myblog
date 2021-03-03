import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 400px;
  background: white;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  height: 500px;
`;

const StyledCardSubject = styled.div`
  padding: 10px;
  width: 100%;
  height: 10%;
`;
const StyledCardImage = styled.div`
  padding: 10px;
  height: 40%;
  width: 100%;
`;
const StyledCardContent = styled.div`
  padding: 10px;
  height: 30%;
  width: 100%;
  background-color: white;
`;

const StyledCardFooter = styled.div`
  padding: 10px;

  width: 100%;
  height: 10%;
`;

const Card = () => (
  <StyledCard>
    <StyledCardSubject>제목</StyledCardSubject>
    <StyledCardImage>
      <img
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        src="http://localhost:3000/images/네이버 아이디로 로그인_축약형_White.PNG_1613838524792.PNG"
      />
    </StyledCardImage>
    <StyledCardContent>내용</StyledCardContent>
    <StyledCardFooter>밑에</StyledCardFooter>
  </StyledCard>
);

export default Card;
