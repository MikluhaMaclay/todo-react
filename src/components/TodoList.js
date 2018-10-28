import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getTodos, addTodo, deleteTodo, editTodo, updateTime, completeTodo } from '../actions/todoActions';
import 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment'
import Todo from './Todo'
import 'react-datepicker/dist/react-datepicker.css';
import AddTodo from './AddTodo'


class TodoList extends Component {

    constructor() {
        super();
        this.state = {
            addForm: false,
            filter: 'all'
        }

    }
    
    componentDidMount() {
        const tick = 10000;
        setInterval(this.props.updateTime, tick)
        // this.props.getTodos();
        
    }

    editHandler = (id, name, description, shouldCompleteAt, importance, completedAt) => {
        this.clearForm();
        this.setState({
            id,
            name,
            description,
            shouldCompleteAt: shouldCompleteAt || moment(),
            importance,
            completedAt
        })
    }

    deleteHandler = (id) => {
        console.log('22')
        this.props.deleteTodo(id)
    }

    handleAdd = () => {
        this.clearForm();
        this.setState({
            addForm: true
        })
    }

    renderForm = () => {
        if (this.state.addForm) {
            return <AddTodo clear={this.clearForm} />
        }
    }

    handleComplete = (id) => {
        this.props.completeTodo(id);
    }

    handleFilterChange = e => {
        console.log(e)
        e.preventDefault();
        this.setState({
            filter: e.target.value
        })
    }

    clearForm = () => {
        this.setState({
            addForm: false
        })
    }


    renderTime = (shouldCompleteAt, completedAt) => {
        if (shouldCompleteAt === null || shouldCompleteAt === undefined || !moment(shouldCompleteAt).isValid()) {
            return null
        } else {
            return <div>Complete till <span className={"todo-complete-to " + (completedAt ? "green" : this.props.todos.time > moment(shouldCompleteAt) ? "red" : "black")}>{moment(shouldCompleteAt).format('Do MMMM h:mm')}</span></div>
        }
    }

    renderTodo = (todo) => {
        if (this.state.filter !== 'all' && todo.importance !== this.state.filter) {
            return null
        } else if (this.state.id !== undefined && this.state.id === todo.id) {
            return <AddTodo key={todo.id} clearForm={this.clearForm} todo={todo} />
        } else {
            return <Todo key={todo.id} todo={todo} time={this.props.time} />
        }
    }

    render() {
        console.log('1')
        return (
            <Container>
                <Input type="select"
                    value={this.state.filter}
                    onChange={this.handleFilterChange}>
                    <option>all</option>
                    <option>normal</option>
                    <option>important</option>
                    <option>very important</option>
                </Input>
                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {this.props.todos.todos.map((todo) => {
                            return (this.renderTodo(todo))
                        })}
                    </TransitionGroup>
                </ListGroup>
                {this.renderForm(this.state.addForm, null, "add")}
                <Button
                    className="addButton"
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={() => {
                        this.handleAdd();
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
    time: state.todos.time,
    filter: state.todos.filter
})

export default connect(mapStateToProps, { getTodos, deleteTodo, addTodo, editTodo, updateTime, completeTodo })(TodoList);