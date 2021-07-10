import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES go here:

const GET_STUDENTS = 'GET_STUDENTS'
const GOT_ONE_STUDENT = 'GOT_ONE_STUDENT'

// ACTION CREATORS go here:

export const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
};


export const gotSingleStudent = (student) => {
  return {
    type: GOT_ONE_STUDENT,
    student
  }
}
// id is just a parameter


// THUNK CREATORS go here:

// Student List THUNK
// If you are doing a getAll() call - then you don't need to put any params

export const fetchStudents = () => {
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
export const fetchOneStudent = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/students/${id}`)
      dispatch(gotOneStudent(data))
    } catch (err) {
      console.log(err)
    }
  }
};


//_________________________________________________
const initialState = {
  students: [], // you missed this !! itemize initialState
  student: {}
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_STUDENTS:
        return {
          ...state,
          students: action.students
        }  //students must match within the Action Creator
          // This is just replacing the empty intial state [] with a new array gotten from the action creator & the thunk
    case GOT_ONE_STUDENT:
        return {
          student: action.student
        }
    default:
      return state;
  }
};
// only getting one student in Got ONe so no need to spread.
const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

// dispatch your own actions here to test your store functionality:
store.dispatch({type: 'HELLO_WORLD'})
// ^ you can see the logs above in your console, thanks to redux-logger!

export default store;
