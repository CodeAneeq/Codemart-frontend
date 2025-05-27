import React from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '../../components/layouts/page-layout';
import PrimaryBtn from '../../components/buttons/primary-btn';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <PageLayout>
      <div className="container text-center py-5 my-5">
        <div className="card p-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="text-success mb-4">Order Placed Successfully!</h2>
          <p className="mb-4">Thank you for your purchase.</p>
          {orderId && (
            <p className="mb-4">Your order ID: <strong>{orderId}</strong></p>
          )}
          <p className="mb-4">We've sent a confirmation email with your order details.</p>
          <div className="d-flex justify-content-center gap-3">
            <PrimaryBtn onClick={() => navigate('/')}>Continue Shopping</PrimaryBtn>
            <PrimaryBtn onClick={() => navigate('/my-orders')}>View Orders</PrimaryBtn>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderSuccessPage;