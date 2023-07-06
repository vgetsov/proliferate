import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter } from 'react-router-dom'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const responsiveTheme = responsiveFontSizes(darkTheme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={responsiveTheme}>
          <CssBaseline />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
