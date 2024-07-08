import React from 'react';
import PrimarySymbol from '../symbols/primary-symbol';
import styles from './cards.module.scss';

const FullServices = (props) => {
  return (
    <div className={`${styles.full_services_container}`}>
       <PrimarySymbol image={props.img}></PrimarySymbol>
       <h4>{props.service}</h4>
       <p>{props.serviceText}</p>
    </div>
  )
}

export default FullServices;