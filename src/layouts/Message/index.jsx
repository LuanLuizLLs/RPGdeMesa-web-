import React, { useEffect } from 'react'
import classes from './style.module.css'
import useMessage from '../../hooks/useMessage'

function Message() {
	const { message, closeMessage } = useMessage()

	const style = {
		width: message.open ? '100%' : '0',
	}

	useEffect(() => {
		if (message.open) {
			setTimeout(closeMessage, message.time)
		}
	}, [message, closeMessage])

	return (
		<div className={classes.container}>
			<div className={classes.hidden} style={style}>
				<div className={classes.message} type={message.type} onClick={closeMessage}>
					{message.message || 'Teste de mensagem'}
				</div>
			</div>
		</div>
	)
}

export default Message