import axios from 'axios';
import {BIVT_URL} from 'react-native-dotenv';

export const bivtURL = axios.create({
  baseURL: 'https://bivt-277321.wl.r.appspot.com',
});
