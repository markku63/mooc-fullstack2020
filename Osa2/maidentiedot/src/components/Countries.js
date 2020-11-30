import React from 'react'
import CountryDetail from './CountryDetail'

const Country = (props) => {
    return (
        <li>
            {props.country.name}
            <button onClick={() => props.setFilterString(props.country.name)}>Show</button>
        </li>
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