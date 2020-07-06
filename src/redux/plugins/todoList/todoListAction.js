/**
 * Todo List actions
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
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

//api url
import {bivtURL} from '../../apis/bivtApi';

export const todoRequest = () => {
  return {
    type: TODO_REQUEST,
  };
};

export const todoFailure = (error) => {
  return {
    type: TODO_FAILURE,
    payload: error,
  };
};

// Add Todo
export const todoAddSuccess = (todoAddSuccessResponse) => {
  return {
    type: TODO_ADD_SUCCESS,
    payload: todoAddSuccessResponse,
  };
};

export const todoAddFailure = (error) => {
  return {
    type: TODO_ADD_FAILURE,
    payload: error,
  };
};

// Get Todo List
export const todoGetSuccess = (todoGetSuccessResponse) => {
  return {
    type: TODO_GET_SUCCESS,
    payload: todoGetSuccessResponse,
  };
};

export const todoGetFailure = (error) => {
  return {
    type: TODO_GET_FAILURE,
    payload: error,
  };
};

//Delete todo
export const todoDelSuccess = (todoDelSuccessResponse) => {
  return {
    type: TODO_DEL_SUCCESS,
    payload: todoDelSuccessResponse,
  };
};

export const todoDelFailure = (error) => {
  return {
    type: TODO_DEL_FAILURE,
    payload: error,
  };
};

//Check todo
export const todoCheckSuccess = (todoCheckSuccessResponse) => {
  return {
    type: TODO_CHECK_SUCCESS,
    payload: todoCheckSuccessResponse,
  };
};

export const todoCheckFailure = (error) => {
  return {
    type: TODO_CHECK_FAILURE,
    payload: error,
  };
};

//Edit todo
export const todoEditSuccess = (todoEditSuccessResponse) => {
  return {
    type: TODO_EDIT_SUCCESS,
    payload: todoEditSuccessResponse,
  };
};

export const todoEditFailure = (error) => {
  return {
    type: TODO_EDIT_FAILURE,
    payload: error,
  };
};

// Add a new todo
export const addTodo = (_todoDesc, _circleId, token) => {
  const todoDetails = {
    description: _todoDesc,
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(todoRequest);
    try {
      const response = await bivtURL.post(
        '/plugin/todo/add',
        todoDetails,
        config,
      );
      if (response.status === 200) {
        //const todoAddSuccessResponse = response.data;
        dispatch(todoAddSuccess('saved..'));
      } else {
        throw 'Something went wrong!';
      }
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(todoAddFailure('Error - you are not authorised to do it!'));
      } else if (err.response.data.status.errors) {
        dispatch(
          todoAddFailure(
            'Error - ' + err.response.data.status.errors.toString(),
          ),
        );
      } else {
        dispatch(todoAddFailure('Error - try again later!'));
      }
    }
  };
};

//get the list of todos
export const getTodoList = (circleId, token) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(todoRequest);
    try {
      let url = '/plugin/todo/list?circleId=' + circleId;
      const response = await bivtURL.get(url, config);
      if (response.status === 200) {
        const todoGetSuccessResponse = response.data;
        dispatch(todoGetSuccess(todoGetSuccessResponse));
      } else {
        throw 'Something went wrong!';
      }
    } catch (err) {
      //console.log('Get err' + err.response.data);
      if (err.response.status === 401) {
        dispatch(todoGetFailure('Error - you are not authorised to do it!'));
      } else if (err.response.data.status.errors) {
        dispatch(
          todoGetFailure(
            'Error - ' + err.response.data.status.errors.toString(),
          ),
        );
      } else {
        dispatch(todoGetFailure('Error - try again later!'));
      }
    }
  };
};

// Del a todo
export const delTodo = (todoId, circleId, token) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(todoRequest);
    try {
      let url = '/plugin/todo/remove?id=' + todoId;
      const response = await bivtURL.delete(url, config);
      if (response.status === 200) {
        dispatch(todoDelSuccess('Deleted..'));
      } else {
        throw 'Something went wrong!';
      }
    } catch (err) {
      //console.log(err.response.data);
      if (err.response.status === 401) {
        dispatch(todoDelFailure('Error - you are not authorised to do it!'));
      } else if (err.response.data.status.errors) {
        dispatch(
          todoDelFailure(
            'Error - ' + err.response.data.status.errors.toString(),
          ),
        );
      } else {
        dispatch(todoDelFailure('Error - try again later!'));
      }
    }
  };
};

// Check a todo
// This API is acting weird - it needs both query and body param
export const checkTodo = (todoId, circleId, token) => {
  const param = {
    id: todoId,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(todoRequest);
    try {
      let url = '/plugin/todo/markAsDone?id=' + todoId;
      const response = await bivtURL.put(url, param, config);
      if (response.status === 200) {
        dispatch(todoCheckSuccess('Checked succefully...'));
      } else {
        throw 'Something went wrong!';
      }
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(todoCheckFailure('Error - you are not authorised to do it!'));
      } else if (err.response.data.status.errors) {
        dispatch(
          todoCheckFailure(
            'Error - ' + err.response.data.status.errors.toString(),
          ),
        );
      } else {
        dispatch(todoCheckFailure('Error - try again later!'));
      }
    }
  };
};

// Edit a todo
export const editTodo = (todoId, todoDesc, circleId, token) => {
  const param = {
    id: todoId,
    description: todoDesc,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(todoRequest);
    try {
      let url = '/plugin/todo/update?id=' + todoId;
      const response = await bivtURL.put(url, param, config);
      if (response.status === 200) {
        dispatch(todoEditSuccess('Edited succefully...'));
      } else {
        throw 'Something went wrong!';
      }
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(todoEditFailure('Error - you are not authorised to do it!'));
      } else if (err.response.data.status.errors) {
        dispatch(
          todoEditFailure(
            'Error - ' + err.response.data.status.errors.toString(),
          ),
        );
      } else {
        dispatch(todoEditFailure('Error - try again later!'));
      }
    }
  };
};
