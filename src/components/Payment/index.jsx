import PaymentHeader from "./Header"
import PaymentSummary from "./Summary";
import PaymentForm from "./Card";
import PaidMessage from "./PaidMessage";
import { useState } from "react";

const mockInfo = {
    type: "Presencial",
    hotel: true,
    price: 600}

export default function PaymentComponent() {
  const [paid, setPaid] = useState(false);

  return (
    <>
        <PaymentHeader />
        <PaymentSummary props={mockInfo}/>
        {
          paid ? 
          <PaidMessage /> : 
          <PaymentForm props={[paid, setPaid]}/>
        }
    </>
  );
}
