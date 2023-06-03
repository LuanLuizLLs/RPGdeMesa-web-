import React, { useEffect } from 'react'
import classes from './style.module.css'
import PropTypes from 'prop-types'
import useMessage from '../../hooks/useMessage'

function Message({
	stateMessage = [],
}) {

	const [state = {}] = stateMessage

	const { closeMessage } = useMessage()

	const style = {
		width: state.open && state.message ? '100%' : '0',
	}

	useEffect(() => {
		if (state.open) {
			setTimeout(closeMessage, state.time)
		}
	}, [state, closeMessage])

	return (
		<div className={classes.container}>
			<div className={classes.hidden} style={style}>
				<div className={classes.message} type={state.type} onClick={closeMessage}>
					{state.message}
				</div>
			</div>
		</div>
	)
}

Message.propTypes = {
	stateMessage: PropTypes.array,
}

export default Message