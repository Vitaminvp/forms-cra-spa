import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

const createMiddlewares = () => [
  thunk,
  reduxLogger
];

export default createMiddlewares;
