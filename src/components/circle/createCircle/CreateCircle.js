/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component handles the creation of new groups/circles.
 *
 * @version 0.0.2
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 * @updated: Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React
import React, {useState, useEffect} from 'react';

// React Native
import {TouchableOpacity, StyleSheet} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  createCircle,
  getCircleTypesAndPluginsDetail,
  resetBootstrap,
} from '../../../redux';

// Native Base
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  H1,
  Card,
  CardItem,
  Body,
  Thumbnail,
  H2,
  List,
  ListItem,
  Toast,
} from 'native-base';

// Custom Layout
import HeaderWithLogo from '../../layout/headerWithLogo/HeaderWithLogo';
import SmallLoading from '../../layout/loadingSmall/loadingSmall';

// Validation
import {createCircleValidation} from './createCircleValidation';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

// Style
const createCircleStyles = StyleSheet.create({
  gTypeH1: {
    margin: 40,
    marginBottom: 40,
    marginTop: 20,
    textAlign: 'center',
  },
  gTypeBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gTypeBodyThumbnail: {
    borderWidth: 1,
    borderColor: '#CA60E3',
  },
  gTypeBodyText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
  },
  nForm: {
    marginTop: 20,
  },
  nH2: {
    margin: 40,
  },
  nList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  nListItem: {
    borderBottomWidth: 0,
  },
  nImgSelected: {
    borderWidth: 4,
    borderColor: '#CA60E3',
  },
});

// Image Map
import {ImageDefaultGroup} from '../../../utils/ImageMap';

// Screen
const CreateCircle = ({navigation}) => {
  // Hocks
  const dispatch = useDispatch();
  const createCircleStatus = useSelector((state) => state.createCircle);

  // States
  const [createCircleDetails, setCreateCircleDetails] = useState({
    circleName: '',
    selectedCircleType: 0,
    selectedImage: '',
  });
  const [createCircleError, setCreateCircleError] = useState({
    circleName: {
      error: false,
    },
    selectedCircleType: {
      error: false,
    },
  });

  /**
   * This function fetch available circles and correponding plugins
   * on the page load
   */
  useEffect(() => {
    const getTypes = async () => {
      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();
      dispatch(getCircleTypesAndPluginsDetail(token));
    };
    getTypes();
  }, []);

  /**
   * The following function redirect users to choose plugins page once the
   * circle has been succesfully created.
   */
  useEffect(() => {
    if (createCircleStatus.circleRegistrationDetails !== null) {
      dispatch(resetBootstrap());
      navigation.navigate('Bootstrap');
    }
  }, [createCircleStatus.circleRegistrationDetails]);

  //
  /**
   * Form validation:
   * On submission, this function sends the data to get validated
   * If validated, the rest call to create circle is made (in redux)
   */
  const submitCreateCircleForm = () => {
    let createCircleValidationErrors = createCircleValidation(
      createCircleDetails,
    );
    createCircleValidationErrors.then(async (errors) => {
      // Show erros
      setCreateCircleError(errors);
      if (!errors.circleName.error && !errors.selectedCircleType.error) {
        // Read the token from the Key Chain
        const token = await JwtKeyChain.read();
        dispatch(createCircle(createCircleDetails, token));
      } else {
        Toast.show({
          text: 'Group Name is required!',
          buttonText: 'OK',
          buttonTextStyle: {color: '#FFF'},
          buttonStyle: {backgroundColor: '#CA60E3'},
          duration: 8000,
        });
      }
    });
  };

  // Handle group selection
  const selectGroupType = (selectedCircleType) => {
    setCreateCircleDetails((prevState) => {
      return {
        ...prevState,
        selectedCircleType,
        selectedImage:
          selectedCircleType === 1
            ? 'Family1.png'
            : selectedCircleType === 2
            ? 'Rommate1.png'
            : 'SportTeam1.png',
      };
    });
  };

  // Handle the form input change
  const handleCreateCircleInputChange = (key, value) => {
    setCreateCircleDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  // Handle group selection
  const selectImage = (selectedImage) => {
    setCreateCircleDetails((prevState) => {
      return {
        ...prevState,
        selectedImage,
      };
    });
  };

  // Screen
  return (
    <Container>
      <HeaderWithLogo title="Creating a Group" />
      {createCircleDetails.selectedCircleType === 0 ? (
        <Content>
          <H1 style={createCircleStyles.gTypeH1}>
            What Kind Of Group Management Can Help You With?
          </H1>
          {createCircleStatus.circleTypesAndPluginsDetails.circleType ? (
            createCircleStatus.circleTypesAndPluginsDetails.circleType.map(
              (circleType, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => selectGroupType(circleType.id)}
                    key={index}>
                    <Card>
                      <CardItem>
                        <Body style={createCircleStyles.gTypeBody}>
                          <Thumbnail
                            large
                            style={createCircleStyles.gTypeBodyThumbnail}
                            source={
                              circleType.id === 1
                                ? ImageDefaultGroup[0].source
                                : circleType.id === 2
                                ? ImageDefaultGroup[3].source
                                : ImageDefaultGroup[6].source
                            }
                          />
                          <Text style={createCircleStyles.gTypeBodyText}>
                            {circleType.name}
                          </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                );
              },
            )
          ) : (
            <SmallLoading />
          )}
        </Content>
      ) : (
        <Content>
          <Form style={createCircleStyles.nForm}>
            <Label>Group Name</Label>
            <Item regular error={createCircleError.circleName.error}>
              <Input
                placeholder="Your Group Name"
                onChangeText={(val) =>
                  handleCreateCircleInputChange('circleName', val)
                }
              />
            </Item>
          </Form>
          <H2 style={createCircleStyles.nH2}>
            Personalize your group choosing a photo
          </H2>
          <List style={createCircleStyles.nList}>
            {ImageDefaultGroup.map((img, index) => {
              return (
                <ListItem style={createCircleStyles.nListItem} key={index}>
                  <TouchableOpacity onPress={() => selectImage(img.name)}>
                    <Thumbnail
                      style={
                        createCircleDetails.selectedImage === img.name
                          ? createCircleStyles.nImgSelected
                          : createCircleStyles.gTypeBodyThumbnail
                      }
                      source={img.source}
                    />
                  </TouchableOpacity>
                </ListItem>
              );
            })}
          </List>
          <Button
            full
            style={createCircleStyles.createCircleButton}
            onPress={() => submitCreateCircleForm()}>
            <Text>Create</Text>
          </Button>
        </Content>
      )}
    </Container>
  );
};

export default CreateCircle;
