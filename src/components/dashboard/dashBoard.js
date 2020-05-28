import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Content, Text, Card, Button} from 'native-base';
import {deleteJTWFromKeyChain} from '../../redux';
import {GoogleSignin} from '@react-native-community/google-signin';
import ImagePicker from 'react-native-image-picker';
import Fire from '../plugins/chat/Fire';
const DashBoard = ({route, navigation}) => {
  const userData = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log(userData);
  const {loginInfo} = route.params;
  const [image, setImage] = useState();
  console.log(image);
  const handleLogoutButtonClick = async () => {
    try {
      //If user authenticate with google oAuth
      if (userData.googleisLoggedin === 'True') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        userData.googleisLoggedin = 'False';
        navigation.navigate('Login');
        console.log(userData);
        //If user authenticate with local sign in.
      } else if (userData.isLoggedin === 'True') {
        deleteJTWFromKeyChain();
        if (deleteJTWFromKeyChain()) {
          userData.isLoggedin = 'False';
          userData.loginDetails = '';
          console.log(userData);
          navigation.navigate('Login');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChatLogin = async () => {
    navigation.navigate('Chat', {userInfo: userData.loginDetails});
  };
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Library'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  const uploadImage = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        let path = response.uri;
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!response.fileName) {
          response.fileName = path.split('/').pop();
        }

        setImage(source);
        Fire.shared.uploadPhotos(response.fileName.toString(), source.uri);
      }
    });
  };
  return (
    <Container style={styles.container}>
      <Content>
        {Object.keys(loginInfo).length === 0 ? (
          <Text>Welcome Google </Text>
        ) : (
          <Card>
            <Text>Welcome {loginInfo.email} </Text>
            <Text>Name {loginInfo.firstName} </Text>
            <Text>Surname {loginInfo.lastName} </Text>
          </Card>
        )}

        <Button light onPress={handleLogoutButtonClick}>
          <Text> Logout </Text>
        </Button>
        <Button onPress={handleChatLogin}>
          <Text> Chat </Text>
        </Button>
        <Button onPress={uploadImage}>
          <Text> Upload Image </Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C4E7F4',
    position: 'absolute',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
  },
  form: {
    marginTop: '50%',
  },
  textContent: {
    fontSize: 20,
    color: 'red',
  },
  textCentered: {
    textAlign: 'center',
  },
});

export default DashBoard;
