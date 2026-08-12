import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './legacy-styles/Phone-account.css'
import './legacy-styles/Phone-account-newlook.css'
import './legacy-styles/Phone-accountDetails-newlook.css'
import './legacy-styles/Transfer-newlook.css'
import './legacy-styles/Payments-newlook.css'
import './legacy-styles/Phone2.css'
import './legacy-styles/Phone2-newlook.css'
import './legacy-styles/Header.css'
import './legacy-styles/Documents.css'
import './legacy-styles/Cards-newlook.css'
import './legacy-styles/Explore-newlook.css'
import './index.css'
import App from './App.jsx'

document.body.classList.add('new-look-active');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
