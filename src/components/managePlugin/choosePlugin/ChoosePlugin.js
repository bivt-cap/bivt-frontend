/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component let users choose the plugins
 *
 * @version 0.0.2
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 * @author: Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React
import React, {useState, useEffect} from 'react';

// React Native
import {StyleSheet} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  savePlugin,
  getCircleTypesAndPluginsDetail,
  resetBootstrap,
} from '../../../redux';

// Native Base
import {Container, Button, Content, Text, Toast, Body} from 'native-base';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

// Custom Layout
import HeaderWithLogo from '../../layout/headerWithLogo/HeaderWithLogo';
import SmallLoading from '../../layout/loadingSmall/loadingSmall';
import LoadingBig from '../../layout/loadingBig/LoadingBig';
import PluginButton from '../../layout/pluginButton/PluginButton';

// Style
const baseStyles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  button: {
    marginBottom: 50,
  },
});

// Screen
const ChoosePlugins = ({route, navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();
  const choosePluginsResponseDetails = useSelector(
    (state) => state.choosePlugin,
  );

  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);
  const createCircleStatus = useSelector((state) => state.createCircle);

  // State
  const [choosePluginDetails, setChoosePluginDetails] = useState({
    isLoading: false,
    plugins: [],
    selectedPlugins: [],
  });

  /**
   * This function fetch available circles and correponding plugins
   * on the page load
   */
  useEffect(() => {
    const getTypes = async () => {
      setChoosePluginDetails((prevState) => {
        return {
          ...prevState,
          isLoading: true,
        };
      });

      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();
      dispatch(getCircleTypesAndPluginsDetail(token));
    };
    getTypes();
  }, []);

  useEffect(() => {
    // if is loading
    if (choosePluginDetails.isLoading) {
      // No plugins yet
      if (
        choosePluginDetails.plugins.length <= 0 &&
        createCircleStatus.circleTypesAndPluginsDetails.plugins
      ) {
        setChoosePluginDetails((prevState) => {
          return {
            ...prevState,
            plugins: [
              ...createCircleStatus.circleTypesAndPluginsDetails.plugins,
            ],
          };
        });
      }

      if (
        choosePluginDetails.selectedPlugins.length <= 0 &&
        createCircleStatus.circleTypesAndPluginsDetails.circleType
      ) {
        const groupTypeId =
          bootstrapState.circles[0].image.indexOf('Family') >= 0
            ? 1
            : bootstrapState.circles[0].image.indexOf('Rommate') >= 0
            ? 2
            : 3;
        const groupType = createCircleStatus.circleTypesAndPluginsDetails.circleType.filter(
          function (el) {
            return el.id === groupTypeId;
          },
        )[0];
        setChoosePluginDetails((prevState) => {
          return {
            ...prevState,
            selectedPlugins: [...groupType.plugins],
          };
        });
      }
    }
  }, [createCircleStatus]);

  /**
   * The following function redirect to dashboard after
   * plugins have been saved succesfully.
   */
  useEffect(() => {
    if (
      choosePluginsResponseDetails.choosePluginsResponseDetails.status !==
      undefined
    ) {
      if (
        choosePluginsResponseDetails.choosePluginsResponseDetails.status.id ===
        200
      ) {
        dispatch(resetBootstrap());
        navigation.navigate('Bootstrap');
      }
    } else {
      if (choosePluginsResponseDetails.error) {
        Toast.show({
          text: choosePluginsResponseDetails.error,
          buttonText: 'OK',
          buttonTextStyle: {color: '#FFF'},
          buttonStyle: {backgroundColor: '#CA60E3'},
          duration: 8000,
        });
      }
    }
  }, [choosePluginsResponseDetails, navigation]);

  // Toggle Plugin Selection
  const handleToggleSelection = (pluginId) => {
    // Check if is selected
    if (
      choosePluginDetails.selectedPlugins.find((e) => e === pluginId) !==
      undefined
    ) {
      setChoosePluginDetails((prevState) => {
        return {
          ...prevState,
          selectedPlugins: [
            ...prevState.selectedPlugins.filter((e) => e !== pluginId),
          ],
        };
      });
    } else {
      setChoosePluginDetails((prevState) => {
        return {
          ...prevState,
          selectedPlugins: [...prevState.selectedPlugins, pluginId],
        };
      });
    }
  };

  // Add the Plugins to the Group
  const handleCreatePlugin = async () => {
    if (choosePluginDetails.selectedPlugins.length <= 0) {
      Toast.show({
        text: 'Please, choose at least one plugin to continue!',
        buttonText: 'OK',
        buttonTextStyle: {color: '#FFF'},
        buttonStyle: {backgroundColor: '#CA60E3'},
        duration: 8000,
      });
    } else {
      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();
      const circleId = bootstrapState.circles[0].id;

      for (let i = 0; i < choosePluginDetails.selectedPlugins.length; i++) {
        dispatch(
          savePlugin(choosePluginDetails.selectedPlugins[i], circleId, token),
        );
      }
    }
  };

  // Screen
  return (
    <Container>
      <HeaderWithLogo title="Choose Plugins" />
      <Content>
        {choosePluginDetails.plugins.length <= 0 &&
        choosePluginDetails.selectedPlugins.length <= 0 ? (
          <SmallLoading />
        ) : (
          <>
            <Body style={baseStyles.body}>
              {choosePluginDetails.plugins.map((plugin) => {
                return (
                  <PluginButton
                    pluginId={plugin.id}
                    eventHandler={() => handleToggleSelection(plugin.id)}
                    showSelected={true}
                    isSelected={
                      choosePluginDetails.selectedPlugins.find(
                        (e) => e === plugin.id,
                      ) !== undefined
                    }
                  />
                );
              })}
            </Body>
            <Button
              block
              style={baseStyles.button}
              onPress={() => handleCreatePlugin()}>
              <Text>Continue</Text>
            </Button>
          </>
        )}
      </Content>
    </Container>
  );

  //const dispatch = useDispatch();
  //
  ///**
  // * We are getting the following information(next three const) from
  // * create circle page
  // */
  //const {createCircleStatus} = route.params;
  //const {createCircleDetails} = route.params;
  //const recommendedPluginsIndexes =
  //  createCircleStatus.circleTypesAndPluginsDetails.circleType[
  //    createCircleDetails.selectedCircleType - 1
  //  ].plugins;
  //// ****************************************************//
  //// ************ BEGINING OF STATES DECLARATIONS ******//
  //// **************************************************//
  //const [checkBoxStateControl, setCheckBoxStateControl] = useState(0);
  //const [userMessage, setUserMessage] = useState('');
  //let checkBoxInitialState = {};
  //// ****************************************************//
  //// ************ END OF STATES DECLARATIONS ***********//
  //// **************************************************//
  //
  ///**
  // * Since we cannot have a set state inside a loop, we are trying to set it on load
  // * The following function sets a state for every option
  // */
  //useEffect(() => {
  //  createCircleStatus.circleTypesAndPluginsDetails.plugins.map((plugin) => {
  //    checkBoxInitialState['toggleCheckBox_' + plugin.id] = false;
  //  });
  //  setCheckBoxStateControl(checkBoxInitialState);
  //}, []);
  //
  ///**
  // * @param plugInId - the id of plugin we are trying to toggle
  // * The folowing function will allow maximum three selections
  // */
  //const handleCheckBoxChange = (plugInId) => {
  //  let pluginCount = 0;
  //  for (const element in checkBoxStateControl) {
  //    if (checkBoxStateControl[element]) {
  //      pluginCount++;
  //    }
  //  }
  //  const checkedState = checkBoxStateControl[plugInId];
  //  if (pluginCount < 3 || checkedState) {
  //    setCheckBoxStateControl((prevState) => {
  //      return {
  //        ...prevState,
  //        [plugInId]: !checkedState,
  //      };
  //    });
  //  } else {
  //    Toast.show({
  //      text: 'You can only choose three plugins at this time!',
  //      buttonText: 'Okay',
  //    });
  //  }
  //};
  //
  ///**
  // * The following function push the three seleted plugins to the DB
  // * There is no API avalable to store receive all three plugins at one, so fow now
  // * we are using a for loop. I am not using axios.all intentially.
  // */
  //const submitSelectedPlugins = async () => {
  //  let pluginCount = 0;
  //  let chosenPlugins = [];
  //  for (const element in checkBoxStateControl) {
  //    if (checkBoxStateControl[element]) {
  //      pluginCount++;
  //      chosenPlugins.push(element.split('_')[1]);
  //    }
  //  }
  //  if (pluginCount === 3) {
  //    setUserMessage('...processing');
  //    // Read the token from the Key Chain
  //    const token = await JwtKeyChain.read();
  //    const circleId = createCircleStatus.circleRegistrationDetails.circleId;
  //
  //    for (let i = 0; i < 3; i++) {
  //      dispatch(savePlugin(chosenPlugins[i], circleId, token));
  //    }
  //  } else {
  //    Toast.show({
  //      text: 'please choose three plugins to continue!',
  //      buttonText: 'Okay',
  //    });
  //  }
  //};
  //

  //
  ///**
  // * @author Arsh
  // * @param recommended -  True(recommende plugins) | False (other plugins)
  // * The following function loads recommended plugins based on the type of group
  // * (There has to be a better solution, currently we are iterating over the same
  // * array twice. I am leaving this comment here so that I can fix the performance later.)
  // */
  //const loadPlugins = (recommended) => {
  //  return createCircleStatus.circleTypesAndPluginsDetails.plugins.map(
  //    (plugin) => {
  //      checkBoxInitialState['toggleCheckBox_' + plugin.id] = false;
  //      if (recommendedPluginsIndexes.includes(plugin.id) === recommended) {
  //        return (
  //          <ListItem key={plugin.id}>
  //            <CheckBox
  //              checked={checkBoxStateControl['toggleCheckBox_' + plugin.id]}
  //              onPress={() => {
  //                handleCheckBoxChange('toggleCheckBox_' + plugin.id);
  //              }}
  //            />
  //            <Body>
  //              <Text>{plugin.name}</Text>
  //              <Text>${plugin.price}</Text>
  //            </Body>
  //          </ListItem>
  //        );
  //      }
  //    },
  //  );
  //};
  //
  //return (
  //  <Container>
  //    <Header />
  //    <Content>
  //      <ListItem itemDivider>
  //        <Text>Recommended Plugins</Text>
  //      </ListItem>
  //      {/* true signifies recommended plugins */}
  //      {loadPlugins(true)}
  //    </Content>
  //    <Content>
  //      <ListItem itemDivider>
  //        <Text>Other Plugins</Text>
  //      </ListItem>
  //      {/* false signifies non-recommended plugins */}
  //      {loadPlugins(false)}
  //    </Content>
  //    {choosePluginsResponseDetails.loading ? (
  //      <Text>...loading</Text>
  //    ) : createCircleStatus.error.length > 0 ? (
  //      <Text>{createCircleStatus.error[0]}</Text>
  //    ) : (
  //      <Text>{userMessage}</Text>
  //    )}
  //    <View style={choosePluginStyles.selectPluginContainer}>
  //      <Fab
  //        active={true}
  //        direction="up"
  //        containerStyle={{}}
  //        style={choosePluginStyles.selectPluginButton}
  //        position="bottomRight"
  //        onPress={submitSelectedPlugins}>
  //        <Icon name="play" useNativeDriver={false} />
  //      </Fab>
  //    </View>
  //  </Container>
  //);
};

export default ChoosePlugins;
