// ProductDisplay.tsx
'use client'

import { useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { toast } from 'sonner'
import useStore from '@/lib/store'
import { getFilteredAttributes, findMatchingVariation } from '../utils/productUtils'
import { Product, Attribute } from '../types'
import Link from 'next/link'

interface ProductDisplayProps {
    product: Product
}

export default function ProductDisplay({ product }: ProductDisplayProps) {
    const { selection, setSelection } = useStore()

    // Initialize selections for this product if none exist
    useEffect(() => {
        if (selection.productSlug !== product.slug) {
            const initialSelections: Record<string, string> = {}
            const attributes = getFilteredAttributes(product, {})
            attributes.forEach((attr) => {
                if (attr.availableValues.length > 0) {
                    initialSelections[attr.name] = attr.availableValues[0]
                }
            })
            setSelection({ productSlug: product.slug, attributes: initialSelections, variationId: undefined })
        }
    }, [product, selection.productSlug, setSelection])

    // Compute current variation and filtered attributes
    const { currentVariation, filteredAttributes } = useMemo(() => {
        const filteredAttributes = getFilteredAttributes(product, selection.attributes)
        const currentVariation = findMatchingVariation(product, selection.attributes)
        return { currentVariation, filteredAttributes }
    }, [product, selection.attributes])

    // Handle option selection
    const handleOptionSelect = (attributeName: string, value: string) => {
        setSelection((prev) => ({
            ...prev,
            attributes: { ...prev.attributes, [attributeName]: value },
            variationId: undefined,
        }))
    }

    // Handle add to cart
    const handleAddToCart = () => {
        if (!currentVariation) {
            toast.error('Please select product options')
            return
        }
        setSelection((prev) => ({ ...prev, variationId: currentVariation.id }))
        toast.success(`Added ${product.name} (${currentVariation.sku}) to cart`)
    }

    // Get current image and price
    const currentPrice = currentVariation?.price || product.basePrice

    return (
        <div className="grid grid-cols-1 gap-8">
            <div className="flex justify-between">
                <Link href="/admin" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Back to Dashboard
                </Link>
            </div>
            <div className="space-y-6 w-2/3 mx-auto">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-muted-foreground">{product.description}</p>
                </div>

                <div className="space-y-2">
                    <div className="text-3xl font-bold">${currentPrice.toFixed(2)}</div>
                    {!currentVariation && (
                        <p className="text-sm text-muted-foreground">
                            Starting from ${product.basePrice.toFixed(2)}
                        </p>
                    )}
                </div>

                {currentVariation && (
                    <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">SKU: {currentVariation.sku}</div>
                    </div>
                )}

                <Separator />

                <div className="space-y-4">
                    {filteredAttributes.map((attribute: Attribute) => (
                        <div key={attribute.id} className="space-y-3">
                            <h3 className="font-semibold">{attribute.name}</h3>
                            {attribute.availableValues.length <= 5 ? (
                                <RadioGroup
                                    value={selection.attributes[attribute.name] || ''}
                                    onValueChange={(value) => handleOptionSelect(attribute.name, value)}
                                    className="flex flex-wrap gap-3"
                                >
                                    {attribute.availableValues.map((value) => (
                                        <div key={value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={value} id={`${attribute.id}-${value}`} />
                                            <Label htmlFor={`${attribute.id}-${value}`} className="cursor-pointer">
                                                {value}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            ) : (
                                <Select
                                    value={selection.attributes[attribute.name] || ''}
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

                {currentVariation && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <h4 className="font-semibold">Selected Options:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {currentVariation.attributes.map((attr, index: number) => (
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

                <Button
                    onClick={handleAddToCart}
                    className="w-full bg-green-700 hover:bg-green-800 text-white"
                    disabled={!currentVariation}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}