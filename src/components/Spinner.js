import React from 'react'

function Spinner() {
    return (
        <div className="inline animate-spin mr-2 w-5 h-5">
            <i className="fa-solid fa-spinner"></i>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Spinner