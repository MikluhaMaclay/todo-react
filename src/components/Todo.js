import React, { Component } from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import { connect } from "react-redux";
import { deleteTodo, editTodo, completeTodo } from '../actions/todoActions';
import moment from 'moment';
import AddTodo from './AddTodo'

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    }
  }
  editHandler = () => {
    this.setState({
      edit: true
    })
  }

  deleteHandler = (id) => {
    this.props.deleteTodo(id)
  }

  handleComplete = (id) => {
    this.props.completeTodo(id);
  }

  // Рендер времени туду и его цвета
  renderTime = (shouldCompleteAt, completedAt) => {
    if (shouldCompleteAt === null || shouldCompleteAt === undefined || !moment(shouldCompleteAt).isValid()) {
      return null
    } else {
      return <div>Complete till <span className={"todo-complete-to " + (completedAt ? "green" : this.props.time > moment(shouldCompleteAt) ? "red" : "black")}>{moment(shouldCompleteAt).format('Do MMMM h:mm')}</span></div>
    }
  }
  // Убрать форму редактирования
  clearEdit = () => {
    this.setState({
      edit: false
    })
  }

  renderTodo = () => {

    const {
      name,
      description,
      importance,
      shouldCompleteAt,
      completedAt,
      id
    } = this.props.todo;

    if (this.state.edit) {
      return <AddTodo todo={this.props.todo} clear={this.clearEdit} />
    } else {
      return <ListGroupItem>
        <div className="todo-header">
          <div className="todo-title">
            {name}
          </div>

          <div className="todo-importance">
            {importance}
          </div>
        </div>

        <hr />

        <div className="todo-body">
          {description}
        </div>

        <hr />

        <div className="todo-footer">
          <Button
            className="remove-btn" color="danger"
            size="sm"
            onClick={
              () => {
                this.deleteHandler(id)
              }
            }>
            &times;
                        </Button>

          <div className="todo-time">
            {this.renderTime(shouldCompleteAt, completedAt)}
          </div>

          <div className="change-buttons">
            <Button
              className="edit-btn" color="primary"
              size="sm"
              onClick={
                () => {
                  this.editHandler()
                }
              }>
              Edit
                            </Button>

            <Button
              className="complete-btn"
              color="success"
              size="sm"
              disabled={completedAt !== null && completedAt !== undefined}
              onClick={
                () => {
                  this.handleComplete(id)
                }
              }>
              Complete
                            </Button>
          </div>
        </div>
      </ListGroupItem>
    }
  }

  render() {
    return (
      this.renderTodo()
    );
  }
}


export default connect(null, { deleteTodo, editTodo, completeTodo })(Todo);
