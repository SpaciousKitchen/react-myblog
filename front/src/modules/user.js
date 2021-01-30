import { createAction, createReducer } from '@reduxjs/toolkit';

export const sucessLogin = createAction('SUCCESS_LOGIN');
export const failsLogin = createAction('FAILS_LOGIN');

export const sucessLogout = createAction('SUCCESS_LOGOUT');
export const failsLogout = createAction('FAILS_LOGOUT');

const init = {
  userInfo: null,
  requestLogin: false,
  successLogin: false,
  failLogin: false,
  requestLogout: false,
  successLogout: false,
  failLogout: false,
};

const userReducer = createReducer(init, (builder) => {
  builder
    .addCase(sucessLogin, (state, action) => {
      state.requestLogin = false;
      state.successLogin = true;
      state.failsLogin = false;
      state.userInfo = {
        id: action.data.id,
        name: action.data.name,
        img: action.data.img,
        eamil: action.data.email,
        logoUrl: action.data.logoUrl,
        option: action.data.option,
      };
    })
    .addCase(failsLogin, (state) => {
      state.requestLogin = false;
      state.successLogin = false;
      state.failsLogin = true;
    })
    .addCase(sucessLogout, (state) => {
      state.userInfo = null;
      state.requestLogout = false;
      state.successLogout = true;
      state.failsLogout = false;
    })
    .addCase(failsLogout, (state) => {
      state.requestLogout = false;
      state.successLogout = false;
      state.failsLogout = true;
    });
});
export default userReducer;
