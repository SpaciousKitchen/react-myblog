import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Header from './Header';
import Login from './Login';
import Menu from './Menu';
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
              {loginVisible ? <Login /> : <> </>}
            </Grid>
            <Grid item>{children}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AppLayout;
