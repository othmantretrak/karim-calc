'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createProductWithVariations } from '@/app/actions/productActions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Attribute {
    id: string
    name: string
    type: 'SELECT' | 'NUMBER'
    unit?: string | null
    values: Array<{
        id: string
        value: string
    }>
}

interface Variation {
    combination: Array<{
        attributeId: string
        attributeName: string
        valueId: string
        value: string
    }>
    price: number
    sku: string
    image?: string
}

interface UnitPriceConfig {
    attributeId: string
    pricePerUnit: number
    defaultQuantity: number
}

interface ProductFormProps {
    attributes: Attribute[]
}

export default function ProductForm({ attributes }: ProductFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    // Separate SELECT and NUMBER attributes
    const selectAttributes = attributes.filter(attr => attr.type === 'SELECT')
    const numberAttributes = attributes.filter(attr => attr.type === 'NUMBER')

    // Product form state
    const [productData, setProductData] = useState({
        name: '',
        slug: '',
        description: '',
        basePrice: 0,
        baseImage: ''
    })

    // Selected attribute values (only for SELECT type)
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({})

    // Selected NUMBER attributes
    const [selectedNumberAttributes, setSelectedNumberAttributes] = useState<string[]>([])

    // Unit price configurations for NUMBER attributes
    const [unitPrices, setUnitPrices] = useState<Record<string, UnitPriceConfig>>({})

    // Generated variations
    const [variations, setVariations] = useState<Variation[]>([])

    // Handle product data changes
    const handleProductChange = (field: string, value: string | number) => {
        setProductData(prev => ({ ...prev, [field]: value }))

        // Auto-generate slug from name
        if (field === 'name') {
            const slug = value.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            setProductData(prev => ({ ...prev, slug }))
        }
    }

    // Handle SELECT attribute value selection
    const handleValueSelect = (attributeId: string, valueId: string, checked: boolean) => {
        setSelectedValues(prev => {
            const current = prev[attributeId] || []
            if (checked) {
                return { ...prev, [attributeId]: [...current, valueId] }
            } else {
                return { ...prev, [attributeId]: current.filter(id => id !== valueId) }
            }
        })
    }

    // Handle NUMBER attribute selection
    const handleNumberAttributeToggle = (attributeId: string, checked: boolean) => {
        if (checked) {
            setSelectedNumberAttributes(prev => [...prev, attributeId])
            // Initialize with default values
            setUnitPrices(prev => ({
                ...prev,
                [attributeId]: {
                    attributeId,
                    pricePerUnit: 0,
                    defaultQuantity: 1
                }
            }))
        } else {
            setSelectedNumberAttributes(prev => prev.filter(id => id !== attributeId))
            setUnitPrices(prev => {
                const newPrices = { ...prev }
                delete newPrices[attributeId]
                return newPrices
            })
        }
    }

    // Handle unit price configuration
    const handleUnitPriceChange = (attributeId: string, field: 'pricePerUnit' | 'defaultQuantity', value: number) => {
        setUnitPrices(prev => ({
            ...prev,
            [attributeId]: {
                ...prev[attributeId],
                [field]: value
            }
        }))
    }

    // Generate variations using Cartesian product (only for SELECT attributes)
    const generateVariations = () => {
        const selectedGroups = Object.entries(selectedValues)
            .filter(([_, valueIds]) => valueIds.length > 0)
            .map(([attributeId, valueIds]) => {
                const attribute = selectAttributes.find(a => a.id === attributeId)!
                return valueIds.map(valueId => {
                    const value = attribute.values.find(v => v.id === valueId)!
                    return {
                        attributeId,
                        attributeName: attribute.name,
                        valueId,
                        value: value.value
                    }
                })
            })

        if (selectedGroups.length === 0 && selectedNumberAttributes.length === 0) {
            toast.error('Please select at least one SELECT attribute value or NUMBER attribute')
            return
        }

        // Calculate Cartesian product for SELECT attributes
        let cartesianProduct: Array<Array<{ attributeId: string, attributeName: string, valueId: string, value: string }>>

        if (selectedGroups.length > 0) {
            cartesianProduct = selectedGroups.reduce<Array<Array<{ attributeId: string, attributeName: string, valueId: string, value: string }>>>((acc, group) => {
                if (acc.length === 0) return group.map(item => [item])
                return acc.flatMap(accItem => group.map(groupItem => [...accItem, groupItem]))
            }, [])
        } else {
            // If no SELECT attributes, create a single empty combination
            cartesianProduct = [[]]
        }

        // Calculate base price including default quantities of NUMBER attributes
        const baseWithDefaults = productData.basePrice +
            selectedNumberAttributes.reduce((sum, attrId) => {
                const config = unitPrices[attrId]
                return sum + (config.defaultQuantity * config.pricePerUnit)
            }, 0)

        // Create variation objects
        const newVariations = cartesianProduct.map((combination, index) => ({
            combination,
            price: baseWithDefaults,
            sku: `SKU-${productData.slug}-${index + 1}`,
            image: productData.baseImage || undefined
        }))

        setVariations(newVariations)
        toast.success(`Generated ${newVariations.length} variation${newVariations.length > 1 ? 's' : ''}`)
    }

    // Handle variation change
    const handleVariationChange = (index: number, field: string, value: string | number) => {
        setVariations(prev => prev.map((v, i) =>
            i === index ? { ...v, [field]: value } : v
        ))
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!productData.name || !productData.slug) {
            toast.error('Please fill in product name and slug')
            return
        }

        if (variations.length === 0) {
            toast.error('Please generate variations')
            return
        }

        // Validate all variations have SKU and price
        const invalidVariations = variations.filter(v => !v.sku || v.price <= 0)
        if (invalidVariations.length > 0) {
            toast.error('All variations must have a valid SKU and price')
            return
        }

        // Validate unit prices for NUMBER attributes
        const invalidUnitPrices = selectedNumberAttributes.filter(attrId => {
            const config = unitPrices[attrId]
            return !config || config.pricePerUnit <= 0 || config.defaultQuantity <= 0
        })
        if (invalidUnitPrices.length > 0) {
            toast.error('All NUMBER attributes must have valid price per unit and default quantity')
            return
        }

        startTransition(async () => {
            try {
                await createProductWithVariations({
                    product: productData,
                    variations: variations.map(v => ({
                        ...v,
                        attributeValueIds: v.combination.map(c => c.valueId)
                    })),
                    selectedAttributes: [
                        ...Object.keys(selectedValues),
                        ...selectedNumberAttributes
                    ],
                    unitPrices: Object.values(unitPrices)
                })

                toast.success('Product created successfully!')
                router.push('/dashboard')
            } catch (error) {
                toast.error('Failed to create product')
                console.error(error)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                value={productData.name}
                                onChange={(e) => handleProductChange('name', e.target.value)}
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input
                                id="slug"
                                value={productData.slug}
                                onChange={(e) => handleProductChange('slug', e.target.value)}
                                placeholder="product-slug"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={productData.description}
                            onChange={(e) => handleProductChange('description', e.target.value)}
                            placeholder="Enter product description"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="basePrice">Base Price (labor/setup cost)</Label>
                            <Input
                                id="basePrice"
                                type="number"
                                step="0.01"
                                min="0"
                                value={productData.basePrice}
                                onChange={(e) => handleProductChange('basePrice', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                            />
                            <p className="text-xs text-muted-foreground">
                                This is the base cost before adding default quantities of NUMBER attributes
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="baseImage">Base Image URL</Label>
                            <Input
                                id="baseImage"
                                value={productData.baseImage}
                                onChange={(e) => handleProductChange('baseImage', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* SELECT Attributes */}
            {selectAttributes.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Select Attributes (Variations)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {selectAttributes.map((attribute) => (
                            <div key={attribute.id} className="space-y-3">
                                <h3 className="text-lg font-semibold">{attribute.name}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {attribute.values.map((value) => (
                                        <div key={value.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`${attribute.id}-${value.id}`}
                                                checked={selectedValues[attribute.id]?.includes(value.id) || false}
                                                onCheckedChange={(checked) =>
                                                    handleValueSelect(attribute.id, value.id, checked as boolean)
                                                }
                                            />
                                            <Label
                                                htmlFor={`${attribute.id}-${value.id}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {value.value}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* NUMBER Attributes */}
            {numberAttributes.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Number Attributes (Unit-Based Pricing)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {numberAttributes.map((attribute) => (
                            <div key={attribute.id} className="space-y-4 border-b pb-6 last:border-b-0">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`number-${attribute.id}`}
                                        checked={selectedNumberAttributes.includes(attribute.id)}
                                        onCheckedChange={(checked) =>
                                            handleNumberAttributeToggle(attribute.id, checked as boolean)
                                        }
                                    />
                                    <Label
                                        htmlFor={`number-${attribute.id}`}
                                        className="text-lg font-semibold cursor-pointer"
                                    >
                                        {attribute.name} {attribute.unit && `(${attribute.unit})`}
                                    </Label>
                                </div>

                                {selectedNumberAttributes.includes(attribute.id) && (
                                    <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted p-4 rounded-md">
                                        <div className="space-y-2">
                                            <Label htmlFor={`price-${attribute.id}`}>
                                                Price per {attribute.unit || 'unit'} *
                                            </Label>
                                            <Input
                                                id={`price-${attribute.id}`}
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={unitPrices[attribute.id]?.pricePerUnit || 0}
                                                onChange={(e) =>
                                                    handleUnitPriceChange(
                                                        attribute.id,
                                                        'pricePerUnit',
                                                        parseFloat(e.target.value) || 0
                                                    )
                                                }
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`default-${attribute.id}`}>
                                                Default Quantity (minimum) *
                                            </Label>
                                            <Input
                                                id={`default-${attribute.id}`}
                                                type="number"
                                                step="1"
                                                min="1"
                                                value={unitPrices[attribute.id]?.defaultQuantity || 1}
                                                onChange={(e) =>
                                                    handleUnitPriceChange(
                                                        attribute.id,
                                                        'defaultQuantity',
                                                        parseInt(e.target.value) || 1
                                                    )
                                                }
                                                placeholder="1"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2 text-sm text-muted-foreground bg-blue-50 p-3 rounded">
                                            Default cost included in variation price: €
                                            {((unitPrices[attribute.id]?.pricePerUnit || 0) *
                                                (unitPrices[attribute.id]?.defaultQuantity || 1)).toFixed(2)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Generate Variations Button */}
            <div className="flex justify-center">
                <Button
                    type="button"
                    onClick={generateVariations}
                    disabled={Object.keys(selectedValues).length === 0 && selectedNumberAttributes.length === 0}
                    size="lg"
                >
                    Generate Variations
                </Button>
            </div>

            {/* Generated Variations */}
            {variations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Variations ({variations.length})</CardTitle>
                        {selectedNumberAttributes.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                                Prices include default quantities: {selectedNumberAttributes.map(attrId => {
                                    const attr = numberAttributes.find(a => a.id === attrId)
                                    const config = unitPrices[attrId]
                                    return `${attr?.name}: ${config.defaultQuantity} ${attr?.unit || 'units'}`
                                }).join(', ')}
                            </p>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {variations.map((variation, index) => (
                                <div key={index} className="border rounded-lg p-4 space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {variation.combination.length > 0 ? (
                                            variation.combination.map((item) => (
                                                <Badge key={item.valueId} variant="secondary">
                                                    {item.attributeName}: {item.value}
                                                </Badge>
                                            ))
                                        ) : (
                                            <Badge variant="outline">Base Product</Badge>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor={`sku-${index}`}>SKU *</Label>
                                            <Input
                                                id={`sku-${index}`}
                                                value={variation.sku}
                                                onChange={(e) => handleVariationChange(index, 'sku', e.target.value)}
                                                placeholder="SKU-001"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`price-${index}`}>
                                                Price * (includes defaults)
                                            </Label>
                                            <Input
                                                id={`price-${index}`}
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={variation.price}
                                                onChange={(e) => handleVariationChange(index, 'price', parseFloat(e.target.value) || 0)}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`image-${index}`}>Image URL</Label>
                                            <Input
                                                id={`image-${index}`}
                                                value={variation.image || ''}
                                                onChange={(e) => handleVariationChange(index, 'image', e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isPending || variations.length === 0}
                    className="min-w-[120px]"
                    size="lg"
                >
                    {isPending ? 'Creating...' : 'Create Product'}
                </Button>
            </div>
        </form>
    )
}