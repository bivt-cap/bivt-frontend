import React, {useState} from 'react';
import {Image, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Body,
} from 'native-base';
import {deleteJTWFromKeyChain, resetBootstrap} from '../../redux';
import Fire from '../plugins/chat/Fire';
import ImagePicker from 'react-native-image-picker';
import {GoogleSignin} from '@react-native-community/google-signin';

const DashBoard = ({route, navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);
  console.log(bootstrapState);
  const userData = useSelector((state) => state.login);

  const [image, setImage] = useState();
  console.log(image);

  const handleChatButtonClick = async () => {
    navigation.navigate('Chat', {userInfo: bootstrapState.user});
  };
  const handleLogoutButtonClick = async () => {
    try {
      //If user authenticate with google oAuth
      if (userData.googleisLoggedin === 'True') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        userData.googleisLoggedin = 'False';
        //navigation.navigate('Login');
        //console.log(userData);
        //If user authenticate with local sign in.
      } else if (userData.isLoggedin === 'True') {
        //deleteJTWFromKeyChain();
        //if (deleteJTWFromKeyChain()) {
        userData.isLoggedin = 'False';
        userData.loginDetails = '';
        //console.log(userData);
        //navigation.navigate('Login');
        //}
      }
      deleteJTWFromKeyChain();
      dispatch(resetBootstrap());
      navigation.navigate('Bootstrap');
    } catch (error) {
      console.error(error);
    }
  };
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = {
    title: 'Upload An Image',
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
    <Container>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>User</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Email: {bootstrapState.user.email}</Text>
              <Text>First Name: {bootstrapState.user.firstName}</Text>
              <Text>Last Name: {bootstrapState.user.lastName}</Text>
              <Text>Photo URL: {bootstrapState.user.photoUrl}</Text>
              <Text>Date of Birth: {bootstrapState.user.dateOfBirth}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>Circle</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Id: {bootstrapState.circles[0].id}</Text>
              <Text>Name: {bootstrapState.circles[0].name}</Text>
              <Text>Is Admin: {bootstrapState.circles[0].isAdmin}</Text>
              <Text>Is Owner: {bootstrapState.circles[0].isOwner}</Text>
              <Text>Joined On: {bootstrapState.circles[0].joinedOn}</Text>
            </Body>
          </CardItem>
        </Card>
        <Button onPress={handleLogoutButtonClick}>
          <Text> Logout </Text>
        </Button>
        <Button onPress={handleChatButtonClick}>
          <Text> Chat </Text>
        </Button>
        <Button onPress={uploadImage}>
          <Text> Upload Image </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default DashBoard;
