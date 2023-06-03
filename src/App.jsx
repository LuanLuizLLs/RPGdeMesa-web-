import React, { useEffect } from 'react'
import Routes from './routes'
import Loading from './layouts/Loading'
import Message from './layouts/Message'
import GlobalProvider from './global/context'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function App() {

	const setNavigate = useNavigate()

	const { USER } = useSelector(({ reducer }) => reducer)
  
	useEffect(() => {
		USER.id || setNavigate('/login')
	}, [USER, setNavigate])

	return (
		<GlobalProvider>
			<Loading>
				<Routes />
			</Loading>
			<Message />
		</GlobalProvider>
	)
}

export default App