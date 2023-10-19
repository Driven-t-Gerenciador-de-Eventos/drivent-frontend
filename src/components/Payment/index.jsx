import PaymentHeader from "../../components/Payment/header"
import PaymentSummary from "./summary";

const mockInfo = {
    type: "Presencial",
    hotel: true,
    price: 600}

export default function PaymentComponent() {
  return (
    <>
        <PaymentHeader />
        <PaymentSummary props={mockInfo}/>
    </>
  );
}
