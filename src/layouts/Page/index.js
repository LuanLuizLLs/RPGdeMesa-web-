import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import classes from './style.module.css'
import logo from '../../assets/img/logo.png'
import useLogin from '../../services/login'

function Page({
  children,
  width,
  title,
  tab,
}) {

  const user = useSelector(({ reducer }) => reducer.USER)

  const { Out } = useLogin()

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
            {user.imagem ? (
              <img src={user.imagem} alt="user" />
            ) : user.user && user.user[0]}
          </figure>
          <div>
            <span>{user.user || '...'}</span>
            <span className={classes.logout} onClick={Out}>Logout</span>
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