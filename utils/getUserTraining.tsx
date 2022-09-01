import axios from './axios';
import config from '../config';
import {ITraining} from '../interfaces/ITraining.types';

export const getUserTraining = async (userId: string) => {
  try {
    const response = await axios.get<ITraining[]>(
      `${config.baseURL}/trainings/user/${userId}`,
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
