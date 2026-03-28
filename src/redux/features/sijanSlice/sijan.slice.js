import { baseApi } from "../../api/base.api";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverView: builder.query({
      query: () => ({
        url: "/api/v1/admin/dashboard/overview/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAdminOverViewQuery
} = authApi;
