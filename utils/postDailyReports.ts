import axios from './axios';
import config from '../config';
import {IDailyReports} from '../interfaces/IDailyReports.types';

export const postDailyReports = async (data: IDailyReports) => {
  try {
    const response = await axios.post(`${config.baseURL}/dailyReports/`, data);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};
