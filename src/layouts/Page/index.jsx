import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import classes from './style.module.css'
import logo from '../../assets/img/logo.png'
import useLogin from '../../hooks/useLogin'

function Page({
  children,
  tab = '',
  title = '',
  width = 'initial',
}) {

  const { submitLogout } = useLogin()

  const { USER } = useSelector(({ reducer }) => reducer)

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
            {USER.imagem ? (
              <img src={USER.imagem} alt="user" />
            ) : USER.name && USER.name[0]}
          </figure>
          <div>
            <span>{USER.name || '...'}</span>
            <span className={classes.logout} onClick={submitLogout}>Logout</span>
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

export default Page