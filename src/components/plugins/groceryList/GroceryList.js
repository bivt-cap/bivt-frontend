/**
 * This component handles the Resend of the Validation Email
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */
// React and React Native
import React, {useState, useEffect} from 'react';

// React Native
import {StyleSheet, TouchableOpacity} from 'react-native';

// Native Base
import {
  Container,
  Content,
  Form,
  Label,
  Item,
  Input,
  Button,
  Toast,
  List,
  ListItem,
  Text,
  Body,
} from 'native-base';

// Icons
import Icon from 'react-native-vector-icons/Feather';

// Hash ID
import uuid from 'react-native-uuid';

// Async Storage
import AsyncStorage from '@react-native-community/async-storage';

// Layout
import FooterBase from '../../layout/footerBase/FooterBase';

// Style
const baseStyles = StyleSheet.create({
  nForm: {
    marginTop: 20,
  },
});

// Screen
const GroceryList = ({route, navigation}) => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [groceryListDetails, setgroceryListDetails] = useState({
    itemToAdd: '',
    itemToAddError: false,
    list: [],
  });

  useEffect(() => {
    const getData = async () => {
      const storageList = await AsyncStorage.getItem('grocerListDB');
      const list = storageList !== null ? JSON.parse(storageList) : [];
      // Update state
      setgroceryListDetails((prevState) => {
        return {
          ...prevState,
          list: [...list],
        };
      });
    };

    getData();
  }, []);

  useEffect(() => {
    const storeData = async (value) => {
      const jsonValue = JSON.stringify(groceryListDetails.list);
      await AsyncStorage.setItem('grocerListDB', jsonValue);
    };
    storeData();
  }, [groceryListDetails.list]);

  // Handle input change
  const handleInputChange = (key, value) => {
    setgroceryListDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  // Handle add new item to the list
  const handleAddNewItem = () => {
    if (groceryListDetails.itemToAdd === '') {
      setgroceryListDetails((prevState) => {
        return {
          ...prevState,
          itemToAddError: true,
        };
      });
      Toast.show({
        text: 'The name of the item is required',
        buttonText: 'OK',
        buttonTextStyle: {color: '#FFF'},
        buttonStyle: {backgroundColor: '#CA60E3'},
        duration: 8000,
      });
    } else if (
      groceryListDetails.list.find((e) => e === groceryListDetails.itemToAdd)
    ) {
      setgroceryListDetails((prevState) => {
        return {
          ...prevState,
          itemToAddError: true,
        };
      });
      Toast.show({
        text: 'The item is already on the list',
        buttonText: 'OK',
        buttonTextStyle: {color: '#FFF'},
        buttonStyle: {backgroundColor: '#CA60E3'},
        duration: 8000,
      });
    } else {
      setgroceryListDetails((prevState) => {
        return {
          ...prevState,
          itemToAddError: false,
          list: [
            ...prevState.list,
            {
              id: uuid.v4(),
              name: groceryListDetails.itemToAdd,
              checked: false,
            },
          ],
          itemToAdd: '',
        };
      });
    }
  };

  // Handle toggle item
  const handleToggleItem = (id) => {
    // Find the item in array
    const itemIndex = groceryListDetails.list.findIndex(
      (item) => item.id === id,
    );

    if (itemIndex >= 0) {
      // Copy of the state
      const list = [...groceryListDetails.list];

      // Update the item
      list[itemIndex].checked = !list[itemIndex].checked;

      // Update state
      setgroceryListDetails((prevState) => {
        return {
          ...prevState,
          list: [...list],
        };
      });
    }
  };

  return (
    <Container>
      <Content>
        <Form style={baseStyles.nForm}>
          <Label>Add Item</Label>
          <Item regular>
            <Input
              placeholder="Add a new item"
              error={groceryListDetails.itemToAddError}
              onChangeText={(val) => handleInputChange('itemToAdd', val)}
              value={groceryListDetails.itemToAdd}
            />
            <Button transparent iconRight onPress={() => handleAddNewItem()}>
              <Icon
                name="plus-circle"
                size={30}
                color="#CA60E3"
                style={{marginRight: 10}}
              />
            </Button>
          </Item>
        </Form>
        <List
          style={{
            borderTopWidth: 1,
            borderColor: 'black',
          }}>
          {groceryListDetails.list
            .filter((item) => item.checked === false)
            .map((item) => {
              return (
                <ListItem style={{marginLeft: 0}}>
                  <TouchableOpacity onPress={() => handleToggleItem(item.id)}>
                    <Icon
                      name="circle"
                      size={30}
                      color="#CA60E3"
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                  <Body>
                    <Text>{item.name}</Text>
                  </Body>
                </ListItem>
              );
            })}
          {groceryListDetails.list
            .filter((item) => item.checked === true)
            .map((item) => {
              return (
                <ListItem style={{marginLeft: 0}}>
                  <TouchableOpacity onPress={() => handleToggleItem(item.id)}>
                    <Icon
                      name="check-circle"
                      size={30}
                      color="#B5B5B5"
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                  <Body>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        color: '#B5B5B5',
                      }}>
                      {item.name}
                    </Text>
                  </Body>
                </ListItem>
              );
            })}
        </List>
      </Content>
      <FooterBase navigation={navigation} />
    </Container>
  );
};

// Export
export default GroceryList;
