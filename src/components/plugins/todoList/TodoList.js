import React, {useState, useEffect} from 'react';
import TodoItems from './TodoItems';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';

//react native
import {Alert} from 'react-native';

//native base
import {Toast} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import {Container, Content} from 'native-base';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {
  addTodo,
  getTodoList,
  delTodo,
  checkTodo,
  editTodo,
} from '../../../redux';

//Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

const TodoList = () => {
  const dispatch = useDispatch();
  const bootstrapState = useSelector((state) => state.bootstrap);
  const todoListState = useSelector((state) => state.todoList);

  const defaultTodo = [{id: 1, text: 'Demo ToDo'}];

  const initialTodo = {id: null, text: ''};

  const [todos, setTodos] = useState(defaultTodo);
  const [currentTodo, setCurrentTodo] = useState(initialTodo);
  const [editing, setEditing] = useState(false);

  // ****************************************************//
  // ***************** BEGINING OF ADD ******************//
  // **************************************************//
  const handleAdd = async (todo) => {
    //call redux to add
    const circleId = bootstrapState.circles[0].id;
    const token = await JwtKeyChain.read();
    dispatch(addTodo(todo.text, circleId, token)).then(() => {
      getTodos();
    });
  };

  // ****************************************************//
  // ********************* END OF ADD *******************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF DELETE ******************//
  // **************************************************//

  const handleDelete = (id) => {
    Alert.alert(
      'Warning',
      'Are you sure you want to delete this budget?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteTodo(id)},
      ],
      {cancelable: false},
    );
  };

  const deleteTodo = async (id) => {
    const circleId = bootstrapState.circles[0].id;
    const token = await JwtKeyChain.read();
    dispatch(delTodo(id, circleId, token)).then(() => {
      getTodos();
    });
  };

  // ****************************************************//
  // ****************** END OF DELETE ******************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF CHECKED ******************//
  // **************************************************//
  const handleChecked = async (id) => {
    const circleId = bootstrapState.circles[0].id;
    const token = await JwtKeyChain.read();
    dispatch(checkTodo(id, circleId, token)).then(() => {
      getTodos();
    });
  };
  // ****************************************************//
  // ***************** END OF CHECKED ******************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF EDIT ******************//
  // **************************************************//

  const handleEdit = async (id, updatedTodo) => {
    const circleId = bootstrapState.circles[0].id;
    const token = await JwtKeyChain.read();
    dispatch(editTodo(id, updatedTodo.text, circleId, token)).then(() => {
      getTodos();
    });
  };

  const editTodoRow = (todo) => {
    setEditing(true);
    setCurrentTodo({id: todo.id, text: todo.text});
  };

  // ****************************************************//
  // ************ BEGINING OF EDIT ******************//
  // **************************************************//

  // ****************************************************//
  // ***************** BEGINING OF GET ******************//
  // **************************************************//

  const getTodos = async () => {
    const circleId = bootstrapState.circles[0].id;
    const token = await JwtKeyChain.read();
    dispatch(getTodoList(circleId, token));
  };

  // This function refresh the todo list
  const refreshTodoList = () => {
    if (todoListState.getTodoResponse) {
      let allTodos = todoListState.getTodoResponse.data;
      let setAllTodo = [];
      allTodos.map((todo) => {
        if (!todo.removed) {
          setAllTodo.push({
            id: todo.id,
            text: todo.description,
            checked: todo.done,
          });
        }
      });
      setTodos(setAllTodo);
    }
  };
  // ****************************************************//
  // ********************** END OF GET ******************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF EFFECTS ******************//
  // **************************************************//

  //load Todos on load
  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refreshTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoListState.getTodoResponse]);

  //processing notification
  useEffect(() => {
    //console.log(todoListState);
    if (todoListState.loading) {
      Toast.show({
        text: 'Processing....',
        buttonText: 'Okay',
      });
    }
  }, [todoListState]);

  //action messages
  useEffect(() => {
    if (todoListState.addTodoResponse) {
      Toast.show({
        text: todoListState.addTodoResponse,
        buttonText: 'Okay',
      });
    } else if (todoListState.delTodoResponse) {
      Toast.show({
        text: todoListState.delTodoResponse,
        buttonText: 'Okay',
      });
    } else if (todoListState.checkTodoResponse) {
      Toast.show({
        text: todoListState.checkTodoResponse,
        buttonText: 'Okay',
      });
    } else if (todoListState.editTodoResponse) {
      Toast.show({
        text: todoListState.editTodoResponse,
        buttonText: 'Okay',
      });
    }
  }, [
    todoListState.addTodoResponse,
    todoListState.delTodoResponse,
    todoListState.checkTodoResponse,
    todoListState.editTodoResponse,
  ]);

  // Error Handling
  useEffect(() => {
    if (todoListState.getTodoError) {
      Toast.show({
        text: todoListState.getTodoError,
        buttonText: 'Okay',
      });
    } else if (todoListState.addTodoError) {
      Toast.show({
        text: todoListState.addTodoError,
        buttonText: 'Okay',
      });
    } else if (todoListState.delTodoError) {
      Toast.show({
        text: todoListState.delTodoError,
        buttonText: 'Okay',
      });
    } else if (todoListState.checkTodoError) {
      Toast.show({
        text: todoListState.checkTodoError,
        buttonText: 'Okay',
      });
    } else if (todoListState.editTodoError) {
      Toast.show({
        text: todoListState.editTodoError,
        buttonText: 'Okay',
      });
    }
  }, [
    todoListState.addTodoError,
    todoListState.getTodoError,
    todoListState.delTodoError,
    todoListState.checkTodoError,
    todoListState.editTodoError,
  ]);

  // ****************************************************//
  // ************ End OF EFFECTS ***********************//
  // **************************************************//

  return (
    <Container style={styles.container}>
      <Content style={styles.content}>
        {editing ? (
          <EditTodo
            editing={editing}
            setEditing={setEditing}
            currentTodo={currentTodo}
            handleEdit={handleEdit}
          />
        ) : (
          <AddTodo handleAdd={handleAdd} />
        )}
        <ScrollView>
          {todos.map((list) => (
            <TodoItems
              id={list.id}
              key={list.id}
              text={list.text}
              checked={list.checked}
              setChecked={() => handleChecked(list.id)}
              editTodoRow={editTodoRow}
              delete={() => handleDelete(list.id)}
            />
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
});

export default TodoList;

// code source https://github.com/taniarascia/react-hooks
// https://medium.com/@hartaniyassir/build-a-todo-app-in-react-native-using-hooks-9953f1066d67
// https://github.com/jemise111/react-native-swipe-list-view

import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);
