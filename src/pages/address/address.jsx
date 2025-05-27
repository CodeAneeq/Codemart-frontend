import React, { useState } from "react";
import styles from "./address.module.scss";
import PageLayout from "../../components/layouts/page-layout";
import { ContactInput } from "../../components/inputs/contact-input";
import PrimaryBtn from "../../components/buttons/primary-btn";
import { RedCircle } from "../../components/symbols/red-circle";
import ContactIcon from '../../assets/imgs/callIcon.png';
import MailIcon from '../../assets/imgs/mailIcon.png';
import useShoppingCart  from "../../hooks/use-shopping-cart";
import { getCartProducts } from "../../redux/features/cart-slice";
import axios from "axios";
import baseURL from "../../services/constant";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [number, setNumber] = useState('');
  const [loader, setLoader] = useState(false)
  const [address, setAddress] = useState('');
  const [err, setErr] = useState('');

  const navigate = useNavigate()

 const { getCartProducts, clearCart } = useShoppingCart();
 const products = getCartProducts()
 const productsWithId = products.map(item => ({
  id: item.product._id,     
  name: item.product.name,
  quantity: item.quantity,
  price: item.product.price,
}));

  console.log(productsWithId);

    const createOrder = async (e) => {
       e.preventDefault();
    setLoader(true)
    try {
      
  if (!name || !email || !city || !area || !state || !postalCode || !number || !address) {
    setErr("Please fill all the fields");
    setLoader(false)
    return;
  }

      let paymentMethod = 'COD'
      let payload = {
        products: productsWithId,
        paymentMethod,
        address: {
          name,
          email,
          city, 
          area, 
          state, 
          postalCode, 
          phoneNumber: number,
          completeAddress: address
        }
      }
      const token = localStorage.getItem("token"); // if token is required
      
      const response = await axios.post(
        `${baseURL}/order/api/create-order`,
        payload,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // optional
          },
        }
      );
      
      console.log("Order Created Successfully", response.data);
      alert("Order added!");
      // Reset inputs
      setLoader(false)
     setName('');
setAddress('');
setArea('');
setCity('');
setEmail('');
setName('');
setNumber('');
setPostalCode('');
setState('');

clearCart()
navigate('/order-success')

    } catch (error) {
  const msg = error?.response?.data?.message || "Something went wrong";
  console.log("Error message:", msg);
  setErr(msg);
  setLoader(false);
}

    // setErr("")
  };
  


  return (
    <PageLayout>
      <div className={`${styles.contact_page_div}`}>
      <div className="container">
        <p>
          <span className="text-secondary">Home / </span>
          <span>Address</span>
        </p>
        <div className={`${styles.contact_page_container}`}>
          <div className={`${styles.content}`}>
            <div className={`${styles.content_section_one}`}>
              <div className={styles.red_div}>
                <RedCircle img={ContactIcon}></RedCircle>
                <h5 className={`${styles.heading}`}>Call To Us</h5>
              </div>
              <p className="mt-3">We are available 24/7, 7 days a week</p>
              <p className="mt-2">Phone +880161112222</p>
            </div>
            <hr />
            <div className={`${styles.content_section_two}`}>
              <div className={`${styles.red_div} mt-3 mb-3`}>
              <RedCircle img={MailIcon}></RedCircle>
              <h5 className={`${styles.heading}`}>Write To Us</h5>
              </div>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@codemart.com</p>
              <p>Emails: support@codemart.com</p>
            </div>
          </div>
          <div className={`${styles.input_section}`}>
  <div className={`${styles.input_section_one}`}>
    <ContactInput
      placeholder="Your Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <ContactInput
      placeholder="Your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className={`${styles.input_section_one}`}>
    <ContactInput
      placeholder="Your City"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
    <ContactInput
      placeholder="Your State"
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  </div>

  <div className={`${styles.input_section_one}`}>
    <ContactInput
      placeholder="Your Area"
      value={area}
      onChange={(e) => setArea(e.target.value)}
    />
    <ContactInput
      placeholder="Your Postal Code"
      value={postalCode}
      onChange={(e) => setPostalCode(e.target.value)}
    />
  </div>

  <div className={`${styles.input_section_one}`}>
    <ContactInput
      placeholder="Your Phone Number"
      value={number}
      onChange={(e) => setNumber(e.target.value)}
    />
  </div>

  <div>
    <ContactInput
      placeholder="Your Complete Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      style={{ width: "100%", height: "70px", marginBottom: "20px" }}
    />
  </div>
 <div className="text-danger"><small>{err}</small></div>
</div>

        </div>
        <div
          className="mt-1"
          style={{ width: "200px", marginRight: "0", marginLeft: "auto", textAlign: 'right' }}
        >
          <PrimaryBtn onClick={createOrder} loading={loader ? true : false} disabled={loader ? true : false}>
            Place Order
          </PrimaryBtn>
        </div>
      </div>
      </div>
    </PageLayout>
  );
};

export default AddressPage;