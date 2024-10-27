import './assets/styles/index.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import store from './services/redux'
import { Provider } from 'react-redux'
import { BREAKPOINT } from './utils/constants'
import { BrowserRouter } from 'react-router-dom'

const alterDevice = () => {
	document.querySelector('html')
		.setAttribute('device', Object.keys(BREAKPOINT).filter((device) => {
			return window.innerWidth <= BREAKPOINT[device]
		})[0] || 'desktop')
}
window.onresize = alterDevice
alterDevice()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
)