import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getTodos, addTodo, deleteTodo, editTodo } from '../actions/todoActions';
import 'bootstrap/dist/css/bootstrap.css'
import uuid from 'uuid'

import Todo from './Todo'

class TodoList extends Component {

    componentDidMount() {
        this.props.getTodos();
    }
    render() {
        const { todos } = this.props.todos
        return(
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {todos.map( (todo, index) => {
                            return(
                                <Todo key={index} todo={todo} deleteTodo={this.props.deleteTodo} />
                            )
                        })}
                    </TransitionGroup>
                </ListGroup>

                <Button 
                className="addButton"
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={() => {
                    addTodo({name: 'milk', id: uuid()})
                }}
                >
                    Add Todo
                </Button>

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
    time: state.time,
    filter: state.filter
})

export default connect(mapStateToProps, { getTodos, deleteTodo, addTodo, editTodo })(TodoList);