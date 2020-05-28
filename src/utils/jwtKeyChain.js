// React Native Keychain
import * as Keychain from 'react-native-keychain';

// Env Variables
import {DEBUG_TOKEN} from 'react-native-dotenv';

/*
 * Write the JWT Token
 */
const write = async (token) => {
  if (token) {
    const result = await Keychain.setGenericPassword('token', token);
    console.debug('JWT Token - write: ', result);
  }
};

/*
 * Get the JWT Token
 */
const read = async () => {
  // Token
  let token = DEBUG_TOKEN;

  //console.log(DEBUG_TOKEN);

  // Only for Development purpose
  if (!token) {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      token = credentials.password;
    }
  }

  // Return the token
  return token;
};

/*
 * Delete the JWT Token
 */
const remove = async () => {
  return await Keychain.resetGenericPassword();
};

// Export
export default {
  write,
  read,
  remove,
};
