import Typography from '@mui/material/Typography';
import styled from 'styled-components';

export default function PaymentSummary(info){
    return (
        <>
          <Typography variant="h6" color="#8E8E8E">Ingresso escolhido</Typography>
          <Summary>
            <Typography variant="body1" color="#454545">{info.props.isRemote ? "Online" : ("Presencial" + (info.props.hotel ? "Com Hotel" : "Sem Hotel"))}</Typography>
            <Typography variant="body2" color="#898989">R$ {info.props.price}</Typography>
          </Summary>
        </>
    )
}

const Summary = styled.div`
    background-color: #FFEED2;
    width: 290px;
    height: 108px;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    margin: 10px 0px;
`