import { baseApi } from "../../api/base.api";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverView: builder.query({
      query: () => ({
        url: "/api/v1/admin/dashboard/overview/",
        method: "GET",
      }),
    }),

    getBusinessOverView: builder.query({
      query: () => ({
        url: "/api/v1/communication/workspaces/",
        method: "GET",
      }),
      providesTags: ['Businesses'],
    }),

    businessStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `/api/v1/communication/workspaces/${id}/`,
        method: "PATCH",
        body: { is_active },
      }),
      invalidatesTags: ['Businesses'],
    }),

    getChannelOverView: builder.query({
      query: () => ({
        url: "/api/v1/communication/channels/",
        method: "GET",
      }),
      providesTags: ['Channels'],
    }),

    channelStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `/api/v1/communication/channels/${id}/`,
        method: "PATCH",
        body: { is_active },
      }),
      invalidatesTags: ['Channels'],
    }),

    adminProfile: builder.query({
      query: () => ({
        url: "/api/v1/auth/admin/profile/",
        method: "GET",
      }),
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/admin/profile/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/api/v1/auth/users/",
        method: "GET",
      }),
      providesTags: ['Users'],
    }),

    createAutomation: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/automations/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Automation'],
    }),

    editAutomation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/admin/automations/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['Automation'],
    }),
    getAutomation: builder.query({
      query: () => ({
        url: "/api/v1/admin/automations/",
        method: "GET",
      }),
      providesTags: ['Automation'],
    }),

    systemSettings: builder.query({
      query: () => ({
        url: "/api/v1/admin/system-settings/",
        method: "GET",
      }),
      providesTags: ['SystemSettings'],
    }),

    updateSystemSettings: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/system-settings/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['SystemSettings'],
    }),

    adminMiscellaneous: builder.query({
      query: () => ({
        url: "/api/v1/admin/misc/",
        method: "GET",
      }),
      providesTags: ['AdminMiscellaneous'],
    }),

    updateAdminMiscellaneous: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/admin/misc/${id}/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['AdminMiscellaneous'],
    }),


  }),
});

export const {
  useGetAdminOverViewQuery,
  useGetBusinessOverViewQuery,
  useGetChannelOverViewQuery,
  useBusinessStatusMutation,
  useChannelStatusMutation,
  useAdminProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useCreateAutomationMutation,
  useEditAutomationMutation,
  useGetAutomationQuery,
  useSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
  useAdminMiscellaneousQuery,
  useUpdateAdminMiscellaneousMutation
} = authApi;
