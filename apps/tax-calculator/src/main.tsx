import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Theme } from '@plusgrade/design-system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
        <App />
    </Theme>
  </StrictMode>,
)
