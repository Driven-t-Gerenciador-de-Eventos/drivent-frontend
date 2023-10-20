import { useEffect, useState } from "react";
import styled from "styled-components"

export default function ConfirmaBooking() {

  return (
    <Containerg>
      <StyledTypography variant="h6">Fechado! O total ficou em <strong>R$ 600</strong>. Agora é só confirmar:</StyledTypography>
      <BookTicketButton onClick={() => bookTicket()}>RESERVAR INGRESSO</BookTicketButton>

    </Containerg>
  )

}

const Containerg = styled.div`
  display: flex;
  flex-direction: column;
 // box-shadow: 2px 0 10px 0 rgba(0,0,0,0.1);
  width: 100%;
  text-align:center;
  h1{
    font-family: Roboto;
font-size: 34px;
font-weight: 400;
line-height: 40px;
letter-spacing: 0em;
text-align: left;

color: #000;
margin-bottom: 30px;

  }
  h2{
    margin-top: 15px;

    font-family: Roboto;
font-size: 20px;
font-weight: 400;
line-height: 23px;
letter-spacing: 0em;
text-align: left;

    color: #8E8E8E;

  }
`

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

const Options = styled.div`

  display: flex;
 
 
 
`
const Confirm = styled.button`
margin-top: 15px;
width: 162px;
height: 37px;

border-radius: 4px;

box-shadow: 0px 2px 10px 0px #00000040;



`
  ;
