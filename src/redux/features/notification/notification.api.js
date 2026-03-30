import { baseApi } from "../../api/base.api";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/api/v1/notifications/",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
    markAllRead: builder.mutation({
      query: () => ({
        url: "/api/v1/notifications/mark-all-read/",
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkAllReadMutation } = notificationApi;
