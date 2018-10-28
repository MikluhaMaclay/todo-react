import { GET_TODOS, ADD_TODO, DELETE_TODO, COMPLETE_TODO, EDIT_TODO, UPDATE_TIME } from './types';

export const getTodos = () => {
    return {
        type: GET_TODOS
    }
}

export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const deleteTodo = (id) => {
    console.log(id)
    return {
        type: DELETE_TODO,
        payload: id
    }
}

export const editTodo = (todo) => {
    return {
        type: EDIT_TODO,
        payload: todo
    }
}

export const completeTodo = (todo) => {
    return {
        type: COMPLETE_TODO,
        payload: todo
    }
}

export const updateTime = () => {
    return {
        type: UPDATE_TIME
    }
}