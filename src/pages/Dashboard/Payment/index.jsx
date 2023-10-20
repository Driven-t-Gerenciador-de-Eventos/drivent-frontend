import styled from "styled-components";
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import WarningMessage from '../../../components/Dashboard/Warning.jsx'
import useEnrollment from "../../../hooks/api/useEnrollment.js";
import { useNavigate } from "react-router-dom";

import { useState, useEffect,useContext } from 'react';
import { toast } from 'react-toastify';
import { Await, useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken.js';
import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';
import axios from 'axios';
import OptionsPresencial from '../../../components/Payment/OptionsPresencial';
import ConfirmaBooking from '../../../components/Payment/ConfirmaBooking';


export default function Payment() {
  const { enrollment, enrollmentLoading, enrollmentError, getEnrollment } = useEnrollment();

  const navigate = useNavigate()
  const [ticket, setTicket] = useState();
  const [hotel, setHotel] = useState();
  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    const getSubscription = async () => {
      try {
        const response = await getEnrollment();
        setSubscription(true);
      } catch (err) {
        console.log(err.response.data);
        toast('Erro ao encontrar sua inscrição');
        setSubscription(false);
      }
    }
    getSubscription()
  }, [])
  
  const bookTicket = () =>{

  }
  return(
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {subscription === true ? (
        <>
          <StyledTypography variant="h6">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
          <StyledTypography variant="h6">Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
          <Buttons>
            <ModalityButton onClick={ () => setHotel(false)}
              className={hotel === false ? 'selected' : ''}
            >
              <h7>Sem Hotel</h7>
              <p>+ R$ 0</p>
            </ModalityButton>
            <ModalityButton onClick={ () => setHotel(true)}
              className={hotel === true ? 'selected' : ''}
            >
              <h7>Com Hotel</h7>
              <p>+ R$ 350</p>
            </ModalityButton>
          </Buttons>
          <StyledTypography variant="h6">Fechado! O total ficou em <strong>R$ 600</strong>. Agora é só confirmar:</StyledTypography>
          <BookTicketButton onClick={ () => bookTicket()}>RESERVAR INGRESSO</BookTicketButton>
        </>
      ) : (
        <WarningMessage message="Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso" />
      )}
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

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
`

const ModalityButton = styled.div`
  cursor: pointer;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 24px;

  h7{
    color: #454545;
    font-size: 16px;
    margin-bottom: 3px;
  }

  p{
    color: #898989;
    font-size: 14px;
  }

  &.selected{
    border: none;
    background: #FFEED2;
  }
`
const BookTicketButton = styled.button`
  cursor: pointer;
  padding: 11px;
  border-radius: 4px;
  border: none;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
`
