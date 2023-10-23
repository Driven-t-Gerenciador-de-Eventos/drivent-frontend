import { useEffect, useState } from 'react';
import { getHotelsWithRooms } from '../../../../hooks/api/useHotel';
import styled from 'styled-components';
import Loading from '../../../../components/Loading';
import RoomCard from './RoomCard';

export default function RoomList({ hotel }) {
  const { hotelWithRooms, hotelWithRoomsLoading } = getHotelsWithRooms(hotel.id);
  const [roomsList, setRoomsList] = useState([]);

  useEffect(() => {
    if (!hotelWithRoomsLoading) {
      setRoomsList(hotelWithRooms.Rooms);
    }
  }, [hotelWithRooms]);

  return (
    <>
      {hotelWithRoomsLoading ? (
        <StyledDivLoading>
          <Loading />
        </StyledDivLoading>
      ) : (
        <StyledList>
          {roomsList.map((room) => (
            <RoomCard room={room} />
          ))}
        </StyledList>
      )}
    </>
  );
}

const StyledList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 17px;
`;

const StyledDivLoading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
