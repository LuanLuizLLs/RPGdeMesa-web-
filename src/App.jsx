import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GlobalContextProvider from 'context'
import Loading from 'layouts/Loading'
import Message from 'layouts/Message'
import Auth from 'services/auth'
import Routes from 'routes'

function App() {
	const setNavigate = useNavigate()
	const setDispatch = useDispatch()

	useEffect(() => {
		Auth()
			.me(({ data }) => {
				setDispatch({
					type: 'USER',
					data: data.response,
				})
			})
			.catch(() => {
				setNavigate('/login')
			})
	}, [])

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