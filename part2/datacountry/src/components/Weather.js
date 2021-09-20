import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather =({capital}) =>{
    
    const [weather,setWeather]=useState({temperature:1, weather_icons:[""], wind_speed:0})
    const key=process.env.REACT_APP_API_KEY

    useEffect(() => {
        console.log('effect')
        console.log(capital)
        axios
          .get('http://api.weatherstack.com/current',{
          params: {
              access_key:key,
              query: capital
            }})
          .then(response => {
            console.log(response.data.current)  
            setWeather(response.data.current)

          })
          
    }, [key,capital])

    return(
        <>
        
        <h2>Weather in {capital}</h2>
        <p><b>temperature: </b>{weather.temperature}  Celcius</p>
        <img src={weather.weather_icons[0]} alt="graphic"/>
        <p><b>wind: </b> {weather.wind_speed} mph direction </p>
 
        </>
    )


}
export default Weather