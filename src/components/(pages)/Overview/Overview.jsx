import React from 'react'
import BusinessGrowthChart from './Graph/BusinessGrowthChart'
import UserActivityChart from './Graph/UserActivityChart'
import Reusable_Header from '../../reusable_components/Reusable_Header'
import StatCard from '../../reusable_components/StatCard'
import RecentActivities from './_components/RecentActivities'

const Overview = () => {
  return (
<div className='space-y-12'>
    <Reusable_Header header={'Dashboard Overview'} subHeader={'Welcome back! Heres whats happening with your platform today.'} />
      
<div className='grid grid-cols-3 gap-9'>
          {
        [1,2,3].map(items => (
            <StatCard />
        ))
      }
</div>
      
        <div className='flex  gap-11'>
        <BusinessGrowthChart />
        <UserActivityChart />
    </div>
    <RecentActivities />
</div>
  )
}

export default Overview