import './assets/styles/index.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import reducer from './global/reducer'
import { Provider } from 'react-redux'
import { breakpoint } from './configs'
import { BrowserRouter } from 'react-router-dom'

const alterDevice = () => {
  document.querySelector('html')
    .setAttribute('device', Object.keys(breakpoint).filter((device) => {
      return window.innerWidth <= breakpoint[device]
    })[0] || 'desktop')
}
window.onresize = alterDevice
alterDevice()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={reducer}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)