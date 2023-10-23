import { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from '@mui/material/Typography';


export default function OptionsPresencial({ setBookSelected, hotel, setHotel }) {
  let [ticketSelected, setTicketSelected] = useState(null);


  const bookTicket = () =>{

  }

  return (
    <Containerg>
      
      <Buttons>
        <ModalityButton onClick={() => setHotel(false)}
          className={hotel === false ? 'selected' : ''}
        >
          <h6>Sem Hotel</h6>
          <p>+ R$ 0</p>
        </ModalityButton>
        <ModalityButton onClick={() => setHotel(true)}
          className={hotel === true ? 'selected' : ''}
        >
          <h6>Com Hotel</h6>
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

  
`;
