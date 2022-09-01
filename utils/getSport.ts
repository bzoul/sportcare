import axios from './axios';
import config from '../config';
import {ISport} from '../interfaces/ISport';
import {capitalizeFirstLetter} from './capitalizeFirstLetter';

export const getSport = async (sportId: string) => {
  try {
    const response = await axios.get<ISport>(
      `${config.baseURL}/sports/${sportId}`,
    );
    if (response.status === 200) {
      return capitalizeFirstLetter(response.data.name);
    }
    return '';
  } catch (error) {
    console.error(error);
    return '';
  }
};
