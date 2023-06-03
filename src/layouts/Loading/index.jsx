import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'
import useLoading from '../../hooks/useLoading'

function Loading({
	children,
}) {
	const { loading } = useLoading()

	return (
		<div className={classes.loading} loading={loading.type}>
			{children}
		</div>
	)
}

Loading.propTypes = {
	children: PropTypes.any,
}

export default Loading