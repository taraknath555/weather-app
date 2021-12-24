import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Search from './Search'
import SearchByLat from './SearchByLat'
import { fetchWeather, fetchWeatherByIp } from '../actions/weatherAction'
import ShowWeather from './ShowWeather'


class App extends Component {

    getWeatherByIp = () => {
        this.props.fetchWeatherByIp()
    }

    render(){
        const {weather} = this.props
        return(
            <Fragment>
                <Search /> 
                <h4>Search By lat and Lon</h4>
                <SearchByLat />
                <button onClick={this.getWeatherByIp}>Get By Ip</button>
                {/* {!weather.loading && weather.weather.error && <div>{weather.weather.error.message}</div>} */}
                {!weather.loading && weather.weather.current && <ShowWeather />}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {weather:state.weather}
}

export default connect(mapStateToProps, {fetchWeather, fetchWeatherByIp})(App)