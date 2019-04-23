import store from '../store'
import axios from 'axios'
import moment from 'moment'

export function getWeatherData(){
  axios.get('http://api.openweathermap.org/data/2.5/forecast?id=5506956&APPID=f18ce15e0a8e91ae7a50864d5327d81f').then( resp => {
    const mapData = resp.data;
    const weatherData = mapData.list.map(data => {
      return {
        description: data.weather[0].description,
        temp: data.main.temp,
        hour: data.dt_txt
      }
    })
    store.dispatch({
      type: 'GET_DATA',
      weatherData: weatherData,
      currentTemp: resp.data.list[0].main,
      currentWeather: resp.data.list[0].weather[0],
      currentHour: resp.data.list[0].dt_txt,
      location: resp.data.city.name
    })
  })
}

export function getSelectedDay(day){
  axios.get('http://api.openweathermap.org/data/2.5/forecast?id=5506956&APPID=f18ce15e0a8e91ae7a50864d5327d81f').then( resp => {
    const selectedFilterData = resp.data.list.filter(data => {
      if(moment(data.dt_txt).format('dddd') === day){
        return true;
      }
      else {
        return false;
      }
    })

    const selectedData = selectedFilterData.map(data => {
       return {
        description: data.weather[0].description,
        temp: data.main.temp,
        hour: data.dt_txt
       }
      })
    store.dispatch({
      type: 'GET_SELECTED_DATE',
      selectedData: selectedData,
      currentSelectedTempPos3: selectedFilterData[2].main,
      currentSelectedWeatherPos0: selectedFilterData[0].weather[0]
    })
  })
}