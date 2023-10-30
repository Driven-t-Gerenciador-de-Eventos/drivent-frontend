import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import styled from 'styled-components';

export default function RoomCard({ room, isSelected, handleSelectRoom }) {
  function renderIconPerson(capacity, bookings, isSelected) {
    let selectedRendered = false;
    return Array.from({ length: capacity }, (_, index) => {
      const isReserved = index >= capacity - bookings;
      const renderSelected = isSelected && !selectedRendered && !isReserved;
      if (renderSelected) selectedRendered = true;

      return (
        <StyledPerson
          key={index}
          size={27}
          isReserved={isReserved}
          isFull={capacity === bookings}
          isSelected={renderSelected}
        />
      );
    });
  }

  return (
    <StyledCard variant="outlined">
      <CardActionArea disabled={room.capacity === room.Booking.length} onClick={() => handleSelectRoom(room)}>
        <StyledCardContent isFull={room.capacity === room.Booking.length}>
          <StyledTypography>{room.name}</StyledTypography>
          <div>{renderIconPerson(room.capacity, room.Booking.length, isSelected)}</div>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  border-radius: 10px !important;
  border: 1px solid #cecece !important;
`;

const StyledCardContent = styled(CardContent)`
  height: 45px;
  width: 190px;
  padding: 16px !important;
  display: flex;
  align-items: center !important;
  justify-content: space-between;

  color: ${({ isFull }) => (isFull ? '#8C8C8C' : '#454545')};
  background: ${({ isFull }) => (isFull ? '#E9E9E9' : 'none')};
`;

const StyledTypography = styled(Typography)`
  font-weight: 700 !important;
  font-size: 20px !important;
`;

const StyledPerson = styled(({ isReserved, isSelected, ...props }) =>
  isReserved | isSelected ? <BsPersonFill {...props} /> : <BsPerson {...props} />
)`
  color: ${({ isFull }) => (isFull ? '#8C8C8C' : 'black')};
  ${({ isSelected }) => isSelected && `color: #FF4791;`}
`;
