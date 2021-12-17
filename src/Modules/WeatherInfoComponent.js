import styled from "styled-components"

// region icons
export const WeatherInfoIcons = {
    Sunset: "./icons/temp.svg",
    Sunrise: "./icons/temp.svg",
    Humidity: "./icons/humidity.svg",
    Wind: "./icons/wind.svg",
    Pressure: "./icons/pressure.svg",
}

export const WeatherIcons = {
    //todo some weather conditions have no icons (e.g. 50n for mist)
    "01d": "./icons/sunny.svg",
    "01n": "./icons/night.svg",
    "02d": "./icons/day.svg",
    "02n": "./icons/cloudy-night.svg",
    "03d": "./icons/cloudy.svg",
    "03n": "./icons/cloudy.svg",
    "04d": "./icons/perfect-day.svg",
    "04n": "./icons/cloudy-night.svg",
    "09d": "./icons/rain.svg",
    "09n": "./icons/rain-night.svg",
    "10d": "./icons/rain.svg",
    "10n": "./icons/rain-night.svg",
    "11d": "./icons/storm.svg",
    "11n": "./icons/storm.svg",
}
//endregion

//region styled region
const ExitButton = styled.span
    `
      display: flex;
      flex-direction: row;
      align-content: flex-start;
      width: 100%; 
      & button {
        width: 10%;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    `

const WeatherCondition = styled.div
    `
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      margin: 30px auto;

    `
const LocalTime = styled.span
    `
      display: flex;
      flex-direction: row;
      justify-content: left;
    `
const Location = styled.span
    `
      font-size: 25px;
      text-transform: capitalize;
      font-weight: bold;
      margin: 15px auto;
    `

const Temperature = styled.span
    `
      margin: 0 0 10px;
      text-transform: capitalize;
      text-align: center;
      font-size: 14px;
      //background: grey;
      & span {
        font-size: 20px
      }
    `

const Condition = styled.span
    `
      margin: 5px auto 10px auto;
      text-transform: capitalize;
      font-size: 18px;
      //background: lightcoral;
      & span {
        font-size: 15px;
        font-weight: lighter;
      }
    `

const WeatherLogo = styled.img
    `
      width: 100px;
      height: 100px;
      margin: 5px auto auto auto;
    `

const WeatherInfoLabel = styled.span
    `
      font-size: 14px;
      font-weight: bold;
      margin: 5px 25px 10px;
      text-align: start;
      width: 90%;
    `

const WeatherInfoContainer = styled.span
    `
      display: flex;
      width: 90%;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
    `

const InfoContainer = styled.div
    `
      display: flex;
      margin: 5px 10px;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
    `

const InfoIcon = styled.img
    `
      width: 36px;
      height: 36px;
    `

const InfoLabel = styled.div
    `
      display: flex;
      flex-direction: column;
      font-size: 14px;
      margin: 15px;

      &span {
        font-size: 12px;
        text-transform: capitalize;
      }
    `
//endregion

const WeatherInfoComponent = (props) => {
    const {name, value} = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherInfoIcons[name]}/>
            <InfoLabel>
                {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    )
}

const WeatherComponent = (props) => {
    const {location, weather} = props;
    //console.log("weather.data.weather: ", weather.data.weather)
    console.log('location component: ', location)

    // does openweather return daytime for this location?
    const isDay = weather.data.weather[0].icon.includes('d');

    // use provided sunrise/set time and convert to location's local time
    const getSunTime = (timeStamp, timezone, isDay) => {
        let d = new Date(timeStamp * 1000)
        let localOffset = d.getTimezoneOffset() * 60000;
        let nd = (d.getTime() + localOffset) + (1000 * timezone)
        let sunTime = new Date(nd)

        return (sunTime.toLocaleTimeString())
    }

    // use location timezone to display local time
    const getLocationTime = (offset) =>{
        let d = new Date()
        let localTime = d.getTime()
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset
        let loc = utc + (1000 * offset)
        let nd = new Date(loc)

        return nd.toLocaleTimeString();
    }

    // backbutton to return to city component (searchbar)
    const BackButton = () =>{
        //todo add button functionality
        console.log("go back button")
    }

    return (
        <>
            {/*todo clean this area up and make more variables above this is ugly*/}
            {/*<ExitButton>*/}
            {/*    <button onClick={BackButton}>*/}
             {/*        <img src={"./icons/UI/small-x.png"} alt={"close"} width={"50%"} />*/}
            {/*    </button>*/}
            {/*</ExitButton>*/}

            <Location>
                {`
                ${location[0].properties.address_line1}, 
                ${location[0].properties.country}
                `}
            </Location>

            <Temperature>
                {/*Fahrenheit*/}
                <span>H: {`${Math.floor(weather.data.main.temp_max)}°F | `}</span>
                <span>L : {`${Math.floor(weather.data.main.temp_min)}°F`}</span>
                <br/>Feels Like: {`${Math.floor(weather.data.main.feels_like)}°F`}
                {/*Celsius */}
                {/*<span>H: {`${Math.floor((weather.main.temp_max - 273) * (9/5) + 32)}°F | `}</span>*/}
                {/*<span>L : {`${Math.floor((weather.main.temp_min - 273) * (9/5) + 32)}°F`}</span>*/}
            </Temperature>

            <LocalTime>
                Local Time: {getLocationTime(weather.data.timezone)}
            </LocalTime>

            <WeatherCondition>
                <Condition>
                    {weather.data.weather[0].main}
                    <br/>
                    <span>{weather.data.weather[0].description}</span>
                </Condition>
                <WeatherLogo src={WeatherIcons[weather.data.weather[0].icon]}/>
            </WeatherCondition>

            <WeatherInfoLabel>Weather Info</WeatherInfoLabel>

            <WeatherInfoContainer>
                <WeatherInfoComponent
                    name={isDay ? "Sunset" : "Sunrise"}
                    value={getSunTime(weather.data.sys[isDay ? "sunset" : "sunrise"], weather.data.timezone, isDay)} // not sure why this has to be lowercase
                />
                <WeatherInfoComponent name={"Humidity"} value={weather.data.main.humidity}/>
                <WeatherInfoComponent name={"Wind"} value={weather.data.wind.speed}/>
                <WeatherInfoComponent name={"Pressure"} value={weather.data.main.pressure}/>
            </WeatherInfoContainer>
        </>
    )
}

export default WeatherComponent;