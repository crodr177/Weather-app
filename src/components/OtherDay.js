import React, { Component } from 'react'
import { getWeatherData, getSelectedDay } from '../actions/weatherData'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OtherDay extends Component {
  componentDidMount(){
    getWeatherData()
    getSelectedDay(this.props.match.params.day)
    console.log(this.props.match.params.day)
  }

  componentWillReceiveProps(newprops) {
    if(newprops.match.params.day !== this.props.match.params.day) {
      getSelectedDay(newprops.match.params.day)
    }
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
          <h1>{this.props.match.params.day}'s Forecast</h1>
          <p className="location">{this.props.location}, NV</p>
          <p className="time-desc">{this.props.match.params.day}</p>
          <p className="time-desc">{this.props.selectedWeather.description}</p>
          <p className="temp">
          {
            this.props.selectedWeather.description === 'clear sky'? <FontAwesomeIcon icon="sun"/>: this.props.selectedWeather.description === 'scatterclouds' || 'few clouds' || 'broken clouds' || 'cloudy'? <FontAwesomeIcon icon="cloud-sun"/> : ''
          } {Number((this.props.selectedTemp.temp) * (9/5) - 459.67).toFixed(0)} <span>&#176;F</span></p>
        </div>
        <div className="three-hour">
        {
          this.props.selectedItems.map((item, i) => (
          <p key={"key-" + i}><span>{Number((item.temp) * (9/5) - 459.67).toFixed(0)} &#176;F</span> <span>{item.description}</span> <span>{moment(item.hour).format('h:mm A')}</span></p>
          ))
        }
        </div>
        <div className="five-days">
          <Link to="/"><button>{moment(this.props.currentHour).format('dddd')}</button></Link>
          {
          newArr.map((item, i) => (<Link to={"/date/"+moment(item).format('dddd')}><button key={"moment-" + i}>{moment(item).format('dddd')}</button></Link>))
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
    currentHour: appState.currentHour,
    location: appState.location,
    selectedItems: appState.selectedData,
    selectedTemp: appState.currentSelectedTempPos3,
    selectedWeather: appState.currentSelectedWeatherPos0
  }
}

export default connect(mapStateToProps)(OtherDay)