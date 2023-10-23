import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export default function PaidMessage() {
  return (
    <>
      <Typography variant="h6" color="#8E8E8E">Pagamento</Typography>
      <Container>
        <Icon />
        <AlignText>
          <Title>Pagamento confirmado!</Title>
          <Subtitle>Prossiga para escolha de hospedagem e atividades</Subtitle>
        </AlignText>
      </Container>
    </>
  );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Icon = styled(IoCheckmarkCircleSharp)`
    font-size: 40.33px;
    color: #36B853;
    margin-right: 14px;
`;

const AlignText = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h6`
    color: #454545;
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
`;

const Subtitle = styled.h6`
    color: #454545;
    font-size: 16px;
    font-weight: 300;
    line-height: 18.75px;
`;