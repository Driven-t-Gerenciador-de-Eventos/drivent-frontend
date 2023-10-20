import { useEffect, useState } from "react";
import styled from "styled-components"

export default function OptionsPresencial() {
    let [ticketSelected, setTicketSelected] = useState(null);

return(
    <Containerg>
    <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>

        <Options>
          <Box onClick={() => selectTicket()} ticketSelected={ticketSelected}>
            <h3>Presencial</h3>
            <h4>Valor</h4>
          </Box>
          <Box onClick={() => selectTicket()} ticketSelected={ticketSelected}>
            <h3>Online</h3>
            <h4>Valor</h4>
          </Box>
        </Options>
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
background-color: ${ticketSelected=>ticketSelected.ticketSelected ? '#FFEED2' : '#FFFFFF'};



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
