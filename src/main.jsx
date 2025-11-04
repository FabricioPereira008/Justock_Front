import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/dashboard-theme.css'
import App from './App.jsx'
import './mocks/dashboardMocks.js'
import { initAppearance } from './utils/appearance.js'

// aplica preferências salvas (fonte e barra lateral)
initAppearance()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
