import React, { Component } from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import * as actions from '../actions/todoActions';

class Todo extends Component {

    deleteHandler = () => {
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

const mapDispatchToProps = (dispatch) => ({
    deleteTodo: id => {
        dispatch(actions.deleteTodo(id))
    }
})

export default connect(null , mapDispatchToProps)(Todo);
