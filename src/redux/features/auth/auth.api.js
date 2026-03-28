import { baseApi } from "../../api/base.api";
import { logout, setTokens } from "./auth.slice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/v1/auth/admin/login/",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTokens(data));
        } catch {
          dispatch(logout());
        }
      },
    }),

    // Forgot password: send OTP
    sendOtp: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body: { email },
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/auth/verify-otp/",
        method: "POST",
        body: { email, otp },
      }),
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: ({ reset_token, new_password, confirm_password }) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: { reset_token, new_password, confirm_password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
