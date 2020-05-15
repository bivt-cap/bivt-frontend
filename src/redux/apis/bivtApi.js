import axios from 'axios';
import {BIVT_URL} from 'react-native-dotenv';

export const bivtURL = axios.create({
  baseURL: BIVT_URL.toString(),
});
