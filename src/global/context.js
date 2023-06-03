import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { INITIAL_LOADING } from '../hooks/useLoading'
import { INITIAL_MESSAGE } from '../hooks/useMessage'

const Context = createContext({
	loading: INITIAL_LOADING,
	message: INITIAL_MESSAGE,
	setLoading: () => null,
	setMessage: () => null,
})

function GlobalProvider({ children }) {
	const [loading, setLoading] = useState(INITIAL_LOADING)
	const [message, setMessage] = useState(INITIAL_MESSAGE)

	const contextValues = {
		loading,
		message,
		setLoading,
		setMessage,
	}

	return (
		<Context.Provider value={contextValues}>
			{children}
		</Context.Provider>
	)
}

export function useGlobalContext() {
	return useContext(Context)
}

GlobalProvider.propTypes = {
	children: PropTypes.node,
}

export default GlobalProvider
