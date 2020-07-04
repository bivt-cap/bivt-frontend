/**
 * Todo List reducer
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 * I am trying out a different way of handling errors, may not be the best way - arsh
 * The following implementation make sure that the todo list is updated as much as possible
 */

//types
import {
  TODO_REQUEST,
  TODO_ADD_SUCCESS,
  TODO_ADD_FAILURE,
  TODO_GET_SUCCESS,
  TODO_GET_FAILURE,
  TODO_DEL_SUCCESS,
  TODO_DEL_FAILURE,
  TODO_CHECK_SUCCESS,
  TODO_CHECK_FAILURE,
  TODO_EDIT_SUCCESS,
  TODO_EDIT_FAILURE,
  TODO_FAILURE,
} from './todoListTypes';

//initial state
const todoListState = {
  loading: false,
  error: null,
  addTodoResponse: null,
  addTodoError: null,
  getTodoResponse: null,
  getTodoError: null,
  delTodoResponse: null,
  delTodoError: null,
  checkTodoResponse: null,
  checkTodoError: null,
  editTodoResponse: null,
  editTodoError: null,
};

const todoListReducer = (state = todoListState, action) => {
  switch (action.type) {
    case TODO_REQUEST:
      return {
        ...todoListState,
        loading: true,
        error: null,
      };
    case TODO_FAILURE:
      return {
        ...todoListState,
        loading: false,
        error: action.payload,
      };
    case TODO_ADD_SUCCESS:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: action.payload,
        addTodoError: null,
        getTodoResponse: null,
        getTodoError: null,
        delTodoResponse: null,
        delTodoError: null,
        checkTodoResponse: null,
        checkTodoError: null,
        editTodoResponse: null,
        editTodoError: null,
      };
    case TODO_ADD_FAILURE:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: action.payload,
        getTodoResponse: null,
        getTodoError: null,
        delTodoResponse: null,
        delTodoError: null,
        checkTodoResponse: null,
        checkTodoError: null,
        editTodoResponse: null,
        editTodoError: null,
      };
    case TODO_GET_SUCCESS:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: null,
        getTodoResponse: action.payload,
        getTodoError: null,
        delTodoResponse: null,
        delTodoError: null,
        checkTodoResponse: null,
        checkTodoError: null,
        editTodoResponse: null,
        editTodoError: null,
      };
    case TODO_GET_FAILURE:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: null,
        getTodoResponse: null,
        getTodoError: action.payload,
        delTodoResponse: null,
        delTodoError: null,
        checkTodoResponse: null,
        checkTodoError: null,
        editTodoResponse: null,
        editTodoError: null,
      };
    case TODO_DEL_SUCCESS:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: null,
        getTodoResponse: null,
        getTodoError: null,
        delTodoResponse: action.payload,
        delTodoError: null,
        checkTodoResponse: null,
        checkTodoError: null,
        editTodoResponse: null,
        editTodoError: null,
      };
    case TODO_DEL_FAILURE:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: null,
        getTodoResponse: null,
        getTodoError: null,
        delTodoResponse: null,
        delTodoError: action.payload,
        checkTodoResponse: null,
        checkTodoError: null,
        editTodoResponse: null,
        editTodoError: null,
      };
    case TODO_CHECK_SUCCESS:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: null,
        getTodoResponse: null,
        getTodoError: null,
        delTodoResponse: null,
        delTodoError: null,
        checkTodoResponse: action.payload,
        checkTodoError: null,
        editTodoResponse: null,
        editTodoError: null,
      };
    case TODO_CHECK_FAILURE:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: null,
        getTodoResponse: null,
        getTodoError: null,
        delTodoResponse: null,
        delTodoError: null,
        checkTodoResponse: null,
        checkTodoError: action.payload,
        editTodoResponse: null,
        editTodoError: null,
      };
    case TODO_EDIT_SUCCESS:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: null,
        getTodoResponse: null,
        getTodoError: null,
        delTodoResponse: null,
        delTodoError: null,
        checkTodoResponse: null,
        checkTodoError: null,
        editTodoResponse: action.payload,
        editTodoError: null,
      };
    case TODO_EDIT_FAILURE:
      return {
        ...todoListState,
        loading: false,
        addTodoResponse: null,
        addTodoError: null,
        getTodoResponse: null,
        getTodoError: null,
        delTodoResponse: null,
        delTodoError: null,
        checkTodoResponse: null,
        checkTodoError: null,
        editTodoResponse: null,
        editTodoError: action.payload,
      };
    default:
      return state;
  }
};

export default todoListReducer;
