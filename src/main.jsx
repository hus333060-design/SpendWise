import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "./Compoents/pages/Dashboards.jsx"
import Expence from './Compoents/pages/Expence.jsx'
import { BugetForm } from './Compoents/Budget/BugetForm.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
     index: true,
      element:<Dashboard/>
      },
      {
        path:"expence",
        element:<Expence/>
      },
    
  
      {
        path:"budget",
        element:<BugetForm/>
      }
     
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />,
  </StrictMode>,
)
