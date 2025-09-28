'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { toast } from 'sonner'

interface Product {
    id: string
    name: string
    slug: string
    description?: string
    basePrice: number
    baseImage?: string
    variations: Array<{
        id: string
        sku: string
        price: number
        image?: string
        attributes: Array<{
            id: string
            value: string
            attribute: {
                id: string
                name: string
            }
        }>
    }>
    attributes: Array<{
        attribute: {
            id: string
            name: string
            values: Array<{
                id: string
                value: string
            }>
        }
    }>
}

interface ProductDisplayProps {
    product: Product
}

interface SelectedOptions {
    [attributeName: string]: string
}

export interface VariationMatch {
    id: string
    sku: string
    price: number
    image?: string
    attributes: Array<{
        attributeName: string
        value: string
    }>
}

export default function ProductDisplay({ product }: ProductDisplayProps) {
    // State for user selections
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

    // State for current matched variation
    const [currentVariation, setCurrentVariation] = useState<VariationMatch | null>(null)

    // State for quantity
    const [quantity, setQuantity] = useState(1)

    // Get available attribute values from actual variations
    const getAvailableValuesForAttribute = (attributeName: string) => {
        const availableValues = new Set<string>()

        product.variations.forEach(variation => {
            const attr = variation.attributes.find(a => a.attribute.name === attributeName)
            if (attr) {
                availableValues.add(attr.value)
            }
        })

        return Array.from(availableValues).sort()
    }

    // Get available values for an attribute considering current selections
    const getAvailableValuesForAttributeFiltered = (targetAttributeName: string) => {
        // Get other selected attributes (excluding the target one)
        const otherSelections = Object.entries(selectedOptions).filter(
            ([attrName]) => attrName !== targetAttributeName
        )

        // If no other selections, return all available values for this attribute
        if (otherSelections.length === 0) {
            return getAvailableValuesForAttribute(targetAttributeName)
        }

        // Find variations that match all OTHER selected attributes
        const compatibleVariations = product.variations.filter(variation => {
            const variationAttributes = variation.attributes.reduce((acc, attr) => {
                acc[attr.attribute.name] = attr.value
                return acc
            }, {} as Record<string, string>)

            return otherSelections.every(([attrName, selectedValue]) => {
                return variationAttributes[attrName] === selectedValue
            })
        })

        // Return available values for the target attribute from compatible variations
        const availableValues = new Set<string>()
        compatibleVariations.forEach(variation => {
            const attr = variation.attributes.find(a => a.attribute.name === targetAttributeName)
            if (attr) {
                availableValues.add(attr.value)
            }
        })

        return Array.from(availableValues).sort()
    }

    // Get filtered attributes with only available values
    const getFilteredAttributes = () => {
        return product.attributes.map(({ attribute }) => ({
            ...attribute,
            availableValues: getAvailableValuesForAttributeFiltered(attribute.name)
        })).filter(attr => attr.availableValues.length > 0) // Only include attributes that have available values
    }

    // Initialize selections with first available option for each attribute
    useEffect(() => {
        const initialSelections: SelectedOptions = {}
        const filteredAttributes = getFilteredAttributes()

        filteredAttributes.forEach((attribute) => {
            if (attribute.availableValues.length > 0) {
                initialSelections[attribute.name] = attribute.availableValues[0]
            }
        })

        setSelectedOptions(initialSelections)
    }, [product.attributes, product.variations])

    // Find matching variation when selections change
    useEffect(() => {
        if (Object.keys(selectedOptions).length === 0) {
            setCurrentVariation(null)
            return
        }

        // Find variation that matches all selected options
        const matchedVariation = product.variations.find(variation => {
            const variationAttributes = variation.attributes.reduce((acc, attr) => {
                acc[attr.attribute.name] = attr.value
                return acc
            }, {} as Record<string, string>)

            // Check if all selected options match the variation attributes
            return Object.entries(selectedOptions).every(([attrName, selectedValue]) => {
                return variationAttributes[attrName] === selectedValue
            })
        })

        if (matchedVariation) {
            setCurrentVariation({
                id: matchedVariation.id,
                sku: matchedVariation.sku,
                price: matchedVariation.price,
                image: matchedVariation.image,
                attributes: matchedVariation.attributes.map(attr => ({
                    attributeName: attr.attribute.name,
                    value: attr.value
                }))
            })
        } else {
            setCurrentVariation(null)
        }
    }, [selectedOptions, product.variations])

    // Handle option selection
    const handleOptionSelect = (attributeName: string, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [attributeName]: value
        }))
    }



    // Handle add to cart
    const handleAddToCart = () => {
        if (!currentVariation) {
            toast.error('Please select product options')
            return
        }



        toast.success(`Added ${quantity} x ${product.name} (${currentVariation.sku}) to cart`)
    }

    // Get current image URL
    const currentImage = currentVariation?.image || product.baseImage || '/placeholder-product.jpg'

    // Get current price
    const currentPrice = currentVariation?.price || product.basePrice


    // Get filtered attributes for rendering
    const filteredAttributes = getFilteredAttributes()

    return (
        <div className="grid grid-cols-1 gap-8">
            {/* Product Details */}
            <div className="space-y-6 mx-auto w-3/4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-muted-foreground">{product.description}</p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <div className="text-3xl font-bold">
                        ${currentPrice.toFixed(2)}
                    </div>
                    {!currentVariation && (
                        <p className="text-sm text-muted-foreground">
                            Starting from ${product.basePrice.toFixed(2)}
                        </p>
                    )}
                </div>

                {/* SKU and Stock */}
                {currentVariation && (
                    <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                            SKU: {currentVariation.sku}
                        </div>

                    </div>
                )}

                <Separator />

                {/* Attribute Selection - Now showing only available values */}
                <div className="space-y-4">
                    {filteredAttributes.map((attribute) => (
                        <div key={attribute.id} className="space-y-3">
                            <h3 className="font-semibold">{attribute.name}</h3>

                            {/* Use radio buttons for attributes with few values */}
                            {attribute.availableValues.length <= 5 ? (
                                <RadioGroup
                                    value={selectedOptions[attribute.name] || ''}
                                    onValueChange={(value) => handleOptionSelect(attribute.name, value)}
                                    className="flex flex-wrap gap-3"
                                >
                                    {attribute.availableValues.map((value) => (
                                        <div key={value} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={value}
                                                id={`${attribute.id}-${value}`}
                                            />
                                            <Label
                                                htmlFor={`${attribute.id}-${value}`}
                                                className="cursor-pointer"
                                            >
                                                {value}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            ) : (
                                // Use dropdown for attributes with many values
                                <Select
                                    value={selectedOptions[attribute.name] || ''}
                                    onValueChange={(value) => handleOptionSelect(attribute.name, value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={`Select ${attribute.name}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {attribute.availableValues.map((value) => (
                                            <SelectItem key={value} value={value}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    ))}
                </div>

                {/* Selected Variation Summary */}
                {currentVariation && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <h4 className="font-semibold">Selected Options:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {currentVariation.attributes.map((attr, index) => (
                                        <Badge key={index} variant="secondary">
                                            {attr.attributeName}: {attr.value}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Separator />

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">


                    <Button
                        size="lg"
                        className="w-full"
                        onClick={handleAddToCart}
                        disabled={!currentVariation}
                    >
                        {!currentVariation
                            ? 'Select Options' : `Add to Cart - $${(currentPrice * quantity).toFixed(2)}`}
                    </Button>
                </div>

                {/* Product Information */}
                <div className="space-y-4 text-sm text-muted-foreground">
                    <div>
                        <strong>Total Variations:</strong> {product.variations.length}
                    </div>
                    <div>
                        <strong>Available Attributes:</strong>{' '}
                        {filteredAttributes.map((attribute) => attribute.name).join(', ')}
                    </div>
                </div>
            </div>
        </div>
    )
}