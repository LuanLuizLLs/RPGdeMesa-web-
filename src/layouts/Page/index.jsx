import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import classes from './style.module.css'
import PropTypes from 'prop-types'
import logo from 'assets/img/logo.png'
import useLogin from 'hooks/useLogin'
import useMessage from 'hooks/useMessage'
import Auth from 'services/auth'

function Page({
	children,
	tab = '',
	title = '',
	width = '90vw',
}) {
	const { submitLogout } = useLogin()
	const { openMessage } = useMessage()

	const { USER } = useSelector(({ reducer }) => reducer)

	function handleLogout() {
		Auth()
			.logout(({ data }) => {
				openMessage(data.status, data.message)
				submitLogout(data.response)
			})
			.catch(({ response }) => {
				openMessage(response.data.status, response.data.message)
			})
	}

	useLayoutEffect(() => {
		document.title = `RPG | ${tab}`
	}, [tab])

	return (
		<div className={classes.page}>
			<header className={classes.header}>
				<div className={classes.navigation}>
					<a href="/">
						<img src={logo} alt="logo" />
					</a>
				</div>
				<div className={classes.user}>
					<figure>
						{USER.avatar ? (
							<img src={USER.avatar} alt="user" />
						) : USER.username && USER.username[0]}
					</figure>
					<div>
						<span>{USER.username || '...'}</span>
						<span className={classes.logout} onClick={handleLogout}>Logout</span>
					</div>
				</div>
			</header>
			<div className={classes.main}>
				{title && (
					<h1 className={classes.title}>
						{title}
					</h1>
				)}
				<main style={{ width }}>
					{children}
				</main>
			</div>
		</div>
	)
}

Page.propTypes = {
	children: PropTypes.any,
	tab: PropTypes.string,
	title: PropTypes.string,
	width: PropTypes.string,
}

export default Page