import React from 'react'
import styles from './symbol.module.scss'

export const RedCircle = (props) => {
  return (
    <div className={styles.red_circle}>
        <img src={props.img} alt="" />
    </div>
  )
}
