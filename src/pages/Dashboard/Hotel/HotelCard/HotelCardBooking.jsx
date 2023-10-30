import styled from 'styled-components';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { getHotelsWithRooms } from '../../../../hooks/api/useHotel';

export default function HotelCardBooking({ hotel, room }) {
  const { hotelWithRooms, hotelWithRoomsLoading } = getHotelsWithRooms(hotel?.id);

  function getTypeOfAccommodation(capacity) {
    switch (capacity) {
      case 1:
        return 'Single';
      case 2:
        return 'Double';
      case 3:
        return 'Triple';
    }
  }

  function peopleInTheRoom() {
    if (room?.capacity === 1) {
      return 'Apenas você';
    }

    if (!hotelWithRoomsLoading) {
      const currentRoom = hotelWithRooms?.Rooms?.find((r) => r.id == room?.id);
      const roommates = currentRoom?.Booking?.length - 1;

      if (roommates === 0) return 'Apenas você';
      return `Você e mais ${roommates}`;
    }
  }

  return (
    <StyledCard variant="outlined">
      <CardActionArea>
        <CardContent>
          <StyledCardMedia component="img" height="100" image={hotel?.image} alt={hotel?.name} />
          <StyledTitleTypography variant="h5">{hotel?.name}</StyledTitleTypography>
          <StyledStrongTypography variant="h6">Quarto reservado</StyledStrongTypography>
          <StyledInfoTypography variant="h5">
            {room?.name} ({getTypeOfAccommodation(room?.capacity)})
          </StyledInfoTypography>
          <StyledStrongTypography variant="h6">Pessoas no seu quarto:</StyledStrongTypography>
          <StyledInfoTypography variant="h5">{peopleInTheRoom()}</StyledInfoTypography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 200px;
  height: 260px;
  border-radius: 10px !important;
  background: #ffeed2 !important;
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
