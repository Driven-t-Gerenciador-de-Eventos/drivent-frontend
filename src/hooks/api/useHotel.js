import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';

export function getHotels() {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotels,
  } = useAsync(() => hotelApi.getHotels(token));

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotels,
  };
}

export function getHotelsWithRooms(id) {
  const token = useToken();

  const {
    data: hotelWithRooms,
    loading: hotelWithRoomsLoading,
    error: hotelWithRoomsError,
    act: getHotelWithRooms,
  } = useAsync(() => hotelApi.getHotelWithRooms(id, token));

  return {
    hotelWithRooms,
    hotelWithRoomsLoading,
    hotelWithRoomsError,
    getHotelWithRooms,
  };
}
