import React from 'react'
import styles from './cards.module.scss'
import twitterIcom from '../../assets/icons/Icon-Twitter-black.svg'
import instagramIcon from '../../assets/icons/icon-instagram-black.svg'
import LinkedinIcon from '../../assets/icons/Icon-Linkedin-black.svg'

const AboutProfileCard = (props) => {
  return (
    <div className={`${styles.profile_card_container}`}>
        <div className={`${styles.card_img_div}`}>
            <img src={props.image} alt="" />
        </div>
        <div className={`${styles.profile_card_content}`}>
            <h4>{props.name}</h4>
            <p>{props.role}</p>
            <div className={`${styles.social_icons}`}>
                <img src={twitterIcom} alt="" />
                <img src={instagramIcon} alt="" />
                <img src={LinkedinIcon} alt="" />
            </div>
        </div>
    </div>
  )
}

export default AboutProfileCard;