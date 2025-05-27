import React, { useEffect, useState } from "react";
import styles from "./product-info.module.scss";
import PageLayout from "../../components/layouts/page-layout";
import SectionHeading from "../../components/section-headings/section-heading";
import BestProductSlider from "../../components/slider/best-products-slider";
import { singleProduct } from "../../services/single-data";
import { Rating } from "react-simple-star-rating";
import ProductColorVariants from "./product-color-variants";
import PrimaryBtn from "../../components/buttons/primary-btn";
import ProductQuantityCounter from "../../components/cart/product-quantity-counter";
import iconDelivery from "../../assets/icons/icon-delivery.svg";
import iconReturn from "../../assets/icons/Icon-return.svg";
import { useParams } from "react-router-dom";
import ProductShippingCard from "./product-shipping-card";
import ProductImagesSlider from "../../components/slider/product-images-slider";
import useShoppingCart from "../../hooks/use-shopping-cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { Helpers } from "../../services/helper";
import axios from "axios";
import baseURL from "../../services/constant";


const ProductInfoPage = () => {
  const isLogin = useSelector(state => state.user.isLogin);
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const [users, setUsers] = useState([])
  
  const { addToCart, decreaseProductQuantityInCart, getCartProductQuantity } = useShoppingCart();

  // useEffect(() => {/
          const deleteReview = async (id) => {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.delete(
        `${baseURL}/rating/api/del-rating/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Rating Deleted Successfully");
        setReviews((prevReview) =>
          prevReview.filter((item) => item._id !== id)
        );
      } else {
        console.log("Rating Deletion Failed");
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert("An error occurred while deleting the Review");
    }
  };
  // }, [])

  useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${baseURL}/rating/api/get-rating/${id}`);
      setReviews(res.data.data); // Assuming `data` contains array of reviews
    } catch (error) {
      console.log("Error fetching reviews", error);
    }
  };

  if (id) {
    fetchReviews();
  }
}, [id]);


  useEffect(() => {
  const getSingleProduct = async (id) => {
    try {
      let response = await axios.get(`${baseURL}/product/api/get-single-product/${id}`);
      setProduct(response.data.data);
      setReviews(response.data.data.reviews || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // mark loading complete
    }
  };

  if (id) {
    getSingleProduct(id);
  }
}, [id]);


  useEffect(() => {
    const q = getCartProductQuantity(product?._id);
    setQuantity(q);
  }, [getCartProductQuantity, product]);

  const handleRating = (rate) => {
    setUserRating(rate);
  };

  const submitReview = async () => {
    if (!review || !userRating) {
      alert("Please provide both rating and review!");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseURL}/rating/api/create-rating`, {
        productId: id,
        rating: userRating,
        review,
      },
      {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }
    );

      setReviews([...reviews, response.data.data]); // Add new review to the list
      setReview(""); // Clear the review input
      setUserRating(0); // Reset rating
      alert("Your review has been submitted!");
    } catch (error) {
      setErr(error.response.data.message)
      // alert("There was an error submitting your review.");
    }

    setIsSubmitting(false);
  };



  return (
    <PageLayout>
      <section className="container py-5 my-5">
        <div className="row">
          <div className="col-lg-7">
            <div className={`${styles.product_images_container}`}>
              <figure>
                <img
                  src={product?.images?.[0]}
                  alt="product feature image"
                />
              </figure>
              <div className={`${styles.product_images_slider_container}`}>
                <ProductImagesSlider images={product?.images} />
              </div>
            </div>
          </div>
          <div className="col-lg-5 mt-lg-0 mt-5">
            <div className={`${styles.product_content_container}`}>
              <h1 className={`${styles.product_title}`}>
                {product?.name}
              </h1>
              <div className="d-flex gap-2 align-items-center">
                <div>
                  <Rating
                    initialValue={product?.rating}
                    readonly={true}
                    allowFraction={true}
                    size={22}
                  />
                </div>
                <span className={`${styles.in_stock}`}>In Stock</span>
              </div>
              <p className={`${styles.product_price}`}>
                {Helpers.priceFormatter(product?.price)}
              </p>
              <p className={`${styles.product_descr}`}>
                {product?.details}
              </p>

              {/* Color */}
              <div
                className={`${styles.product_color_variants} d-flex gap-2 align-items-center`}
              >
                <span className={`${styles.product_color_title}`}>Colours:</span>
                <div className="d-flex gap-2 align-items-center">
                  {product?.colors && (
                    <ProductColorVariants
                      colorsList={product?.colors}
                      activeColor={product?.colors[0]}
                      onChangeColor={(color) => setActiveColor(color)}
                    />
                  )}
                </div>
              </div>

              {/* Quantity & Cart */}
              <div className={`${styles.product_buy_container} d-flex gap-2 align-items-center my-5`}>
                <div>
                  {quantity > 0 ? (
                    <ProductQuantityCounter
                      qty={quantity}
                      onIncrement={() => addToCart(product)}
                      onDecrement={() => decreaseProductQuantityInCart(product)}
                    />
                  ) : (
                    <PrimaryBtn onClick={() => addToCart(product)}>Add To Cart</PrimaryBtn>
                  )}
                </div>
                <div className={`${styles.button_div}`}>
                  <PrimaryBtn onClick={() => navigate(`/checkout`)}>Buy Now</PrimaryBtn>
                </div>
              </div>

              {/* Shipping Info */}
              <div className={`${styles.product_shipping_container} d-flex flex-column my-5`}>
                <ProductShippingCard
                  icon={iconDelivery}
                  title="Free Delivery"
                  description="Enter your postal code for Delivery Availability"
                />
                <ProductShippingCard
                  icon={iconReturn}
                  title="Return Delivery"
                  description="Free 30 Days Delivery Returns. Details"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating and Reviews Section */}
      {isLogin && (
        <section className={`${styles.reviews_section} container my-5 py-5`}>
          <SectionHeading>Rate this product</SectionHeading>
          <div className={`${styles.rating_container} my-4`}>
            <Rating onClick={handleRating} ratingValue={userRating} size={25} allowFraction={true} />
            <p className={`${styles.user_rating_text}`}>Your Rating: {userRating} / 5</p>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here"
              rows="4"
              className="w-100"
            />
            <PrimaryBtn onClick={submitReview} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </PrimaryBtn>
            <span style={{color: '#db4444'}}>{err}</span>
          </div>
        </section>
      )}

      {/* Display Ratings */}
      <section className={`${styles.reviews_list} container my-5 py-5`}>
  <h3>Customer Reviews</h3>
  {isLoading ? (
    <p>Loading reviews...</p>
  ) : reviews.length > 0 ? (
    reviews.map((rev) => (
      <div key={rev._id} className={`${styles.review_item}`}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>

        <Rating initialValue={rev.rating} readonly={true} size={18} />
        <span style={{cursor: 'pointer', color: 'red'}} onClick={() => deleteReview(rev._id)}><MdDelete></MdDelete></span>
        </div>
        <p><strong>{rev?.name}</strong></p>
        <p>{rev.review}</p>
      </div>
    ))
  ) : (
    <p>No reviews yet. Be the first to leave a review!</p>
  )}
</section>


      {/* Related Products */}
      <section className={`${styles.best_product_section} container my-5 py-5`}>
        <SectionHeading>Related Items</SectionHeading>
        <BestProductSlider />
      </section>
    </PageLayout>
  );
};

export default ProductInfoPage;
