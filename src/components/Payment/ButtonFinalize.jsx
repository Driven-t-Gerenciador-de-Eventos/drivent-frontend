import styled from "styled-components";

export default function FinalizePayment() {
    function finalize() {
        //save payment info, change state to render 'payment done ...'
    }

    return (
        <>
            <FinalizeButton onClick={() => finalize()}>FINALIZAR PAGAMENTO</FinalizeButton>
        </>
    )
}

const FinalizeButton = styled.button`
  cursor: pointer;
  padding: 11px;
  border-radius: 4px;
  border: none;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  margin-top: 25px;
`