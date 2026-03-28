import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.access ?? null;
      state.refreshToken = action.payload.refresh ?? null;
      state.user = {
        role: action.payload.user_role ?? null,
        email: action.payload.email ?? null,
        id: action.payload.user_id ?? null,
      };
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload ?? null;
    },
  },
});

export const { setTokens, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
