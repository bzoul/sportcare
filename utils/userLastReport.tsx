import axios from './axios';
import config from '../config';
import {IDailyReports} from '../interfaces/IDailyReports.types';

export const getLastReport = async (id: string) => {
  if (!id) {
    return;
  }
  try {
    const response = await axios.get<IDailyReports>(
      `${config.baseURL}/dailyReports/last/${id}`,
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
