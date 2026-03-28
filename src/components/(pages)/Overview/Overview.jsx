import React from 'react'
import BusinessGrowthChart from './Graph/BusinessGrowthChart'
import UserActivityChart from './Graph/UserActivityChart'
import Reusable_Header from '../../reusable_components/Reusable_Header'
import StatCard from '../../reusable_components/StatCard'
import RecentActivities from './_components/RecentActivities'
import { useGetAdminOverViewQuery } from '../../../redux/features/sijanSlice/sijan.slice'

const Overview = () => {
  const { data, isLoading, isError, error } = useGetAdminOverViewQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <p className="text-red-500 text-lg font-semibold mb-2">Failed to load overview data</p>
        <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
      </div>
    );
  }

  const metrics = data?.metrics || {};

  return (
    <div className='space-y-12'>
      <Reusable_Header 
        header={'Dashboard Overview'} 
        subHeader={'Welcome back! Heres whats happening with your platform today.'} 
      />
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9'>
        <StatCard 
          title="Total Businesses" 
          value={metrics.total_businesses} 
          subtitle={`${metrics.businesses_growth?.toFixed(1)}% growth`} 
        />
        <StatCard 
          title="Active Users" 
          value={metrics.active_users} 
          subtitle={`${metrics.users_growth?.toFixed(1)}% growth`} 
        />
        <StatCard 
          title="Active Channels" 
          value={metrics.active_channels} 
          subtitle={`${metrics.channels_growth?.toFixed(1)}% growth`} 
        />
      </div>
      
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-11'>
        <BusinessGrowthChart data={data?.business_growth} />
        <UserActivityChart data={data?.user_activity} />
      </div>

      <RecentActivities activities={data?.recent_activity} />
    </div>
  );
};

export default Overview