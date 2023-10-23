import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import styled from 'styled-components';

export default function RoomCard({ room }) {
  function renderIconPerson(capacity) {
    return Array.from({ length: capacity }, (_, index) => <StyledPerson key={index} size={27} />);
  }

  return (
    <StyledCard variant="outlined">
      <CardActionArea>
        <StyledCardContent>
          <StyledTypography>{room.name}</StyledTypography>
          <div>{renderIconPerson(room.capacity)}</div>
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
`;

const StyledTypography = styled(Typography)`
  font-weight: 700 !important;
  font-size: 20px !important;
  color: #454545;
`;

const StyledPerson = styled(BsPerson)``;
