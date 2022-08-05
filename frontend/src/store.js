import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    productListReducer,
    productAddReducer,
} from './redux/reducers/product';


const reducer = combineReducers({
  productList: productListReducer,
  productAdd: productAddReducer,
});



const initialState = {}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;