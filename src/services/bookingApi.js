import api from './api';

export async function save(roomId, token) {
  const response = await api.post(
    `/booking`,
    { roomId: roomId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function change(roomId, newRoomId, token) {
  const response = await api.put(
    `/booking/${roomId}`,
    { roomId: newRoomId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function getBooking(token) {
  const response = await api.get(`/booking`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
