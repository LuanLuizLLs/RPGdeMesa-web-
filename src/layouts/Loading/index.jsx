import React from 'react'
import classes from './style.module.css'
import PropTypes from 'prop-types'

function Loading({
	children,
	stateLoading = [],
}) {

	const [loading = {}] = stateLoading

	return (
		<div className={classes.loading} loading={loading.type}>
			{children}
		</div>
	)
}

Loading.propTypes = {
	children: PropTypes.any,
	stateLoading: PropTypes.array,
}

export default Loading