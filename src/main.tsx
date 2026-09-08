import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
// Vercel Analytics — page views + Core Web Vitals tracking
import { Analytics } from '@vercel/analytics/react'
// Vercel Speed Insights — real-user Core Web Vitals (LCP, INP, CLS)
import { SpeedInsights } from '@vercel/speed-insights/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      {/* Vercel Analytics + Speed Insights mount at the app root so they
          track every route change automatically. No config needed on
          Vercel — they activate on first deploy to a Vercel domain. */}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  </StrictMode>,
)
