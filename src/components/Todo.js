import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { deleteTodo, editTodo } from '../actions/todoActions';

class Todo extends Component {

    deleteHandler = () => {
        console.log(this.props)
        this.props.deleteTodo(this.props.todo.id);
    }
  render() {
      const {
          name,
          description,
          importance,
          shouldCompleteAt,
          completedAt,
          id
      } = this.props.todo;
    return (
        <CSSTransition timeout={900} classNames="fade">
            <ListGroupItem>
                <Button 
                className="remove-btn" color="danger" 
                size="sm"
                onClick={
                    () => {
                        this.deleteHandler()
                    }
                }>&times;</Button>
                {name}
            </ListGroupItem>
        </CSSTransition>
    );
  }
}



export default connect(null , { deleteTodo, editTodo })(Todo);
