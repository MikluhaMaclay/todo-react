import React, { Component } from 'react';
import { Container, ListGroup, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { overdueTodo } from '../actions/todoActions';
import 'bootstrap/dist/css/bootstrap.css'
import Todo from './Todo'
import 'react-datepicker/dist/react-datepicker.css';
import AddTodo from './AddTodo'
import moment from 'moment'


class TodoList extends Component {

  state = {
    addForm: false,
    filter: 'all'
  }

  componentDidMount() {
    // время тика таймера
    const tick = 1000;
    this.interval = setInterval(this.checkOverdue, tick)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkOverdue = () => {
    this.props.todos.map(todo => {
      if(moment(todo.shouldCompleteAt) < moment() && !todo.isOverdue) {
        this.props.overdueTodo(todo.id)
      }
    })
  }

  // Обработка добавления
  handleAdd = () => {
    this.clearForm();
    this.setState({
      addForm: true
    })
  }
  // Рендер формы добавления
  renderForm = () => {
    if (this.state.addForm) {
      return <AddTodo clear={this.clearForm} />
    }
  }
  // Обработка изсенений фильтра
  handleFilterChange = e => {
    e.preventDefault();
    this.setState({
      filter: e.target.value
    })
  }

  // Убрать форму добавления
  clearForm = () => {
    this.setState({
      addForm: false
    })
  }
  // Фильтр листа
  renderTodoList = (todo) => {
    if (this.state.filter === 'all' || todo.importance === this.state.filter) {
      return <Todo key={todo.id} todo={todo}  />
    } else {
      return null
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
          {this.props.todos.map((todo) => {
            return (this.renderTodoList(todo))
          })}
        </ListGroup>

        {this.renderForm()}

        <Button
          className="addButton"
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            this.handleAdd();
          }}>
          Add Todo
                </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.todos
})

export default connect(mapStateToProps, { overdueTodo })(TodoList);