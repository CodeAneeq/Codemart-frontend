import React from 'react'
import styles from './checkout.module.scss'
import PrimaryBtn from '../../components/buttons/primary-btn'

export const CheckoutSummary = () => {
  return (
    <div className={`${styles.checkout_summary}`}>
        <h4>Cart Total</h4>
        <div className='d-flex justify-content-between border-bottom border-3 py-2'>
            <div>SubTotal:</div>
            <div>$1750</div>
        </div>
        <div className='d-flex justify-content-between border-bottom border-3 py-2'>
            <div>Pay By::</div>
            <div>Card</div>
        </div>
        <div className='d-flex justify-content-between py-2'>
            <div>Total:</div>
            <div>$1750</div>
        </div>
        <div className='mt-5 my-3'>
            <PrimaryBtn>Proceed To Checkout</PrimaryBtn>
        </div>
    </div>
  )
}
