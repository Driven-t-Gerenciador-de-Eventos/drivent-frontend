import React, { useState } from 'react';
import styled from 'styled-components';
import ReservationIcon from '../assets/images/bookActivity.svg'
import SoldOutIcon from '../assets/images/soldOutActivity.svg'
import SubscribedIcon from '../assets/images/subscribedActivity.svg'
import { toast } from 'react-toastify';
import useToken from '../hooks/useToken';
import axios from 'axios';

export default function Activity({ activity }){
  const startTime = new Date(`2023-10-22T${activity.startsAt}`);
  const endTime = new Date(`2023-10-22T${activity.endsAt}`);
  const durationInHours = (endTime - startTime) / 1000 / 60 / 60;
  const activityHeight = 80 * durationInHours + 'px';
  const [isSubscribed, setIsSubscribed] = useState(activity.isSubscribed);

  const token = useToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  async function bookActivity(activity){
    const requisicao = axios.post(`${import.meta.env.VITE_API_URL}/activity/${activity.id}`, config);
    requisicao.then((resposta) => {
      toast('Atividade reservada com sucesso!');
      setIsSubscribed(true);
    });
    requisicao.catch((erro) => {
      console.error(erro);
      if (erro.response.status === 409) toast('Você já tem outra atividade reservada nesse horário!');
      if (erro.response.status === 401) toast('Faça login novamente antes de continuar!');
      if (erro.response.status === 404) toast('Atividade não encontrada');
    });
  }

  return (
    <ActivityDiv style={{ height: activityHeight }} className={isSubscribed ? 'subscribed' : ''}>
      <div>
        <h5>{activity.name}</h5>
        <p>
          {activity.startsAt.slice(0, 5)} - {activity.endsAt.slice(0, 5)}
        </p>
      </div>
        <IconDiv>
            {isSubscribed ? (
                <>
                    <img src={SubscribedIcon} alt="Subscribed Icon" />
                    <p className={'subscribed'}>Inscrito</p>
                </>
            ) : (
                activity.availableCapacity > 0 ? (
                <>
                    <img
                    src={ReservationIcon}
                    alt="Reservation Icon"
                    onClick={() => bookActivity(activity)}
                    />
                    <p className={'available'}>{activity.availableCapacity} vagas</p>
                </>
                ) : (
                <>
                    <img
                    src={SoldOutIcon}
                    alt="Sold Out Icon"
                    onClick={() => toast('Essa atividade está esgotada')}
                    />
                    <p className={'sold-out'}>{activity.availableCapacity} vagas</p>
                </>
                )
            )}
        </IconDiv>

    </ActivityDiv>
  );
};

const IconDiv = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  align-items: center;
  border-left: solid #CFCFCF 1px;
`
const ActivityDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 265px;
  border-radius: 5px;
  background: #F1F1F1;
  padding: 12px;
  padding-right: 5px;

  &.subscribed{
    background: #D0FFDB;
  }
  h5{
    color: #343434;
    font-size: 12px;
    font-weight: 700;
    padding-bottom: 8px;
  }
  p{
    color: #343434;
    font-size: 12px;
  }
  ${IconDiv}{
    img{
      cursor: pointer;
    }
    p{
      font-size: 9px;
      &.available{
        color: #078632;
      } &.sold-out{
        color: #C66000;
      } &.subscribed{
        color: #078632;
      }
    }
  }
`;
