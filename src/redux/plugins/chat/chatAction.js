/**
 * Actions for Chat.
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */
import {bivtURL} from '../../apis/bivtApi';

//Purpose of Action: Describe some changes that we want to make to the data inside of our application.
export const chatRequest = () => {
  return {
    type: 'CHAT_REQUEST',
  };
};
