import React, { Component } from 'react';

// first we will make a new context
const TreeContext = React.createContext();

// Then create a provider Component
export default class MyProvider extends Component {
  state = {
    name: 'Wes',
    age: 100,
    cool: true
  }
  render() {
    return (
      <TreeContext.Provider value={{
        state: this.state,
        growAYearOlder: () => this.setState({
          age: this.state.age + 1
        })
      }}>
        {this.props.children}
      </TreeContext.Provider>
    )
  }
}