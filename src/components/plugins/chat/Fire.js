import firebase from 'firebase';
import store from '../../../redux/store';
import {
  API_KEY,
  AUTH_DOMAIN,
  DB_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSEAGING_SENDING_ID,
  APP_ID,
  MEASUREMENT_ID,
} from 'react-native-dotenv';

class Fire {
  constructor() {
    this.initializeFireBaseConfig();
  }

  initializeFireBaseConfig = () =>
    firebase.initializeApp({
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DB_URL,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSEAGING_SENDING_ID,
      appId: APP_ID,
      measurementId: MEASUREMENT_ID,
    });

  fireBaseTable() {
    const mainState = store.getState();
    let groupName = mainState.bootstrap.circles[0].name;
    return firebase.database().ref(`messages-${groupName}/`);
  }

  //Function: Get the last 20 messages from firebase
  getMessageHistory = (callback) => {
    this.fireBaseTable()
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  // Function: Format snapshot value that comes from DB for Gifted Chat.
  parse = (snapshot) => {
    // 1.
    const {timestamp: numberStamp, text, user, image} = snapshot.val();
    const {key: _id} = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
      image,
    };
    return message;
  };

  disConnectFromFireBase() {
    this.ref.off();
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  sendMessages = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      // 4.
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.saveMessages(message);
    }
  };

  sendImages = (messages, userInfo) => {
    console.log(messages);

    // 4.
    const message = {
      user: userInfo,
      timestamp: this.timestamp,
      image: messages,
    };
    this.saveMessages(message);
  };

  //Function: Push messages to DB
  saveMessages = (message) => this.fireBaseTable().push(message);
}

Fire.shared = new Fire();

export default Fire;
