import React from 'react'

function Thankyou() {
    return (
        <div className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">Thank you!</h2>
            <p className="text-gray-700">
                We have received your request and<br />
                will get back to you within 6 hours during our<br />
                regular working hours!
            </p>
            <div className="pt-4">
                <p className="font-medium">Kind regards</p>
                <p className="font-medium">GreenTeam</p>
            </div>
        </div>
    )
}

export default Thankyou