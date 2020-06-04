import React, {useState} from 'react';
import TodoItems from './TodoItems';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import {Container, Content} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';

export default function todoList() {
  const defaultTodo = [
    {id: 1, text: 'Study React-Native'},
    {id: 2, text: 'Grocery Shopping'},
  ];

  const initialTodo = {id: null, text: ''};

  const [todos, setTodos] = useState(defaultTodo);
  const [currentTodo, setCurrentTodo] = useState(initialTodo);
  const [editing, setEditing] = useState(false);

  const handleAdd = (todo) => {
    todo.id = todos.length + 1;
    setTodos([...todos, todo]);
  };

  const handleDelete = (id) => {
    setTodos(
      todos.filter((todo) => {
        if (todo.id !== id) return true;
      }),
    );
  };

  const handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) todo.checked = !todo.checked;
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
}

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

// code source https://github.com/taniarascia/react-hooks
// https://medium.com/@hartaniyassir/build-a-todo-app-in-react-native-using-hooks-9953f1066d67
// https://github.com/jemise111/react-native-swipe-list-view
