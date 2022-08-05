import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Tab = ({
  children = [],
  stateTab = [],
  tabs = [],
}) => {

  const [tab, setTab] = stateTab

  return (
    <div className={classes.container}>
      <div className={classes.tab}>
        {tabs.map((item, i) => (
          <span key={i} {...(tab === i && { select: '' })}  onClick={() => setTab(i)}>{item}</span>
        ))}
      </div>
      {children[tab]}
    </div>
  )
}

Tab.propTypes = {
  children: PropTypes.array.isRequired,
  stateTab: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired,
}