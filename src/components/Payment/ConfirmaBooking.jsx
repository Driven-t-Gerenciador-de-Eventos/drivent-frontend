import { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from '@mui/material/Typography';
import useToken from '../../hooks/useToken.js';
import { toast } from 'react-toastify';
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ConfirmaBooking({total, ticket, setCardPage, setTicket}) {
  const token = useToken();

  console.log(ticket)

 
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

   async function bookTicket (ticket) {
    
    const body = {
      ticketTypeId: ticket.id
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tickets`, body, config);
      setTicket(response.data);
      toast('Informações salvas com sucesso!');
      setCardPage(true);
      return response.data;

    } catch (err) {
      console.log(err)
      toast('Não foi possível salvar suas informações!');
    }
  }


  return (
    <>
      <StyledTypography variant="h6">Fechado! O total ficou em <strong>R$ {total},00</strong>. Agora é só confirmar:</StyledTypography>
      <BookTicketButton onClick={() => bookTicket(ticket)}>RESERVAR INGRESSO</BookTicketButton>

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
