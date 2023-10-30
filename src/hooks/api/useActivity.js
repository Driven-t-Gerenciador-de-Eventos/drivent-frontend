import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export function getActivities() {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities,
  } = useAsync(() => activityApi.getActivities(token));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities,
  };
}

export function reserveActivity(id) {
  const token = useToken();

  const {
    loading: reserveActivityLoading,
    error: reserveActivityError,
    act: reserveActivity,
  } = useAsync(() => activityApi.getActivities(id, token));

  return {
    reserveActivityLoading,
    reserveActivityError,
    reserveActivity,
  };
}
