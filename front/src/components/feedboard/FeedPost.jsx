import React from 'react';
import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardContainer from './Card';

const StyledFeedContainer = styled.div`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
`;

const FreePosts = () => {
  const { feedposts } = useSelector((state) => state.feedboard);
  const history = useHistory();
  return (
    <div>
      <div>
        <Button
          style={{ float: 'right' }}
          startIcon={<CreateIcon />}
          onClick={() => history.push('/write/feedpost')}
        >
          글쓰기
        </Button>
      </div>

      <StyledFeedContainer>
        {feedposts.map((v) => (
          <CardContainer feedpost={v} />
        ))}
      </StyledFeedContainer>
    </div>
  );
};

export default FreePosts;
