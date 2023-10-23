import Typography from '@mui/material/Typography';
import HotelCard from './HotelCard';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getHotels, getHotelsWithRooms } from '../../../hooks/api/useHotel';
import Loading from '../../../components/Loading';
import WarningMessage from '../../../components/Dashboard/Warning.jsx';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import RoomList from './RoomList';

export default function Hotel() {
  const { hotels, hotelsLoading } = getHotels();
  const [selectedHotel, setSelectedHotel] = useState();
  const [hotelList, setHotelList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [renderRoomList, setRenderRoomList] = useState(null);

  const token = useToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const requisicao = axios.get(`${import.meta.env.VITE_API_URL}/tickets`, config);

    requisicao.then((resposta) => {
      const ticket = resposta.data;
      if (!ticket.TicketType.includesHotel) {
        setErrorMessage('Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades');
      }

      if (ticket.status !== 'PAID') {
        setErrorMessage('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
      }
    });
    requisicao.catch((erro) => {
      setErrorMessage('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
    });
  }, []);

  useEffect(() => {
    if (!hotelsLoading) {
      setHotelList(hotels);
    }
  }, [hotels]);

  function handleSelectHotel(hotel) {
    setSelectedHotel(hotel);
    setRenderRoomList(<RoomList key={hotel.id} hotel={hotel} />);
  }

  return (
    <>
      <StyledTitleTypography variant="h4">Escolha de hotel e quarto</StyledTitleTypography>

      {errorMessage ? (
        <WarningMessage message={errorMessage} />
      ) : (
        <>
          <StyledTypography variant="h6">Primeiro, escolha seu hotel</StyledTypography>

          {hotelsLoading ? (
            <StyledDivLoading>
              <Loading />
            </StyledDivLoading>
          ) : (
            <StyledCardList>
              {hotelList.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  selectHotel={handleSelectHotel}
                  isSelected={hotel.id === selectedHotel?.id}
                />
              ))}
            </StyledCardList>
          )}
        </>
      )}

      {selectedHotel && (
        <>
          <StyledTypography variant="h6">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
          {renderRoomList}
        </>
      )}
    </>
  );
}

const StyledTitleTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  margin-top: 35px !important;
  color: #8e8e8e;
`;

const StyledCardList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const StyledDivLoading = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
