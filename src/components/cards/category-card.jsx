import React from 'react'
import styles from './cards.module.scss'
import { useNavigate } from 'react-router-dom'

export const CategoryCard = (props) => {
  const navigate = useNavigate()
  return (
    <div className={`${styles.category_card_container}`}  onClick={() => navigate(`/category-filter/${props?.id}`)}>
       <img src={props.icon} alt="" />
       <p>{props.title}</p>

    </div>
  )
}
