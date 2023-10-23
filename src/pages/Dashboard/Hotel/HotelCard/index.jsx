import styled from 'styled-components';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { getHotelsWithRooms } from '../../../../hooks/api/useHotel';
import { useEffect, useState } from 'react';
import DotLoaging from '../../../../components/Loading/DotLoaging';

export default function HotelCard({ hotel, isSelected, selectHotel }) {
  const { hotelWithRooms, hotelWithRoomsLoading } = getHotelsWithRooms(hotel.id);
  const [roomsList, setRoomsList] = useState([]);
  const [accommodation, setAccommodation] = useState('');

  useEffect(() => {
    if (!hotelWithRoomsLoading) {
      setRoomsList(hotelWithRooms.Rooms);
      getTypeOfAccommodation(hotelWithRooms.Rooms);
    }
  }, [hotelWithRooms]);

  function loadingData(data) {
    return hotelWithRoomsLoading ? <DotLoaging /> : data;
  }

  function getTypeOfAccommodation(rooms) {
    const type = [null, null, null];
    rooms.map((room) => {
      switch (room.capacity) {
        case 1:
          type[0] = 'Single';
          break;
        case 2:
          type[1] = 'Double';
          break;
        case 3:
          type[2] = 'Triple';
          break;
      }
    });

    if (type[0] && !type[1] && !type[2]) {
      setAccommodation('Single');
    }
    if (type[0] && type[1] && !type[2]) {
      setAccommodation('Single e Douple');
    }
    if (type[0] && !type[1] && type[2]) {
      setAccommodation('Single e Triple');
    }
    if (!type[0] && type[1] && !type[2]) {
      setAccommodation('Douple');
    }
    if (!type[0] && type[1] && type[2]) {
      setAccommodation('Douple e Triple');
    }
    if (!type[0] && !type[1] && type[2]) {
      setAccommodation('Triple');
    }
  }

  return (
    <StyledCard variant="outlined" isSelected={isSelected} onClick={() => selectHotel(hotel)}>
      <CardActionArea>
        <CardContent>
          <StyledCardMedia component="img" height="100" image={hotel.image} alt={hotel.name} />
          <StyledTitleTypography variant="h5">{hotel.name}</StyledTitleTypography>
          <StyledStrongTypography variant="h6">Tipos de acomodação:</StyledStrongTypography>
          <StyledInfoTypography variant="h5">{loadingData(accommodation)}</StyledInfoTypography>
          <StyledStrongTypography variant="h6">Vagas disponíveis:</StyledStrongTypography>
          <StyledInfoTypography variant="h5">{loadingData(roomsList.length)}</StyledInfoTypography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 200px;
  height: 260px;
  border-radius: 10px !important;
  background: ${({ isSelected }) => (isSelected ? '#FFEED2' : '#ebebeb')} !important;
  border: none !important;
`;

const StyledTypography = styled(Typography)`
  color: #3c3c3c !important;
`;

const StyledTitleTypography = styled(StyledTypography)`
  margin-top: 8px !important;
`;

const StyledStrongTypography = styled(StyledTypography)`
  font-size: 0.8rem !important;
  font-family: 'Helvetica' !important;
  font-weight: 700 !important;
  margin-top: 7px !important;
`;

const StyledInfoTypography = styled(StyledTypography)`
  margin-top: 0 !important;
  font-size: 0.8rem !important;
`;

const StyledCardMedia = styled(CardMedia)`
  border-radius: 5px;
`;
