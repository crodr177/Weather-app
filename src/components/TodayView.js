import React, { Component } from 'react'
import { getWeatherData } from '../actions/weatherData'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TodayView extends Component {
  componentDidMount(){
    getWeatherData()
  }
  render(){
    let arrTime = this.props.items.map(item => (
      item.hour
    ))

    const newArr = []

    for(var i = 0; i < arrTime.length; i++){
      if(moment(arrTime[i]).format('dddd') !== moment(this.props.currentHour).format('dddd') && moment(arrTime[i]).format('dddd') !== moment(arrTime[i+1]).format('dddd')){
        newArr.push(arrTime[i])
      }
    }
    return(
      <div id="today-container">
        <div>
          <h1>Today's Forecast</h1>
          <p className="location">{this.props.location}, NV</p>
          <p className="time-desc">{moment(this.props.currentHour).format('dddd')} {moment(this.props.currentHour).format('h:mm A')}</p>
          <p className="time-desc">{this.props.currentWeather.description}</p>
          <p className="temp">
          {
            this.props.currentWeather.description === 'clear sky'? <FontAwesomeIcon icon="sun"/>: this.props.currentWeather.description === 'scatterclouds' || 'few clouds' || 'broken clouds' || 'cloudy'? <FontAwesomeIcon icon="cloud-sun"/> : ''
          } {Number((this.props.currentTemp.temp) * (9/5) - 459.67).toFixed(0)} <span>&#176;F</span></p>
        </div>
        <div className="three-hour">
        {
          this.props.items.map((item, i) => (
          moment(item.hour).format('dddd') === moment(this.props.currentHour).format('dddd') ? <p key={"key-" + i}><span>{Number((item.temp) * (9/5) - 459.67).toFixed(0)} &#176;F</span> <span>{item.description}</span> <span>{moment(item.hour).format('h:mm A')}</span></p>: " "
          ))
        }
        </div>
        <div className="five-days">
          <Link to="/"><button key={"key-" + 0}>{moment(this.props.currentHour).format('dddd')}</button></Link>
          {
          newArr.map((item, i) => (<Link to={"/date/"+moment(item).format('dddd')}><button key={"date-"+ i}>{moment(item).format('dddd')}</button></Link>))
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(appState){
  console.log(appState)
  return {
    items: appState.weatherData,
    currentTemp: appState.currentTemp,
    currentWeather: appState.currentWeather,
    currentHour: appState.currentHour,
    location: appState.location
  }
}

export default connect(mapStateToProps)(TodayView)