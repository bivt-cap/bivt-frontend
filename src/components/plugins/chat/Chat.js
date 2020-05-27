/**
 * The component for Chat App
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import {TypingAnimation} from 'react-native-typing-animation';
import {Text} from 'native-base';
import Fire from './Fire';

const Chat = ({route, navigation}) => {
  const userData = useSelector((state) => state.login);
  console.log('UserInformation', userData);
  const {userInfo} = route.params;
  console.log(userInfo);

  // ******************************************************//
  // ************ BEGININ OF STATES DECLARATIONS *********//
  // ***************************************************//
  const [message, setMessage] = useState({
    messages: [],
    isLoading: false,
  });
  console.log(message);

  useEffect(() => {
    Fire.shared.getMessageHistory((msg) =>
      setMessage((prevstate) => ({
        ...prevstate,
        messages: GiftedChat.append(prevstate.messages, msg),
        isLoading: true,
      })),
    );
    return () => {
      console.log('...unmounting');
      Fire.shared.disConnectFromFireBase();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = () => {
    return {
      name: userInfo.email,
      avatar: 'https://placeimg.com/140/140/any',
      _id: userInfo.email,
    };
  };
  return message.isLoading ? (
    <GiftedChat
      messages={message.messages}
      onSend={Fire.shared.sendMessages}
      user={user()}
    />
  ) : (
    <Text>...loading</Text>
  );
};

export default Chat;
