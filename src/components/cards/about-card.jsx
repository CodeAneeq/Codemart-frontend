import React from 'react';
import styles from './cards.module.scss';
import PrimarySymbol from '../symbols/primary-symbol';

const AboutCard = (props) => {
  return (
    <div className={`${styles.aboutcard_container}`}>
        <div className={`${styles.symbol_div}`}>
       <PrimarySymbol image={props.img} style={props.style} innerStyle={props.innerStyle}></PrimarySymbol>
       </div>
       <h4>{props.price}</h4>
       <p>{props.para}</p>
    </div>
  )
}

export default AboutCard;