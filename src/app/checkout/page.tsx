"use client";
// import CheckOutMain from "@/components/checkout/CheckOutMain";
import PrivetRoute from "@/privetRoute/PrivetRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.STRIPE_PROMISE_KEY}`);

const Checkout = () => {
  return (
    <>
      <PrivetRoute>
        <Elements stripe={stripePromise}>{/* <CheckOutMain /> */}</Elements>
      </PrivetRoute>
    </>
  );
};

export default Checkout;
