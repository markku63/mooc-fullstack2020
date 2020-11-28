import React from 'react'

const CountryFilter = (props) => {
    return (
        <form>
            <div>
                find countries <input value={props.filterString} onChange={props.handleFilterChange} />
            </div>
        </form>
    )
}

export default CountryFilter