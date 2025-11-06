import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/dashboard-theme.css'
import './styles/notifications.css'
import './styles/accessibility.css'
import App from './App.jsx'
import './mocks/dashboardMocks.js'
import { initAppearance } from './utils/appearance.js'
import { initAccessibility } from './utils/accessibility.js'

initAppearance()
initAccessibility()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
