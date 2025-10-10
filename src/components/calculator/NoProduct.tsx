import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Calculator } from 'lucide-react'

function NoProduct() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardContent className="text-center py-8">
                    <Calculator className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No products available</h3>
                    <p className="text-muted-foreground">
                        Please add some products to enable the price calculator.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default NoProduct