import React,{ useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import {
    Item,
    Text,
    Button,
    Form,
    Input
  } from 'native-base';

  
  const EditTodo = (props) => {

    const [ todo, setTodo ] = useState(props.currentTodo)

    useEffect(() => {
          setTodo(props.currentTodo)
        },
        [ props ]
      )

      const handleInput = (text, value) => {
        setTodo({ ...todo, [text]: value })
    }


    return (
        <Form style={styles.formStyle}>
            <Item style={styles.formBox}>
                <Input 
                    style={styles.textInput}
                    // onChangeText={handleInput}
                    onChangeText={(text) => handleInput("text", text)}
                    value={todo.text}
                />
                <Button 
                    transparent 
                    light 
                    onPress={() => {
                        props.setEditing(false)}
                    }
                >
                    <Text>Cancel</Text>
                </Button>
                <Button 
                    transparent 
                    light 
                    onPress={() => {
                        props.handleEdit(todo.id, todo)
                        console.log(todo)
                    }}
                >
                    <Text>Edit</Text>
                </Button>
            </Item>
        </Form>
    );
}

export default EditTodo

const styles = StyleSheet.create({

    formStyle: {
        padding: 0,
        margin: 0,
    },
    formBox: {
        display: 'flex',
    }

})

// code source https://github.com/taniarascia/react-hooks
// https://medium.com/@hartaniyassir/build-a-todo-app-in-react-native-using-hooks-9953f1066d67
// https://github.com/jemise111/react-native-swipe-list-view