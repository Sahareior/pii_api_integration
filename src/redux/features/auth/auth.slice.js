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
      state.accessToken = action.payload.access_token ?? null;
      state.refreshToken = action.payload.refresh_token ?? null;
      state.user = {
        role: action.payload.user.role ?? null,
        email: action.payload.user.email ?? null,
        id: action.payload.user.id ?? null,
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
