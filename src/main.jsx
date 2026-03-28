import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'

import DashboardHome from './components/DashboardHome';
import Overview from './components/(pages)/Overview/Overview.jsx';
import Businesses from './components/(pages)/Businesses/Businesses.jsx';
import Channels from './components/(pages)/Channels/Channels.jsx';
import Users from './components/(pages)/Users/Users.jsx';
import Automation from './components/(pages)/Automation/Automation.jsx';
import Settings from './components/(pages)/Settings/Settings.jsx';
import Profile from './components/(pages)/profile/Profile.jsx';
import Login from './components/auth/Login.jsx';
import Terms from './components/(pages)/terms/Terms.jsx';
import Privacy from './components/(pages)/privacy/Privacy.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    element: <DashboardHome />,
    children: [
      {
        path: 'overview',
        element: <Overview />
      },
      {
        path: 'business',
        element: <Businesses />
      },
      {
        path: 'channels',
        element: <Channels />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'automations',
        element: <Automation />
      },
      {
        path: 'system',
        element: <Settings />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path:'terms',
        element: <Terms />
      },
      {
        path:'privacy',
        element:<Privacy />
      }
    ]
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
