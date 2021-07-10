import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES go here:

const GET_STUDENTS = 'GET_STUDENTS'
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT'

// ACTION CREATORS go here:

export const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
};


export const getSingleStudent = (id) => {
  return {
    type: GET_SINGLE_STUDENT,
    student
  }
}


// THUNK CREATORS go here:

// Student List THUNK
export const fetchStudents = (students) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/students')
      dispatch(getStudents(data))
    } catch(err) {
      console.log(err)
    }
  }
};

// Single Student THUNK
export const fetchSingleStudent = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/students/${id}`)
      dispatch(getSingleStudent(data))
    } catch (err) {
      console.log(err)
    }
  }
};


_________________________________________________
const initialState = {};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_STUDENTS:
        return action.students
    case GET_SINGLE_STUDENT:
        return action.student
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

// dispatch your own actions here to test your store functionality:
store.dispatch({type: 'HELLO_WORLD'})
// ^ you can see the logs above in your console, thanks to redux-logger!

export default store;
