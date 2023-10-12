import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import { CssBaseline } from "@mui/material";
import '@mui/material/styles'
import '@mui/material'
import '@mui/joy'
import { BrowserRouter } from 'react-router-dom'
import {
  RecoilRoot
} from 'recoil'
import './index.css'
import { ThemeProvider } from './theme/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
