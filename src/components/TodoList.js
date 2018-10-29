import React, { Component } from 'react';
import { Container, ListGroup, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { updateTime } from '../actions/todoActions';
import 'bootstrap/dist/css/bootstrap.css'
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
    // время тика таймера
    const tick = 1000;
    this.interval = setInterval(this.props.updateTime, tick)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
      return <Todo key={todo.id} todo={todo} time={this.props.time} />
    } else {
      return null
    }
  }

  render() {
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
  ...state.todos,
  time: state.todos.time,
})

export default connect(mapStateToProps, { updateTime })(TodoList);