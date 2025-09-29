// Homepage.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Calculator } from 'lucide-react'
import useStore from '@/lib/store'
import Link from 'next/link'
import { findMatchingVariation, getFilteredAttributes } from '@/app/utils/productUtils'
import { CalculatorProduct, Attribute } from '@/app/types'

interface HomePageProps {
    products: CalculatorProduct[]
}

interface CalculatorStep {
    id: string
    title: string
    field: string
}

export default function HomePage({ products }: HomePageProps) {
    const { selection, setSelection } = useStore()
    const [currentStep, setCurrentStep] = useState(0)
    const [calculatedPrice, setCalculatedPrice] = useState(0)

    // Compute steps and attributes using useMemo to avoid recalculations
    const { steps, attributes } = useMemo(() => {
        const steps: CalculatorStep[] = [{ id: 'product', title: 'Product', field: 'productSlug' }]
        let attributes: Attribute[] = []

        if (selection.productSlug) {
            const selectedProduct = products.find((p) => p.slug === selection.productSlug)
            if (selectedProduct) {
                attributes = getFilteredAttributes(selectedProduct, selection.attributes)
                steps.push(...attributes.map((attr) => ({
                    id: attr.name.toLowerCase(),
                    title: `Choose ${attr.name.toLowerCase()}`,
                    field: attr.name,
                })))
            }
        }

        return { steps, attributes }
    }, [selection.productSlug, selection.attributes, products])

    // Calculate price when selections are complete
    useEffect(() => {
        if (selection.productSlug && Object.keys(selection.attributes).length === attributes.length) {
            const selectedProduct = products.find((p) => p.slug === selection.productSlug)
            if (selectedProduct) {
                const matchingVariation = findMatchingVariation(selectedProduct, selection.attributes)
                setCalculatedPrice(matchingVariation ? matchingVariation.price : 0)
            }
        } else {
            setCalculatedPrice(0)
        }
    }, [selection, attributes, products])

    const handleProductSelect = (productSlug: string) => {
        setSelection({ productSlug, attributes: {}, variationId: undefined })
        setCurrentStep(0)
    }

    const handleAttributeSelect = (attributeName: string, value: string) => {
        setSelection((prev) => ({
            ...prev,
            attributes: { ...prev.attributes, [attributeName]: value },
        }))
    }

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const canProceed = () => {
        const currentStepData = steps[currentStep]
        if (currentStepData.field === 'productSlug') {
            return !!selection.productSlug
        }
        return !!selection.attributes[currentStepData.field]
    }

    const isLastStep = currentStep === steps.length - 1
    const progress = ((currentStep + 1) / steps.length) * 100

    const getCurrentStepContent = () => {
        const currentStepData = steps[currentStep]

        if (currentStepData.field === 'productSlug') {
            return (
                <Select value={selection.productSlug} onValueChange={handleProductSelect}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                        {products.map((product) => (
                            <SelectItem key={product.id} value={product.slug}>
                                <div className="flex flex-col">
                                    <span className="font-medium">{product.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                        Starting from €{Math.min(...product.variations.map((v) => v.price)).toFixed(2)}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )
        }

        const attributeName = currentStepData.field
        const availableValues = attributes.find((attr) => attr.name === attributeName)?.availableValues || []

        return (
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
        )
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
                        <div className="flex items-center justify-center gap-2 mb-2 my-5">
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
                            <p className="text-sm text-muted-foreground mb-4">What can we help you with?</p>
                            <h3 className="font-semibold mb-4">
                                {steps[currentStep]?.title}
                                <span className="text-red-500">*</span>
                            </h3>
                            {getCurrentStepContent()}
                            {/* Debug section - remove this in production */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                                    <div>Current Step: {currentStep} / {steps.length - 1}</div>
                                    <div>Selected Product: {selection.productSlug}</div>
                                    <div>Selected Attributes: {JSON.stringify(selection.attributes)}</div>
                                    <div>Can Proceed: {canProceed().toString()}</div>
                                    <div> Total steps : {steps.length} </div>
                                </div>
                            )}
                        </div>

                        {calculatedPrice > 0 && (
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>Total incl. VAT.</span>
                                    <span className="text-green-600">€ {calculatedPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            {currentStep > 0 && (
                                <Button variant="outline" onClick={prevStep} className="flex-1">
                                    <ChevronLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            )}
                            {(!isLastStep || steps.length - 1 === 0) ? (
                                <Button
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Link
                                    className="flex-1 bg-green-700 hover:bg-green-800 text-white text-center py-2 rounded"
                                    href={`/products/${selection.productSlug}`}
                                >
                                    View Product
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}