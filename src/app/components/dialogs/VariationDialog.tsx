"use client"

import React, { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { createVariation, getAllVariations } from '@/app/actions/variationActions'
import { get } from 'http'
import { getAllProducts } from '@/app/actions/productActions'



function VariationDialog() {
    const [isPending, startTransition] = useTransition()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [existingVariations, setExistingVariations] = useState<any[]>([]) // Fetch or pass existing variations as needed
    const [products, setProducts] = useState<any[]>([]) // Fetch or pass products as needed

    // Variation form state
    const [sku, setSku] = useState('')
    const [price, setPrice] = useState('')
    const [variationValues, setVariationValues] = useState<string[]>([''])
    const [productId, setProductId] = useState('')
    // fetch existing variations to check for duplicates
    useEffect(() => {
        const fetchExistingVariations = async () => {
            const variations = await getAllVariations()
            setExistingVariations(variations)
        }
        fetchExistingVariations()
    }, [])
    // fetch products for the product selection
    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProducts()
            setProducts(products)
        }
        fetchProducts()
    }, [])

    // Add new value input
    const addValueInput = () => {
        setVariationValues(prev => [...prev, ''])
    }

    // Remove value input
    const removeValueInput = (index: number) => {
        if (variationValues.length > 1) {
            setVariationValues(prev => prev.filter((_, i) => i !== index))
        }
    }

    // Update value at index
    const updateValue = (index: number, value: string) => {
        setVariationValues(prev => prev.map((v, i) => i === index ? value : v))
    }

    // Reset form
    const resetForm = () => {
        setSku('')
        setPrice('')
        setVariationValues([''])
    }

    // Check for duplicate variation
    const isDuplicate = () => {
        const valuesKey = variationValues.map(v => v.trim()).filter(Boolean).join('|')
        return existingVariations.some(v => {
            const vKey = (v.values || []).map((val: string) => val.trim()).filter(Boolean).join('|')
            return v.sku === sku.trim() || vKey === valuesKey
        })
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!sku.trim()) {
            toast.error('Please enter a SKU')
            return
        }
        if (!price.trim() || isNaN(Number(price))) {
            toast.error('Please enter a valid price')
            return
        }
        const validValues = variationValues.filter(v => v.trim() !== '')
        if (validValues.length === 0) {
            toast.error('Please enter at least one variation value')
            return
        }
        if (isDuplicate()) {
            toast.error('This variation already exists')
            return
        }

        startTransition(async () => {
            try {
                await createVariation({
                    sku: sku.trim(),
                    price: Number(price),
                    productId,
                    attributeValues: validValues.map(v => ({
                        attributeId: '', // Set the attributeId accordingly
                        value: v.trim()
                    }))
                })

                toast.success('Variation created successfully!')
                setIsModalOpen(false)
                resetForm()
                // The page will automatically revalidate due to server action
            } catch (error) {
                toast.error('Failed to create variation')
                console.error(error)
            }
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Create Variation
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Variation</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="productId">Product *</Label>
                        <select
                            id="productId"
                            value={productId}
                            onChange={e => setProductId(e.target.value)}
                            className="w-full border rounded px-2 py-2"
                        >
                            <option value="" disabled>Select a product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sku">SKU *</Label>
                        <Input
                            id="sku"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            placeholder="e.g., SKU123"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g., 19.99"
                            type="number"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Variation Values *</Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {variationValues.map((value, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={value}
                                        onChange={(e) => updateValue(index, e.target.value)}
                                        placeholder={`Value ${index + 1}`}
                                        className="flex-1"
                                    />
                                    {variationValues.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeValueInput(index)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addValueInput}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Value
                        </Button>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isPending}
                        >
                            {isPending ? 'Creating...' : 'Create Variation'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default VariationDialog