import axios from 'axios';
import {BIVT_URL} from 'react-native-dotenv';

export const bivtURL = axios.create({
  baseURL: 'https://bivt-277321.wl.r.appspot.com',
});

//local env
//baseURL: 'http://192.168.0.10:3500',

//Production env
//baseURL: 'https://bivt-277321.wl.r.appspot.com',
