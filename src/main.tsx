import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './global.css'
import App from './App'
import { ThemeProvider } from './components/theme-provider'
import { DataWrapper } from './context/DataWrapper'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root was not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <DataWrapper>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="labour-on-demand-theme"
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </DataWrapper>
  </StrictMode>,
)
