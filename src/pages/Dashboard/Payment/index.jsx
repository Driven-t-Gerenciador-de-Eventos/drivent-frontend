import Typography from '@mui/material/Typography';
import WarningMessage from '../../../components/Dashboard/Warning.jsx'
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { Await, useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken.js';
import useEnrollment from '../../../hooks/api/useEnrollment.js';
import styled from 'styled-components';
import axios from 'axios';
import OptionsPresencial from '../../../components/Payment/OptionsPresencial.jsx';
import ConfirmaBooking from '../../../components/Payment/ConfirmaBooking.jsx';
import PaymentComponent from '../../../components/Payment/index.jsx';

export default function Payment() {

  const { enrollment, enrollmentLoading, enrollmentError, getEnrollment } = useEnrollment();

  const navigate = useNavigate()
  const [ticket, setTicket] = useState();
  const [hotel, setHotel] = useState(null);
  const [subscription, setSubscription] = useState(false);
  const token = useToken();
  let [total, setTotal ] = useState(null);
  let [ticketSelected, setTicketSelected] = useState(null);
  let [bookSelected, setBookSelected] = useState(null);
  let [ticketType, setTicketType] = useState();

  const [ingressosSemHotel, setIngressosSemHotel] = useState([]);
  const [ingressosComHotel, setIngressosComHotel] = useState([]);
  
  let [cardPage, setCardPage] = useState(false);

  function encontrarTicketsPrincipais(arrayDeObjetos) {
    const objetosNaoRemotos = arrayDeObjetos.filter(objeto => objeto.isRemote === false);
    
    if (objetosNaoRemotos.length === 0) {
      return [];
    }
  
    const menorPreco = objetosNaoRemotos.reduce((menor, objeto) => (objeto.price < menor.price ? objeto : menor), objetosNaoRemotos[0]);
    const objetoRemoto = arrayDeObjetos.find(objeto => objeto.isRemote === true);
    return [menorPreco, objetoRemoto];
  }
  console.log(ticketSelected)

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  useEffect(() => {
    const requisicao = axios.get(`${import.meta.env.VITE_API_URL}/tickets/types`, config);

    requisicao.then(resposta => {
      console.log(resposta.data)
      setTicketType(resposta.data)

      setIngressosSemHotel(resposta.data.filter(ticket => !ticket.includesHotel || ticket.isRemote));
      setIngressosComHotel(resposta.data.filter(ticket => !ticket.isRemote));
      //const list = encontrarTicketsPrincipais(resposta.data)
      //console.log(list)
      //setTicketType(list)
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



  function selectTicket(ticket) {
    if (ticket.name == ticketSelected) {
      setTicketSelected(null)
      setBookSelected(null)
    } else {
      setTicketSelected(ticket)
      setTotal(ticket.price)
      setBookSelected(null)
    }
  }
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {subscription === true ? (
      !cardPage ? (
        <>
          <StyledTypography variant="h6">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
          <Buttons>
          {ingressosSemHotel.map((ticket) => (
            <ModalityButton
              key={ticket.id}
              onClick={() =>{
                selectTicket(ticket)
                setTicket(ticket.isRemote)
              }}
              ticketSelected={ticketSelected?.name === ticket.name ? "selected" : "noSelected"}
            >
              <h7>{ticket.name.charAt(0).toUpperCase() + ticket.name.slice(1)}</h7>
              <p>R$ {ticket.price},00</p>
            </ModalityButton>
          ))}            
          </Buttons>

          {ticketSelected !== null && !ticketSelected.isRemote ? (
            <>
              <StyledTypography variant="h6">Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
              <Buttons>
                {ingressosComHotel.map((ticket) => (
                  <ModalityButton
                    key={ticket.id}                    
                    onClick={() =>{
                      setHotel(ticket.includesHotel);
                      selectTicket(ticket);
                    }}
                    className={hotel === ticket.includesHotel ? 'selected' : ''}
                    //ticketSelected={ticketSelected?.id === ticket.id ? "selected" : "noSelected"}
                  >
                    <h7>{ticket.includesHotel ? "Com Hotel" : "Sem Hotel"}</h7>
                    <p> + R$ {ticket.price - ingressosSemHotel.find(t => t.name === ticket.name).price},00</p>
                  </ModalityButton>
                ))}
              </Buttons>
            </>
          ) : null}
          {(ticketSelected && ticket) || (ticketSelected && !ticket && hotel!== null) ? (
            <ConfirmaBooking total={total} ticket={ticketSelected} setCardPage={setCardPage} setTicket={setTicket}/>
          ) : null}

        </>
      ) : (
        <PaymentComponent info={{isRemote: ticketSelected?.isRemote, price: total, hotel: ticketSelected?.includesHotel, ticket: ticket}}/>
      )) : (
        <WarningMessage message="Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso" />
      )
      }
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
  background-color:  ${ticketSelected => ticketSelected?.ticketSelected == "selected" ? '#FFEED2' : '#FFFFFF'};
  margin-top:10px;


  h6{
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

