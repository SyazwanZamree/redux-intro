import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import Counter from './Counter';

const initialState = {
  count: 2
};

async function fetchData() {
  response = await axios.get('https://jsonplaceholder.typicode.com/todos/1').then(
    d => d
  ).catch(
    e => console.log('cannot fetch from fake API', e)
  )
  return response;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_API':
      let response;

      fetchData();

      console.log('data: ', response);
      return {
        ...state,
        userId: action.payload,
        data: response.data
      }
    case 'TOGGLE_TEXT':
      console.log('store payload: ', action.payload);
      return {
        ...state,
        showText: !state.showText,
        text: action.payload
      }
    case 'INCREMENT':
      if (state.count === 'Yellow') {
        return { ...state, count: 12 }
      }
      if (state.count === 10) {
        return { ...state, count: 'Yellow' }
      } else {
        return {
          ...state,
          count: state.count + 1
        }
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);


const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

render(<App />, document.getElementById('root'));
