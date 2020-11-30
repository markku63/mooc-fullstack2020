import React, {useEffect, useState} from 'react'
import axios from 'axios'

const CountryDetail = ({country}) => {
    const weatherstack_api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({temp: 0})

    useEffect(() => {
        axios
            .get(encodeURI('http://api.weatherstack.com/current?access_key=' +
                 weatherstack_api_key + '&query=' + country.capital))
            .then(response => {
                console.log("status:", response.status)
                console.log("data:", response.data)
                if (response.status === 200) {
                    const current_weather = response.data.current
                    console.log(current_weather)
                    setWeather({temp: current_weather.temperature,
                        icon: current_weather.weather_icons[0],
                        desc: current_weather.weather_descriptions[0],
                        wind: current_weather.wind_speed,
                        wind_dir: current_weather.wind_dir})
                }
            })
    }, [country, weatherstack_api_key])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital}<br />
                population {country.population}
            </p>
            <h2>Spoken languages</h2>
            <ul>
    {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <p>
                <img src={country.flag} alt="Flag of {country.name}" height="200" />
            </p>
            <h2>Weather in {country.capital}</h2>
            <p>
                Temperature: {weather.temp} <br />
                <img src={weather.icon} alt={weather.desc} /> <br />
                Wind: {weather.wind} km/h direction {weather.wind_dir}
            </p>
        </div>
    )
}

export default CountryDetail