/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component let users choose the plugins
 *
 * @version 0.0.1
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
const AddRemovePlugin = ({route, navigation}) => {
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
        bootstrapState.circles[0].plugins
      ) {
        setChoosePluginDetails((prevState) => {
          return {
            ...prevState,
            selectedPlugins: [...bootstrapState.circles[0].plugins],
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
        if (
          !bootstrapState.circles[0].plugins.includes(
            choosePluginDetails.selectedPlugins[i],
          )
        ) {
          dispatch(
            savePlugin(choosePluginDetails.selectedPlugins[i], circleId, token),
          );
        }
      }
    }
  };

  // Screen
  return (
    <Container>
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
              <Text>Confirm</Text>
            </Button>
          </>
        )}
      </Content>
    </Container>
  );
};

export default AddRemovePlugin;
