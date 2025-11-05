import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/dashboard-theme.css'
import './styles/accessibility.css'
import App from './App.jsx'
import './mocks/dashboardMocks.js'
import { initAppearance } from './utils/appearance.js'
import { initAccessibility } from './utils/accessibility.js'

// aplica preferências salvas (fonte e barra lateral)
initAppearance()
// aplica preferências salvas de acessibilidade (classes no <body>)
initAccessibility()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
