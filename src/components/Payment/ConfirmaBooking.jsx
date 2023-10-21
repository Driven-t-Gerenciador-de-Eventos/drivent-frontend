import { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from '@mui/material/Typography';


export default function ConfirmaBooking() {

  return (
    <>
      <StyledTypography variant="h6">Fechado! O total ficou em <strong>R$ 600</strong>. Agora é só confirmar:</StyledTypography>
      <BookTicketButton onClick={() => bookTicket()}>RESERVAR INGRESSO</BookTicketButton>

    </>
  )

}


const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
  color: #8E8E8E;

  &:nth-child(1) {
    color: #000000;
  }
`;
const BookTicketButton = styled.button`
  cursor: pointer;
  padding: 11px;
  border-radius: 4px;
  border: none;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
`
