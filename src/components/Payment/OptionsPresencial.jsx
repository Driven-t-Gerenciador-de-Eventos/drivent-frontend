import { useEffect, useState } from "react";
import styled from "styled-components"

export default function OptionsPresencial({ setBookSelected }) {
  let [ticketSelected, setTicketSelected] = useState(null);


  function selectTicket(Option) {
    if (Option == ticketSelected) {
      setTicketSelected(null)
      setBookSelected(null)

    } else {
      setBookSelected(Option)
      setTicketSelected(Option)
      
    }
  }

  return (
    <Containerg>
      <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>

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

