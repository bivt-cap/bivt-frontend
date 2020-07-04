import React, {useState, useEffect} from 'react';
import TodoItems from './TodoItems';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';

//react native
import {Text, Alert} from 'react-native';

//native base
import {Toast} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import {Container, Content} from 'native-base';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {addTodo, getTodoList, delTodo} from '../../../redux';

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

  const handleAdd = async (todo) => {
    //call redux to add
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(addTodo(todo.text, circleId, token)).then(() => {
      getTodos();
    });
  };

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

  const handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }
        return todo;
      }),
    );
  };

  const handleEdit = (id, updatedTodo) => {
    setEditing(false);
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const editTodoRow = (todo) => {
    setEditing(true);
    setCurrentTodo({id: todo.id, text: todo.text});
  };

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
    console.log(todoListState);
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
    }
  }, [todoListState.addTodoResponse, todoListState.delTodoResponse]);

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
    }
  }, [
    todoListState.addTodoError,
    todoListState.getTodoError,
    todoListState.delTodoError,
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
