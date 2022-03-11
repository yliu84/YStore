import React, { useState } from 'react';

const steps = ['Shipping address', 'Review your order', 'Payment details'];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  return <div>CheckoutPage</div>;
};

export default CheckoutPage;
