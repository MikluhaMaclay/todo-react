import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input, FormText } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getTodos, addTodo, deleteTodo, editTodo, updateTime, completeTodo } from '../actions/todoActions';
import 'bootstrap/dist/css/bootstrap.css'
import uuid from 'uuid'
import moment from 'moment'
import Todo from './Todo'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class TodoList extends Component {

    constructor() {
        super();
        this.state = { 
            id: -1,
            addForm: false
        }
      }

    componentDidMount() {
        const tick = 10000;

        this.props.getTodos();
        setInterval(this.props.updateTime, tick)
    }

    editHandler = (id, name, description, shouldCompleteAt, importance, completedAt) => {
        
        this.setState({
            id,
            name,
            description,
            shouldCompleteAt: shouldCompleteAt || moment(),
            importance,
            completedAt
        })
        console.log(this.state)
    }

    deleteHandler = (id) => {
        this.props.deleteTodo(id)
    }

    handleNameChange = (e) => {
        e.preventDefault();
        this.setState({
            name: e.target.value
        })
    }

    handleImportanceChange = (e) => {
        e.preventDefault();
        this.setState({
            importance: e.target.value
        })
    }

    handleDescriptionChange = (e) => {
        console.log(this.state)
        e.preventDefault();
        this.setState({
            description: e.target.value
        })
    }

    handleDateChange = (e) => {
        console.log(moment(e).isValid())
        this.setState({
            shouldCompleteAt: moment(e).isValid() ? moment(e) : null
        })
        console.log(this.state.shouldCompleteAt)
    }

    handleSubmit = () => {
        const todo = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            shouldCompleteAt: this.state.shouldCompleteAt,
            importance: this.state.importance,
            completedAt: this.completedAt
        }
        this.props.editTodo(todo)
        this.clearEdit()
    }

    handleAdd = () => {
        this.setState({
            id: -1,
            name: '',
            description: '',
            shouldCompleteAt: null,
            importance: 'normal',
            completedAt: null,
            addForm: true
        })
        console.log(this.state)
    }
    
    handleComplete = (id) => {
        this.props.completeTodo(id);
    }
    clearEdit = () => {
        this.setState({
            id: -1
        })
    }

    renderTime = (shouldCompleteAt, completedAt) => {
        if(shouldCompleteAt == moment(0) || shouldCompleteAt === null || shouldCompleteAt === undefined || !shouldCompleteAt.isValid()) {
            return null
        } else {
            return <div>Complete till <span className={"todo-complete-to" + ' ' +(completedAt ? "green" : this.props.todos.time > shouldCompleteAt ? "red" : "black")}>{moment(shouldCompleteAt).format('Do MMMM h:mm')}</span></div>
        }
    }

    renderDatepicker = () => {
        if( this.state.shouldCompleteAt !== null && this.state.shouldCompleteAt !== undefined)
            {return (<DatePicker className="todo-complete-to"
                selected={moment(this.state.shouldCompleteAt || '')}
                onChange={this.handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="DD/MM/YYYY HH:mm"
                timeCaption="time"
            />)} else {
                return (<DatePicker className="todo-complete-to"
                onChange={this.handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="DD/MM/YYYY HH:mm"
                timeCaption="time"
            />)
            }
        
    }
    render() {

        // const addForm;
 
        return(
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {this.props.todos.todos.map( ({  name,
                                        description,
                                        importance,
                                        shouldCompleteAt,
                                        completedAt,
                                        id}) => {
                            if (this.state.id !== undefined && this.state.id === id) {
                                return (
                                    <CSSTransition  key={id} timeout={900} classNames="fade">
                                        <ListGroupItem>
                                            <div className="todo-header">
                                                <div className="todo-title">
                                                    <Input type="text" 
                                                    value={this.state.name} 
                                                    onChange={this.handleNameChange}/>
                                                </div>

                                                <div className="todo-importance">
                                                <Input type="select" 
                                                    value={this.state.importance} 
                                                    onChange={this.handleImportanceChange}>
                                                    <option>normal</option>
                                                    <option>important</option>
                                                    <option>very important</option>
                                                </Input>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="todo-body">
                                                <Input type="textarea" value={this.state.description} onChange={this.handleDescriptionChange}/>
                                            </div>
                                            <hr/>
                                            <div className="todo-footer">
                                                <Button 
                                                className="remove-btn" color="danger" 
                                                size="sm"
                                                onClick={
                                                    () => {
                                                        this.deleteHandler(id)
                                                    }
                                                }>&times;</Button>
                                                
                                                <div className="todo-time">
                                                    Complete till 
                                                    {this.renderDatepicker()}
                                                </div>
                                                <div className="change-buttons">
                                                    <Button 
                                                    className="edit-btn" color="primary" 
                                                    size="sm"
                                                    onClick={
                                                        () => {
                                                            this.clearEdit();
                                                        }
                                                    }>Cancel</Button>
                                                    <Button 
                                                    className="complete-btn" color="success" 
                                                    size="sm"
                                                    onClick={
                                                        () => {
                                                            this.handleSubmit()
                                                        }
                                                    }>Submit</Button>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    </CSSTransition>
                                )
                            } else {
                                return(
                                    <CSSTransition  key={id} timeout={900} classNames="fade">
                                        <ListGroupItem>
                                            <div className="todo-header">
                                                <div className="todo-title">
                                                    {name}
                                                </div>

                                                <div className="todo-importance">
                                                    {importance}
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="todo-body">
                                                {description}
                                            </div>
                                            <hr/>
                                            <div className="todo-footer">
                                                <Button 
                                                className="remove-btn" color="danger" 
                                                size="sm"
                                                onClick={
                                                    () => {
                                                        this.deleteHandler(id)
                                                    }
                                                }>&times;</Button>
                                                <div className="todo-time">
                                                    { this.renderTime(shouldCompleteAt, completedAt) }
                                                </div>
                                                <div className="change-buttons">
                                                    <Button 
                                                    className="edit-btn" color="primary" 
                                                    size="sm"
                                                    onClick={
                                                        () => {
                                                            this.editHandler(id, name, description, shouldCompleteAt, importance, completedAt)
                                                        }
                                                    }>Edit</Button>
                                                    <Button 
                                                    className="complete-btn" 
                                                    color="success" 
                                                    size="sm"
                                                    disabled={completedAt !== null && completedAt !== undefined }
                                                    onClick={
                                                        () => {
                                                            this.handleComplete(id)
                                                        }
                                                    
                                                    }
                                                    >Complete</Button>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    </CSSTransition>
                                )
                            }
                        })}
                        
                        
                    </TransitionGroup>
                </ListGroup>

                <Button 
                className="addButton"
                color="dark"
                style={{marginBottom: '2rem'}}
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