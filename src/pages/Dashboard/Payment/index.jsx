import Typography from '@mui/material/Typography';
import WarningMessage from '../../../components/Dashboard/Warning.jsx'
import { useState, useEffect, useContext } from 'react';
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
  let [bookSelected, setBookSelected] = useState(null);
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

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {subscription === true ? (
        <>
          <StyledTypography variant="h6">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
          <Buttons>
            <ModalityButton onClick={() => selectTicket("Presencial")} ticketSelected={ticketSelected == "Presencial" ? "selected" : "noSelected"}>
              <h7>Presencial</h7>
              <p>Valor</p>
            </ModalityButton>
            <ModalityButton onClick={() => selectTicket("Online")} ticketSelected={ticketSelected == "Online" ? "selected" : "noSelected"}>
              <h7>Online</h7>
              <p>Valor</p>
            </ModalityButton>
          </Buttons>

          {ticketSelected == "Presencial" ? < OptionsPresencial setBookSelected={setBookSelected} hotel={hotel} setHotel={setHotel} /> : <></>}
          {bookSelected||ticketSelected == "Online"  ? < ConfirmaBooking /> : <></>}
        </>
      ) : (
        <WarningMessage message="Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso" />
      )}
    </>
  )

}

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
  background-color:  ${ticketSelected => ticketSelected.ticketSelected == "selected" ? '#FFEED2' : '#FFFFFF'};
  margin-top:10px;


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

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
  color: #8E8E8E;

  &:nth-child(1) {
    color: #000000;
  }
`;

