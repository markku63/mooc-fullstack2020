import React from 'react'

const Country = (props) => {
    return (
        <li>
            {props.country.name}
            <button onClick={() => props.setFilterString(props.country.name)}>Show</button>
        </li>
    )
}

const CountryDetail = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital}<br />
                population {country.population}
            </p>
            <h2>languages</h2>
            <ul>
    {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <p>
                <img src={country.flag} alt="Flag of {country.name}" height="200" />
            </p>
        </div>
    )
}

const Countries = (props) => {
    const countries = props.countries
        .filter(country => country.name.toLowerCase().includes(props.filterString.toLowerCase()))
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )

    } else if (countries.length > 1) {
        return (
            <ul style={{ 'listStyleType': 'none' }} >
                {countries.map(country => <Country key={country.alpha3Code} country={country} setFilterString={props.setFilterString} /> )  }
            </ul>
        )
    } else if (countries.length === 1) {
        return (
            <CountryDetail country={countries[0]} />
        )
    } else {
        return null
    }
}

export default Countries