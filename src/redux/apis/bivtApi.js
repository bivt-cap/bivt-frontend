import axios from 'axios';
import {BIVT_URL} from 'react-native-dotenv';

export const bivtURL = axios.create({
  baseURL: 'http://192.168.0.10:3500',
});
