import { GET_TODOS, DELETE_TODO, ADD_TODO, COMPLETE_TODO, EDIT_TODO, UPDATE_TIME } from '../actions/types';
import moment from 'moment'

const initialState = {}

export default function (state = initialState, action) {

  switch (action.type) {
    case GET_TODOS:
      return {
        ...state
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            todo.completedAt = moment();
          }
          return todo;
        })
      }
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            todo = action.payload
          }
          return todo;
        })
      }
    case UPDATE_TIME:
      return {
        ...state,
        time: moment()
      }
    default:
      return state;
  }
}