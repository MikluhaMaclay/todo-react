import { GET_TODOS, DELETE_TODO, ADD_TODO, COMPLETE_TODO, EDIT_TODO, OVERDUE_TODO } from '../actions/types';
import moment from 'moment'

const initialState = {
  todos : []
}

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
    case OVERDUE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            todo.isOverdue = true;
          }
          return todo;
        })
      }
    default:
      return state;
  }
}