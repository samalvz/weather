import styled from 'styled-components'

//region styled area
const WeatherLogo = styled.img`
  width: 140px;
  height: 140px;
  margin: 40px;
`
const CityInput = styled.span`
  color: black;
  font-size: 18px;
  font-weight: bold;
  margin: 10px auto;
`
const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  border: black solid 1px;
  border-radius: 4px;
  color: black;
  font-size: 18px;
  font-weight: bold;
  margin: 20px auto;

  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-weight: bold;
  }

  & button {
    padding: 10px;
    font-size: 14px;
    color: white;
    background-color: black;
    border: none;
    outline: none;
    font-weight: bold;
    cursor: pointer;
  }
`
//endregion

const CityComponent = (props) => {
    const {updateLocation, fetchLocation} = props

    return (
        //fragment
        <>
            {/*<WeatherLogo docs={"./icons/perfect-day.svg"}/>*/}
            {/*<CityInput>Weather</CityInput>*/}
            <SearchBox onSubmit={fetchLocation} >
            {/*<SearchBox onSubmit={getWeather}>*/}
                <input placeholder={"Enter a location "}
                       // onChange={(e)=> InputHandler(e.target.value)}
                       onChange={(e)=> updateLocation(e.target.value)}

                />
                <button type={"submit"}>Search</button>
            </SearchBox>
        </>
    )
}

export default CityComponent;