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
  const token = useToken();
  const { enrollment } = useEnrollment();
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
      setTicketType((resposta.data))
      console.log(resposta.data)
    })
    requisicao.catch(erro => {
      console.log((erro.data))
    });
  }, []);

  function selectTicket(Option) {
    if (Option == ticketSelected) {
      setTicketSelected(null)
      setBookSelected(null)
    } else {
      setTicketSelected(Option)
      setBookSelected(null)
    }
  }

  console.log(bookSelected)
  if (enrollment == null) {
    toast('cadastre-se para seguir com pagamento!');
    return (<Containerg>
      <h2>Você precisa completar sua inscrição antes
        de prosseguir pra escolha de ingresso</h2>
    </Containerg>
    );
  } else {
    return (
      <Containerg>
        <h1>Ingresso e pagamento</h1>
        <h2>Primeiro, escolha sua modalidade de ingresso</h2>
        <Options>
          <Box onClick={() => selectTicket("Presencial")} ticketSelected={ticketSelected == "Presencial" ? "selected" : "noSelected"}>
            <h3>Presencial</h3>
            <h4>Valor</h4>
          </Box>
          <Box onClick={() => selectTicket("Online")} ticketSelected={ticketSelected == "Online" ? "selected" : "noSelected"}>
            <h3>Online</h3>
            <h4>Valor</h4>
          </Box>
        </Options>


        {ticketSelected == "Presencial" ? < OptionsPresencial setBookSelected={setBookSelected} /> : <></>}

        {bookSelected ? < ConfirmaBooking /> : <></>}


      </Containerg>
    )
  }






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

  }


`
const Options = styled.div`

  display: flex;
 
 
 
`
const Box = styled.div`
width: 145px;
height: 145px;
border: 1px solid #CECECE;
border-radius: 20px;
background-color: ${ticketSelected => ticketSelected.ticketSelected == "selected" ? '#FFEED2' : '#FFFFFF'};


margin-top:10px;
margin-right: 25px;
  display: flex;
 flex-direction: column;
  justify-content:center;
  align-items: center;

  h3{
    font-family: Roboto;
font-size: 16px;
font-weight: 400;
line-height: 19px;
letter-spacing: 0em;
text-align: center;
color: #454545;
  }
  h4{
    font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 16px;
letter-spacing: 0em;
text-align: center;
color: #898989;
  }
 
`
  ;
