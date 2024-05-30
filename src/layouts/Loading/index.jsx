import React from 'react'
import classes from './style.module.css'
import { useGlobalContext } from 'context'

function Loading({ children }) {
	const { stateLoading } = useGlobalContext()

	const [loading] = stateLoading

	return (
		<div className={classes.loading} loading={loading.type}>
			{children}
		</div>
	)
}

export default Loading