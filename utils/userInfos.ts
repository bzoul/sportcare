import axios from '../utils/axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUserInfos} from '../interfaces/IUserInfos.types';
import {IJWTDecode} from '../interfaces/IJWTDecode.types';

export const fetchUserInfos = async () => {
  const token = (await AsyncStorage.getItem('token')) as unknown as string;
  const decoded = jwt_decode<IJWTDecode>(token);
  const userId = decoded.userId;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  if (token) {
    try {
      const response = await axios.get<IUserInfos>(`/users/${userId}`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
