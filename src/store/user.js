import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    accessToken: "",
    userEmail: "",
  },
  reducers: {
    setAccessToken: (state, action) => {
      return { ...state, accessToken: action.payload };
    },
    setUserEmail: (state, action) => {
      return { ...state, userEmail: action.payload };
    },
  },
});

export default slice.reducer;

const { setAccessToken, setUserEmail } = slice.actions;
export const doSetAccessToken = (token) => async (dispatch) => {
  // do some async fetch here
  return dispatch(setAccessToken(token));
};

export const doSetUserEmail = (token) => async (dispatch) => {
  // do some async fetch here
  return dispatch(setUserEmail(token));
};
