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
  state = {
    shouldEdit: null,
    shouldAdd: false,
    filter: 'all',
  }

  componentDidMount() {
      const tick = 10000;
      this.interval = setInterval(this.props.updateTime, tick);
      // this.props.getTodos();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  editHandler = (id, name, description, shouldCompleteAt, importance, completedAt) => {
      this.clearForm();
      this.setState({
        shouldEdit: {
          id,
          name,
          description,
          shouldCompleteAt: shouldCompleteAt || moment(),
          importance,
          completedAt,
        }
      });
  }

  deleteHandler = (id) => {
    this.props.deleteTodo(id);
  }

  handleAdd = () => {
    this.clearForm();
    this.setState({ shouldAdd: true });
  }

  handleComplete = (id) => {
      this.props.completeTodo(id);
  }

  handleFilterChange = e => {
      e.preventDefault();
      this.setState({ filter: e.target.value });
  }

  clearForm = () => {
    this.setState({ shouldAdd: false });
  }


  renderTime = (shouldCompleteAt, completedAt) => {
    if (shouldCompleteAt === null || shouldCompleteAt === undefined || !moment(shouldCompleteAt).isValid()) {
      return null
    } else {
      return (
        <div>
          Complete till
          <span className={"todo-complete-to " + (completedAt ? "green" : this.props.todos.time > moment(shouldCompleteAt) ? "red" : "black")}>
            {moment(shouldCompleteAt).format('Do MMMM h:mm')}
          </span>
        </div>
      )
    }
  }
  //удалил элементы реакт бутстрапа и все заработало
  render() {
    const { todos } = this.props;
    const { shouldAdd, filter, shouldEdit } = this.state;
    return (
      <Container>
        <Input type="select"
          value={filter}
          onChange={this.handleFilterChange}
        >
          <option>all</option>
          <option>normal</option>
          <option>important</option>
          <option>very important</option>
        </Input>
          {todos
            .filter(todo => filter === 'all' || todo.importance === filter)
            .map(todo => shouldEdit && shouldEdit.id === todo.id ?
              <AddTodo key={todo.id} clearForm={this.clearForm} todo={todo} /> :
              <Todo key={todo.id} todo={todo} time={this.props.time} />
            )
          }
      {shouldAdd && <AddTodo clear={this.clearForm} />}
      <Button
          className="addButton"
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.handleAdd}
      >
          Add Todo
      </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos,
    time: state.todos.time,
    filter: state.todos.filter,
})

export default connect(mapStateToProps, { getTodos, deleteTodo, addTodo, editTodo, updateTime, completeTodo })(TodoList);
