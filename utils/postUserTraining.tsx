import axios from './axios';
import config from '../config';
import {ITraining} from '../interfaces/ITraining.types';

export const postUserTraining = async (data: ITraining) => {
  try {
    const response = await axios.post(`${config.baseURL}/trainings/`, data);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};
