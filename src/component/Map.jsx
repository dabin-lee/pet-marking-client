import React from 'react'

function Map({ mapElement }) {
    return (
        <div ref={mapElement} style={{ minHeight: '500px' }}></div>
    )
}

export default Map