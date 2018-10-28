import { GET_TODOS, DELETE_TODO, ADD_TODO, COMPLETE_TODO, EDIT_TODO } from '../actions/types';

const initialState = {
    todos: [
        {id: 1, name: 'Homework', description: 'Do homework', importance: 'normal', shouldCompleteAt: new Date().setDate(Date.now()+1), completedAt: Date.now()},
        {id: 2, name: 'Milk', description: 'Buy milk', importance: 'important', shouldCompleteAt: new Date().setDate(Date.now()-1), completedAt: Date.now()},
        {id: 3, name: 'Music', description: 'Listen music', importance: 'very important', shouldCompleteAt: new Date().setDate(Date.now()+2), completedAt: Date.now()},
    ],
    time: Date.now(),
    filter: 'all'
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TODOS:
            return {
                ...state
            }
        case DELETE_TODO:
        console.log(state)
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case ADD_TODO:
            return {
                todos: [...state.todos, action.payload]
            }
        case COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        todo = action.payload
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
        default:
            return state;
    }
}