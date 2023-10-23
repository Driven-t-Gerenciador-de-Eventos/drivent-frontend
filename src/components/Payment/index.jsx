import PaymentHeader from "./Header"
import PaymentSummary from "./Summary";
import PaymentForm from "./Card";
import PaidMessage from "./PaidMessage";
import { useState } from "react";

export default function PaymentComponent({info}) {
  const [paid, setPaid] = useState(false);

  return (
    <>
        <PaymentHeader />
        <PaymentSummary props={info}/>
        {
          paid ? 
          <PaidMessage /> : 
          <PaymentForm props={[paid, setPaid]}/>
        }
    </>
  );
}
