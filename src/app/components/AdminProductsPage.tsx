'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'
import { createAttribute } from '@/app/actions/attributeActions'
import { toast } from 'sonner'

interface Product {
    id: string
    name: string
    slug: string
    basePrice: number
    variations: Array<{
        id: string
    }>
    attributes: Array<{
        attribute: {
            id: string
            name: string
        }
    }>
}

interface AdminProductsPageProps {
    products: Product[]
}

export default function AdminProductsPage({ products }: AdminProductsPageProps) {
    const [isPending, startTransition] = useTransition()
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Attribute form state
    const [attributeName, setAttributeName] = useState('')
    const [attributeValues, setAttributeValues] = useState<string[]>([''])

    // Add new value input
    const addValueInput = () => {
        setAttributeValues(prev => [...prev, ''])
    }

    // Remove value input
    const removeValueInput = (index: number) => {
        if (attributeValues.length > 1) {
            setAttributeValues(prev => prev.filter((_, i) => i !== index))
        }
    }

    // Update value at index
    const updateValue = (index: number, value: string) => {
        setAttributeValues(prev => prev.map((v, i) => i === index ? value : v))
    }

    // Reset form
    const resetForm = () => {
        setAttributeName('')
        setAttributeValues([''])
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!attributeName.trim()) {
            toast.error('Please enter an attribute name')
            return
        }

        const validValues = attributeValues.filter(v => v.trim() !== '')
        if (validValues.length === 0) {
            toast.error('Please enter at least one attribute value')
            return
        }

        startTransition(async () => {
            try {
                await createAttribute({
                    name: attributeName.trim(),
                    values: validValues.map(v => v.trim())
                })

                toast.success('Attribute created successfully!')
                setIsModalOpen(false)
                resetForm()
                // The page will automatically revalidate due to server action
            } catch (error) {
                toast.error('Failed to create attribute')
                console.error(error)
            }
        })
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Product Management</h1>
                        <p className="text-muted-foreground">
                            Manage your variable products and their variations
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Create Attribute
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Create New Attribute</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="attributeName">Attribute Name *</Label>
                                        <Input
                                            id="attributeName"
                                            value={attributeName}
                                            onChange={(e) => setAttributeName(e.target.value)}
                                            placeholder="e.g., Color, Size, Material"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Attribute Values *</Label>
                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                            {attributeValues.map((value, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <Input
                                                        value={value}
                                                        onChange={(e) => updateValue(index, e.target.value)}
                                                        placeholder={`Value ${index + 1}`}
                                                        className="flex-1"
                                                    />
                                                    {attributeValues.length > 1 && (
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
                                            {isPending ? 'Creating...' : 'Create Attribute'}
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Link href="/dashboard/new">
                            <Button>Create New Product</Button>
                        </Link>
                    </div>
                </div>

                {products.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Get started by creating your first variable product
                                </p>
                                <Link href="/dashboard/new">
                                    <Button>Create Product</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Card key={product.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{product.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Slug</p>
                                            <p className="font-mono text-sm">{product.slug}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Base Price</p>
                                            <p className="font-semibold">€{product.basePrice.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Variations</p>
                                            <p className="font-semibold">{product.variations.length}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Attributes</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {product.attributes.map(({ attribute }) => (
                                                    <Badge key={attribute.id} variant="secondary" className="text-xs">
                                                        {attribute.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-2 space-y-2">
                                            <Link href={`/dashboard/edit/${product.id}`}>
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Edit Product
                                                </Button>
                                            </Link>
                                            <Link href={`/products/${product.slug}`}>
                                                <Button variant="ghost" size="sm" className="w-full">
                                                    Preview
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}