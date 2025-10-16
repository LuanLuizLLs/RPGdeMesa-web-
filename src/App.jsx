import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Routes from 'routes'
import Auth from 'services/auth'
import Message from 'layouts/Message'
import Loading from 'layouts/Loading'
import useLogin from 'hooks/useLogin'
import GlobalContextProvider from 'context'

function App() {
	const setNavigate = useNavigate()

	const { submitLogin } = useLogin()
	const { USER } = useSelector(({ reducer }) => reducer)

	useEffect(() => {
		Auth()
			.me(({ data }) => {
				submitLogin(data.response)
			})
			.catch(() => {
				setNavigate('/login')
			})
	}, [USER.id])

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