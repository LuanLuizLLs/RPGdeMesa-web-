import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Modal = ({
  children,
  maxWidth = 0,
  stateModal = [],
  onClose = () => {},
}) => {

  const [modal, setModal] = stateModal

  const style = {
    maxWidth: maxWidth || 'fit-content',
  }

  return modal.content && (
    <div className={classes.container}>
      <div className={classes.modal} style={style}>
        <span
          className={classes.close}
          onClick={() => {
            setModal({
              content: '',
              data: {},
            })
            onClose()
          }}
        />
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.any,
  maxWidth: PropTypes.number,
  stateModal: PropTypes.array.isRequired,
  onClose: PropTypes.func,
}