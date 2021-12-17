import styled from "styled-components"
import React, {useState} from "react"
import axios from "axios"

import CityComponent from "./Modules/CityComponent";
import WeatherComponent from "./Modules/WeatherInfoComponent";
//import WeatherInfoComponent from "./Modules/WeatherInfoComponent";

// API keys exposed on git
// open weather API_KEY
const OW_API_KEY = "0bbbfd796e294a1afc7993e4729a8969"
// position stack API_KEY
const PS_ACCESS_KEY = `f54d77601783b4a6a134d3920a2e4157`;

// main card
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  box-shadow: 0 3px 6px 0 #555;
  padding: 20px 10px;
  border-radius: 4px;
  width: 380px;
  background: white;
  font-family: Montserrat, serif;
`


function App() {
    // users typed in location
    const [query, updateQuery] = useState('');
    // exact location returned by Position Stack API
    const [location, updateLocation] = useState('');
    // weather returned from Open Weather API (using preciseLocation)
    const [weather, updateWeather] = useState('');

    // position stack api gets precise location data (coordinates, city, state, country, continent, etc)
    // todo positionstack returns a list of many locations, it is possible to present this list to users to choose from
    const fetchLocation = async (e) => {
        e.preventDefault()
        let locationResponse = await
            axios.get(`http://api.positionstack.com/v1/forward?access_key=${PS_ACCESS_KEY}&query=${query}`)
        await updateLocation(locationResponse.data.data[0])

        // set lat and lon from pos stack
        let latitude = locationResponse.data.data[0].latitude
        let longitude = locationResponse.data.data[0].longitude
        // open weather url building
        let units = "imperial"  // todo currently hardcoded 'imperial' mode
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`
        if (units === "imperial") url = url + "&units=imperial"
        url += `&appid=${OW_API_KEY}`
        // open weather fetch
        const weatherResponse = await axios.get(url)
        // update weather state
        updateWeather(weatherResponse.data)
    }

    const geolocate = async (e) => {
        e.preventDefault()

        //todo move this
        const GEO_API_KEY = '6a81c1c4304f48f4bc9206e60b0d28a1';
        // Geoapify API fetch
        const geoUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEO_API_KEY}`
        var geoLocation;
        let latitude;
        let longitude
        await axios.get(geoUrl)
            .then(response=>{
                geoLocation = response.data.features;
                updateLocation(geoLocation)
                latitude = response.data.features[0].properties.lat;
                longitude = response.data.features[0].properties.lon;
                //console.log(latitude, longitude)
            })
            .catch(error => {
                console.log('error Geoapfiy', error)
            })

        let units = "imperial"  // todo currently hardcoded 'imperial' mode
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`
        if (units === "imperial") url = url + "&units=imperial"
        url += `&appid=${OW_API_KEY}`
        // open weather fetch
        await axios.get(url)
            .then(response =>{
                // update weather state component with openweather response
                updateWeather(response)
            })
            .catch(error =>{
                console.log('error open weather', error)
            })
    }

    return (
        <Container>
            {/*if weather fetched (input entered), then render weather component*/}
            {weather ?
                <WeatherComponent location={location} weather={weather}/> :
                <CityComponent updateQuery={updateQuery} fetchLocation={geolocate}/>
            }
        </Container>
    )
}

export default App;
