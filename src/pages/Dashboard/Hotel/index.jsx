import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import HotelCardBooking from './HotelCard/HotelCardBooking';
import useBooking from '../../../hooks/api/useBooking';
import { getHotels } from '../../../hooks/api/useHotel';
import Loading from '../../../components/Loading';
import HotelCard from './HotelCard';
import { useEffect, useState } from 'react';
import RoomList from './RoomList';

export default function Hotel() {
  const { booking, bookingLoading } = useBooking();
  const { hotels, hotelsLoading } = getHotels();

  const [renderRoomList, setRenderRoomList] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingSuccessful, setBookingSuccessful] = useState(false);
  const [roomChange, setRoomChange] = useState(false);
  const [roomBooking, setRoomBooking] = useState(null);

  useEffect(() => {
    if (booking) {
      setBookingSuccessful(true);
    }
  });

  function handleSelectHotel(hotel) {
    setSelectedHotel(hotel);

    setRenderRoomList(
      <RoomList
        key={hotel.id}
        hotel={hotel}
        userBooking={booking}
        setBookingSuccessful={setBookingSuccessful}
        roomChange={roomChange}
        toogleRoomChange={toogleRoomChange}
        setRoomBooking={setRoomBooking}
      />
    );
  }

  function toogleRoomChange() {
    setRoomChange(!roomChange);
  }

  if (bookingLoading || hotelsLoading) {
    return (
      <StyledDivLoading>
        <Loading />
      </StyledDivLoading>
    );
  }

  if (booking && hotels && bookingSuccessful && !roomChange) {
    const bookedRoom = roomBooking || booking?.Room;
    const bookedHotel = hotels.find((h) => h.id === bookedRoom.hotelId);

    return (
      <>
        <StyledTitleTypography variant="h4">Escolha de hotel e quarto</StyledTitleTypography>
        <StyledTypography variant="h6">Você já escolheu seu quarto:</StyledTypography>
        <HotelCardBooking hotel={bookedHotel} room={bookedRoom} />
        <StyledButton variant="contained" onClick={() => toogleRoomChange()}>
          TROCAR QUARTO
        </StyledButton>
      </>
    );
  }

  if (hotels) {
    return (
      <>
        <StyledTitleTypography variant="h4">Escolha de hotel e quarto</StyledTitleTypography>
        <StyledTypography variant="h6">Primeiro, escolha seu hotel</StyledTypography>
        <StyledCardList>
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              selectHotel={handleSelectHotel}
              isSelected={hotel.id === selectedHotel?.id}
            />
          ))}
        </StyledCardList>

        {selectedHotel && (
          <>
            <StyledTypography variant="h6">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
            {renderRoomList}
          </>
        )}
      </>
    );
  }
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: auto;
  height: 40px;
  border-radius: 4px !important;
  background: #e0e0e0 !important;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25) !important;
  color: #000 !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  margin-top: 40px !important;
`;
