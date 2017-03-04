import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import * as authEpics from '../store/epic/auth'


import TodoListReducer,{ salesReducer,stockReducer,storeReducer,productReducer} from './reducers/AppReducer';
import authReducer from './reducers/auth-reducer';

export const rootReducer = combineReducers({
    salesReducer,
    stockReducer,
    storeReducer,
    productReducer,
    auth: authReducer,
    routing: routerReducer
    // more reducers go here
});



const rootEpic = combineEpics(
    authEpics.fetchSalesFromServer,
    authEpics.fetchStockFromServer,
    authEpics.fetcStoreFromServer,
    authEpics.fetchProductFromServer,
    authEpics.registerEpic,
    authEpics.loginEpic,
    authEpics.logoutEpic

);

const epicMiddleware = createEpicMiddleware(rootEpic);


let store = createStore(rootReducer,applyMiddleware(epicMiddleware));

store.dispatch({
    type:"FETCHING_DATA"
});

store.subscribe(() => {
    console.log(store.getState())
});


export default store;
