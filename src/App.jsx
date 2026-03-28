import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import DashboardHome from './components/DashboardHome'
import Automation from './components/(pages)/Automation/Automation'
import Settings from './components/(pages)/Settings/Settings'
import ReusableTable from './components/reusable_components/ReusableTable'
import Overview from './components/(pages)/Overview/Overview'
import Businesses from './components/(pages)/Businesses/Businesses'
import Channels from './components/(pages)/Channels/Channels'
import Users from './components/(pages)/Users/Users'
import Profile from './components/(pages)/profile/Profile'

function App() {



  return (
    <>
<DashboardHome />
{/* <Automation />
<Settings />
<ReusableTable />
<Overview />
<Businesses />
<Channels />
<Users />
<Profile /> */}
    </>
  )
}

export default App
