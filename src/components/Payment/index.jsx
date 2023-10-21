import PaymentHeader from "./Header"
import PaymentSummary from "./Summary";
import PaymentForm from "./Card";

const mockInfo = {
    type: "Presencial",
    hotel: true,
    price: 600}

export default function PaymentComponent() {
  return (
    <>
        <PaymentHeader />
        <PaymentSummary props={mockInfo}/>
        <PaymentForm />
    </>
  );
}
