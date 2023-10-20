import { useEffect, useState } from "react";
import styled from "styled-components"

export default function ConfirmaBooking() {

return(
    <Containerg>
    <h2>Fechado! O total ficou em R$ 100. Agora é só confirmar:</h2>
    <Confirm>RESERVAR INGRESSO</Confirm>
      
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
