import React, { Component } from 'react';
import { ListGroupItem, Button, Input, Form } from 'reactstrap';
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux';
import { addTodo, editTodo } from '../actions/todoActions';
import 'bootstrap/dist/css/bootstrap.css'
import uuid from 'uuid'
import moment from 'moment'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class AddTodo extends Component {

  constructor() {
    super();
    this.state = {
      id: -1,
      name: '',
      description: '',
      shouldCompleteAt: null,
      importance: 'normal',
      completedAt: null
    }
  }

  componentDidMount() {
    if (this.props.todo) {
      this.setState({
        ...this.props.todo
      })
    }
  }

  deleteHandler = () => {
    this.props.clear();
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
    e.preventDefault();
    this.setState({
      description: e.target.value
    })
  }

  handleDateChange = (e) => {
    this.setState({
      shouldCompleteAt: moment(e).isValid() ? moment(e) : null
    })
  }

  handleSubmit = () => {
    const todo = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      shouldCompleteAt: moment(this.state.shouldCompleteAt),
      importance: this.state.importance,
      completedAt: this.completedAt || null
    }
    if (this.props.todo) {
      this.props.editTodo(todo)
    } else {
      todo.id = uuid()
      this.props.addTodo(todo)
    }
    this.props.clear()
  }
  // Рендер дэйтпикера
  renderDatepicker = () => {
    if (this.state.shouldCompleteAt !== null && this.state.shouldCompleteAt !== undefined) {
      return (<DatePicker className="todo-complete-to"
        selected={moment(this.state.shouldCompleteAt || '')}
        onChange={this.handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={5}
        dateFormat="DD/MM/YYYY HH:mm"
        timeCaption="time"
      />)
    } else {
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
    return (
      <ListGroupItem>
        <Form>
          <div className="todo-header">
            <div className="todo-title">
              <Input type="text"
                value={this.state.name}
                onChange={this.handleNameChange} />
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
          <hr />
          <div className="todo-body">
            <Input type="textarea" value={this.state.description} onChange={this.handleDescriptionChange} />
          </div>
          <hr />
          <div className="todo-footer">
            <Button
              className="remove-btn" color="danger"
              size="sm"
              onClick={
                () => {
                  this.deleteHandler(this.state.id)
                }
              }>&times;</Button>

            <div className="todo-time">
              Complete till
                            {this.renderDatepicker()}
            </div>
            <div className="change-buttons">
              <Button
                type="submit"
                className="complete-btn" color="success"
                size="sm"
                onClick={
                  () => {
                    this.handleSubmit()
                  }
                }>Submit</Button>
            </div>
          </div>
        </Form>
      </ListGroupItem>
    )
  }
}

export default connect(null, { addTodo, editTodo })(AddTodo);