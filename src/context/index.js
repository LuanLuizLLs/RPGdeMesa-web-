import * as INITIAL from './initial'
import React, { createContext, useContext, useState } from 'react'

export { INITIAL }

const Context = createContext({
	stateLoading: [INITIAL.LOADING],
	stateMessage: [INITIAL.MESSAGE],
	stateRefresh: [INITIAL.REFRESH],
})

function GlobalContextProvider({ children }) {
	const valueContext = {
		stateLoading: useState(INITIAL.LOADING),
		stateMessage: useState(INITIAL.MESSAGE),
		stateRefresh: useState(INITIAL.REFRESH),
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