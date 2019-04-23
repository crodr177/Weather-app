import { createStore } from 'redux'

import weatherDataReducer from './reducers/weatherDataReducer'

const store = createStore(weatherDataReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store