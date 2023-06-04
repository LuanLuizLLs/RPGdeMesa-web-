import * as INITIAL from './initial'
import React, { createContext, useContext, useState } from 'react'

export { INITIAL }

const Context = createContext({
	stateLoading: [INITIAL.LOADING],
	stateMessage: [INITIAL.MESSAGE],
})

function GlobalContextProvider({ children }) {
	const [loading, setLoading] = useState(INITIAL.LOADING)
	const [message, setMessage] = useState(INITIAL.MESSAGE)

	const valueContext = {
		stateLoading: [loading, setLoading],
		stateMessage: [message, setMessage],
	}

	return (
		<Context.Provider value={valueContext}>
			{children}
		</Context.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(Context)
}


export default GlobalContextProvider