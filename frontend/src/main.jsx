import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext'
import OrgContext from './context/OrgContext'
import SocketProvider from './context/SocketContext.jsx'
import AuthContext from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
    <AuthContext>
    <OrgContext>
    <UserContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserContext>
    </OrgContext>
    </AuthContext>
    </SocketProvider>
  </StrictMode>,
)
