import React, {useState, useEffect} from 'react';
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Text,
  Toast,
  Body,
  Button,
  View,
  Icon,
  Fab,
} from 'native-base';
import choosePluginStyles from './choosePluginStyles';

const ChoosePlugins = ({route, navigation}) => {
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
    console.log(checkBoxStateControl);
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

  const submitSelectedPlugins = () => {
    console.log('Hi');
  };

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
    </Container>
  );
};

export default ChoosePlugins;
