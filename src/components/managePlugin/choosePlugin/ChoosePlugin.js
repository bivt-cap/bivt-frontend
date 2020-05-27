import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {savePlugin} from '../../../redux';
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Text,
  Toast,
  Body,
  View,
  Icon,
  Fab,
} from 'native-base';
import choosePluginStyles from './choosePluginStyles';
console.disableYellowBox = true;
const ChoosePlugins = ({route, navigation}) => {
  const dispatch = useDispatch();
  const choosePluginsResponseDetails = useSelector(
    (state) => state.choosePlugin,
  );
  /**
   * We are getting the following information(next three const) from
   * create circle page
   */
  const {createCircleStatus} = route.params;
  const {createCircleDetails} = route.params;
  const recommendedPluginsIndexes =
    createCircleStatus.circleTypesAndPluginsDetails.circleType[
      createCircleDetails.selectedCircleType - 1
    ].plugins;
  // ****************************************************//
  // ************ BEGINING OF STATES DECLARATIONS ******//
  // **************************************************//
  const [checkBoxStateControl, setCheckBoxStateControl] = useState(0);
  const [userMessage, setUserMessage] = useState('');
  let checkBoxInitialState = {};
  // ****************************************************//
  // ************ END OF STATES DECLARATIONS ***********//
  // **************************************************//

  /**
   * Since we cannot have a set state inside a loop, we are trying to set it on load
   * The following function sets a state for every option
   */
  useEffect(() => {
    createCircleStatus.circleTypesAndPluginsDetails.plugins.map((plugin) => {
      checkBoxInitialState['toggleCheckBox_' + plugin.id] = false;
    });
    setCheckBoxStateControl(checkBoxInitialState);
  }, []);

  /**
   * @param plugInId - the id of plugin we are trying to toggle
   * The folowing function will allow maximum three selections
   */
  const handleCheckBoxChange = (plugInId) => {
    let pluginCount = 0;
    for (const element in checkBoxStateControl) {
      if (checkBoxStateControl[element]) {
        pluginCount++;
      }
    }
    const checkedState = checkBoxStateControl[plugInId];
    if (pluginCount < 3 || checkedState) {
      setCheckBoxStateControl((prevState) => {
        return {
          ...prevState,
          [plugInId]: !checkedState,
        };
      });
    } else {
      Toast.show({
        text: 'You can only choose three plugins at this time!',
        buttonText: 'Okay',
      });
    }
  };

  /**
   * The following function push the three seleted plugins to the DB
   * There is no API avalable to store receive all three plugins at one, so fow now
   * we are using a for loop. I am not using axios.all intentially.
   */
  const submitSelectedPlugins = () => {
    let pluginCount = 0;
    let chosenPlugins = [];
    for (const element in checkBoxStateControl) {
      if (checkBoxStateControl[element]) {
        pluginCount++;
        chosenPlugins.push(element.split('_')[1]);
      }
    }
    if (pluginCount === 3) {
      setUserMessage('...processing');
      const circleId =
        createCircleStatus.circleRegistrationDetails.data.circleId;
      for (let i = 0; i < 3; i++) {
        dispatch(savePlugin(chosenPlugins[i], circleId));
      }
    } else {
      Toast.show({
        text: 'please choose three plugins to continue!',
        buttonText: 'Okay',
      });
    }
  };

  /**
   * The following function redirect to dashboard after plugins have been saved succesfully.
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
        setUserMessage('...Saved !Ready to go to dashboard');
        //navigation.navigate('DashBoard');
      }
    } else {
      setUserMessage(choosePluginsResponseDetails.error);
    }
  }, [choosePluginsResponseDetails, navigation]);

  /**
   * @author Arsh
   * @param recommended -  True(recommende plugins) | False (other plugins)
   * The following function loads recommended plugins based on the type of group
   * (There has to be a better solution, currently we are iterating over the same
   * array twice. I am leaving this comment here so that I can fix the performance later.)
   */
  const loadPlugins = (recommended) => {
    return createCircleStatus.circleTypesAndPluginsDetails.plugins.map(
      (plugin) => {
        checkBoxInitialState['toggleCheckBox_' + plugin.id] = false;
        if (recommendedPluginsIndexes.includes(plugin.id) === recommended) {
          return (
            <ListItem key={plugin.id}>
              <CheckBox
                checked={checkBoxStateControl['toggleCheckBox_' + plugin.id]}
                onPress={() => {
                  handleCheckBoxChange('toggleCheckBox_' + plugin.id);
                }}
              />
              <Body>
                <Text>{plugin.name}</Text>
                <Text>${plugin.price}</Text>
              </Body>
            </ListItem>
          );
        }
      },
    );
  };

  return (
    <Container>
      <Header />
      <Content>
        <ListItem itemDivider>
          <Text>Recommended Plugins</Text>
        </ListItem>
        {/* true signifies recommended plugins */}
        {loadPlugins(true)}
      </Content>
      <Content>
        <ListItem itemDivider>
          <Text>Other Plugins</Text>
        </ListItem>
        {/* false signifies non-recommended plugins */}
        {loadPlugins(false)}
        <View style={choosePluginStyles.selectPluginContainer}>
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={choosePluginStyles.selectPluginButton}
            position="bottomRight"
            onPress={submitSelectedPlugins}>
            <Icon name="play" useNativeDriver={false} />
          </Fab>
        </View>
      </Content>
      {choosePluginsResponseDetails.loading ? (
        <Text>...loading</Text>
      ) : createCircleStatus.error.length > 0 ? (
        <Text>{createCircleStatus.error[0]}</Text>
      ) : (
        <Text>{userMessage}</Text>
      )}
    </Container>
  );
};

export default ChoosePlugins;
