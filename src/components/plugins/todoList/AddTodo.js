import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Item, Form, Input, Button, Text} from 'native-base';

const AddTodo = (props) => {
  const initialTodo = {id: null, text: ''};
  const [todo, setTodo] = useState(initialTodo);

  const handleInput = (text, value) => {
    setTodo({...todo, [text]: value});
  };

  return (
    <Form style={styles.formStyle}>
      <Text style={styles.title}>Add item</Text>
      <Item style={styles.formBox}>
        <Input
          style={styles.textInput}
          placeholder={'Item'}
          onChangeText={(text) => handleInput('text', text)}
          value={todo.text}
          // onChange={handleInput}
          onSubmitEditing={() => {
            if (!todo.text) return;

            props.handleAdd(todo);
            setTodo(initialTodo);
          }}>
          </Input>
        {/* <Button
          transparent
          light
          onPress={(e) => {
            e.preventDefault();
            if (!todo.text) return;

            props.handleAdd(todo);
            setTodo(initialTodo);
          }}>
          <Text>Add</Text>
        </Button> */}
      </Item>
    </Form>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  formStyle: {
    padding: 0,
    margin: 0,
  },
  formBox: {
    display: 'flex',
  },
  title: {
    marginTop:10,
  },
  textInput: {
    borderWidth:1,
    borderColor:'#969696',
    height:55,
    paddingLeft: 20,
    marginBottom: 25,
    marginTop: 10,
    borderRadius: 5,
  }
});

// code source https://github.com/taniarascia/react-hooks
// https://medium.com/@hartaniyassir/build-a-todo-app-in-react-native-using-hooks-9953f1066d67
// https://github.com/jemise111/react-native-swipe-list-view
