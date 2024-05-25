import {thunk} from 'redux-thunk';
import {AuthReducer} from '../redux/AuthReducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {AuthReducerr} from '../redux/AuthReducerr';

const reducer = combineReducers({
  auth: AuthReducerr,
});
const middleware = [thunk];
export default createStore(reducer, applyMiddleware(...middleware));
