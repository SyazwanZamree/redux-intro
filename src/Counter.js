import React from 'react';
import { connect } from 'react-redux';
const userId = 1;

class Counter extends React.Component {

  __increment = () => {
    this.props.dispatch({ type: 'INCREMENT' })
  }

  __decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' })
  }

  __handleClickMe = (x) => {
    console.log('payload: ', x);
    this.props.dispatch({ type: 'TOGGLE_TEXT', payload: x })
  }

  __fetchAPI = (x) => {
    this.props.dispatch({ type: 'FETCH_API', userId: x })
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          { this.props.showText && <p>{this.props.text}</p> }
          <button onClick={this.__decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.__increment}>+</button>
        </div>
        <button onClick={() => this.__handleClickMe('Hello')}>Click Me</button>
        <button onClick={() => this.__fetchAPI(userId)}>Fetch API</button>
        { this.props.userId && <p>{this.props.userId}</p> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
    showText: state.showText,
    text: state.text
  };
}

export default connect(mapStateToProps)(Counter);
