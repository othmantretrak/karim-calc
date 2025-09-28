'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { createProductWithVariations } from '@/app/actions/productActions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Attribute {
    id: string
    name: string
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

interface ProductFormProps {
    attributes: Attribute[]
}

export default function ProductForm({ attributes }: ProductFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    // Product form state
    const [productData, setProductData] = useState({
        name: '',
        slug: '',
        description: '',
        basePrice: 0,
        baseImage: ''
    })

    // Selected attribute values
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({})

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

    // Handle attribute value selection
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

    // Generate variations using Cartesian product
    const generateVariations = () => {
        const selectedGroups = Object.entries(selectedValues)
            .filter(([_, valueIds]) => valueIds.length > 0)
            .map(([attributeId, valueIds]) => {
                const attribute = attributes.find(a => a.id === attributeId)!
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

        if (selectedGroups.length === 0) {
            toast.error('Please select at least one attribute value')
            return
        }

        // Calculate Cartesian product
        const cartesianProduct = selectedGroups.reduce<{ attributeId: string, attributeName: string, valueId: string, value: string }[][]>((acc, group) => {
            return acc.flatMap(accItem => group.map(groupItem => [...accItem, groupItem]))
        }, [[]])

        // Create variation objects
        const newVariations = cartesianProduct.map(combination => ({
            combination,
            price: productData.basePrice || 0,
            //add unique sku for each variation
            sku: `SKU-${combination.map(c => c.valueId).join('-')}`,
            image: productData.baseImage || undefined
        }))

        setVariations(newVariations)
        toast.success(`Generated ${newVariations.length} variations`)
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

        startTransition(async () => {
            try {
                await createProductWithVariations({
                    product: productData,
                    variations: variations.map(v => ({
                        ...v,
                        attributeValueIds: v.combination.map(c => c.valueId)
                    }))
                })

                toast.success('Product created successfully!')
                router.push('/admin/products')
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
                            <Label htmlFor="basePrice">Base Price</Label>
                            <Input
                                id="basePrice"
                                type="number"
                                step="0.01"
                                min="0"
                                value={productData.basePrice}
                                onChange={(e) => handleProductChange('basePrice', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                            />
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

            {/* Attribute Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Attributes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {attributes.map((attribute) => (
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

                    <div className="pt-4">
                        <Button
                            type="button"
                            onClick={generateVariations}
                            disabled={Object.keys(selectedValues).length === 0}
                        >
                            Generate Variations
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Generated Variations */}
            {variations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Variations ({variations.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {variations.map((variation, index) => (
                                <div key={index} className="border rounded-lg p-4 space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {variation.combination.map((item) => (
                                            <Badge key={item.valueId} variant="secondary">
                                                {item.attributeName}: {item.value}
                                            </Badge>
                                        ))}
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
                                            <Label htmlFor={`price-${index}`}>Price *</Label>
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

                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor={`image-${index}`}>Image URL (Optional)</Label>
                                        <Input
                                            id={`image-${index}`}
                                            value={variation.image || ''}
                                            onChange={(e) => handleVariationChange(index, 'image', e.target.value)}
                                            placeholder="https://example.com/variation-image.jpg"
                                        />
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
                >
                    {isPending ? 'Creating...' : 'Create Product'}
                </Button>
            </div>
        </form>
    )
}