import React from 'react'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const composedEnhancer = compose(applyMiddleware(thunk),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())







const store = createStore(rootReducer, composedEnhancer)

function DataProvider({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider