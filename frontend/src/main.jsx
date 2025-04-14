import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext'
import OrgContext from './context/OrgContext'
import SocketProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
    <OrgContext>
    <UserContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserContext>
    </OrgContext>
    </SocketProvider>
  </StrictMode>,
)
