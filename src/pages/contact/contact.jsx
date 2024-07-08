import React from "react";
import styles from "./contact.module.scss";
import PageLayout from "../../components/layouts/page-layout";
import { ContactInput } from "../../components/inputs/contact-input";
import PrimaryBtn from "../../components/buttons/primary-btn";
import { RedCircle } from "../../components/symbols/red-circle";
import ContactIcon from '../../assets/imgs/callIcon.png';
import MailIcon from '../../assets/imgs/mailIcon.png';

const ContactPage = () => {
  return (
    <PageLayout>
      <div className={`${styles.contact_page_div}`}>
      <div className="container">
        <p>
          <span className="text-secondary">Home / </span>
          <span>Contact</span>
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
              <ContactInput placeholder="Your Name"></ContactInput>
              <ContactInput placeholder="Your Email"></ContactInput>
              <ContactInput placeholder="Your Phone"></ContactInput>
            </div>
            <div>
              <ContactInput
                placeholder="Your Message"
                style={{ width: "100%", height: "207px", marginBottom: "20px" }}
              ></ContactInput>
            </div>
          </div>
        </div>
        <div
          className="mt-1"
          style={{ width: "200px", marginRight: "0", marginLeft: "auto", textAlign: 'right' }}
        >
          <PrimaryBtn loading={false} disabled={false}>
            Send Message
          </PrimaryBtn>
        </div>
      </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
