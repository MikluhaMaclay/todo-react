import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import TodoList from './components/TodoList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <TodoList></TodoList>
        </Container>
      </div>
    );
  }
}

export default App;
