import React from 'react'
import styles from './symbol.module.scss'

export const PrimarySymbol = (props) => {
  return (
    <div>
        <div className={styles.outer} style={props.style}>
        <div className={styles.inner} style={props.innerStyle}>
          <img src={props.image} alt="" />
        </div>
        </div>
    </div>
  )
}

export default PrimarySymbol;