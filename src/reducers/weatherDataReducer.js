const initialState = {
  weatherData: [],
  currentTemp: {},
  currentWeather: [],
  currentHour: '',
  location: '',
  selectedData: [],
  currentSelectedTempPos3: {},
  currentSelectedWeatherPos0: []
}

export default function(state = initialState, action){
  switch(action.type){
    case 'GET_DATA':
      return {...state, weatherData: action.weatherData, currentTemp: action.currentTemp, currentWeather: action.currentWeather, currentHour: action.currentHour, location: action.location}
    case 'GET_SELECTED_DATE':
      return {...state, selectedData: action.selectedData, currentSelectedTempPos3: action.currentSelectedTempPos3, currentSelectedWeatherPos0: action.currentSelectedWeatherPos0}
    default:
      return state
  }
}