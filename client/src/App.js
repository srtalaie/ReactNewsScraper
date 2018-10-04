import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'react-emotion'
import Home from './pages/Home';

const Header = styled('div')({
  width: '100%',
  height: 50,
  boxShadow: '0 2px 2px 2px rgba(0,0,0,.3)',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Content = styled('div')({
  marginTop: 50,
  textAlign: 'center'
})

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header>
            <div>
            </div>
          </Header>
          <Content>
            <Home />
          </Content>
        </div>
      </Router>
    );
  }
}

export default App;
