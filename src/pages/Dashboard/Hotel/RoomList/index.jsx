import { useEffect, useState } from 'react';
import { getHotelsWithRooms } from '../../../../hooks/api/useHotel';
import styled from 'styled-components';
import Loading from '../../../../components/Loading';
import RoomCard from './RoomCard';
import { Button } from '@mui/material';
import { useChangeBooking, useSaveBooking } from '../../../../hooks/api/useSaveBooking';
import { toast } from 'react-toastify';

export default function RoomList({
  hotel,
  roomChange,
  userBooking,
  setBookingSuccessful,
  toogleRoomChange,
  setRoomBooking,
}) {
  const { saveBookingLoading, saveBooking } = useSaveBooking();
  const { changeBooking, changeBookingLoading } = useChangeBooking();
  const { hotelWithRooms, hotelWithRoomsLoading } = getHotelsWithRooms(hotel.id);
  const [roomsList, setRoomsList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (!hotelWithRoomsLoading) {
      setRoomsList(hotelWithRooms.Rooms);
    }
  }, [hotelWithRooms]);

  async function bookRoom(room) {
    try {
      if (roomChange) {
        await changeBooking(userBooking.id, room.id);
        toogleRoomChange();
      } else {
        await saveBooking(room.id);
      }
      toast('Informações salvas com sucesso!');
      setRoomBooking(room);
      setBookingSuccessful(true);
    } catch (err) {
      console.log(err.response?.data?.message);
      toast('Não foi possível salvar suas informações!');
    }
  }

  function handleSelectRoom(room) {
    setSelectedRoom(room);
  }

  if (hotelWithRoomsLoading) {
    return (
      <StyledDivLoading>
        <Loading />
      </StyledDivLoading>
    );
  }

  return (
    <>
      <StyledList>
        {roomsList.map((room, index) => {
          return (
            <RoomCard
              key={index}
              room={room}
              isSelected={room.id === selectedRoom?.id}
              handleSelectRoom={handleSelectRoom}
            />
          );
        })}
      </StyledList>

      {selectedRoom && (
        <StyledButton
          variant="contained"
          disabled={saveBookingLoading || changeBookingLoading}
          onClick={() => bookRoom(selectedRoom)}
        >
          RESERVAR QUARTO
        </StyledButton>
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
  margin-bottom: 50px;
`;

const StyledDivLoading = styled.div`
  width: 100%;
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
  margin-bottom: 100px !important;
`;
