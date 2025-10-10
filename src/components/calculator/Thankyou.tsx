import React from 'react'

function Thankyou() {
    return (
        <div className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">Bedankt!</h2>
            <p className="text-gray-700">
                We hebben uw aanvraag ontvangen en<br />
                nemen binnen 6 uur tijdens onze<br />
                reguliere werktijden contact met u op!
            </p>
            <div className="pt-4">
                <p className="font-medium">Met vriendelijke groet</p>
                <p className="font-medium">GreenTeam</p>
            </div>
        </div>
    )
}

export default Thankyou