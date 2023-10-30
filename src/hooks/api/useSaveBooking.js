import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export function useSaveBooking() {
  const token = useToken();

  const {
    loading: saveBookingLoading,
    error: saveBookingError,
    act: saveBooking,
  } = useAsync((data) => bookingApi.save(data, token), false);

  return {
    saveBookingLoading,
    saveBookingError,
    saveBooking,
  };
}

export function useChangeBooking() {
  const token = useToken();

  const {
    loading: changeBookingLoading,
    error: changeBookingError,
    act: changeBooking,
  } = useAsync((roomId, newRoomId) => bookingApi.change(roomId, newRoomId, token), false);

  return {
    changeBookingLoading,
    changeBookingError,
    changeBooking,
  };
}
