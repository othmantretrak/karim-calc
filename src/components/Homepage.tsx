"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, Calculator } from 'lucide-react'

interface CalculatorProduct {
    id: string
    name: string
    variations: Array<{
        id: string
        price: number
        attributes: Array<{
            name: string
            value: string
        }>
    }>
}

interface HomePageProps {
    products: CalculatorProduct[]
}

interface CalculatorStep {
    id: string
    title: string
    field: string
}

interface Selection {
    productId: string
    attributes: Record<string, string>
}

export default function HomePage({ products }: HomePageProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [selection, setSelection] = useState<Selection>({
        productId: '',
        attributes: {}
    })
    const [calculatedPrice, setCalculatedPrice] = useState(0)
    const [availableAttributes, setAvailableAttributes] = useState<string[]>([])

    // Define calculator steps
    const [steps, setSteps] = useState<CalculatorStep[]>([
        { id: 'product', title: 'Product', field: 'productId' }
    ])

    // Update steps and available attributes when product changes
    useEffect(() => {
        if (selection.productId) {
            const selectedProduct = products.find(p => p.id === selection.productId)
            if (selectedProduct) {
                // Get unique attribute names from variations
                const attributeNames = new Set<string>()
                selectedProduct.variations.forEach(variation => {
                    variation.attributes.forEach(attr => {
                        attributeNames.add(attr.name)
                    })
                })

                const uniqueAttributes = Array.from(attributeNames)
                setAvailableAttributes(uniqueAttributes)

                // Update steps to include product selection + attribute steps
                const newSteps = [
                    { id: 'product', title: 'Product', field: 'productId' },
                    ...uniqueAttributes.map(attr => ({
                        id: attr.toLowerCase(),
                        title: `Choose ${attr.toLowerCase()}`,
                        field: attr
                    }))
                ]
                setSteps(newSteps)

                // Only reset attributes when product actually changes, not on step changes
                setSelection(prev => ({
                    ...prev,
                    attributes: prev.productId === selection.productId ? prev.attributes : {}
                }))
            }
        } else {
            setSteps([{ id: 'product', title: 'Product', field: 'productId' }])
            setAvailableAttributes([])
        }
    }, [selection.productId, products])

    // Calculate price when selection changes
    useEffect(() => {
        if (selection.productId && Object.keys(selection.attributes).length === availableAttributes.length) {
            const selectedProduct = products.find(p => p.id === selection.productId)
            if (selectedProduct) {
                const matchingVariation = selectedProduct.variations.find(variation => {
                    return variation.attributes.every(attr =>
                        selection.attributes[attr.name] === attr.value
                    )
                })

                if (matchingVariation) {
                    setCalculatedPrice(matchingVariation.price)
                }
            }
        } else {
            setCalculatedPrice(0)
        }
    }, [selection, availableAttributes, products])

    // Get available values for current attribute step
    const getAvailableValues = (attributeName: string) => {
        if (!selection.productId) return []

        const selectedProduct = products.find(p => p.id === selection.productId)
        if (!selectedProduct) return []

        // Get other selected attributes (excluding current one)
        const otherSelections = Object.entries(selection.attributes).filter(
            ([name]) => name !== attributeName
        )

        // Filter variations that match other selections
        const compatibleVariations = selectedProduct.variations.filter(variation => {
            return otherSelections.every(([attrName, selectedValue]) => {
                return variation.attributes.some(attr =>
                    attr.name === attrName && attr.value === selectedValue
                )
            })
        })

        // Get unique values for current attribute
        const availableValues = new Set<string>()
        compatibleVariations.forEach(variation => {
            const attr = variation.attributes.find(a => a.name === attributeName)
            if (attr) {
                availableValues.add(attr.value)
            }
        })

        return Array.from(availableValues).sort()
    }

    const handleProductSelect = (productId: string) => {
        setSelection(prev => ({ ...prev, productId }))
    }

    const handleAttributeSelect = (attributeName: string, value: string) => {
        console.log('Selecting attribute:', attributeName, 'value:', value) // Debug log
        setSelection(prev => {
            const newSelection = {
                ...prev,
                attributes: { ...prev.attributes, [attributeName]: value }
            }
            console.log('New selection state:', newSelection) // Debug log
            return newSelection
        })
    }

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const canProceed = () => {
        const currentStepData = steps[currentStep]
        if (currentStepData.field === 'productId') {
            return selection.productId !== ''
        }
        return selection.attributes[currentStepData.field] !== undefined && selection.attributes[currentStepData.field] !== ''
    }

    const isLastStep = currentStep === steps.length - 1
    const progress = ((currentStep + 1) / steps.length) * 100

    const getCurrentStepContent = () => {
        const currentStepData = steps[currentStep]

        if (currentStepData.field === 'productId') {
            return (
                <div className="space-y-4">
                    <Select
                        value={selection.productId}
                        onValueChange={handleProductSelect}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                            {products.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{product.name}</span>
                                        <span className="text-sm text-muted-foreground">
                                            Starting from €{Math.min(...product.variations.map(v => v.price)).toFixed(2)}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }

        // Attribute selection step
        const attributeName = currentStepData.field
        const availableValues = getAvailableValues(attributeName)

        return (
            <div className="space-y-4">
                <Select
                    value={selection.attributes[attributeName] || ''}
                    onValueChange={(value) => handleAttributeSelect(attributeName, value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Select ${attributeName.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {availableValues.map((value) => (
                            <SelectItem key={value} value={value}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )
    }

    const handleGetQuote = () => {
        // Find the selected product and variation
        const selectedProduct = products.find(p => p.id === selection.productId)
        if (selectedProduct) {
            const matchingVariation = selectedProduct.variations.find(variation => {
                return variation.attributes.every(attr =>
                    selection.attributes[attr.name] === attr.value
                )
            })

            if (matchingVariation) {
                // Redirect to product page with selected variation
                // You can implement this based on your routing structure
                const slug = selectedProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                window.open(`/products/${slug}`, '_blank')
            }
        }
    }

    if (products.length === 0) {
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <Card className="overflow-hidden shadow-xl py-0">
                    <CardHeader className="bg-gradient-to-r from-green-700 to-green-800 text-white text-center">
                        <div className="flex items-center justify-center gap-2 mb-2 py-2">
                            <Calculator className="w-5 h-5" />
                            <CardTitle className="text-lg">Calculate your price quickly!</CardTitle>
                        </div>

                    </CardHeader>
                    <div className="w-full bg-green-800 rounded-full h-2">
                        <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <CardContent className="p-6 space-y-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-4">
                                What can we help you with?
                            </p>
                            <h3 className="font-semibold mb-4">
                                {steps[currentStep]?.title}
                                <span className="text-red-500">*</span>
                            </h3>
                            {getCurrentStepContent()}

                            {/* Debug section - remove this in production */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                                    <div>Current Step: {currentStep} / {steps.length - 1}</div>
                                    <div>Selected Product: {selection.productId}</div>
                                    <div>Selected Attributes: {JSON.stringify(selection.attributes)}</div>
                                    <div>Can Proceed: {canProceed().toString()}</div>
                                    <div>Available Attributes: {availableAttributes.join(', ')}</div>
                                </div>
                            )}
                        </div>

                        {/* Price Display */}
                        {calculatedPrice > 0 && (
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>Total incl. VAT.</span>
                                    <span className="text-green-600">€ {calculatedPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex gap-3 pt-4">
                            {currentStep > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    className="flex-1"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            )}

                            {!isLastStep ? (
                                <Button
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    disabled={calculatedPrice === 0}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                    onClick={handleGetQuote}
                                >
                                    View Product
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}