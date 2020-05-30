import firebase from 'firebase';

class Fire {
  constructor() {
    this.initializeFireBaseConfig();
  }
  initializeFireBaseConfig = () =>
    firebase.initializeApp({
      apiKey: 'AIzaSyBCCGcb9_O3ifiOlhGc3iljQNZch3aD1gU',
      authDomain: 'kovan-chat.firebaseapp.com',
      databaseURL: 'https://kovan-chat.firebaseio.com',
      projectId: 'kovan-chat',
      storageBucket: 'kovan-chat.appspot.com',
      messagingSenderId: '373620589219',
      appId: '1:373620589219:web:a78580cec84a2ce6cb3516',
      measurementId: 'G-714FYVKT9P',
    });

  //Function: Create a reference in our db where the all messages will be stored.
  get fireBaseTable() {
    return firebase.database().ref('messages/');
  }
  //Function: Get the last 20 messages from firebase
  getMessageHistory = (callback) =>
    this.fireBaseTable
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(this.parse(snapshot)));

  // Function: Format snapshot value that comes from DB for Gifted Chat.
  parse = (snapshot) => {
    // 1.
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
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
  //Function: Push messages to DB
  saveMessages = (message) => this.fireBaseTable.push(message);

  // uploadPhotos = (photoName, path) => {
  //   const storage = firebase.storage();
  //   storage.ref(`images/${photoName}`).put(path);
  // };
}

Fire.shared = new Fire();
export default Fire;
