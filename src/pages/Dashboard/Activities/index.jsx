import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import WarningMessage from '../../../components/Dashboard/Warning.jsx';
import { getActivities } from '../../../hooks/api/useActivity';
import Activity from '../../../components/Activity';

export default function Activities() {
  const { activities } = getActivities();
  const [activityList, setActivityList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [datas, setDatas] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [dateActivities, setDateActivities] = useState([]);


  const token = useToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const requisicao = axios.get(`${import.meta.env.VITE_API_URL}/tickets`, config);

    requisicao.then((resposta) => {
      const ticket = resposta.data;
      if (!ticket.TicketType.includesHotel) {
        setErrorMessage('Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.');
      }

      if (ticket.status !== 'PAID') {
        setErrorMessage('Você precisa ter confirmado pagamento antes de fazer a escolha de atividades');
      }
    });
    requisicao.catch((erro) => {
      setErrorMessage('Você precisa ter confirmado pagamento antes de fazer a escolha de atividades');
    });
  }, []);

  
  useEffect(() =>{
    setActivityList(activities);

    const uniqueDates = new Set();
    activities?.forEach(activity => {
      uniqueDates.add(activity.formattedDate);
    });
    const uniqueDatesArray = Array.from(uniqueDates);
    setDatas(uniqueDatesArray);
  }, [activities]);

  useEffect(() =>{
    const activitiesByDateAndLocation = activities?.reduce((acc, activity) => {
      const date = activity.formattedDate;
      const location = activity.place;
      if (!acc[date]) {
        acc[date] = {};
      }
      if (!acc[date][location]) {
        acc[date][location] = [];
      }
      acc[date][location].push(activity);
      return acc;
    }, {});
  
    setDateActivities(activitiesByDateAndLocation);
  }, [selectedDate])

  return(
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {errorMessage ? (
        <WarningMessage message={errorMessage} />
      ) : (
        <>
          <StyledTypography variant="h6">Primeiro, filtre pelo dia do evento: </StyledTypography>
          <SelectDate>
            {datas.map((data) => (
                <DateButton
                  key={data.id}
                  onClick={() =>{
                    setSelectedDate(data);
                  }}
                  className={selectedDate === data ? 'selected' : ''}
                >{data}</DateButton>
              ))}
          </SelectDate>

          <ActivityBoard>
            {selectedDate && dateActivities && dateActivities[selectedDate] ? (
              Object.keys(dateActivities[selectedDate]).map(location => (
                <div key={location}>
                  <h6>{location}</h6>
                  <List>
                    {dateActivities[selectedDate][location].length > 0 ? (
                      dateActivities[selectedDate][location].map(activity => (
                        <Activity key={activity.id} activity={activity} />
                      ))
                    ) : (
                      <p>Nenhuma atividade neste local.</p>
                    )}
                  </List>
                </div>
              ))
            ) : (
              <></>
            )}
          </ActivityBoard>
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
  color: #8E8E8E;

  &:nth-child(1) {
    color: #000000;
  }
`;

const SelectDate = styled.div`
  display: flex;
  gap: 17px;
`

const DateButton = styled.button`
  cursor: pointer;
  padding: 11px;
  border-radius: 4px;
  border: none;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;

  &.selected{
    border: none;
    background: #FFD37D;
  }
`

const ActivityBoard = styled.div`
  padding: 10px;
  padding-top: 60px;
  display: flex;
  justify-content: center;
  h6{
    color: #7B7B7B;
    text-align: center;
    font-size: 17px;
    text-align: center;
    margin-bottom: 13px;
  }
`
const Local = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 9px;
  border: solid #D7D7D7 1px;
  min-height: 100%

`
