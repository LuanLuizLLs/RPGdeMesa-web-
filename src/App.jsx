import { useEffect } from 'react'
import { userStore } from 'pages/Login/utils/stores'
import { useNavigate } from 'react-router-dom'
import Routes from 'routes'
import Auth from 'services/auth'
import Message from 'layouts/Message'
import Loading from 'layouts/Loading'
import GlobalContextProvider from 'context'

function App() {
	const setNavigate = useNavigate()
  
	useEffect(() => {
		Auth()
			.me(({ data }) => {
				userStore.set(data.response)
			})
			.catch(() => {
				setNavigate('/login')
			})
	}, [setNavigate])

	return (
		<GlobalContextProvider>
			<Loading>
				<Routes />
			</Loading>
			<Message />
		</GlobalContextProvider>
	)
}

export default App