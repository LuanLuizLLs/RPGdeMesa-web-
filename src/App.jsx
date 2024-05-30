import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Routes from 'routes'
import Message from 'layouts/Message'
import Loading from 'layouts/Loading'
import GlobalContextProvider from 'context'

function App() {
	const setNavigate = useNavigate()

	const { USER } = useSelector(({ reducer }) => reducer)

	useEffect(() => {
		USER.id || setNavigate('/login')
	}, [USER, setNavigate])

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