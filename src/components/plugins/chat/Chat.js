/**
 * The component for Chat App
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  GiftedChat,
  Actions,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {Text, Icon, Item, Input, Button} from 'native-base';

import Fire from './Fire';

const Chat = ({route, navigation}) => {
  const userData = useSelector((state) => state.login);
  console.log('UserInformation', userData);
  const {userInfo} = route.params;

  // ******************************************************//
  // ************ BEGININ OF STATES DECLARATIONS *********//
  // ***************************************************//
  const [message, setMessage] = useState({
    messages: [],
    isLoading: false,
  });
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
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Icon name="md-send" style={{color: 'blue', marginRight: 10}} />
      </Send>
    );
  };
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{
          borderRadius: 20,
        }}
      />
    );
  };
  const renderCameraButton = () => {
    return (
      <Button transparent>
        <Icon name="ios-camera" />
      </Button>
    );
  };
  return message.isLoading ? (
    <GiftedChat
      messages={message.messages}
      onSend={Fire.shared.sendMessages}
      renderSend={renderSend}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderCameraButton}
      user={user()}
    />
  ) : (
    <Text>...loading</Text>
  );
};

export default Chat;
