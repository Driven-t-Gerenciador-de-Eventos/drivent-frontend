import Typography from '@mui/material/Typography';
import WarningMessage from '../../../components/Dashboard/Warning.jsx'
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

  const token = useToken();
  
  console.log(enrollment)
  let [ticketSelected, setTicketSelected] = useState(null);
  let [ticketType, setTicketType] = useState();
  console.log(ticketSelected)
  

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  useEffect(() => {
    console.log(token)
    const requisicao = axios.get(`${import.meta.env.VITE_API_URL}/tickets/types`, config);

    requisicao.then(resposta => {
      //setTicketType((resposta.data))
      console.log(resposta.data)
    })
    requisicao.catch(erro => {
      console.log((erro.data))
    });
  }, []);
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

  function selectTicket(Option) {
    if (Option == ticketSelected) {
      setTicketSelected(null)
      setBookSelected(null)
    } else {
      setTicketSelected(Option)
      setBookSelected(null)
    }
  }


  return(
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {subscription === true ? (
        <>
          <StyledTypography variant="h6">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
          <Options>
          <Box onClick={() => selectTicket() } ticketSelected={ticketSelected}>
            <h3>Presencial</h3>
            <h4>Valor</h4>
          </Box>
          <Box onClick={() => selectTicket()} ticketSelected={ticketSelected}>
            <h3>Online</h3>
            <h4>Valor</h4>
          </Box>
        </Options>
          <StyledTypography variant="h6">Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
          {!ticketSelected? <></>: < OptionsPresencial />}
          {!ticketSelected?  <></>: < ConfirmaBooking />}
        </>
      ) : (
        <WarningMessage message="Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso" />
      )}
    </>
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

    font-family: Roboto;
font-size: 20px;
font-weight: 400;
line-height: 23px;
letter-spacing: 0em;
text-align: left;

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
const Box = styled.div`
width: 145px;
height: 145px;
border: 1px solid #CECECE;
border-radius: 20px;
background-color: ${ticketSelected=>ticketSelected.ticketSelected ? '#FFEED2' : '#FFFFFF'};


margin-top:10px;
margin-right: 25px;
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
const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
  color: #8E8E8E;

  &:nth-child(1) {
    color: #000000;
  }
`;
