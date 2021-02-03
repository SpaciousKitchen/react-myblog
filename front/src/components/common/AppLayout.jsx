import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import Header from 'components/common/Header';
import Login from 'components/common/Login';
import Menu from 'components/common/Menu';
// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <>
      <Grid container spacing={0}>
        <Grid xs={1} item>
          <Menu />
        </Grid>
        <Grid xs={11} item container>
          <Grid direction="column" spacing={1} xs={12}>
            <Grid item style={{ height: '50px' }}>
              <Header setLoginVisible={setLoginVisible} />
              {loginVisible ? (
                <Login setLoginVisible={setLoginVisible} />
              ) : (
                <></>
              )}
            </Grid>
            <Grid item>{children}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AppLayout;
