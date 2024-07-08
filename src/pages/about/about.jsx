import React from 'react';
import styles from './about.module.scss';
import PageLayout from '../../components/layouts/page-layout';
import AboutBanner from '../../assets/imgs/AboutMainIMG.png';
import AboutCard from '../../components/cards/about-card';
import shopIcon from '../../assets/imgs/icon_shop.png';
import saleIcon from '../../assets/imgs/Icon-Sale.png';
import ShoppingIcon from '../../assets/imgs/Icon-Shopping.png';
import moneyBag from '../../assets/imgs/Icon-Moneybag.png';
import FullServices from '../../components/cards/full-services';
import DeliveryIcon from '../../assets/imgs/icon-delivery.png';
import CustomerService from '../../assets/imgs/Icon-Customer.png';
import Secure from '../../assets/imgs/Icon-secure.png';
import ProfileCardSlider from '../../components/slider/profile-card-slider';


const AboutPage = () => {
  return (
    <>
      <PageLayout>
        <div className={`${styles.about_container} container`}>
          <p><span className='text-secondary'>Home / </span><span>About</span></p>
          <div className='row mb-5 py-5'>
          <div className="col-lg-6 col-sm-8 col-11">
            <div className={`${styles.about_main_content}`}>
              <h1>Our Story</h1>
              <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
              <br />
              <br />
              Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
            </div>
          </div>
            <div className='col-xl-6 col-lg-12 col-12 px-'>
               <figure className='container-fluid'>
                  <img src={AboutBanner}/>
               </figure>
            </div>
          </div>
          <div className={`${styles.about_cards_div}`}>
            <AboutCard price="10.5k" para="Sellers active our site" img={shopIcon}></AboutCard>
            <span className={`${styles.sec_card}`}>
              <AboutCard style={{backgroundColor: '#cecece'}} innerStyle={{backgroundColor: 'white'}}price="33k" para="Monthly product Sale" img={saleIcon}></AboutCard>
            </span>
            {/* <AboutCard price="33k" para="Monthly product Sale" img={saleIcon}></AboutCard> */}
            <AboutCard price="45.5k" para="Customer active in our site" img={ShoppingIcon}></AboutCard>
            <AboutCard price="25k" para="Anual gross sale in our site" img={moneyBag}></AboutCard>
          </div>
          <div className={`${styles.profile_cards}`}>
            <ProfileCardSlider></ProfileCardSlider>
          </div>
          <div className={`${styles.full_services}`}>
            <FullServices img={DeliveryIcon} service="FREE AND FAST DELIVERY" serviceText="Free Delivery for all orders over $140"></FullServices>
            <FullServices img={CustomerService} service="24/7 CUSTOMER SERVICE" serviceText="Friendly 24/7 Customer Support"></FullServices>
            <FullServices img={Secure} service="Money Back Guarantee" serviceText="We return money within 30 Days"></FullServices>
          </div>
        </div>
      </PageLayout>
    </>
  )
}

export default AboutPage