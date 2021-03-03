import React from 'react';
import styled from 'styled-components';
import CardContainer from './Card';

const StyledFeedContainer = styled.div`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
`;

const FreePosts = () => (
  <div>
    <StyledFeedContainer>
      <CardContainer />
      <CardContainer />
      <CardContainer />
    </StyledFeedContainer>
  </div>
);
export default FreePosts;
